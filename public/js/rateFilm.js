const stars = document.querySelectorAll('.comment-stars>img')
function rateFilm(rate){
    for(let i = 0; i < stars.length; i++){
        stars[i].style.filter = 'grayscale(100%)'
    }
    for(let i = 0; i < rate; i++){
        stars[i].style.filter = 'grayscale(0%)'
    }
}