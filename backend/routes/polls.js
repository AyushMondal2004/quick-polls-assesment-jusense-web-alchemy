const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll');
const Vote = require('../models/Vote');
const auth = require('../middleware/auth');
const sanitize = require('../utils/sanitize');
const jwt = require('jsonwebtoken');

function getUserIdFromReq(req) {
try {
const authHeader = req.headers.authorization;
if (!authHeader) return null;
const token = authHeader.split(' ')[1];
if (!token) return null;
const decoded = jwt.verify(token, process.env.JWT_SECRET);
return decoded.id;
} catch (err) {
return null;
}
}

// List public polls
router.get('/', async (req, res) => {
try {
const polls = await Poll.find().sort({ createdAt: -1 }).lean();
res.json(polls);
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
});

// Get polls created by current user
router.get('/mine', auth, async (req, res) => {
try {
const polls = await Poll.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
res.json(polls);
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
});

// Get single poll
router.get('/:id', async (req, res) => {
try {
const poll = await Poll.findById(req.params.id);
if (!poll) return res.status(404).json({ msg: 'Poll not found' });
res.json(poll);
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
});

// Create poll (auth required)
router.post('/', auth, async (req, res) => {
try {
const { title, options } = req.body;
if (!title || !options || !Array.isArray(options) || options.length < 2)
return res.status(400).json({ msg: 'Provide title and at least two options' });


const cleanTitle = sanitize(title);
const cleanOptions = options.map((o) => sanitize(o)).filter(Boolean);


const poll = new Poll({
title: cleanTitle,
options: cleanOptions.map((text) => ({ text })),
createdBy: req.user.id
});


await poll.save();
res.json(poll);
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
});

// Vote on a poll (optional auth)
router.post('/:id/vote', async (req, res) => {
try {
const pollId = req.params.id;
const { optionId } = req.body;
if (!optionId) return res.status(400).json({ msg: 'optionId required' });


const poll = await Poll.findById(pollId);
if (!poll) return res.status(404).json({ msg: 'Poll not found' });


const option = poll.options.id(optionId);
if (!option) return res.status(404).json({ msg: 'Option not found' });


const userId = getUserIdFromReq(req);
const ip = req.ip;


// Prevent duplicate votes: by user (if logged) or by IP (if anonymous)
let existingVote;
if (userId) existingVote = await Vote.findOne({ poll: pollId, user: userId });
else existingVote = await Vote.findOne({ poll: pollId, ip });


if (existingVote) return res.status(400).json({ msg: 'You have already voted' });


option.votes = (option.votes || 0) + 1;
await poll.save();


const vote = new Vote({ poll: pollId, optionId, user: userId || null, ip });
await vote.save();


res.json({ poll });
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
});
module.exports = router;