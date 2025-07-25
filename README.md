# 🛒 Magazine React Redux

A simple and responsive online store built with **React**, **Redux Toolkit**, and **SCSS**.  
Includes product list, shopping cart, dynamic rendering via Redux, and mock backend via `json-server`.

---

## 📦 Features

- 🧺 Add/remove products to/from cart
- 🛍 View cart with total amount
- 📦 Product cards with details
- 🔄 Redux store with slices and actions
- 💅 SCSS styling and media queries for responsiveness
- 🖥 Responsive layout (desktop, tablet, mobile)
- 🧪 Local mock API using `db.json`

---

## 🚀 How to Run the Project

### 1. 📥 Clone the repository

```bash
git clone https://github.com/Ihora29/Magazine-React-Redux.git
cd Magazine-React-Redux
2. 📦 Install dependencies
bash
Копіювати
Редагувати
npm install
3. 🧪 Run the mock server (backend)
bash
Копіювати
Редагувати
npm run server
This uses json-server to serve data from db.json at http://localhost:3001

4. 🖥 Run the React app
bash
Копіювати
Редагувати
npm start
App will open in your browser at http://localhost:3000

📁 Project Structure
bash
Копіювати
Редагувати
📦 src/
├── Components/           # UI components (Card, Cart, etc.)
├── Routing/              # React Router config
├── styles/               # SCSS + media queries
├── images/               # Product images
├── App.js
├── index.js
└── redux/                # Redux Toolkit slices
🧠 Technologies Used
React

Redux Toolkit

SCSS Modules

React Router

JSON Server

JavaScript (ES6)

📱 Responsive Design
The UI supports the following breakpoints:

📱 320px (mobile)

📱 768px (tablet)

🖥 1024px+ (desktop)

Implemented using CSS media queries.

