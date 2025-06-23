const path = require('path');
const fs = require('fs');

// Debug: Print current working directory and file paths
console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);

// Possible paths for the compiled app
const possiblePaths = [
  path.join(process.cwd(), 'dist', 'app.js'),
  path.join(__dirname, 'dist', 'app.js'),
  path.join(process.cwd(), 'src', 'dist', 'app.js'),
  path.join(__dirname, 'app.js')
];

console.log('Looking for app.js in these locations:');
possiblePaths.forEach((p, i) => {
  const exists = fs.existsSync(p);
  console.log(`${i + 1}. ${p} - ${exists ? 'EXISTS' : 'NOT FOUND'}`);
});

// Find the correct path
let appPath = null;
for (const p of possiblePaths) {
  if (fs.existsSync(p)) {
    appPath = p;
    break;
  }
}

if (appPath) {
  console.log(`Starting app from: ${appPath}`);
  require(appPath);
} else {
  console.error('Could not find app.js in any expected location');
  console.log('Directory contents:');
  console.log('Root:', fs.readdirSync(process.cwd()));
  if (fs.existsSync(path.join(process.cwd(), 'dist'))) {
    console.log('dist/', fs.readdirSync(path.join(process.cwd(), 'dist')));
  }
  if (fs.existsSync(path.join(process.cwd(), 'src'))) {
    console.log('src/', fs.readdirSync(path.join(process.cwd(), 'src')));
  }
  process.exit(1);
} 