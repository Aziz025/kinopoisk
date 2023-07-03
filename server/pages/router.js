const express = require('express')
const router = express.Router()
const Genres = require('../Genres/genres')

router.get('/' , async(req, res) => {
    const allGenres = await Genres.find()
    res.render("index" , {genres: allGenres , user: req.user ? req.user : {}})
})

router.get('/login' , (req, res) => {
    res.render("login" , {user: req.user ? req.user : {}})
})

router.get('/register' , (req, res) => {
    res.render("register" , {user: req.user ? req.user : {}})
})

router.get('/profile/:id' , (req, res) => {
    res.render("profile" , {user: req.user ? req.user : {}})
})

router.get('/admin' , (req, res) => {
    res.render("adminProfile" , {user: req.user ? req.user : {}})
})

router.get('/new' , (req, res) => {
    res.render("newFilm" , {user: req.user ? req.user : {}})
})

router.get('/edit' , (req, res) => {
    res.render("editFilm" , {user: req.user ? req.user : {}})
})

module.exports = router