# Todo App

**Todo App** is a feature-rich task management application designed to help users organize and track their daily tasks efficiently. Built with React.js, the app includes advanced features like task categorization, dynamic progress tracking with circular graphs, and seamless real-time updates.

---

## Features

### **1. Task Management**
- Add, edit, delete, and mark tasks as completed.
- Tasks are categorized by their deadlines and importance.
- Dynamic filtering for tasks created today.

### **2. Progress Visualization**
- Circular graph displays:
  - **Dark Green**: Today's completed tasks.
  - **Light Green**: Today's pending tasks.
- Auto-updates when tasks are modified.

### **3. Real-Time Updates**
- Changes to tasks are immediately reflected in the progress graph and task lists.
- Uses `localStorage` for persistent task storage.

### **4. Responsive Design**
- Fully responsive UI, optimized for mobile, tablet, and desktop devices.

---

## Tech Stack

- **Frontend**: React.js
- **State Management**: React Hooks (`useState`, `useEffect`)
- **Data Storage**: LocalStorage
- **Visualization**: `react-circular-progressbar`
- **Styling**: CSS and Bootstrap
- **Icons**: Font Awesome

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/todo-app.git
   cd todo-app
