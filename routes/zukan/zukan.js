// ---- Created by tdomen on 2016/10/26 -----

var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mongoose = require('mongoose');

// モデルの宣言
var Zukan = require('../../models/zukan');

// GETリクエストがきた時の処理
/*
 * Request URL: http://localhost:3000/zukan/:username
 */
router.get('/:username', function(request, response){
    console.log("catch the get request for zukan");
    response.setHeader('Content-Type', 'text/plain');

    var username = request.params.username;
    var characterID = {};
    console.log(username);

    Zukan.find({ "username" : username }, function(err, charId){
	if (err) 
	    console.log(err);
	var cntID = 0;
	for (var i=0; i < charId.length; i++){
	    for(var j=0; j < charId[i].characterID.length; j++){
		characterID["id"+cntID] = charId[i].characterID[j];
		console.log(characterID["id"+cntID]);
		cntID++;
	    }
	}
	console.log(characterID);
	response.json(characterID);
    });
});

// POSTリクエストがきた時の処理
/* POST内容はJSON形式で飛ばされる
 * JSON format
 * {
 *  "username"    : "String" 
 *  "characterID" : "String"
 * }
 *
 * Request URL: http://localhost:3000/zukan
 */
router.post('/:username', function(request, response){
    console.log("catch the post request for adding character ID");
    response.setHeader('Content-Type', 'text/plain');

    var username = request.params.username;

    Zukan.find({ "username" : username }, function(err, result){
	if (err)
	    console.log(err);

	// パラメータ名、usernameとキャラID
	var jsonarray = request.body["result"];
	var idarray = [];
	for (var i=0; i < jsonarray.length; i++){
	    idarray.push(jsonarray[i].id);
	}

	// 新規登録
	if (result.length == 0){
	    var zukans = new Zukan();

	    zukans.username = username;
	    zukans.characterID = idarray;
	    
	    console.log(zukans.username);
	    console.log(zukans.characterID);

	    // ユーザ情報を登録する
	    zukans.save(function(err) {
		if (err) console.log(err);
	    });  
	}
	// 追加登録
	else{
	    result.map(function(doc){
		var obj = doc.toObject();
		for (var i=0; i < idarray.length; i++){
		    obj.characterID.push(idarray[i]);
		}
		Zukan.update({ "username" : username }, 
			     { $set: { characterID: obj.characterID} },
			     function(err){
				 if (err) console.log(err);
				 Zukan.find({ "username" : username }, function(err, result){
				     if (err)
					 console.log(err);
				 });
			     });
	    });
	}
    });
});

module.exports = router;
