import styles from "../Layout/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} NexusTix. Tüm hakları saklıdır.</p>
      <p>
        Geliştirici:{" "}
        <a
          href="https://github.com/Enesphlvn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Enes Pehlivan
        </a>
      </p>
    </footer>
  );
};

export default Footer;
