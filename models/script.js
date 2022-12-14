const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScriptSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: [
        {
            type: String,
            required: true
        }
    ],
    length: {
        type: Number,
        required: true
    },
    language: {
        type: String,
        enum: ['en', 'ja'],
        required: true
    },
    description: String,
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
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