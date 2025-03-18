This is the frontend for the Todo App, built using Next.js with TypeScript. It connects to the backend to perform CRUD (Create, Read, Update, Delete) operations for managing tasks.

🚀 Features
✅ Fetch tasks from the backend
✅ Add new tasks
✅ Mark tasks as completed or pending
✅ Delete tasks
✅ Styled using standard React CSS modules

📂 Project Setup
🔹 1. Clone the repository
git clone https://github.com/Rickytopz/Todo-Frontend.git
cd Todo-Frontend
🔹 2. Install dependencies
npm install
🔹 3. Start the development server
npm run dev
By default, the app will run on:
🔗 http://localhost:3000

🔗 Connecting to the Backend
The frontend communicates with the backend API hosted at:
http://localhost:5000

The API requests are managed in src/services/api.ts, where Axios is used to handle HTTP requests.

🔧 Project Structure
graphql
Todo-Frontend/
│── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Next.js pages (index.tsx, _app.tsx)
│   ├── services/      # API service for handling requests
│   ├── styles/        # CSS Modules for styling
│── package.json       # Project dependencies
│── next.config.js     # Next.js configuration
│── README.md          # Project documentation
🔍 How the Frontend Works
When the app loads, it fetches all tasks from the backend using GET /tasks.
Users can add a new task by entering a title and submitting the form (POST /tasks).
Users can toggle task completion (PUT /tasks/:id).
Users can delete a task (DELETE /tasks/:id).
All updates are reflected in real-time.
🛠️ Technologies Used
React (Next.js) – Framework for the frontend
TypeScript – Ensures type safety
Axios – Handles API requests
CSS Modules – For component styling