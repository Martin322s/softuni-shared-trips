const Trip =require('../models/Trip');

exports.createTrip = async (data) => await Trip.create(data);
exports.getAll = async () => await Trip.find().lean();
exports.getOne = async (tripId) => await Trip.findById({ _id: tripId }).populate('owner');
exports.deleteTrip = async (tripId) => await Trip.findByIdAndDelete({ _id: tripId });