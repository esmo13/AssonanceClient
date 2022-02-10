import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import styles from "./Login.module.scss";
import logo from "../../images/logo.svg";

const Login = ({ user, setUser }) => {
  const [userData, setUserData] = useState({
    name: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchData = await axios.post(
      "https://localhost:44338/api/user/login",
      userData
    );
    setUser(fetchData.data);
    sessionStorage.setItem("loggedUser", JSON.stringify(fetchData.data));
  };

  return (
    <main className={styles.main}>
      <div className={styles.form_container}>
        <form>
          <img src={logo} alt="logo" className={styles.logo} />
          <input
            placeholder="login"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
          <input
            placeholder="password"
            type="password"
            value={userData.pwd}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          <button onClick={handleSubmit}>Log in!</button>
          <p className={styles.register_msg}>
            Don't have an account yet?
            <br />
            <Link to="/register">Register now!</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
