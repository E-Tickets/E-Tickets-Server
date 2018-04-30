const multer = require('koa-multer');

const avatarPath = '/home/qyb225/Documents/Nginx/website/static/images/avatar';
const posterPath = '/home/qyb225/Documents/Nginx/website/static/images/poster';

const storageEngine = {
    avatarEngine: multer.diskStorage({
        destination: avatarPath,
        filename: (req, file, cb) => {
            const originalname = file.originalname;
    
            let pointIndex = originalname.lastIndexOf('.');
    
            let filename = originalname.substr(0, pointIndex);
            let format = originalname.substr(pointIndex + 1);
    
            cb(null, filename + '-' + Date.now().toString() + '.' + format);
        }
    }),

    posterEngine: multer.diskStorage({
        destination: posterPath,
        filename: (req, file, cb) => {
            const originalname = file.originalname;
    
            let pointIndex = originalname.lastIndexOf('.');
    
            let filename = originalname.substr(0, pointIndex);
            let format = originalname.substr(pointIndex + 1);
    
            cb(null, filename + '-' + Date.now().toString() + '.' + format);
        }
    }),
};

module.exports = storageEngine;