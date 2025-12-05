import { useTheme } from "../context/ThemeContext.jsx";
import { useSelector } from "react-redux";
import CounterControls from "../components/CounterControls.jsx";

function Dashboard() {
  const { theme } = useTheme();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const username = useSelector((state) => state.auth.username);

  return (
    <div>
      <h1>Dashboard</h1>
      {isLoggedIn ? (
        <p>
          <span>{username}</span>, You are logged in! <br />
          <br />
          Theme is currently: {theme}
        </p>
      ) : (
        <p>You are not logged in. Toggle Login in the navbar.</p>
      )}

      <CounterControls />
    </div>
  );
}

export default Dashboard;
