// Reference:
//   https://rooter.jp/web-crawling/node_js_static_scraping/
//   https://qiita.com/amamamaou/items/25e8b4e1b41c8d3211f4
//   http://sarchitect.net/10364
//
// HTML/CSS/JS整形ツール:
//   https://www.10bestdesign.com/dirtymarkup/
// 
// Vue + GoogleAppsWeb
//   https://tonari-it.com/gas-web-app-vue-js/
//   https://qiita.com/clomie/items/2361e5922f7ea5d5388d
//   https://qiita.com/clomie/items/ef10db03b9ecef29ca5d
//
// Introduction Clasp + TS:
//   https://medium.com/@kosa3/gas%E3%82%92clasp%E3%81%A8typescript%E3%81%A7%E3%83%AD%E3%83%BC%E3%82%AB%E3%83%AB%E9%96%8B%E7%99%BA%E3%81%97%E3%81%A6%E3%81%BF%E3%81%9F-e7835d1763ed
//
'use strict'
const fs = require('fs');
const path  = require('path');
const readline = require("readline");
const HTMLParser = require('fast-html-parser');

if ((process.argv.length-2) < 1) {
	console.log('Please add the platform to the argument.');
	return;
}
const SRC_PATH = process.argv[2];
const BASE_PATH = path.dirname(SRC_PATH);

var htmlfile = fs.readFileSync(SRC_PATH, {encoding: 'utf-8', flag: 'r+'});
console.log(htmlfile);

// HTML解析.
var root = HTMLParser.parse(htmlfile);

var scriptlist = [];
for (var dom of root.querySelectorAll("script")){
	console.log(dom);
	console.log(dom.attributes.src);
	scriptlist.push(dom.attributes.src)
}

var csslist = [];
for (var dom of root.querySelectorAll("link")){
	console.log(dom);
	console.log(dom.attributes.href);
	csslist.push(dom.attributes.href);
}

// script, css各々とっておいたファイル名からGAS用のファイルへビルド.
// ~.js -> ~.js.html <script></script>で囲む
// ~.css -> ~.css.html <css></css>で囲む

for (var scriptPath of scriptlist) {
	var file = fs.readFileSync(`${BASE_PATH}/${scriptPath}`, {encoding: 'utf-8', flag: 'r+'});
	fs.writeFileSync(`${BASE_PATH}/${scriptPath}.html`, `<script>\n${file}\n</script>`);
}

for (var cssPath of csslist) {
	console.log(cssPath);
	var file = fs.readFileSync(`${BASE_PATH}/${cssPath}`, {encoding: 'utf-8', flag: 'r+'});
	var extension = path.extname(cssPath);
	var startPrefix = "";
	var endPrefix = "";
	var isMatch = true;

	if (isMatch |= extension.includes('js')) {
		startPrefix = '<script>';
		endPrefix = '</script>';
	}
	if (isMatch |= extension.includes('css')) {
		startPrefix = '<style>';
		endPrefix = '</style>';
	}

	if (isMatch) {
		fs.writeFileSync(`${BASE_PATH}/${cssPath}.html`, `${startPrefix}\n${file}\n${endPrefix}`);
	}
}

// 最後に元のファイルも変更して終了.
// 呼び出し元の ~.js, ~.css部分を置き換え
// for分で回して１行ずつマッチさせて<script <linkで 
// src=があればそれ以下の ""を抜き出して ~.js|css.htmlに置き換え
 
// stream変数を作り、fsモジュールの「createReadStream」メソッドを使ってテキストファイルをストリーム形式で読み込む
var stream = fs.createReadStream(SRC_PATH, "utf8");
 
// reader変数を作り、readlineモジュールの「createInterface」メソッドに先ほど作ったストリーム情報を渡す
var reader = readline.createInterface({ input: stream });

let output = "";

// reader変数のonメソッドで1行ずつconsole.logを実行し行末まで繰り返す
reader.on("line", (data) => {

	var result = data;

	if (data.includes('<link ')) {

		var selector = HTMLParser.parse(data).querySelector('link');
		if (selector.attributes.href) {
			var extension = path.extname(selector.attributes.href);
			if (extension.includes('js') || extension.includes('css')) {
				result = `\t<?!= HtmlService.createHtmlOutputFromFile('${selector.attributes.href}').getContent(); ?>`;
			}
		}
	}

	if (data.includes('<script ')) {

		var selector = HTMLParser.parse(data).querySelector('script');
		if (selector.attributes.src) {
			result = `\t<?!= HtmlService.createHtmlOutputFromFile('${selector.attributes.src}').getContent(); ?>`;
		}
	}

	output += `${result}\n`;
});

stream.on('end', () => {
	fs.writeFileSync(`${BASE_PATH}/googleapp.html`, `${output}`, {encoding: 'utf-8'});
});

