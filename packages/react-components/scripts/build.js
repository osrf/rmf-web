const { execSync } = require('child_process');
const { readFileSync, writeFileSync } = require('fs');

execSync('tsc --build', { stdio: 'inherit' });

const manifest = JSON.parse(readFileSync('package.json'));
manifest.scripts = undefined;
writeFileSync('dist/package.json', JSON.stringify(manifest, undefined, 2));
