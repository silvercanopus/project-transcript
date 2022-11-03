const Joi = require('joi');

module.exports.scriptSchema = Joi.object({
    script: Joi.object({
        title: Joi.string().required(),
        body: Joi.string().required(),
        language: Joi.string().valid('en', 'ja').required(),
        description: Joi.string()
    }).required()
})

module.exports.translationSchema = Joi.object({
    translation: Joi.object({
        body: Joi.string().required(),
        language: Joi.string().valid('en', 'ja').required()
    }).required()
})

module.exports.commentSchema = Joi.object({
    comment: Joi.object({
        body: Joi.string().required()
    }).required()
})
