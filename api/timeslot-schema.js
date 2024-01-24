const mongoose = require('mongoose');

const timeslotSchema = mongoose.Schema({
    date: String,
    startTime: String
});

module.exports = mongoose.model('Timeslot', timeslotSchema);