import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Navbar from "./components/Navbar.jsx";
import styles from "./App.module.css";

const Home = lazy(() => import("./pages/Home.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Products = lazy(() => import("./pages/Products.jsx"));
const ProductDetails = lazy(() => import("./pages/ProductDetails.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));

function App() {
  return (
    <div className={styles.app}>
      <Helmet>
        <meta
          httpEquiv="Content-Security-Policy"
          content={`default-src 'self' ${
            import.meta.env.VITE_API_BASE_URL
          }; ...`}
        />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta name="referrer" content="no-referrer" />
        <title>E Commerce Project</title>
      </Helmet>

      <Navbar />
      <main className={styles.main}>
        <Suspense fallback={<div>Loading page...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/:id"
              element={
                <ProtectedRoute>
                  <ProductDetails />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
