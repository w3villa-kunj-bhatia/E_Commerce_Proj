import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react"; 
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
      <Navbar />
      <main className={styles.main}>
        {/* Wrap Routes with Suspense, providing a fallback UI */}
        <Suspense fallback={<div>Loading page...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
