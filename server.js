const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '127.0.0.1';
const PUBLIC_DIR = path.join(__dirname, 'public');

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
};

function resolveFile(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split('?')[0]);
  const requested = cleanPath === '/' ? '/index.html' : cleanPath;
  const normalized = path.normalize(requested).replace(/^(\.\.[/\\])+/, '');
  const candidate = path.join(PUBLIC_DIR, normalized);

  if (!candidate.startsWith(PUBLIC_DIR)) {
    return null;
  }

  if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
    return candidate;
  }

  return path.join(PUBLIC_DIR, 'index.html');
}

const server = http.createServer((req, res) => {
  const filePath = resolveFile(req.url || '/');

  if (!filePath) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (error, buffer) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Internal Server Error');
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': CONTENT_TYPES[extension] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(buffer);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Prototype server listening on http://${HOST}:${PORT}`);
});
