const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req,file,cb){
        const ext = file.mimetype.split('/')[1]
        cb(null, file.fieldname + '-' + Date.now() + '.' + ext) 
    }
});

const fileFilter = (req, file, cb)=>{
    const image  = file.mimetype.startsWith('image/');
    if( image ){
        cb(null,true);
    }
    else{
        cb({message:'filetype not supported'},false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter:fileFilter
}).single('file');

module.exports = upload;