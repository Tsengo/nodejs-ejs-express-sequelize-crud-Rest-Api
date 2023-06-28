// import multer from package.json and save it in variable named multer
const multer = require('multer');
const path = require('path');
// create storage variable and declare diskStorage
const storage = multer.diskStorage({
    // choose location of file to store
    destination: (req, file, cb) => { 
        cb(null, 'resources/upload')
    },
    // generate filename of file to store
    filename: (req, file, cb) => { 
        cb(null, Date.now() + path.extname(file.originalname))
    },
})
// upload function of image file to server
const uploadFile = multer({
    // choose storage name from storage to import into server
    storage: storage,
    // make a limit of size of image file
    limits: { fileSize: '100000' },
    // filter images by type
    fileFilter: (req, file, cb) => {
        // types of images
        const fileTypes = /jpeg|jpg|png|PNG|JPG|JPEG|Png|Jpg|Jpeg/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }
    }
}).single('image')

module.exports = {
    uploadFile
}