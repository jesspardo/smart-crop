const getErrorMessage = (message, http_code, code) => ({ message, http_code, code });

class CommandErrors {
  static returnError(errorCode) {
    const error = errorCode.message ? errorCode.message : errorCode;
    switch (error) {
      case 'SC001':
        return getErrorMessage('Command not found', 404, error);
      default:
        return getErrorMessage(error || 'Unexpected error', 400, 'SC000');
    }
  }
}

module.exports = CommandErrors;
