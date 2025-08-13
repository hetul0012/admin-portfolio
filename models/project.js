const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    title:   { type: String, required: true },
    url:     { type: String, default: '/' },
    image:   { type: String },
    summary: { type: String },
    tech:    [{ type: String }]
  },
  { timestamps: true }
);

module.exports = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
