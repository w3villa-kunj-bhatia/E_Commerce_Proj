import { useTheme } from "../context/ThemeContext.jsx";
import { useSelector } from "react-redux";
import CounterControls from "../components/CounterControls.jsx";

function Dashboard() {
  const { theme } = useTheme();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div>
      <h1>Dashboard</h1>
      {isLoggedIn ? (
        <p>You are logged in. Theme is currently: {theme}</p>
      ) : (
        <p>You are not logged in. Toggle Login in the navbar.</p>
      )}

      <CounterControls />
    </div>
  );
}

export default Dashboard;
