const { log } = require('console')
const Film = require('./film')
const User = require('../auth/User')
const fs = require('fs')
const path = require('path')
const createFilm = async(req , res) => {
    if(req.file && req.body.titleRus.length > 2 &&
        req.body.titleEng.length > 2 &&
        req.body.year > 0 &&
        req.body.time > 10 &&
        req.body.country.length > 2 &&
        req.body.genre.length > 2)
        {
            await new Film({
                titleRus: req.body.titleRus,
                titleEng: req.body.titleEng,
                year: req.body.year,
                time: req.body.time,
                country: req.body.country,
                genre: req.body.genre,
                image: `/images/films/${req.file.filename}`,
                author: req.user._id
            }).save()
            res.redirect(`/admin/${req.user._id}`)
        }else{
            res.redirect('/new?error=1')
        }
}

const editFilm = async(req , res) => {
    if(req.file && req.body.titleRus.length > 2 &&
        req.body.titleEng.length > 2 &&
        req.body.year > 0 &&
        req.body.time > 10 &&
        req.body.country.length > 0 &&
        req.body.genre.length > 0
        ){
            const films = await Film.findById(req.body.id)
            fs.unlinkSync(path.join(__dirname + '../../../public' + films.image))
            await Film.findByIdAndUpdate(req.body.id, {
                titleRus: req.body.titleRus,
                titleEng: req.body.titleEng,
                year: req.body.year,
                time: req.body.time,
                country: req.body.country,
                genre: req.body.genre,
                image: `/images/films/${req.file.filename}`,
                author: req.user._id
            })
                res.redirect('/admin/' + req.user._id)
        }else{
            res.redirect(`/edit/${req.body.id}?error=1`)
        }
}

const deleteFilm = async(req , res) =>{
    const film = await Film.findById(req.params.id)
    if(film){
        fs.unlinkSync(path.join(__dirname + '../../../public' + film.image))
        await Film.deleteOne({_id: req.params.id})
        res.status(200).send('ok')
    }else{
        res.status(404).send('Not found')
    }
}

const saveFilm = async(req , res) => {
    if(req.user && req.body.id){
        const user = await User.findById(req.user.id)
        const findFilm = user.toWatch.filter(item => item._id == req.body.id)
        if(findFilm.length == 0){
            user.toWatch.push(req.body.id)
            user.save()
            res.send('Фильм успешно сохранен')
        }else{
            res.send('Фильм уже сохранен')
        }
    }
}
module.exports = {
    createFilm,
    editFilm,
    deleteFilm,
    saveFilm
}