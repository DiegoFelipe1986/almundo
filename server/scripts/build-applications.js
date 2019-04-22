// ===========================================
// This script will build NodeJS Server and Angular Application
// ===========================================
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');

// ===========================================
// Execute `npm build` command
// ===========================================
async function buildApplication() {
  await exec('npm run build');
  return Promise.resolve(true);
}

// ===========================================
// Build server and client applications
// ===========================================
function buildAllProjects() {
  console.log('Building NodeJs Server...');

  buildApplication().then(() => {
    console.log('* Move to angular application directory *');
    process.chdir(path.resolve(process.cwd() + '/../application/'));

    console.log('Building Angular Application...');
    buildApplication().then(() => {
      console.log('All projects built');
    });
  });
}
buildAllProjects();
