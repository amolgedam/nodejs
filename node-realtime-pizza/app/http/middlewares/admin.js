
const User = require('../../models/user.js');

async function admin(req, res, next){
    if(req.isAuthenticated()){
        const userInfo = await User.findOne({'_id': req.session.passport.user});
        if(userInfo.role=='admin'){
            return next();
        }
    }
    return res.redirect('/');
}

module.exports = admin;
