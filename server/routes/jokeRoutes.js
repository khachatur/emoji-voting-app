const express = require('express');
const router = express.Router();
const Joke = require('../models/Joke');

// GET /api/joke → Fetch a random joke
router.get('/', async (req, res) => {
  try {
    const count = await Joke.countDocuments();
    const random = Math.floor(Math.random() * count);
    const joke = await Joke.findOne().skip(random);
    if (!joke) return res.status(404).json({ error: 'No joke found' });
    res.json(joke);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/joke/:id → Submit a vote
router.post('/:id', async (req, res) => {
  const { emoji } = req.body;
  try {
    const joke = await Joke.findById(req.params.id);
    if (!joke) return res.status(404).json({ error: 'Joke not found' });
    
    // Find the vote object and increment its count
    const vote = joke.votes.find(v => v.label === emoji);
    if (vote) {
      vote.value += 1;
    } else if (joke.availableVotes.includes(emoji)) {
      // In case the vote hasn't been recorded yet
      joke.votes.push({ label: emoji, value: 1 });
    } else {
      return res.status(400).json({ error: 'Invalid emoji vote' });
    }
    
    await joke.save();
    res.json(joke);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/joke/:id → Delete the joke
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Joke.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Joke not found' });
    res.json({ message: 'Joke deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE /api/joke/:id → Update the content of a joke
router.put('/:id', async (req, res) => {
  const { question, answer } = req.body;
  try {
    const updated = await Joke.findByIdAndUpdate(
      req.params.id,
      { question, answer },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Joke not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
