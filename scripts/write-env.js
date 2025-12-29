/**
 * scripts/write-env.js
 * Writes a .env.local file from process.env values.
 * Usage: NODE_ENV=production node scripts/write-env.js
 */
const fs = require('fs');
const path = require('path');

const outPath = path.join(process.cwd(), '.env.local');

const vars = {
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  // Add other keys you want to persist into .env.local during build here:
  // NEXT_PUBLIC_SOME_VAR: process.env.NEXT_PUBLIC_SOME_VAR || '',
};

const lines = Object.entries(vars)
  .filter(([, v]) => v !== undefined && v !== '')
  .map(([k, v]) => `${k}=${v}`);

if (lines.length === 0) {
  console.log('No env vars to write to .env.local');
  process.exit(0);
}

fs.writeFileSync(outPath, lines.join('\n') + '\n', { encoding: 'utf8' });
console.log(`Wrote ${lines.length} env var(s) to ${outPath}`);
