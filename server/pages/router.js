const express = require('express')
const router = express.Router()
const Genres = require('../Genres/genres')
const Country = require('../Country/Country')
const User = require('../auth/User')
const Film = require('../films/film')

router.get('/' , async(req, res) => {
    const allGenres = await Genres.find()
    const films = await Film.find().populate('country').populate('genre')
    const user = req.user ? await User.findById(req.user._id) : {}
    res.render("index" , {genres: allGenres , user , films})
})

router.get('/login' , (req, res) => {
    res.render("login" , {user: req.user ? req.user : {}})
})

router.get('/register' , (req, res) => {
    res.render("register" , {user: req.user ? req.user : {}})
})

router.get('/profile/:id' , async(req, res) => {
    const allGenres = await Genres.find()
    const user = await User.findById(req.params.id).populate('toWatch')
    .populate({path: 'toWatch' , populate: {path: 'country'}})
    .populate({path: 'toWatch' , populate: {path: 'genre'}})
    if(user){
        res.render("profile" , {user: user , genres: allGenres , loginUser: req.user})
    }else{
        res.redirect('notFound')
    }
})

router.get('/admin/:id' , async(req, res) => {
    const allGenres = await Genres.find()
    const user = await User.findById(req.params.id)
    const films = await Film.find().populate('country').populate('genre').populate('author')
    res.render("adminProfile" , {genres: allGenres , loginUser: req.user ? req.user : {}, user: user , films: films})
})

router.get('/new' , async(req, res) => {
    const allGenres = await Genres.find()
    const allCountries = await Country.find()
    res.render("newFilm" , {genres: allGenres , countries: allCountries , user: req.user ? req.user : {}})
})

router.get('/edit/:id' , async(req, res) => {
    const allGenres = await Genres.find()
    const allCountries = await Country.find()
    const film = await Film.findById(req.params.id)
    res.render("editFilm" , {genres: allGenres , countries: allCountries , user: req.user ? req.user : {} , film})
})

router.get('/not-found' , (req , res) => {
    res.render('notFound')
})

module.exports = router