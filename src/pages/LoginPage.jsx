import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserDataAndLogin } from "../redux/authSlice.js";
import styles from "./LoginPage.module.css";
import appStyles from "../App.module.css"; 

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    age: "",
    email: "",
    industry: "Tech",
  });

  const industries = ["Tech", "Finance", "Healthcare", "Education", "Other"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful login and store username
    dispatch(setUserDataAndLogin({ username: formData.username }));
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={`${appStyles.card} ${styles.loginFormCard}`}>
        <h1 className={styles.loginForm}>Login/Registration</h1>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="age">Age</label>
            <input
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="industry">Industry</label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
            >
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className={`${appStyles.navBtn} ${appStyles.navLoginBtn} ${styles.formSubmitBtn}`}
          >
            Submit & Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
