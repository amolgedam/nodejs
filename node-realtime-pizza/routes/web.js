
const guestMiddleware = require('../app/http/middlewares/guest.js');

const homeController = require('../app/http/controllers/homeController.js');
const authController = require('../app/http/controllers/authController.js');
const cartController = require('../app/http/controllers/customers/cartController.js');

function initRoutes(app){

    app.get('/', homeController().index);
        
    app.get('/login', guestMiddleware, authController().login);
    app.post('/login', authController().postLogin);

    app.get('/register', guestMiddleware, authController().register);
    app.post('/register', authController().postRegister);

    app.post('/logout', authController().logout);

    app.get('/cart', cartController().index);
    app.post('/update-cart', cartController().update);

}


module.exports = initRoutes;


