const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assetSchema = new Schema({
  'console-name': { type: String, required: true },
  'console-filename': { type: String, required: true },
  items: { type: Object, required: true },
});

module.exports = mongoose.model('Asset', assetSchema);
