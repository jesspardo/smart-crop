const faceapi = require('face-api.js');
const gm = require('gm').subClass({ imageMagick: true });
const {
  canvas,
  faceDetectionNet,
  faceDetectionOptions,
} = require('./utils');

const getBufferResizedImg = (crop, originalBuffer, optionsResize, format = 'jpg') => {
  return new Promise((resolve, reject) => gm(originalBuffer)
    .crop(crop.width, crop.height, crop.x, crop.y)
    .resize(optionsResize.width, optionsResize.height)
    .setFormat(format)
    .toBuffer((err, buffer) => err ? reject(err) : resolve(buffer)));
};

const faceDetect = async (Buffer) => {
  await faceDetectionNet.loadFromDisk('commands/smart_crop/utils/weights');
  const img = await canvas.loadImage(Buffer);
  const detections = await faceapi.detectAllFaces(img, faceDetectionOptions);

  return detections.map(faceDetected => {
    const {
      box: {
        x,
        y,
        width,
        height,
      }
    } = faceDetected;

    return {
      x,
      y,
      width,
      height,
      weight: 1,
    };
  });
};

module.exports = { faceDetect, getBufferResizedImg };
