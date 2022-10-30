const Joi = require('joi');

module.exports.scriptSchema = Joi.object({
    script: Joi.object({
        title: Joi.string().required(),
        body: Joi.string().required(),
        language: Joi.string().valid('en', 'ja').required(),
        description: Joi.string()
    }).required()
})
