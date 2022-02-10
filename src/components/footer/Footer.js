import React from "react";
import { Link } from "react-router-dom";

import styles from "./Footer.module.scss";
import logo from "../../images/logo.svg";

const Footer = () => {
  return (
    <footer>
      <div className={styles.footer_container}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <p className={styles.top_footer}>Szymon Skalski</p>
      </div>
    </footer>
  );
};

export default Footer;
