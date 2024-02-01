const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
    user_id: {type: String, required: true},
    token: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, expires: 300}
});

module.exports = mongoose.model('Token', TokenSchema);