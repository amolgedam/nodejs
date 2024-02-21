const bcrypt = require('bcrypt');
const passport = require('passport');

const User = require('../../models/user.js');

function authController(){

    const _getRedirectUrl = async(req)=>{
        const userInfo = await User.findOne({'_id': req.session.passport.user});
        if(userInfo.role=='admin'){
            return '/admin/orders';
        }
        return '/customer/orders';
    }

    return{
        login(req, res){
            res.render("auth/login");
        },
        async postLogin(req, res, next){

            /* Passport Custom Message */
            const {email, password} = req.body;
            if(!email || !password){
                req.flash('error', 'All fields are required!');
                return res.redirect('/register');
            }


            passport.authenticate('local', (err, user, info)=>{
                if(err){
                    req.flash('error', info.message);
                    return next(err);
                }

                if(!user){
                    req.flash('error', info.message);
                    return res.redirect('/login');
                }

                req.logIn(user, (err)=>{
                    if(err){
                        req.flash('error', info.message);
                        return next(err);
                    }

                    _getRedirectUrl(req).then(url=>{
                        return res.redirect(url);
                    });
                });
            })(req, res, next);
        },
        register(req, res){
            res.render("auth/register");
        },
        async postRegister(req, res){
            const { name, email, password } = req.body;

            /* Validate Fields */
            if(!name || !email || !password){
                req.flash('error', 'All Fields are required!');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/register');
            }

            /* Check if email exist */
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                req.flash('error', 'Email already taken!');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/register');
            }
            
            /* Hash */
            const hashedPassword = await bcrypt.hash(password, 10);

            /* Create New user */
            const user = new User({
                name,
                email,
                password: hashedPassword
            });

            user.save().then(()=>{
                return res.redirect('/');
            }).catch(err=>{
                req.flash('error', 'Something went wrong!');
                return res.redirect('/register');
            });
        },
        logout(req, res, next){
            req.logout(function(err) {
                if (err) { return next(err); }
                res.redirect('/login');
            });
        }
    }
}

module.exports = authController;