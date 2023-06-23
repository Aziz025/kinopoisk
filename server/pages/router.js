const express = require('express')
const router = express.Router()
const Genres = require('../Genres/genres')

router.get('/' , async(req, res) => {
    const allGenres = await Genres.find()
    res.render("index" , {genres: allGenres})
})

router.get('/login' , (req, res) => {
    res.render("login")
})

router.get('/register' , (req, res) => {
    res.render("register")
})

router.get('/profile' , (req, res) => {
    res.render("profile")
})

router.get('/admin' , (req, res) => {
    res.render("adminProfile")
})

router.get('/new' , (req, res) => {
    res.render("newFilm")
})

router.get('/edit' , (req, res) => {
    res.render("editFilm")
})

module.exports = router