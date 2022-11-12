const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    startPoint: {
        type: String,
        require: true
    },
    endPoint: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    carImage: {
        type: String,
        require: true
    },
    carBrand: {
        type: String,
        require: true
    },
    seats: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    owner: {
        type: mongooseTypes.ObjectId,
        ref: 'User'
    },
    buddies: [{
        type: mongooseTypes.ObjectId,
        ref: 'User'
    }]
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;