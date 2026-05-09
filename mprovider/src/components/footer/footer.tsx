import React from "react";
import styles from"./footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>© 2026 My React App | Dummy footer text</p>
    </footer>
  );
};

export default Footer;
