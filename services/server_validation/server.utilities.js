const { log } = require('../../utilities/logger');

const missingEnvHandler = (error) => {
  log('***ENV vars are missing***');
  error.details.forEach((detail) => {
    log(detail.message);
  });
  log('******');
  process.exit(1);
};

module.exports = { missingEnvHandler };
