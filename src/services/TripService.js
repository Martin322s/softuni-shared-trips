const Trip =require('../models/Trip');

exports.createTrip = async (data) => await Trip.create(data);