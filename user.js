const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    items:{
        type:Array,
        required:true
    }
})

module.exports = mongoose.model('users',schema)