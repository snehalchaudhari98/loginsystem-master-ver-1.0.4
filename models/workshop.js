
const mongoose = require('mongoose');

const Workshopschema = mongoose.Schema({
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

const Workshop = module.exports =mongoose.model('Workshop',Workshopschema);