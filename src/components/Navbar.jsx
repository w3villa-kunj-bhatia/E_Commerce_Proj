import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice.js";
import styles from "./Navbar.module.css";
import { useCallback } from "react"; 

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const counterValue = useSelector((state) => state.counter.value);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleAuthClick = useCallback(() => { 
    if (isLoggedIn) {
      dispatch(logout());
    } else {
      navigate("/login");
    }
  }, [isLoggedIn, dispatch, navigate]); 

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <NavLink to="/" className={styles.navLogo}>
          E Commerce Project
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.navLinkActive}`
              : styles.navLink
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.navLinkActive}`
              : styles.navLink
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.navLinkActive}`
              : styles.navLink
          }
        >
          Products
        </NavLink>
      </div>

      <div className={styles.navRight}>
        {isLoggedIn ? (
          <>
            <span className={styles.navCounter}>Logged in as: {username}</span>
            <span className={styles.navCounter}>Counter: {counterValue}</span>
          </>
        ) : (
          <span className={styles.navCounter}>Counter : {counterValue}</span>
        )}

        <button onClick={toggleTheme} className={styles.navBtn}>
          Theme: {theme === "light" ? "Light" : "Dark"}
        </button>

        <button
          onClick={handleAuthClick}
          className={`${styles.navBtn} ${styles.navLoginBtn}`}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
