const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    pickupitem: {
        type: String,
    }, 
    pickupaddress: {
        type: String,
    }, 
    name: {
        type: String,
    }, 
    phone: {
        type: String,
    },  
    email: {
        type: String,
    }, 
    pickupdate: {
        type: Date,
    }, 
    amountInNaira: {
        type: Number,
    }, 
    weightinkg: {
        type: Number,
    }, 
    pickupquantity: {
        type: Number,
    }, 
    deliveryaddress: {
        type: String,
    }, 
    deliveryname: {
        type: String,
    }, 
    deliveryphonenumber: {
        type: String,
    }, 
    deliveryemail: {
        type: String, 
    },
    status: { 
        type: String,
    },
    baddelivery: {
        type: String,
    },
    deliverydetails: { 
        type: String,
    },
    paymentMethod: {
        type: String,
    },
    isSecondButton: {
        type: String,
    },
    isThirdButton: {
        type: String,
    },
    rider: {
        type: String,
    }
},
{collection: "Order" }
); 

module.exports = mongoose.model('Order', orderSchema)