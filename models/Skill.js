const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema(
  {
    name:  { type: String, required: true },
    level: { type: String },  // e.g., "70%"
    icon:  { type: String }
  },
  { timestamps: true }
);


module.exports = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
