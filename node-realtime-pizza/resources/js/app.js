import axios from "axios";
import Noty from 'noty';
import moment from "moment";

import { initAdmin } from './admin.js';

let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');

function updateCart(pizza){
    axios.post('/update-cart', pizza).then(res=>{
        cartCounter.innerText = res.data.totalQty;

        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'Item added to cart!',
            progressBar: false,
        }).show();
    }).catch(err=>{
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something went wrong!',
            progressBar: false,
        }).show();
    });
}

addToCart.forEach((btn)=>{
    btn.addEventListener('click', (e)=>{

        let pizza = JSON.parse(btn.dataset.pizza);
        updateCart(pizza);
    })
})

// Remove alert message after X seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}


let statuses = document.querySelectorAll('.status_line');
let hiddenInput = document.querySelector("#hiddenInput");
let order = hiddenInput ? hiddenInput.value : null;
order = JSON.parse(order);
let time = document.createElement('small');

/* Change Order status */
function updateStatus(order){
    let stepCompleted = true;

    /* Remove old status */
    statuses.forEach((status)=>{
        status.classList.remove('step-completed');
        status.classList.remove('current');
    });

    statuses.forEach((status)=>{
        let dataProp = status.dataset.status;
        if(stepCompleted){
            status.classList.add('step-completed');
        }

        if(dataProp == order.status){
            stepCompleted = false;

            time.innerText = moment(order.updatedAt).format("hh:mm A");
            status.appendChild(time);

            if(status.nextElementSibling){
                status.nextElementSibling.classList.add('current');
            }
        }
    });
}

updateStatus(order);


/* Socket Use here! */
let socket = io();
if(order){
    // Join key given
    socket.emit('join', `order_${order._id}`);
}


/* Socket for admin show orders without refresh page */
let adminAreaPath = window.location.pathname;
console.log(adminAreaPath);
if(adminAreaPath.includes('admin')){

    /* Call Admin.js */
    initAdmin(socket);

    socket.emit('join', 'adminOrderRoom')
}


/* Watch Event updated or Not from io.to server.js */
socket.on('orderUpdated', (data)=>{
    const updatedOrder = { ...order };
    updatedOrder.updatedAt = moment().format();
    updatedOrder.status = data.status;

    console.log('OrderUpdated', data);
    updateStatus(updatedOrder);

    new Noty({
        type: 'success',
        timeout: 1000,
        text: 'Order updated!',
        progressBar: false,
    }).show();
});
