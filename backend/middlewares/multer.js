import multer from 'multer';

// Creating multer middleware for parsing formdata
const storage = multer.diskStorage({
    filename: (req, file, callback) => {
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage})

export default upload;