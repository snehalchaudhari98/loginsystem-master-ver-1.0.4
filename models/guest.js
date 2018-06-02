
const mongoose = require('mongoose');

const Guestschema = mongoose.Schema({
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
    class:{
        type: String
    },
    subject:{
        type: String,
        required : true
    },
    count:{
        type:Number
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

const Guest = module.exports =mongoose.model('Guest',Guestschema);