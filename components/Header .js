import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/userSlice";
import { useRouter } from "next/router";
import styles from "../styles/Header.module.css";
export default function Header() {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles["header-container"]}>
        <img
          src="https://images-ext-1.discordapp.net/external/lvpC8LesHk631Pgw3YUzAiv8XIaFSTJ8JiCQtFaMIZs/https/images.scalebranding.com/b-letter-logo-3c2ca963-e356-4ae2-b326-22be43363d98.jpg?format=webp&width=620&height=620"
          alt="logo"
          className={styles.logo1}
        />
        <div className={styles.logo} onClick={() => router.push("/dashboard")}>
          Blog<span>ify</span>
        </div>

        {/* Navigation Links */}
        <nav className={styles.nav}>
          <a onClick={() => router.push("/articles")}>All Articles</a>
          {userInfo && (
            <a onClick={() => router.push("/new-article")}>New Article</a>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className={styles.auth}>
          {userInfo ? (
            <button onClick={handleLogout} className={styles["auth-btn"]}>
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => router.push("/login")}
                className={styles["auth-btn login-btn"]}
              >
                Login
              </button>
              <button
                onClick={() => router.push("/signup")}
                className={styles["auth-btn signup-btn"]}
              >
                Signup
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
