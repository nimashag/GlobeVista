# 🌍 GlobeVista - Country Explorer App

This is a full-stack web application built with React (frontend) and Node.js/Express (backend), using the [REST Countries API](https://restcountries.com) to display country information. Users can search, filter, view country details, register/login, and favorite countries.

---

## 🚀 Features

- 🌐 Browse and search countries by name
- 🗺️ Filter countries by region
- 📋 View detailed info: flag, capital, population, region, and languages
- ❤️ Favorite countries (requires login)
- 🔐 User authentication: register and login
- ⚡ Live updates without page reload using React state management

---

## 📦 Technologies Used

### Frontend
- React
- React Router
- Axios
- Tailwind CSS
- SweetAlert2
- JWT Decode

### Backend
- Node.js
- Express.js
- MongoDB 
- JSON Web Tokens (JWT)

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/nimashag/GlobeVista.git
cd af-2-nimashag 
```

### 2. Setup Backend

```bash
cd backend
npm install
```

- Add your environment variables (e.g., .env file)

```bash
npm start
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔍 Usage Instructions

- Open the app in your browser (e.g., http://localhost:5173)

- Use the search bar to find countries by name

- Use the filter dropdown to filter countries by region

- Click a country card to see detailed information

- Register/login to favorite countries (❤️)

- Favorited countries are saved and can be toggled


---

## 🌍 REST Countries API Endpoints Used

- ```GET /all``` - List all countries

- ```GET /name/{name}``` - Search by country name

- ```GET /region/{region}``` - Filter by region

- ```GET /alpha/{code}``` - Get full country details

---

## ☁️ Hosting Setup (Vercel)

The project is hosted on Vercel and can be accessed at:

👉 Live Site: https://globe-vista-frontend.vercel.app/

---

## 🧪 Running Tests

Frontend tests are written with Jest and React Testing Library.

```bash
cd frontend
npm test
```