
const mongoose = require('mongoose');

const Examschema = mongoose.Schema({
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
    class:{
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

const exam = module.exports =mongoose.model('exam',Examschema);