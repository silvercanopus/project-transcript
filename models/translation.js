const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const translationSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    language: {
        type: String,
        enum: ['en', 'ja'],
        required: true
    },
    script: {
        type: Schema.Types.ObjectId,
        ref: 'Script'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Translation', translationSchema);