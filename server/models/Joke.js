const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  value: { type: Number, default: 0 },
  label: { type: String, required: true },
});

const jokeSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  votes: [voteSchema],
  availableVotes: { type: [String], default: ['😂', '👍', '❤️'] },
}, { timestamps: true });

module.exports = mongoose.model('Joke', jokeSchema);
