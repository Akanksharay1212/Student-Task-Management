# 📚 Student Task Manager

## 1. Project Title & Goal

This project is a web-based Student Task Manager that allows users to add, edit, and delete homework tasks using a Node.js and Express backend.

---

## 2. Setup Instructions

Run the following commands to start the project:

```bash
npm install
npm install uuid
node server.js
```

Open the application in your browser:

```
http://localhost:3000
```

---

## 3. The Logic (How I Thought)

### Why did I choose this approach?

* I used **Node.js with Express** because it is simple and efficient for building REST APIs.
* Tasks are stored in a **JSON file**, so no database setup is required.
* Each task uses a **unique ID (UUID)** instead of array index, making edit and delete operations reliable.
* The frontend is built with **HTML, CSS, and Vanilla JavaScript** for clarity and ease of understanding.

### Hardest bug & how I fixed it

* **Problem:** Edit and delete stopped working correctly after deleting tasks because array indexes changed.
* **Solution:** I replaced array indexes with **UUID-based unique IDs**, ensuring each task is always correctly identified.

---



## 4. Future Improvements

If I had 2 more days, I would:

* Add task completion status (Done / Pending)
* Implement user authentication (Login / Signup)
* Integrate a database like MongoDB
* Improve UI responsiveness and animations
