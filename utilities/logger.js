const log = (message) => {
  if (process.env.LOG_VERBOSE === 'true') {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(message));
  }
};

module.exports = { log };
