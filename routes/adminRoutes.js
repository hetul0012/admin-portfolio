const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const Project = require('../models/Project');
const Skill = require('../models/Skill');

/* Multer storage to /public/uploads */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'public', 'uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '-').toLowerCase();
    cb(null, `${Date.now()}-${base}${ext}`);
  }
});
const upload = multer({ storage });

/* Projects admin */
router.get('/projects', async (req, res) => {
  const items = await Project.find().sort({ createdAt: -1 });
  res.render('projects', { title: 'Projects', items });
});

router.post('/projects', upload.single('image'), async (req, res) => {
  const { title, url, summary, tech = '' } = req.body;
  const techArr = tech.split(',').map(t => t.trim()).filter(Boolean);
  const image = req.file ? `/uploads/${req.file.filename}` : '';
  await Project.create({ title, url, summary, tech: techArr, image });
  res.redirect('/admin/projects');
});

router.post('/projects/:id/delete', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.redirect('/admin/projects');
});

/* Skills admin */
router.get('/skills', async (req, res) => {
  const items = await Skill.find().sort({ createdAt: -1 });
  res.render('skills', { title: 'Skills', items });
});

router.post('/skills', upload.single('icon'), async (req, res) => {
  const { name, level } = req.body;
  const icon = req.file ? `/uploads/${req.file.filename}` : '';
  await Skill.create({ name, level, icon });
  res.redirect('/admin/skills');
});

router.post('/skills/:id/delete', async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.redirect('/admin/skills');
});

module.exports = router;
