const fs = require('fs');
// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

function getEnvironmentVariable(key, _default = '') { return process.env[key] || _default; }

function createEnvironementFile() {
  return `export const environment = {
  production: true,
  oauthBaseUrl: '${getEnvironmentVariable('OAUTH2_BASE_URL')}',
  oauthClientId: '${getEnvironmentVariable('OAUTH2_CLIENT_ID')}',
  storageBaseUrl: '${getEnvironmentVariable('STORAGE_BASE_URL')}',
  storageApplicationId: '${getEnvironmentVariable('STORAGE_APPLICATION_ID', 'accounts-avatar')}',
  storageAccountingId: '${getEnvironmentVariable('STORAGE_ACCOUNTING_ID', 'ottimizza')}'
};`;
}

const environment = getEnvironmentVariable('ENVIRONMENT');
const environmentFile = createEnvironementFile();

console.log(`
  ENVIRONMENT -> ${environment}
  ---
  ${environmentFile}
`);

fs.writeFile(`./src/environments/environment.prod.ts`, environmentFile, (err) => {
  if (err) {
    console.log(err);
  }
});