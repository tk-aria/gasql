const util = require('util');
const subprocess = require('child_process');
const fileSystem = require('fs-extra');
const shell = util.promisify(subprocess.exec);

var TARGET_DOC =  './.googleapp/index.html';

(async () => {

	fileSystem.copySync('./public', './.googleapp');

	console.log((await shell(`node tools/beautify.js ${TARGET_DOC}`)).stdout);
	console.log((await shell(`node tools/googleapp_builder.js ${TARGET_DOC}`)).stdout);
	console.log((await shell(`rm -r .googleapp/**/*.js`)).stdout);
	console.log((await shell(`rm -r .googleapp/**/*.js.map`)).stdout);
	console.log((await shell(`rm -r .googleapp/**/*.css`)).stdout);
	console.log((await shell(`rm -r .googleapp/index.html`)).stdout);

	fileSystem.copySync('./src', './.googleapp');

})().catch(err => console.error(err));

