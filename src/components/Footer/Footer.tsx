import React from "react";
import styles from "./Footer.module.scss";
import { FOOTER_TEXT } from "../../utils/constants";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.textContainer}>
        <p className={styles.footerText}>{FOOTER_TEXT}</p>
      </div>
    </footer>
  );
};

export default Footer;
