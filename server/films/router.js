const express = require('express')
const router = express.Router()
const {upload} = require('./multer')
const {createFilm , editFilm , deleteFilm , saveFilm , deleteFromToWatch} = require('./controller')
const {isAuthUser , isAdmin} = require('../auth/middlewares')

router.post('/api/films/new' , isAdmin , upload.single('image') , createFilm)
router.post('/api/films/edit' , isAdmin , upload.single('image') , editFilm)
router.delete('/api/films/:id' , isAdmin , deleteFilm)
router.post('/api/films/save' , isAuthUser , saveFilm)
router.delete('/api/films/save/:id' , isAuthUser , deleteFromToWatch)
module.exports = router