const log = (message) => {
  if (process.env.LOG_VERBOSE === 'true') {
    console.log(JSON.stringify(message));
  }
};

module.exports = { log };
