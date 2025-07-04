const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Project = require('../models/project');
const Skill = require('../models/Skill');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

// Projects
router.get('/projects', async (req, res) => {
  const projects = await Project.find().lean();
  res.render('projects', { projects });
});

router.post('/projects', upload.single('image'), async (req, res) => {
  const { title, description, techStack } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';
  await Project.create({ title, description, techStack, image });
  res.redirect('/admin/projects');
});

router.get('/projects/delete/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.redirect('/admin/projects');
});

// Skills
router.get('/skills', async (req, res) => {
  const skills = await Skill.find().lean();
  res.render('skills', { skills });
});

router.post('/skills', upload.single('icon'), async (req, res) => {
  const { name, level } = req.body;
  const icon = req.file ? `/uploads/${req.file.filename}` : '';
  await Skill.create({ name, level, icon });
  res.redirect('/admin/skills');
});

router.get('/skills/delete/:id', async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.redirect('/admin/skills');
});

module.exports = router;
