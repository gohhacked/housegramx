const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function copyFile(src, dest) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
}

const distDir = process.argv[2] || 'dist';

// Copy public folder
copyDir('./public', distDir);

// Copy WASM files
copyFile('./src/lib/rlottie/rlottie-wasm.wasm', path.join(distDir, 'rlottie-wasm.wasm'));
copyFile('./node_modules/opus-recorder/dist/decoderWorker.min.wasm', path.join(distDir, 'decoderWorker.min.wasm'));

// Copy emoji folders
copyDir('./node_modules/emoji-data-ios/img-apple-64', path.join(distDir, 'img-apple-64'));
copyDir('./node_modules/emoji-data-ios/img-apple-160', path.join(distDir, 'img-apple-160'));

console.log('Files copied successfully!');
