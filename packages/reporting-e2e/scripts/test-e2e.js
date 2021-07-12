const concurrently = require('concurrently');
const { execSync } = require('child_process');

process.env.BUILD_PATH = process.env.BUILD_PATH || '../reporting-e2e/build';
process.env.REACT_APP_AUTH_PROVIDER = process.env.REACT_APP_AUTH_PROVIDER || 'keycloak';
if (process.env.REACT_APP_AUTH_PROVIDER === 'keycloak') {
  process.env.REACT_APP_KEYCLOAK_CONFIG =
    process.env.REACT_APP_KEYCLOAK_CONFIG ||
    JSON.stringify({
      realm: 'master',
      clientId: 'reporting',
      url: 'http://localhost:8088/auth',
    });
}
process.env.REACT_APP_REPORTING_SERVER =
  process.env.REACT_APP_REPORTING_SERVER || 'http://localhost:8002';
process.env.E2E_REPORTING_SERVER = process.env.E2E_REPORTING_SERVER || 'http://localhost:8003';
process.env.E2E_REPORTING_URL = process.env.E2E_REPORTING_URL || 'http://localhost:5000';
process.env.E2E_USER = process.env.E2E_USER || 'admin';
process.env.E2E_PASSWORD = process.env.E2E_PASSWORD || 'admin';

execSync('npm --prefix ../reporting run build', { stdio: 'inherit' });

// wrap in double quotes to support args with spaces
const wdioArgs = process.argv
  .slice(2)
  .map((arg) => `"${arg}"`)
  .join(' ');

const services = [];
// eslint-disable-next-line no-eval
if (!eval(process.env.E2E_NO_AUTH)) {
  switch (process.env.REACT_APP_AUTH_PROVIDER) {
    case 'keycloak':
      services.push('npm run start:keycloak');
      break;
    default:
      throw new Error('cannot start auth provider');
  }
}
// eslint-disable-next-line no-eval
if (!eval(process.env.E2E_NO_REPORTING)) {
  services.push('serve -c ../serve.json build');
}
// eslint-disable-next-line no-eval
if (!eval(process.env.E2E_NO_REPORTING_SERVER)) {
  services.push('npm run start:reporting-server');
}

concurrently([...services, `node scripts/auth-ready.js && wdio ${wdioArgs}`], {
  killOthers: ['success', 'failure'],
  successCondition: 'first',
}).catch((e) => {
  console.error(e);
  process.exitCode = -1;
});
