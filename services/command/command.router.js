const express = require('express');

const router = express.Router();
const QueueService = require('../queue/queue.service');
// const CommandErrors = require('../../commands/command.errors');

const clientQueue = new QueueService();

const getHttpResponse = (results, res) => {
  const code = results && results.http_code ? results.http_code : 200;
  return res.status(code).json(results);
};

const handlePost = (req, res) => {
  const job = clientQueue.createJob(req.body);
  job.on('succeeded', (result) => {
    getHttpResponse(result, res);
  });
  job.on('failed', (error) => {
    const httpResponse = { msg: error.message};
    getHttpResponse(httpResponse, res);
  });
};

router.post('/command', handlePost);
module.exports = router;
