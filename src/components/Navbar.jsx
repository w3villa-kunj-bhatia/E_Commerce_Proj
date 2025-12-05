import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice.js";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const counterValue = useSelector((state) => state.counter.value);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (isLoggedIn) {
      dispatch(logout());
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <NavLink to="/" className="nav-logo">
          E Commerce Project
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link-active" : "nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link-active" : "nav-link"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "nav-link nav-link-active" : "nav-link"
          }
        >
          Products
        </NavLink>
      </div>

      <div className="nav-right">
        {/* Display username AND counter side-by-side when logged in */}
        {isLoggedIn ? (
          <>
            <span className="nav-counter">Logged in as: {username}</span>
            <span className="nav-counter">Counter: {counterValue}</span>
          </>
        ) : (
          <span className="nav-counter">Counter : {counterValue}</span>
        )}

        <button onClick={toggleTheme} className="nav-btn">
          Theme: {theme === "light" ? "Light" : "Dark"}
        </button>

        <button onClick={handleAuthClick} className="nav-btn nav-login-btn">
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;