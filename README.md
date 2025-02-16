# Emoji Voting App 🎉

A fun web application where users can vote on daily jokes using emojis! Think of it as "Daily News" but with emoji reactions. Built with React 18, Node.js, Express, and MongoDB.

## 🎯 Project Overview

This project consists of two main parts:

1. **Frontend (React)**

   - Users interact with jokes and vote using emoji reactions.
   - Modern UI with Mantine for styling.
   - Mobile responsive design.
   - State management using React Context and React Query.

2. **Backend (Node.js + Express)**

   - Handles joke data and voting logic.
   - RESTful API with endpoints for joke management.
   - MongoDB as the database for storing jokes and votes.

## 🚀 Features

- Display random jokes with a "Next Joke" button.
- Emoji voting system with real-time vote count updates.
- Each joke maintains its own vote history.
- Clean, intuitive interface with Mantine.
- End-to-End testing with Cypress.

## 🛠️ Tech Stack

- **Frontend:** React 18, Mantine, React Query, React Context API
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **API:** TeeHee Joke API
- **Styling:** Mantine CSS
- **Testing:** Cypress (E2E tests)
- **Deployment:** Docker

## 🔧 Installation & Setup

1. **Clone the repository:**

   ```
   git clone https://github.com/your-username/emoji-voting-app.git
   cd emoji-voting-app
   ```

2. **Install dependencies:**

   ```
   cd client
   npm install
   cd ../server
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the `server` folder with the following:

   ```
   MONGO_URI=mongodb://localhost:27017/emojivotingapp
   PORT=5000
   ```

4. **Seed the database:**

   ```
   node seed.js
   ```

5. **Start the development servers:**
   Start the backend:

   ```
   cd server
   node index.js
   ```

   Start the frontend:

   ```
   cd ../client
   npm run dev
   ```

   The application will be available at http://localhost:5173

## 📦 Docker Setup

To run the application using Docker:

1. Build Docker images:

   ```
   docker-compose build

   ```

2. Start the containers:

```
docker-compose uп
```

The application will be available at http://localhost:5173

## 🔍 API Endpoints

### **GET /api/joke**

- Fetches a random joke from the database.

### **POST /api/joke/:id**

- Submits a vote for a joke.

### **DELETE /api/joke/:id**

- Deletes a specific joke.

### **PUT /api/joke/:id**

- Updates the content of a specific joke.

## ✅ Testing

End-to-End testing is implemented using Cypress. To run tests:

```
cd client
npx cypress open
```

## 📜 License

This project is licensed under the MIT License.

## ❤️ Acknowledgments

- [TeeHee Joke API](https://www.freepublicapis.com/teehee-joke-api)
- [Mantine](https://mantine.dev)
- [TanStack React Query](https://tanstack.com/query/latest)

Happy coding! 🚀
