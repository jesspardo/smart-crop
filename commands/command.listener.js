const { log } = require('../utilities/logger');
const CommandValidator = require('../services/validation/command.validator');
const SmartCrop = require('./smart_crop');

class CommandListener {
  async onCommandListener(requestedJob) {
    const job = { ...requestedJob };

    log(`Received command: '${job.data.command}'`);

    // if (!job.data.userId) {
    //   job.data.userId = new AuthenticationService().getUserId(job.data.jwt);
    // } else if (job.data.data) {
    //   job.data.data.userId = job.data.userId;
    // }

    try {
      await new CommandValidator().validate(job.data);
      switch (job.data.command) {
        case 'cropImage':
          const result = await new SmartCrop().cropImage(job.data.data);
          return result;

        default:
          throw new Error('Command not found');
      }
    } catch (error) {
      throw error;
    }

    // return new CommandValidator().validate(job.data)
    //   .then(() => {
    //     switch (job.data.command) {
    //       case 'cropImage':
    //         return new SmartCrop().cropImage(job.data.data);
    //     };
    //   }).catch((error) => {
    //     throw error;
    //   });
  }
}

module.exports = CommandListener;