import styles from "../styles/Footer.module.css";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-container"]}>
        <p>&copy; {new Date().getFullYear()} Blogify. All Rights Reserved.</p>
        <nav>
          <a href="/about">About</a> | <a href="/contact">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
