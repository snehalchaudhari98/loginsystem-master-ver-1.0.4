
const mongoose = require('mongoose');

const Seminarschema = mongoose.Schema({
    organizer:{
        type: String,
        required : true
    },
    date:{
      type:Date,
      default:Date.now()
    },
    day:{
        type:Number,
        required : true
    },
    attendee:{
        type: String
    },
    conducted:{
        type: String
    },
    subject:{
        type: String,
        required : true
    },
    category:{
        type: String,
        required : true
    },
    po:{
        type:String,
        default:null
    },
    pso:{
        type:String,
        default:null
    },
    place:{
        type: String,
        required : true
    }
});

const Seminar = module.exports =mongoose.model('Seminar',Seminarschema);