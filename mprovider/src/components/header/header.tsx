
import React from "react";
import styles  from "./header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.menu}>
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Products</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
