# Google Apps Script Manual

Todo

シート名変更
- https://spreadsheets-dojo.com/setname-name/

SpreadSheet行の削除
- https://tonari-it.com/gas-spreadsheet-delete-rows-splice/

## Get, Post

end point
```

```

Required

Header
```
Authorization: Bearer %token%
```

Get, Postを行って認証(ログイン)ページが返ってくる
```
OAuth認証が必要
ScriptApp.getOAuthToken()でTokenを取得
headerでautorizationを行う
```
https://www.ka-net.org/blog/?p=12258


Moved Temporarily」が返ってくるとき
https://reasonable-code.com/gas-moved-temporarily/

V8ランタイムの有効/無効設定
V8ランタイムが有効な状態だと HTML上のoutput.appendなどがエラーになる.
その際,V8ランタイムではなく元々のGASのScriptEngineに戻すことで正常に動作することがあります。
https://auto-worker.com/blog/?p=713
