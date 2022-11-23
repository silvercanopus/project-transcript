const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    scripts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Script'
        }
    ],
    translations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Translation'
        }
    ]
})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);