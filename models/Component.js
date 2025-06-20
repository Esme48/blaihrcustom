const mongoose = require('mongoose')

const ComponentSchema = new mongoose.Schema({
    item:{
        type: String,
        required: [true, 'Please Provide The Name Of Your Item'],
        maxlength: 50
    },
    color:{
        type: String,
        required: [true, 'Please Provide The Color Of Your Item'],
        maxlength: 100
    },
    price:{
        type: Number,
        required: [true, 'Please Provide The Price Of Your Item'],
        min: 0
    },
    quantity: {
        type: Number,
        required: [true, 'Please Provide The Quantity Of Your Item'],
        min: 1
    },
    date: {
        type: Date,
        required: [true, 'Please Provide The Date Of The Purchase'],
        default: Date.now
    },
    status:{
        type: String,
        enum: ['Item Pending Review', 'Item Shipped', 'Item Delivered'],
        default: 'Item Pending Review',
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref: 'User', 
        required: [true, 'Please Provide User'],
    },

},{timestamps:true})

module.exports = mongoose.model('Component', ComponentSchema)
