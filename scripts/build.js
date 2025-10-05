const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function safeRm(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

const root = path.join(__dirname, '..');
const publicDir = path.join(root, 'public');

// Clean and create public folder
safeRm(publicDir);
fs.mkdirSync(publicDir, { recursive: true });

// Copy pages/ -> public/pages/
const srcPages = path.join(root, 'pages');
const destPages = path.join(publicDir, 'pages');
if (fs.existsSync(srcPages)) {
  fs.cpSync(srcPages, destPages, { recursive: true });
}

// Ensure css directory exists in public
const publicCss = path.join(publicDir, 'css');
fs.mkdirSync(publicCss, { recursive: true });

// Run local tailwindcss binary (fallback to npx if necessary)
const localTailwind = path.join(root, 'node_modules', '.bin', 'tailwindcss');
try {
  execSync(`"${localTailwind}" -i ./css/tailwind.css -o ./public/css/main.css --minify`, { stdio: 'inherit' });
} catch (err) {
  console.log('Local tailwind binary failed, falling back to npx...');
  execSync('npx tailwindcss -i ./css/tailwind.css -o ./public/css/main.css --minify', { stdio: 'inherit' });
}

console.log('Build finished — output available in ./public');
