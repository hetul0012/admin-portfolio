const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const Skill = require('../models/Skill');

const API_BASE = process.env.API_BASE || ''; // Link https://admin-portfolio-5ws2.onrender.com

const fullPath = (p) => {
  if (!p) return '';
  if (p.startsWith('http')) return p;
  if (p.startsWith('/uploads')) return `${API_BASE}${p}`;
  return `${API_BASE}/uploads/${p}`;
};

router.get('/projects', async (req, res) => {
  try {
    const docs = await Project.find().sort({ createdAt: -1 });
    const out = docs.map(d => ({
      id: String(d._id),
      title: d.title,
      url: d.url || '/',
      image: fullPath(d.image),
      summary: d.summary || '',
      tech: d.tech || []
    }));
    res.json(out);
  } catch (e) {
    console.error('GET /api/projects failed:', e);
    res.status(500).json({ error: 'Failed to load projects' });
  }
});

router.get('/skills', async (req, res) => {
  try {
    const docs = await Skill.find().sort({ createdAt: -1 });
    const out = docs.map(d => ({
      id: String(d._id),
      name: d.name,
      level: d.level,
      icon: fullPath(d.icon)
    }));
    res.json(out);
  } catch (e) {
    console.error('GET /api/skills failed:', e);
    res.status(500).json({ error: 'Failed to load skills' });
  }
});

module.exports = router;
