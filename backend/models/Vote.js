const mongoose = require('mongoose');


const VoteSchema = new mongoose.Schema({
poll: { type: mongoose.Schema.Types.ObjectId, ref: 'Poll', required: true },
optionId: { type: mongoose.Schema.Types.ObjectId, required: true },
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
ip: { type: String },
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Vote', VoteSchema);