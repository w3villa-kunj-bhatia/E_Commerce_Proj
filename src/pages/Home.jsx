import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Home() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn) {
    // Required behavior: if logged in and visiting "/", redirect to "/dashboard"
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div>
      <h1>Home</h1>
      <p>
        This is the public Home page. Click "Login" in the navbar to simulate
        logging in, then try visiting Home again to see the redirect to the
        Dashboard.
      </p>
      <h3>
        You cannot access the Dashboard or Products page unless you are logged
        in.
      </h3>
    </div>
  );
}

export default Home;
