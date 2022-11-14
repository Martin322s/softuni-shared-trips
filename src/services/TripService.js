const Trip = require('../models/Trip');
const User = require('../models/User');

exports.createTrip = async (data) => await Trip.create(data);
exports.getAll = async () => await Trip.find().lean();
exports.getOne = async (tripId) => await Trip.findById({ _id: tripId }).populate('owner');
exports.deleteTrip = async (tripId) => await Trip.findByIdAndDelete({ _id: tripId });
exports.editTrip = async (tripId, tripData) => await Trip.findByIdAndUpdate({ _id: tripId }, tripData);
exports.getAuthor = async (authorId) => await User.findById(authorId);
exports.addOffer = async (offer, authorId) => await User.findByIdAndUpdate({ _id: authorId }, { $push: { tripsHistory: offer } });
exports.myOffers = async (userId) => await Trip.find().where({ owner: userId });
exports.joinTrip = async (tripId, userId) => await Trip.findByIdAndUpdate({ _id: tripId }, { $push: { buddies: userId } });
exports.editSeats = async (tripId, seats) => await Trip.findByIdAndUpdate({ _id: tripId }, { seats: seats });
exports.getAllPassagers = async (tripId) => await Trip.findById({ _id : tripId }).populate({ path: 'buddies' });