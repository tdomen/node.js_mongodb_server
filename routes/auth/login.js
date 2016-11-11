// ---- Created by tdomen on 2016/10/25 -----

var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mongoose = require('mongoose');

// モデルの宣言
var User = require('../../models/user');

// POSTリクエストがきた時の処理
/* POST内容はJSON形式で飛ばされる
 * JSON format
 * {
 *  "username" : String
 *  "password" : String
 * }
 */
router.post('/', function(request, response){
    console.log("catch the post request");
    response.setHeader('Content-Type', 'text/plain');

    // パラメータ名、usernameとpassを出力
    console.log(request.body.username);
    console.log(request.body.password);

    var username = request.body.username;
    var password = request.body.password;

    User.find({ "username" : username }, function(err, result){
	if (err)
	    console.log(err);

	// 新規登録
	if (result.length == 0){
	    var user = new User();

	    user.username = username;
	    user.password = password;

	    user.save(function(err){
		if (err) console.log(err);
		response.send("new_created");
	    });
	}
	// usernameがDBに存在した場合
	else{
	    if (result[0].password == password)
		response.send("true");
	    else
		response.send("false");
	}
    });
});

module.exports = router;
