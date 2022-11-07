const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    translation: {
        type: Schema.Types.ObjectId,
        ref: 'Translation'
    },
    marks: [
        {
            type: String,
            enum: ['good', 'bad', 'none']
        }
    ],
    comments: [
        {
            type: String
        }
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Feedback', FeedbackSchema);