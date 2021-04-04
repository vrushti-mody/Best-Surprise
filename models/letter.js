var mongoose= require('mongoose');

var schema = new mongoose.Schema({
    sendername: {type:String, required:true},
    recievername:{type:String, required:true},
    message:{type:String, required:true},
})

module.exports = mongoose.model('Letter',schema)