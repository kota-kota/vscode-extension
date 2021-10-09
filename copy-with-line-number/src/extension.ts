// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "copy-with-line-number" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('copy-with-line-number.copy', () => {
		let editor = vscode.window.activeTextEditor;	//エディタ取得
		let sel = editor?.selection;	//選択範囲取得
		let slineNo = sel?.start.line;	//選択範囲先頭行の行番号
		if(slineNo == undefined) { return; }
		let elineNo = sel?.end.line;	//選択範囲末尾行の行番号
		if(elineNo == undefined) { return; }
		let digit = String(elineNo).length;	//末尾行番号の桁数

		// 先頭行から末尾行まで
		let textWithLine = '';
		for(let l = slineNo; l <= elineNo; l++) {
			// 指定行のテキストを取得
			let text = editor?.document.lineAt(l).text;

			// 実際の行番号は+1した値
			let lineNo = l + 1;

			// 行番号の文字列. 桁数を合わせるために桁数分空白で右寄せフォーマット.
			let line = (Array(digit).fill(' ').join('') + lineNo).substr(-1 * digit);
			textWithLine += line + ': ' + text + '\n';
		}

		// クリップボードに書き込み
		vscode.env.clipboard.writeText(textWithLine);
		vscode.window.showInformationMessage('Copy! line:' + slineNo + '.' + elineNo);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
