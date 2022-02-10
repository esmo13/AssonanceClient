import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

import logo from "../../images/logo.svg";

const Navbar = ({ user, setUser }) => {
  console.log(user.role);
  const logout = () => {
    setUser([]);
    sessionStorage.removeItem("loggedUser");
  };
  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="logo" className={styles.logo} />
      </Link>
      <div className={styles.buttons}>
        {Object.keys(user).length > 0 && (
          <p className={styles.nav_btn}>{user.name}</p>
        )}

        {Object.keys(user).length === 0 && (
          <Link to="/login">
            <p className={styles.nav_btn}>login</p>
          </Link>
        )}

        {Object.keys(user).length > 0 && (
          <p onClick={() => logout()} className={styles.nav_btn}>
            logout
          </p>
        )}
        {user.role === 1 && (
          <Link to="/admin">
            <p className={styles.nav_btn}>admin</p>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
