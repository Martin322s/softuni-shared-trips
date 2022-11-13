const Trip =require('../models/Trip');

exports.createTrip = async (data) => await Trip.create(data);
exports.getAll = async () => await Trip.find().lean();