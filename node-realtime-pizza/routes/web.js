
const guestMiddleware = require('../app/http/middlewares/guest.js');
const authMiddleware = require('../app/http/middlewares/auth.js');
const adminMiddleware = require('../app/http/middlewares/admin.js');

const homeController = require('../app/http/controllers/homeController.js');
const authController = require('../app/http/controllers/authController.js');
const cartController = require('../app/http/controllers/customers/cartController.js');
const orderController = require('../app/http/controllers/customers/orderController.js');

/* Admin Controllers */
const adminOrderController = require('../app/http/controllers/admin/orderController.js');
const adminStatusController = require('../app/http/controllers/admin/statusController.js');

function initRoutes(app){

    app.get('/', homeController().index);
        
    app.get('/login', guestMiddleware, authController().login);
    app.post('/login', authController().postLogin);

    app.get('/register', guestMiddleware, authController().register);
    app.post('/register', authController().postRegister);

    app.post('/logout', authController().logout);

    app.get('/cart', cartController().index);
    app.post('/update-cart', cartController().update);

    /* Customer Routes */
    app.post('/orders', authMiddleware, orderController().store);
    app.get('/customer/orders', authMiddleware, orderController().index);
    app.get('/customer/orders/:id', authMiddleware, orderController().show);




    /* Admin Routes */
    app.get('/admin/orders', adminMiddleware, adminOrderController().index);
    app.post('/admin/order/status', adminMiddleware, adminStatusController().update);
    

}


module.exports = initRoutes;


