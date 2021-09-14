const GridFsStorage = require('multer-gridfs-storage');
const crypto = require("crypto");
const path = require('path');

const storage = new GridFsStorage({
    url: "mongodb+srv://divyansh_pathak:passionworld@passionworld-mumbai.s5vkd.mongodb.net/passionworldDB?retryWrites=true&w=majority",
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        console.log({Grifsstorage: req.body});
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });

  module.exports = storage;