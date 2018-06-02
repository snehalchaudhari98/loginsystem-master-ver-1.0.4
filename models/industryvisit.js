
const mongoose = require('mongoose');

const Ivschema = mongoose.Schema({
    organizer:{
        type: String,
        required : true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    attendee:{
        type: String,
        required : true
    },
    class:{
        type: String,
        required : true
    },
    count:{
        type:Number,
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
    }
});

const industryvisit = module.exports =mongoose.model('industryvisit',Ivschema);