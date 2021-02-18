var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')
var keys = require('../keys.js')

aws.config = new aws.Config();
aws.config.accessKeyId = keys.a;
aws.config.secretAccessKey = keys.s;

aws.config.update({
  region: keys.r,
});

const s3 = new aws.S3();

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'tarotdecks',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: 'test' });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload;