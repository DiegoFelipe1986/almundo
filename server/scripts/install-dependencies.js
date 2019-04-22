// =======================================================
// This script will install the dependencies for the server 
// and the angular application
// =======================================================
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');

// =======================================================
// Execute `npm install` command
// =======================================================

async function installDependencies() {
  await exec('npm install');
  return Promise.resolve(true);
}

// =======================================================
// Install all the dependencies from the server and the client applications
// =======================================================

function installAllDependencies() {
  console.log('Installing NodeJS Server Dependencies...');

  installDependencies().then(() => {
    console.log('* Move to angular application directory *');
    process.chdir(path.resolve(process.cwd() + '/../application/'));

    console.log('Installing Angular Application Dependencies');
    installDependencies().then(() => {
      console.log('All dependencies installed');
    });
  });
}
installAllDependencies();
