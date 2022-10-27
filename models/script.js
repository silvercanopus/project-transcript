const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Translation = require('./translation');

const ScriptSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    language: {
        type: String,
        enum: ['en', 'ja'],
        required: true
    },
    description: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    translations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Translation'
        }
    ]
})

module.exports = mongoose.model('Script', ScriptSchema);