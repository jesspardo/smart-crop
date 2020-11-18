const Joi = require('joi');

class BaseValidator {
  defaultOptions() {
    return {
      abortEarly: false,
      allowUnknown: true,
    };
  }

  validate(data, schema, schemaOptions = this.defaultOptions()) {
    return new Promise((resolve, reject) => {
      if (!schema) {
        return reject(new Error('Missing schema'));
      }

      if (!data) {
        return reject(new Error('Missing data'));
      }

      return Joi.validate(data, schema, schemaOptions, (err, value) => {
        if (err) {
          return reject(err);
        }
        return resolve(value);
      });
    }).catch(err => Promise.reject(err));
  }
}

module.exports = BaseValidator;
