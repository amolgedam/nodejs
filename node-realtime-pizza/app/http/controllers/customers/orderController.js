const moment = require('moment');

const Order = require('../../../models/order.js');

function orderController(){
    return{
        async index(req, res){
            const customer_id = req.session.passport.user; 
            const orders = await Order.find({customerId: customer_id},
                                    null,
                                    { sort: { 'createdAt': -1 } }
                                );

            /* Cache controlller */
            res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

            res.render('customers/orders', {orders:orders, moment:moment});
        },
        store(req, res){
            const { phone, address } = req.body;

            /* Validate Request */
            if(!phone || !address){
                req.flash('error', 'All Fields are required!');
                return res.redirect('/cart');
            }

            const order = new Order({
                // customerId: req.user._id,
                customerId: req.session.passport.user,
                items: req.session.cart.items,
                phone,
                address,
            })

            order.save().then(result=>{

                delete req.session.cart;

                req.flash('success', 'Order placed successfully');
                return res.redirect('/customer/orders');

            }).catch(err=>{
                console.log(err);
                req.flash('error', 'Something went wrong!');
                return res.redirect('/cart');
            });
        }
    }
}

module.exports = orderController;