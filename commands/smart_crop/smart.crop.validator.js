const Joi = require('joi');
const ValidationBase = require('../../services/validation/base.validator');

const smartCropSchema = Joi.object().keys({
  userId: Joi.string().guid(),
  location: Joi.string().required(),
});

class SmartCropValidator extends ValidationBase {
  validate(data) {
    return super.validate(data, smartCropSchema);
  }
}

module.exports = SmartCropValidator;
