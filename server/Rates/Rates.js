const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GenreSchema = new mongoose.Schema({
    rate: Number,
    text: String,
    filmId: {type: Schema.Types.ObjectId , ref: 'film'},
    author: {type: Schema.Types.ObjectId , ref: 'user'},
    date: Date.now()
})

module.exports = mongoose.model('genre' , GenreSchema)