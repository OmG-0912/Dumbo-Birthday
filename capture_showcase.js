const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\OMG\\.gemini\\antigravity\\brain\\aff3bb30-14fe-453b-8bda-bcf81f27b9a7';
const ssPath = path.join(artifactDir, 'showcase_screenshot.png');

console.log('Capturing /showcase screenshot...');
const cmd = `"${chromePath}" --headless=new --use-gl=angle --use-angle=d3d11 --enable-webgl --ignore-gpu-blocklist --window-size=1440,960 --screenshot="${ssPath}" http://localhost:3090/showcase`;
execSync(cmd, { stdio: 'inherit' });
console.log('Showcase screenshot created:', fs.existsSync(ssPath), 'size:', fs.statSync(ssPath).size);
