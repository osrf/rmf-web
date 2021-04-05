const { execSync } = require('child_process');
const { rmdirSync } = require('fs');

const jsonSchemaToTs = require('json-schema-to-typescript');
const path = require('path');
const fs = require('fs');

rmdirSync(`${__dirname}/lib/generated`, { recursive: true });

console.log('generate schemas:');
execSync(`python3 -m pipenv run python ${__dirname}/generate-schemas.py`, { stdio: 'inherit' });

const schemas = fs.readdirSync('build/schema/').map((f) => `build/schema/${f}`);

const tortoiseDir = path.join(__dirname, 'lib', 'tortoise');
fs.rmdirSync(tortoiseDir, { recursive: true, force: true });
fs.mkdirSync(tortoiseDir, { recursive: true });

console.log('generate models:');
(async () => {
  for (const f of schemas) {
    const ts = await jsonSchemaToTs.compileFromFile(f);
    const baseName = path.basename(f);
    const tsFileName = `${baseName.slice(0, baseName.lastIndexOf('.'))}.ts`;
    const tsFilePath = path.join(tortoiseDir, tsFileName);
    fs.writeFileSync(tsFilePath, ts);
    console.log(tsFilePath);
  }
  fs.writeFileSync(
    path.join(tortoiseDir, 'GENERATED'),
    'THIS DIRECTORY IS GENERATED, DO NOT EDIT!!',
  );
})();

const rmfMsgs = [
  'rmf_building_map_msgs',
  'rmf_charger_msgs',
  'rmf_door_msgs',
  'rmf_lift_msgs',
  'rmf_dispenser_msgs',
  'rmf_ingestor_msgs',
  'rmf_fleet_msgs',
  'rmf_task_msgs',
];
execSync(`python3 -m pipenv run python -m ts_ros -o lib/ros ${rmfMsgs.join(' ')}`, {
  stdio: 'inherit',
});
fs.writeFileSync(
  path.join(__dirname, 'lib', 'ros', 'GENERATED'),
  'THIS DIRECTORY IS GENERATED, DO NOT EDIT!!',
);
