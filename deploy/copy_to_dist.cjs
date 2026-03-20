const fs = require('fs');
const path = require('path');

console.log('=== Starting file copy ===');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`Skip: ${src} (not found)`);
    return;
  }
  
  const stats = fs.statSync(src);
  
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(item => {
      copyRecursive(path.join(src, item), path.join(dest, item));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

const distDir = 'dist';

// Copy public folder
console.log('Copying public...');
copyRecursive('./public', distDir);

// Copy WASM files
console.log('Copying WASM...');
if (fs.existsSync('./src/lib/rlottie/rlottie-wasm.wasm')) {
  fs.copyFileSync('./src/lib/rlottie/rlottie-wasm.wasm', path.join(distDir, 'rlottie-wasm.wasm'));
}

if (fs.existsSync('./node_modules/opus-recorder/dist/decoderWorker.min.wasm')) {
  fs.copyFileSync('./node_modules/opus-recorder/dist/decoderWorker.min.wasm', path.join(distDir, 'decoderWorker.min.wasm'));
}

// Copy emoji folders
console.log('Copying emoji...');
if (fs.existsSync('./node_modules/emoji-data-ios/img-apple-64')) {
  copyRecursive('./node_modules/emoji-data-ios/img-apple-64', path.join(distDir, 'img-apple-64'));
}

if (fs.existsSync('./node_modules/emoji-data-ios/img-apple-160')) {
  copyRecursive('./node_modules/emoji-data-ios/img-apple-160', path.join(distDir, 'img-apple-160'));
}

console.log('=== Copy complete ===');
