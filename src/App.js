import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import Albums from "./components/albums/Albums";
import axios from "axios";
import SingleAlbum from "./components/singleAlbum/SingleAlbum";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import AdminPanel from "./components/adminpanel/AdminPanel";
import Footer from "./components/footer/Footer";
import AlbumPanel from "components/adminpanel/albumPanel/AlbumPanel";

const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser") || "[]");
const App = () => {
  const [albums, setAlbums] = useState([]);
  const [flag, setFlag] = useState(false);
  const [user, setUser] = useState(loggedUser);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const result = await axios.get("https://localhost:44338/api/albums");
    setAlbums(result.data);
    setFlag(false);
  }, [flag]);
  return (
    <>
      <Router>
        <Navbar user={user} setUser={setUser} />
        <Switch>
          <Route exact path="/">
            <Albums albums={albums} />
          </Route>
          <Route exact path="/album/:id">
            <SingleAlbum user={user} />
          </Route>

          <Route exact path="/login">
            {" "}
            {Object.keys(user).length > 0 ? (
              <Redirect to="/" />
            ) : (
              <Login user={user} setUser={setUser} />
            )}
          </Route>
          <Route exact path="/register">
            {Object.keys(user).length > 0 ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route exact path="/admin">
            <AdminPanel user={user} />
          </Route>
          <Route exact path="/admin/album">
            <AlbumPanel user={user} fetchFlag={flag} setFetchFlag={setFlag} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
};

export default App;
