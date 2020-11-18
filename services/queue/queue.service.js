const Queue = require('bee-queue');
const { log } = require('../../utilities/logger');

const createQueue = queueName => new Queue(queueName, {
  redis: {
    url: process.env.REDIS_URL,
  },
  isWorker: true,
  removeOnSuccess: process.env.QUEUE_RMSUCCEED === 'true',
  removeOnFailure: process.env.QUEUE_RMFAILED === 'true',
  activateDelayedJobs: true,
});

class QueueService {
  constructor(queueName = process.env.SELF_QUEUE_NAME) {
    this.createJob = this.createJob.bind(this);
    this.queue = createQueue(queueName);
    this.initListeners();
  }

  registerQueueListener(callback) {
    if (!callback) {
      throw new Error('Queue listener is empty.');
    }
    this.queue.process(process.env.MAX_WORKERS || 1, (job, done) => callback(job, done));
  }

  createJob(data) {
    const job = this.queue.createJob(data);
    job.save();
    return job;
  }

  async closeQueue(timeout) {
    await this.queue.close(timeout || 300);
  }

  initListeners() {
    if (process.env.LOG_VERBOSE === 'true') {
      this.queue.on('error', (err) => {
        log(`A queue error occurred: ${err.message}`);
      });
      this.queue.on('succeeded', (job) => {
        log(`Job ${job.id} succeeded`);
      });
      this.queue.on('failed', (job, err) => {
        log(`Job ${job.id} failed with error ${err.message}`);
      });
    }
  }
}

module.exports = QueueService;
