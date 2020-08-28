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
  serviceUrl: '${getEnvironmentVariable('SERVICE_URL')}',
  storageApplicationId: '${getEnvironmentVariable('STORAGE_APPLICATION_ID', 'accounts-avatar')}',
  storageAccountingId: '${getEnvironmentVariable('STORAGE_ACCOUNTING_ID', 'ottimizza')}',
  portalBaseUrl: '${getEnvironmentVariable('PORTAL_BASE_URL')}',
  supportUrl: '${getEnvironmentVariable('SUPPORT_URL', 'https://suporte.ottimizza.com.br')}',
  theme: ${getEnvironmentVariable('THEME', '{"primaryColor":"#004ecb","secondaryColor":"#ff8a00","primaryAccent":"#0081bf","dark":"#373435"}')},
  firebase: ${getEnvironmentVariable('FIREBASE')}
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
