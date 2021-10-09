# vscode-extensions

## 拡張機能一覧

### [Copy with Line Number](./copy-with-line-number/README.md)

行の先頭に行番号を付与してテキストをコピーします。

## 拡張機能の開発方法

### 開発環境の準備

`Visual Studio Code` をインストールします。
コマンド `code` が使えることを確認します。
使えなければ、環境変数 `PATH` を通します。

```bash
> code -v
1.41.1
26076a4de974ead31f97692a0d32f90d735645c0
x64
```

`Node.js` が必要なのでインストールします。
バージョンは何でもいいはずです。
コマンド `node` と `npm` が使えることを確認します。
使えなければ、環境変数 `PATH` を通します。

```bash
> node -v
v14.15.4
> npm -v
6.14.10
```

`npm` コマンドを使って、拡張機能のジェネレータをインストールします。

```bash
> npm install -g yo generator-code --save-dev
```

### プロジェクトの作成

ジェネレータを使って、拡張機能のひな形を作成します。
以下のコマンドで作成できます。

```bash
> npx yo code
```

対話形式でプロジェクトを作成していきます。

まず、作成したい拡張機能の種類を聞かれます。
基本は `New Extension (TypeScript)` でいいはずです。

```bash
? What type of extension do you want to create? (Use arrow keys)
> New Extension (TypeScript)
  New Extension (JavaScript)
  New Color Theme
  New Language Support
  New Code Snippets
  New Keymap
  New Extension Pack
  New Language Pack (Localization)
  New Web Extension (TypeScript)
  New Notebook Renderer (TypeScript)
```

次に、拡張機能に付ける名前を聞かれます。
任意の名前（例：`Hoge Fuga`）を付けます。

```bash
? What's the name of your extension? () Hoge Fuga
```

次に、拡張機能の識別子を聞かれます。
名前から自動で付けてくれる（例：`hoge-fuga`）ので、そのままでもいいです。

```bash
? What's the identifier of your extension? (hoge-fuga)
```

次に、拡張機能の説明を聞かれます。
後からでも編集できるので、ここでは何も記載しなくていいです。

```bash
? What's the description of your extension? ()
```

Gitリポジトリを作成するか、webpackを使うか、パッケージマネージャはどれを使うか聞かれますが、お任せで。

```bash
? Initialize a git repository? (Y/n) n
? Bundle the source code with webpack? (y/N) N
? Which package manager to use? npm
> npm
  yarn
```

これで終了です。
入力した内容に応じたプロジェクトが生成されます。

### パッケージ `.vsix` ファイルの作成

`vsce` をインストールします。

```bash
> npm install -g vsce --save-dev
```

`package.json` に `publisher` と `repogitry` を追記します。

```json
"publisher": "kota-kota",
"repository": {
  "type": "git",
  "url": "https://github.com/kota-kota/vscode-extensions.git"
},
```

`README.md` を修正します。

パッケージを作成します。

```bash
> vsce package
```

#### パッケージを公開する

作成したパッケージをMarketplaceに公開する場合は、Azure DevOps でパーソナルアクセストークンを取得し、`vsce publish` を実施する必要があります。

ここでは個人向けの拡張機能しか作成しないため割愛します。
