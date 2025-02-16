require('dotenv').config();
const mongoose = require('mongoose');
const Joke = require('./models/Joke');

// Using Node 18+ global fetch (or install node-fetch if needed)
const API_URL = 'https://teehee.dev/api/joke';

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Optional: clear existing jokes
    await Joke.deleteMany({});
    console.log('Cleared existing jokes');

    // Number of jokes you want to seed
    const numJokes = 10;

    for (let i = 0; i < numJokes; i++) {
      try {
        const response = await fetch(API_URL);
        const contentType = response.headers.get('content-type');

        // Check if the response is JSON
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error(
            `Attempt ${i + 1}: Expected JSON but got HTML or other format. First 100 chars: ${text.substring(
              0,
              100
            )}`
          );
          continue; // Skip this iteration if not JSON
        }

        const jokeData = await response.json();

        // Map the API response fields to your Joke model.
        // Adjust these fields based on the actual API response.
        const question = jokeData.setup || jokeData.question || 'No question available';
        const answer = jokeData.punchline || jokeData.answer || 'No answer available';

        const newJoke = new Joke({
          question,
          answer,
          // Initialize votes with zeros for our emoji reactions
          votes: [
            { value: 0, label: '😂' },
            { value: 0, label: '👍' },
            { value: 0, label: '❤️' },
          ],
          // availableVotes will use the schema default
        });

        await newJoke.save();
        console.log(`Saved joke #${i + 1}`);
      } catch (error) {
        console.error(`Error fetching or saving joke #${i + 1}:`, error);
      }
    }

    console.log('Database seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
