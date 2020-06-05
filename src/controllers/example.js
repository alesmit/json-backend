const manager = require('../utils/manager');

const model = 'example';

module.exports = {
  list: async (req, res) => {
    const items = await manager.list(model);
    res.json(items);
  },
  get: async (req, res) => {
    const id = +req.params.id;
    const item = await manager.get(model, id);
    res.json(item);
  },
  save: async (req, res) => {
    const payload = req.body;
    const id = await manager.save(model, payload);
    res.json({ ...payload, id });
  },
  upload: async (req, res) => {
    let fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', (fieldName, file, originalFilename) => {
      const timestamp = Date.now();

      fstream = fs.createWriteStream(`${__dirname}/../../uploads/${timestamp}`);
      file.pipe(fstream);

      fstream.on('close', async () => {

        const item = {
          originalFilename,
          timestamp,
        };

        const id = await manager.save(model, item);
        res.json({ ...item, id });

      });
    });
  }
};
