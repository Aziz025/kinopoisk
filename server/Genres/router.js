const express = require('express')
const router = express.Router();
const {getAllGenres} = require('./controller')
const writeDataGenre = require('./seed')


router.get('/api/genre' , getAllGenres)

module.exports = router