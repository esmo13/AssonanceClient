import React, { useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import styles from "./Register.module.scss";
import logo from "../../images/logo.svg";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    password: "",
    email: "",
    role: 0,
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://localhost:44338/api/user", userData);
    console.log(userData);
  };

  return (
    <main className={styles.main}>
      <div className={styles.form_container}>
        <form onSubmit={onSubmit}>
          <img src={logo} alt="logo" className={styles.logo} />
          <input
            placeholder="login"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
          <input
            placeholder="password"
            type="password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          <input
            placeholder="email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <button>Register now!</button>
          <p className={styles.register_msg}>
            Already have an account?
            <br />
            <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;
