const fs = require('fs');
const path = require('path');

const modelName = process.argv[2];

// add table
fs.writeFileSync(
  path.join(__dirname, `../src/tables/${modelName}.json`),
  JSON.stringify({ data: [] }, null, 2)
);

// add controller
fs.writeFileSync(
  path.join(__dirname, `../src/controllers/${modelName}.js`),
  `const manager = require('../utils/manager');\n\nconst model = '${modelName}';\n\nmodule.exports = {};\n`
);

