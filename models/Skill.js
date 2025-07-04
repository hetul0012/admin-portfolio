const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: String,
  level: String,
  icon: String
});

module.exports = mongoose.model('Skill', skillSchema);
