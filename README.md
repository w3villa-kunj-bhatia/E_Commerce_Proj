# React Routing + Context + Redux Project

A simple React application demonstrating routing, dynamic route parameters, theme management via Context API, global state handling with Redux Toolkit, and API data fetching using Redux Thunk.

---

## Features

* Page routing using `react-router-dom`

  * `/` (Home)
  * `/dashboard`
  * `/products`
  * `/products/:id` (dynamic product page)
* Redirect from Home to Dashboard if the user is logged in
* Light/Dark theme using `useContext`
* Global counter using Redux Toolkit
* API data fetching and caching using Redux Thunk
* Minimal UI with navbar and product listing

---

## Tech Stack

* React
* Vite
* React Router DOM
* Redux Toolkit
* Redux Thunk
* Context API

---

## Installation

```bash
npm install
npm run dev
```

App runs by default on:

```
http://localhost:5173
```

---

## Scripts

| Command           | Action                   |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |

---

## Project Structure

```
src
├─ components
│  ├─ Navbar.jsx
│  ├─ CounterControls.jsx
│  └─ ProductList.jsx
├─ context
│  └─ ThemeContext.jsx
├─ pages
│  ├─ Home.jsx
│  ├─ Dashboard.jsx
│  ├─ Products.jsx
│  └─ ProductDetails.jsx
├─ redux
│  ├─ store.js
│  ├─ counterSlice.js
│  ├─ productsSlice.js
│  └─ authSlice.js
├─ App.jsx
├─ main.jsx
└─ index.css
```

---

## API Used

Products are fetched from:

```
https://fakestoreapi.com/products
```

Data is stored in Redux using an asynchronous thunk.

---

## Notes

* Login is simulated (no real authentication)
* Theme toggle and Login toggle are in the navbar
* Counter state is global and displayed in Navbar + Dashboard
* Product details page works even after page refresh due to refetch logic