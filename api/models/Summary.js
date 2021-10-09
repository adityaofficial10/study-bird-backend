const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const SummarySchema = new Schema({
    user_id:{
        type: String,
        required: true
    },
    content:{
        type: String,
        default: null
    }
});


module.exports = SummarySchema;