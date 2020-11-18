const smartcrop = require('smartcrop-sharp');
const CloudStorageClient = require('../../services/cloud_storage');
const Benchmark = require('../../utilities/benchmark');
const { faceDetect, getBufferResizedImg } = require('./smart.crop.helper');
const SmartCropValidator = require('./smart.crop.validator');
const { log } = require('../../utilities/logger');

class SmartCrop {
  constructor() {
    this.options = {
      width: 500,
      height: 500,
      ruleOfThirds: true,
      minScale: 1,
      boost: []
    };
  }

  async cropImage(request) {
    try {
      await new SmartCropValidator().validate(request);
      const { location } = request;
      const benchmark = new Benchmark();
      const benchmarkFull = new Benchmark();
      benchmarkFull.start();
      benchmark.start();
      log('**** getKeyBuffer ****');
      const { Body } = await new CloudStorageClient().getKeyBuffer(location);
      benchmark.stop();

      benchmark.start();
      log('**** getFaces ****');
      const res = await faceDetect(Body);
      this.options.boost = [...res];
      benchmark.stop();

      benchmark.start();
      log('**** Get Image position ****');
      const { topCrop: crop } = await smartcrop.crop(Body, this.options);
      benchmark.stop();

      benchmark.start();
      log('**** Get new Thumbnail image buffer ****');
      const newThumbnailBuffer = await getBufferResizedImg(crop, Body, this.options);
      benchmark.stop();

      benchmark.start();
      log('**** Overwrite new Thumbnail ****');
      await new CloudStorageClient().uploadFile(location, newThumbnailBuffer);
      log('**** Image updated ****');
      benchmark.stop();
      benchmarkFull.stop('⏰ ⏰ ⏰ Total exectution time');
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SmartCrop;