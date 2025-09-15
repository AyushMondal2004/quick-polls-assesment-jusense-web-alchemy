const mongoose = require('mongoose');


const OptionSchema = new mongoose.Schema({
text: { type: String, required: true },
votes: { type: Number, default: 0 }
});


const PollSchema = new mongoose.Schema({
title: { type: String, required: true },
options: [OptionSchema],
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Poll', PollSchema);