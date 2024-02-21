const bcrypt = require('bcrypt');
const LocalStartegy = require('passport-local').Strategy;

const User = require('../models/user.js');

function init(passport){

    passport.use(new LocalStartegy({ usernameField: 'email' }, async(email, password, done)=>{
        /* Login logic */

        /* Check mail exist */
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return done(null, false, { message: 'Email not found!' });
        }

        bcrypt.compare(password, existingUser.password).then(match=>{
            if(match){
                return done(null, existingUser, { message: 'login successfully' });
            }

            return done(null, false, { message: 'Wrong username or password!' });

        }).catch(err=>{

            return done(null, false, { message: 'Something went wrong!' });
        });
    }));

    /* What we store after login */
    passport.serializeUser((user, done)=>{
        // console.log("passport => serializeUser => user =>", user);
        // console.log("passport => serializeUser => done => ", done);
        
        done(null, user._id);
    });

    passport.deserializeUser((id, done)=>{
        /* User.findById(id, (err, user)=>{
            done(err, user);
        }); */
        const user = User.findOne({'_id': id});
        if(!user){
            done(null, false, { message: 'User not found!' });   
        }

        done(null, user);
    });

}

module.exports = init;