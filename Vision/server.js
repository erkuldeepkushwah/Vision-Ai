import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const visionDir = path.join(__dirname, 'Vision');

// Serve static assets from root and Vision directory
app.use(express.static(__dirname));
app.use(express.static(visionDir));

// Clean URL routes
app.get('/', (req, res) => {
  res.sendFile(path.join(visionDir, 'home.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(visionDir, 'home.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(visionDir, 'about.html'));
});

app.get('/blog', (req, res) => {
  res.sendFile(path.join(visionDir, 'blog.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(visionDir, 'contact.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(visionDir, 'servie.html'));
});

app.get('/service', (req, res) => {
  res.sendFile(path.join(visionDir, 'servie.html'));
});

// Fallback to home.html for unmatched routes
app.use((req, res, next) => {
  if (req.accepts('html')) {
    res.sendFile(path.join(visionDir, 'home.html'));
    return;
  }
  next();
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
