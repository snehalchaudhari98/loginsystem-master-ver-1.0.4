
const mongoose = require('mongoose');

const Conferenceschema = mongoose.Schema({
    organizer:{
        type: String,
        required : true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    subject:{
        type: String,
        required : true
    },
    conducted:{
        type: String,
        required : true
    },
    count:{
        type:Number,
        required : true
    },
    po:{
        type:String,
        default:null
    },
    pso:{
        type:String,
        default:null
    }
});

const conference = module.exports =mongoose.model('conference',Conferenceschema);