const bcrypt = require('bcrypt');

const User = require('../../models/user.js');

function authController(){
    return{
        login(req, res){
            res.render("auth/login");
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
        }
    }
}

module.exports = authController;