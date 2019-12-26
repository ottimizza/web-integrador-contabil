const express = require('express');

const app = express();

const path = require('path');

const compression = require('compression');
const zlib = require('zlib');

const fs = require('fs');

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file

require('dotenv').config();

function getEnvironmentVariable(key, _default = '') { return process.env[key] || _default; }

function createEnvironementFile() {
  return `export const environment = {
  production: true,
  oauthBaseUrl: '${getEnvironmentVariable('OAUTH2_BASE_URL')}',
  oauthClientId: '${getEnvironmentVariable('OAUTH2_CLIENT_ID')}'
};`;
}

const environment = getEnvironmentVariable('ENVIRONMENT');
const environmentFile = createEnvironementFile();
fs.writeFile(`./src/environments/environment.ts`, environmentFile, (err) => {
  if (err) { console.log(err); }
});




//
let PACKAGE_NAME = getEnvironmentVariable('npm_package_name');

PACKAGE_NAME = 'ng-accounts';


const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers["x-forwarded-proto"] !== "https" && environment !== 'local') {
      return res.redirect(["https://", req.get("Host"), req.url].join(""));
    }
    next();
  };
};

//
//
//
//
//

app.disable('etag'); // 

app.use(forceSSL()); // enforces SSL connection.

app.use(compression()); // Uses GZIP compression. 'zlib.Z_BEST_COMPRESSION'

app.use(express.static(`${__dirname}/dist/${PACKAGE_NAME}`));

app.listen(process.env.PORT || 4200);

// redirect traffic to index.html
app.get('*', function (req, res) {
  res.sendFile(path.join(`${__dirname}/dist/${PACKAGE_NAME}/index.html`));
});
