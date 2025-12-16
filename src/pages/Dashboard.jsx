import { useTheme } from "../context/ThemeContext.jsx";
import { useSelector } from "react-redux";
import CounterControls from "../components/CounterControls.jsx";
import styles from "./Dashboard.module.css";
import AccessibleDropdown from "../components/AccessibleDropdown.jsx";

function Dashboard() {
  const { theme } = useTheme();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const username = useSelector((state) => state.auth.username);

  return (
    <div className={styles.dashboardContainer}>
      <h1>Dashboard</h1>
       <div className={styles.centerContent}>
        <AccessibleDropdown />
      </div>
      <div className={styles.welcomeMessage}>
        {isLoggedIn ? (
          <p>
            <span className={styles.usernameHighlight}>{username}</span>, You
            are logged in!
            <span className={styles.statusText}>
              Theme is currently: {theme}
            </span>
          </p>
        ) : (
          <p>You are not logged in. Toggle Login in the navbar.</p>
        )}
      </div>

      <CounterControls />
    </div>
  );
}

export default Dashboard;
