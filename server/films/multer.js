const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cd){
        cd(null, './public/images/films')
    },
    filename: function(req, file, cd){
        let ext = file.originalname.split(".")
        ext = ext[ext.length - 1]
        const unique = Date.now() + '.' + ext
        cd(null, unique)
    }
})

const upload = multer({storage})

module.exports = {upload}