import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slices/userSlice";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.css";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dispatch the login action
    const result = await dispatch(loginUser({ email, password }));

    if (result.payload) {
      // Redirect to dashboard (or articles) on successful login
      router.push("/articles");
    }
  };

  return (
    <div className={styles["auth-container"]}>
      <div className={styles["auth-box"]}>
        <h1>Login to Your Account</h1>
        <form onSubmit={handleSubmit} className={styles["auth-form"]}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
        <p>
          Don’t have an account? <a href="/signup">Sign up here</a>
        </p>
      </div>
    </div>
  );
}
