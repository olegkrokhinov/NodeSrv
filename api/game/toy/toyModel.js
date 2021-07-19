const mongoose = require('mongoose');

const objectSchema = new mongoose.Schema({
  name: String,
  discription: String,
  imageUploadPath: String
});

module.exports = mongoose.model('Object', objectSchema, 'Objects');