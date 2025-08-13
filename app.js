require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const SELF = process.env.API_BASE || 'https://admin-portfolio-5ws2.onrender.com';
const CLIENTS = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'https://hetul-portfolio-react.vercel.app',
  process.env.CLIENT_ORIGIN,
  SELF
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (CLIENTS.includes(origin)) return cb(null, true);
    return cb(null, false);
  },
  credentials: true
}));
app.options('*', cors());

app.get('/health', (req, res) => res.status(200).json({ ok: true }));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.use('/admin', require('./routes/adminRoutes'));
app.use('/api', require('./routes/apiRoutes'));

app.get('/', (req, res) => res.redirect('/admin/projects'));

const PORT = process.env.PORT || 3000;
const HOST = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
app.listen(PORT, () => {
  console.log(` Server is running at: ${HOST}`);
  console.log(` Listening on port ${PORT}`);
});
