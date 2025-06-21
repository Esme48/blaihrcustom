const mongoose = require('mongoose')

const ComponentSchema = new mongoose.Schema({
    item:{
        type: String,
        required: [true, 'Please Select a Bouquet'],
        enum: ['Ari', 'Bobbie', 'Iris', 'Jodi', 'Remy'],
        maxlength: 50
    },
    group:{
        type: String,
        required: [true, 'Where Would you Like This Donation To Go To?'],
        enum: ['Hospital Patients', 'Teachers', 'Survivors of Mental Health Trauma', 'Senior Center', 'Paramedics', 'Search and Rescue Team'],
        min: 0
    },
    donation:{
        type: String,
        required: [true, 'Please Select A Donation Tier'],
        enum: ['Single Bouquet (1) - $10', 'Small Bundle (3) - $25', 'Midsize Bundle (6) - $50', 'Large Spread (10) - $100'],
        maxlength: 100
    },
    quantity: {
        type: String,
        default: '',
        maxlength: 500,
    },
    date: {
        type: Date,
        required: [true, 'Date Of The Order Placed'],
        default: Date.now
    },
    status:{
        type: String,
        enum: ['Bouquet Order Is Pending', 'Order Has Been Placed And Is Being Arranged', 'Bouquet Delivered'],
        default: 'Bouquet Order Is Pending',
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref: 'User', 
        required: [true, 'Please Provide User'],
    },

},{timestamps:true})

module.exports = mongoose.model('Component', ComponentSchema)
