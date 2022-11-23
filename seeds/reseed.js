const mongoose = require('mongoose');
const User = require('../models/user');
const Script = require('../models/script');
const Translation = require('../models/translation');
const Comment = require('../models/comment');
const Feedback = require('../models/feedback');

// re-seeding should be done locally
mongoose.connect('mongodb://localhost:27017/project-transcript');
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("Database Connected!");
})

const resetDB = async () => {
    await User.deleteMany({});
    await Script.deleteMany({});
    await Translation.deleteMany({});
    await Comment.deleteMany({});
    await Feedback.deleteMany({});
}

const reseedDB = async () => {
    await resetDB();

    // Generate two users
    const user1 = new User({ username: "first", email: "first@transcript.com" });
    const firstUser = await User.register(user1, "1");
    const user2 = new User({ username: "second", email: "second@transcript.com" });
    const secondUser = await User.register(user2, "2");

    // Generate scripts and translations.
    // This is still very hacky. Please replace with a better generation method later.
    const sample = require('./sampleScripts');
    
    const script1 = new Script({
        title: "Sample Script 1",
        body: sample[0].lines,
        language: sample[0].language,
        description: "First sample script",
        author: firstUser._id
    })
    const translation1 = new Translation({
        body: sample[1].lines,
        language: sample[1].language,
        script: script1._id,
        author: secondUser._id
    })
    script1.translations.push(translation1);
    user1.scripts.push(script1);
    user2.translations.push(translation1);

    const script2 = new Script({
        title: "Sample Script 2",
        body: sample[3].lines,
        language: sample[3].language,
        description: "Second sample script",
        author: secondUser._id
    })
    const translation2 = new Translation({
        body: sample[2].lines,
        language: sample[2].language,
        script: script2._id,
        author: firstUser._id
    })
    script2.translations.push(translation2);
    user1.translations.push(translation2);
    user2.scripts.push(script2);

    await script1.save();
    await script2.save();
    await translation1.save();
    await translation2.save();
    await user1.save();
    await user2.save();
}

reseedDB().then(() => {
    console.log("DB reseeded");
    mongoose.connection.close();
})