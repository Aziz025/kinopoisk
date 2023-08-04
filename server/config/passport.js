const passport = require('passport')
const User = require('../auth/User')
const bcrypt = require('bcrypt')
const localStrategy = require('passport-local')
const GoogleStrategy = require('passport-google-oauth20').Strategy
// CLIENT_ID: 96184516550-8rh2jfic210jr43s07m8vrtcopu7fbiq.apps.googleusercontent.com
// CLIENT_SECRET: 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
passport.use(new localStrategy(
    {
        usernameField: 'email'
    },
    function(email, password, done){
        User.findOne({email}).then(user =>{
            if(user.password){
                bcrypt.compare(password, user.password, function(err, result) {
                    if(err) {return done(err)}
                    if(result) {return done(null , user)}
                });
            }else{
                return done('Пользователь не найден')
            }
        }).catch(e =>{
            return done(e)
        })
    }
))

passport.use(new GoogleStrategy({
    clientID: '96184516550-8rh2jfic210jr43s07m8vrtcopu7fbiq.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:1000/api/auth/google",
    scope: ['openid' , 'email' , 'profile']
  },
  async function(accessToken, refreshToken, profile, cb) {
    const user = await User.find({ googleId: profile.id })
    const newUser = await new User({
        googleId: profile.id,
        full_name: profile.displayName,
        email: profile.emails[0].value
    }).save()
    return cb(null, newUser);
  }
));

passport.serializeUser(function(user, done){
    done(null , user._id)
})

passport.deserializeUser(function(id , done){
    User.findById(id).then((user , err) => {
        done(err , user)
    })
})