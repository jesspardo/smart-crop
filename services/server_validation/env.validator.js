const Joi = require('joi');
const BaseValidator = require('../validation/base.validator');

const developmentEnvSchema = Joi.object().keys({
  CLOUD_STORAGE_BASE_URL: Joi.required(),
  CLOUD_STORAGE_BUCKET: Joi.required(),
  CLOUD_STORAGE_REGION: Joi.required(),
  CLOUD_STORAGE_SECRET: Joi.required(),
  CLOUD_STORAGE_KEY: Joi.required(),
  CC_QUEUE_NAME: Joi.required(),
  // CC_URL: Joi.required(),
  // HMACSHA256_SECRET: Joi.required(),
  // JWT_NO_TIMESTAMP: Joi.required(),
  QUEUE_RMFAILED: Joi.required(),
  QUEUE_RMSUCCEED: Joi.required(),
  REDIS_URL: Joi.required(),
  SELF_QUEUE_NAME: Joi.required(),
});

class EnvValidator extends BaseValidator {
  validate(data) {
    return super.validate(data, developmentEnvSchema, { stripUnknown: true, abortEarly: false });
  }
}

module.exports = { EnvValidator };
