const isAdmin = (req , res , next) => {
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(400).send('Unauthorized')
    }
}

const isAuthUser = (req , res , next) => {
    if(req.user){
        next()
    }else{
        res.status(400).send('Unauthorized')
    }
}

module.exports = {
    isAdmin,
    isAuthUser
}