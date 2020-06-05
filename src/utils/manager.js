const fs = require('fs');

const TABLES_DIR = './src/tables';

const read = model => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${TABLES_DIR}/${model}.json`, 'utf8', (err, json) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        const data = JSON.parse(json).data;
        resolve(data);
      } catch (e) {
        reject(e);
      }

    });
  });
};

const write = (model, data) => {
  return new Promise((resolve, reject) => {
    const content = JSON.stringify({ data }, null, 2);
    fs.writeFile(`${TABLES_DIR}/${model}.json`, content, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const save = async (model, obj, keyName = 'id') => {
  try {
    const data = await read(model);

    // add
    if (!obj[keyName]) {
      const key = data.length + 1;
      const item = {...obj, [keyName]: key};
      await write(model, [...data, item]);
      return key;
    }

    // update
    const items = data.map(row => {
      return row[keyName] === obj[keyName] ? ({...row, ...obj}) : row;
    });

    await write(model, items);
    return obj[keyName];

  } catch (err) {
    console.error('save failed', { model, obj, err });
  }
};

const remove = async (model, key, keyName = 'id') => {
  try {
    const data = await read(model);
    const items = data.filter(row => row[keyName] !== key);
    return write(model, items);
  } catch (err) {
    console.error('remove failed', { model, [keyName]: key, err });
  }
};

const get = async (model, key, keyName = 'id') => {
  try {
    const data = await read(model);
    return data.find(row => row[keyName] === key);
  } catch (err) {
    console.error('get failed', { model, [keyName]: key, err });
  }
};

const list = async (model) => {
  try {
    return read(model);
  } catch (err) {
    console.error('list failed', { model, err });
  }
};

module.exports = {
  save,
  remove,
  get,
  list,
};
