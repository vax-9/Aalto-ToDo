import React from "react";
import styles from "./Navbar.module.scss";
import navbarLogo from "../../assets/images/navbar-logo.png";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.imageContainer}>
        <img src={navbarLogo} alt="logo" title="logo" className={styles.navImage} />
      </div>
    </nav>
  );
};

export default Navbar;
