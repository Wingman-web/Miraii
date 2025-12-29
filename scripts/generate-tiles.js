// Generate Deep Zoom (DZI) tiles for a large panorama using sharp
// Usage: node scripts/generate-tiles.js [inputPath] [outputBaseName]
// Example: node scripts/generate-tiles.js public/200M.JPG public/panorama

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generate(input = 'public/200M.JPG', outputBase = 'public/panorama') {
  try {
    // Ensure input exists
    if (!fs.existsSync(input)) {
      console.error(`Input not found: ${input}`);
      process.exit(1);
    }

    // Remove any existing output
    const dz = `${outputBase}.dzi`;
    const dzFiles = `${outputBase}_files`;
    if (fs.existsSync(dz)) fs.unlinkSync(dz);
    if (fs.existsSync(dzFiles)) {
      fs.rmSync(dzFiles, { recursive: true, force: true });
    }

    console.log(`Generating DZI tiles from ${input} -> ${dz} (+ ${dzFiles}/) ...`);

    await sharp(input)
      .ensureAlpha()
      .tile({ size: 512 })
      .toFile(dz);

    console.log('Tiles generated successfully.');
  } catch (err) {
    console.error('Error generating tiles:', err);
    process.exit(1);
  }
}

const argv = process.argv.slice(2);
generate(argv[0], argv[1]);
