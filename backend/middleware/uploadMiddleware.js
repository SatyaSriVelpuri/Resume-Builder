import multer from 'multer';


const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, "uploads/"); // specify the destination directory
    },
    filename: (req, file, cb) => {
        cb(null,`${Date.now()}-${file.originalname} `) // specify the file name
    },
});
//file filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true)
    } else {
        cb(new Error('Only jpeg, jpg and png files are allowed'), false);
    }
}

const upload = multer({ storage, fileFilter})
export default upload;