// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "copy-with-line-number" is now active!');

	// copy-with-line-number.copy
	context.subscriptions.push(vscode.commands.registerCommand('copy-with-line-number.copy', () => {
		let textArray : string[] = getCopyTextWithLineNumber();
		let text : string = '';

		for (let t of textArray) {
			text += t + '\n';
		}

		// クリップボードに書き込み
		vscode.env.clipboard.writeText(text);
		vscode.window.showInformationMessage('Copy with line number!');
	}));

	// copy-with-line-number.copy-without-tab
	context.subscriptions.push(vscode.commands.registerCommand('copy-with-line-number.copy-without-tab', () => {
		let textArray : string[] = getCopyTextWithLineNumber();
		let text : string = '';

		for (let t of textArray) {
			text += t.replace(/\t/g, "    ") + '\n';
		}

		// クリップボードに書き込み
		vscode.env.clipboard.writeText(text);
		vscode.window.showInformationMessage('Copy with line number, without TAB!');
	}));
}

// this method is called when your extension is deactivated
export function deactivate() {}

// コピーした範囲のテキストを行番号付きに加工して文字列リストで返す
function getCopyTextWithLineNumber() : string[] {
	let text : string[] = [];

	let editor = vscode.window.activeTextEditor;	//エディタ取得
	let sel = editor?.selection;	//選択範囲取得
	let slineNo = sel?.start.line;	//選択範囲先頭行の行番号
	if(slineNo == undefined) { return text; }
	let elineNo = sel?.end.line;	//選択範囲末尾行の行番号
	if(elineNo == undefined) { return text; }
	let digit = String(elineNo).length;	//末尾行番号の桁数

	// 先頭行から末尾行まで
	for(let l = slineNo; l <= elineNo; l++) {
		// 指定行のテキストを取得
		let t = editor?.document.lineAt(l).text;

		// 実際の行番号は+1した値
		let lineNo = l + 1;

		// 行番号の文字列. 桁数を合わせるために桁数分空白で右寄せフォーマット.
		let line = (Array(digit).fill(' ').join('') + lineNo).substr(-1 * digit);
		text.push(line + ': ' + t);
	}
	return text;
}