
const Order = require('../../../models/order.js');

function statusController(){
    return{
        update(req, res){
            Order.updateOne({_id: req.body.orderId}, {status: req.body.status}).then(data=>{

                if(data.modifiedCount > 0){
                    /* Emit event */
                    const eventEmitter = res.app.get('eventEmitter');
                    eventEmitter.emit('orderUpdated', {id:req.body.orderId, status:req.body.status});
                }

                return res.redirect('/admin/orders');
            }).catch(err=>{
                return res.redirect('/admin/orders');
            });

        }
    }
}

module.exports = statusController;