import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Run the vite build
console.log('Building frontend with Vite...');
execSync('npx vite build', { stdio: 'inherit' });

// Build the server-side code
console.log('Building server-side code...');
execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });

// Copy API files to dist/api
console.log('Copying API files...');
const apiDir = path.resolve('./api');
const distApiDir = path.resolve('./dist/api');

// Create dist/api directory if it doesn't exist
if (!fs.existsSync(distApiDir)) {
  fs.mkdirSync(distApiDir, { recursive: true });
}

// Copy all files from api to dist/api
const apiFiles = fs.readdirSync(apiDir);
for (const file of apiFiles) {
  const source = path.join(apiDir, file);
  const dest = path.join(distApiDir, file);
  fs.copyFileSync(source, dest);
  console.log(`Copied ${source} to ${dest}`);
}

console.log('Build completed successfully!');