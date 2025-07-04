const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const Skill = require('../models/Skill');

router.get('/projects', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

router.get('/skills', async (req, res) => {
  const skills = await Skill.find();
  res.json(skills);
});

module.exports = router;