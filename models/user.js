/* Created by tdomen on 2016/11/05 */

// /backend/models/user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    username : { type: String, require: true, unique: true }, 
    password : { type: String, require: true }
});

module.exports = mongoose.model('user', User);
