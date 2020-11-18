const Joi = require('joi');

const ValidationBase = require('./base.validator');

const queueSchema = Joi.object().keys({
  data: Joi.object().required(),
  jwt: Joi.string().required(),
  command: Joi.string().required(),
});

const fileSchema = Joi.object().keys({
  data: Joi.object().required(),
  name: Joi.string().required(),
  mimetype: Joi.string().required(),
});

const commandSchema = Joi.object().keys({
  data: Joi.object().required(),
  command: Joi.string().required(),
  async: Joi.boolean(),
  files: Joi.array().items(fileSchema),
  userId: Joi.string().guid(),
});

class CommandValidator extends ValidationBase {
  validate(data) {
    return super.validate(data, commandSchema);
  }
}

module.exports = CommandValidator;
