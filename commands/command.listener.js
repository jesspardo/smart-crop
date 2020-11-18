const { log } = require('../utilities/logger');
const CommandValidator = require('../services/validation/command.validator');
const SmartCrop = require('./smart_crop');

class CommandListener {
  async onCommandListener(requestedJob) {
    const job = { ...requestedJob };

    log(`Received command: '${job.data.command}'`);

    try {
      await new CommandValidator().validate(job.data);
      switch (job.data.command) {
        case 'cropImage':
          const result = await new SmartCrop().cropImage(job.data.data);
          return result;

        default:
          throw new Error('SC001');
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CommandListener;