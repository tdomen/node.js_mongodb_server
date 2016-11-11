/* Created by tdomen on 2016/10/26 */

// /backend/models/zukan.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Zukan = new Schema({
    username : { type: String }, 
    characterID : { type: [Number] }
});

module.exports = mongoose.model('zukan', Zukan);
