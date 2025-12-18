# React Routing + Context + Redux Project

A robust React application demonstrating modern state management patterns, secure API integration via environment variables, and comprehensive testing.

---

## Features

* **Dynamic Routing**: Managed via `react-router-dom`.
* `/`: Home page with login-dependent redirects.
* `/dashboard`: Private user area (protected route).
* `/products`: Global product listing.
* `/products/:id`: Dynamic product details with refetch logic.


* **Authentication State**: Managed via Redux; simulates user sessions and protected route access.
* **Theme Management**: System-wide Light/Dark mode using React Context API.
* **Global State**:
* **Counter**: Centralized numeric state across components.
* **Products**: Managed via Redux Toolkit with async thunks for API interaction.


* **Environment Configuration**: API endpoints managed via Vite environment variables for better security and flexibility.

---

## Tech Stack

* **Framework**: [React 19](https://react.dev/)
* **Build Tool**: [Vite 7](https://vite.dev/)
* **Routing**: React Router DOM 7
* **State Management**: Redux Toolkit & Context API
* **Testing**: Jest & React Testing Library

---

## Installation & Setup

1. **Clone the repository and install dependencies**:
```bash
npm install

```


2. **Configure Environment Variables**:
Create a `.env` file in the root directory and add the API base URL:
```env
VITE_API_BASE_URL=https://fakestoreapi.com/products

```


3. **Run the application**:
```bash
npm run dev

```


The app runs by default on `http://localhost:5173`.

---

## Scripts

| Command | Action |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Compiles the application for production |
| `npm run test` | Executes the Jest test suite |
| `npm run lint` | Runs ESLint to check for code quality issues |

---

## Project Structure

```text
src
├─ components
│  ├─ Navbar.jsx            # Theme/Login toggles & Global Counter
│  ├─ CounterControls.jsx   # Redux Counter interactions
│  ├─ ProductList.jsx       # Fetched data display
│  └─ ProtectedRoute.jsx    # Authentication guard for routes
├─ context
│  └─ ThemeContext.jsx      # Theme provider logic
├─ pages
│  ├─ Home.jsx              # Landing page with conditional logic
│  ├─ Dashboard.jsx         # Protected user view
│  ├─ Products.jsx          # Product catalog page
│  └─ ProductDetails.jsx    # Single product view with ID params
├─ redux
│  ├─ store.js              # Combined Reducers
│  ├─ counterSlice.js       # Basic counter logic
│  ├─ productsSlice.js      # Async API logic & error handling
│  └─ authSlice.js          # User login/logout state
└─ App.jsx                  # Route definitions & Providers

```

---

## API & Data Handling

The application fetches data from the **Fake Store API**. To ensure stability, the `productsSlice` includes:

* **Environment Variable Integration**: Uses `import.meta.env.VITE_API_BASE_URL` to prevent hardcoded endpoints.
* **Error Boundaries**: Handles "Unexpected end of JSON input" by validating response status and body content before parsing.
* **Request Cancellation**: Uses `AbortController` (via Redux Toolkit's `signal`) to cancel pending fetches if a component unmounts.

---

## Testing

The project includes unit and integration tests using Jest and React Testing Library.

* **Component Tests**: Validates rendering and user interactions in `ProductList`, `CounterControls`, and `LoginPage`.
* **Logic Tests**: Ensures Redux state updates correctly upon fulfilled or rejected API actions.

To run tests:

```bash
npm test

```