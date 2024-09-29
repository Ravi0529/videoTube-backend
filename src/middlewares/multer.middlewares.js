import multer from "multer"

// storing image throught multer in disk-storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function(req, file, cb) {
        // const uniquesuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) // for changing file name
        cb(null, file.originalname)
    }
})

export const upload = multer({
    storage
})