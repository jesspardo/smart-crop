require('dotenv').load();
const http = require('http');
const cluster = require('cluster');
const app = require('./app');
const QueueService = require('./services/queue/queue.service');
const { log } = require('./utilities/logger');
const CommandListener = require('./commands/command.listener');
const { EnvValidator } = require('./services/server_validation/env.validator');
const { missingEnvHandler } = require('./services/server_validation/server.utilities');

const port = process.env.PORT || 3002;
const numWorkers = process.env.workers || 1;

new EnvValidator().validate(process.env).catch(missingEnvHandler);

const setQueueClient = () => {
  const commandService = new QueueService(process.env.SELF_QUEUE_NAME);
  const commandListener = new CommandListener().onCommandListener;
  commandService.registerQueueListener(commandListener);
};

const createServer = serverPort => http.createServer(app).listen(serverPort);

const startServer = () => {
  createServer(port);
  setQueueClient();
};

if (cluster.isMaster) {
  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    log(`Worker Died (PID): ${worker.process.pid}`);
    cluster.fork();
  });

  cluster.on('listening', (worker) => {
    new EnvValidator().validate(process.env).catch(missingEnvHandler);
    log(`New Worker Started with PID: ${worker.process.pid}`);
  });
} else {
  startServer();
}

process.on('SIGINT', () => {
  process.exit(1);
});

module.exports = { createServer };
