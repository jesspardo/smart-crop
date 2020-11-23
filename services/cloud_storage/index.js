const S3 = require('aws-sdk/clients/s3');
const AWS = require('aws-sdk');

class CloudStorageClient {

  constructor() {
    this.bucket = process.env.CLOUD_STORAGE_BUCKET;
    const endpoint = new AWS.Endpoint(process.env.CLOUD_STORAGE_BASE_URL);
    this.S3 = new S3({
      apiVersion: process.env.CLOUD_STORAGE_API_VERSION || '2006-03-01',
      secretAccessKey: process.env.CLOUD_STORAGE_SECRET,
      accessKeyId: process.env.CLOUD_STORAGE_KEY,
      region: process.env.CLOUD_STORAGE_REGION,
      endpoint,
    });
  }

  uploadFile(Key, Body, ContentType) {
    const params = {
      Bucket: this.bucket,
      Key: Key.replace('LARGESIZE', 'SMALLSIZE'),
      Body,
      ContentType,
    };
    return this.S3.upload(params).promise();
  }

  getKeyBuffer(Key) {
    const params = {
      Bucket: this.bucket,
      Key: Key.replace('SMALLSIZE', 'LARGESIZE'),
    };
    return this.S3.getObject(params).promise();
  }
}

module.exports = CloudStorageClient;