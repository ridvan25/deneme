const mongoose = require('mongoose');
const validator = require('validator');

var AdminSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
  }
);

var Admin = mongoose.model('Admin', AdminSchema);

module.exports = {Admin};
