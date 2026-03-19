const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`Source directory not found: ${src}`);
    return;
  }
  
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
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${src} -> ${dest}`);
  } else {
    console.log(`File not found: ${src}`);
  }
}

const distDir = process.argv[2] || 'dist';

console.log(`Copying files to ${distDir}...`);

// Copy public folder
console.log('Copying public folder...');
copyDir('./public', distDir);

// Copy WASM files
console.log('Copying WASM files...');
copyFile('./src/lib/rlottie/rlottie-wasm.wasm', path.join(distDir, 'rlottie-wasm.wasm'));
copyFile('./node_modules/opus-recorder/dist/decoderWorker.min.wasm', path.join(distDir, 'decoderWorker.min.wasm'));

// Copy emoji folders
console.log('Copying emoji folders...');
copyDir('./node_modules/emoji-data-ios/img-apple-64', path.join(distDir, 'img-apple-64'));
copyDir('./node_modules/emoji-data-ios/img-apple-160', path.join(distDir, 'img-apple-160'));

console.log('Files copied successfully!');
