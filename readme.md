# ユーザ管理およびユーザが獲得したキー用のバックエンド  
ユーザの管理および，ユーザが獲得したキーを配列で保持してDBに登録するサーバ  
ユーザが獲得するキーはご当地キャラカタログAPIで取得したキャラクターID
[API \[ご当地キャラカタログ\]](http://localchara.jp/services/api#ic)

## 環境  
* node.js : v4.4.7  
* express : 4.x
* MongoDB
* Mongoose

## 実装内容  

### ディレクトリ構成  

今回はexpressで自動生成されたプロジェクト構成に準拠
~~~
$ tree .
backend
|
|--app.js
|--package.json
|--nodejs_installer.sh
|--models
|  |--user.js
|  |--zukan.js
|--routes
   |--auth
   |  |--login.js
   |--zukan
      |--zukan.js
~~~

### スクリプト  

#### /nodejs_installer.sh  
    * このサーバを動かすために必要なもの一式揃えるシェルスクリプト  

#### /app.js  
    * 「node app.js」で動かす本体  
    * 各種モジュールのインクルード，サーバのクリエイト，MongoDBへのコネクション作成

#### /models/user.js  
    * ユーザのスキーマ定義

#### /models/zukan.js  
    * ユーザが獲得したキーのスキーマ定義

#### /routes/auth/login.js  
    * フロントエンドからusernameとpasswordを受け取る
    * DBを参照して，usernameがなければ新規登録，あればpasswordと照合してtrue/falseをフロントエンドに返す  

#### /routes/zukan/zukan.js  
    * ユーザが獲得したキーのDB参照およびインサート処理  
    * フロントエンドからのGET/POSTリクエストで処理が分岐  
    * GETリクエストの場合  
        * DB内のusernameで検索  
        * 参照されたキーを一次元配列に格納し，フロントエンドに返す  
    * POSTリクエストの場合  
        * フロントエンドが獲得したキーをjson形式で本サーバに渡す  
        * POSTで取得したjsonをパースして，キーのみを取り出す  
        * DBにusernameで参照  
        * usernameが存在しない場合，usernameとキーを登録  
        * usernameが存在する場合，DBからキーをjson形式で取り出して，POSTで取得したキーを配列に格納しDBをupdateする  

