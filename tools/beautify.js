const fs = require('fs');
const beautify = require('js-beautify');

if ((process.argv.length-2) < 1) {
	console.log('Please add the platform to the argument.');
	return;
}
const htmlFilePath = process.argv[2];

// 整形オプション
// https://www.npmjs.com/package/js-beautify
const beautifyOptions = {
	indent_size: 4,
	indent_char: '\t',
	indent_with_tabs: true,
	end_with_newline: true,
	preserve_newlines: false,
	max_preserve_newlines: 0,
	wrap_line_length: 0,
	wrap_attributes_indent_size: 0,
	type: 'html',
	unformatted: ['b', 'em']
};

var document = fs.readFileSync(htmlFilePath, {encoding: 'utf-8', flag: 'r'});
fs.writeFileSync(htmlFilePath, beautify.html(document, beautifyOptions));
