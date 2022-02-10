import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import styles from "./AdminPanel.module.scss";
import { TiUserDelete as Delete } from "react-icons/ti";
import { FaUserEdit as Edit } from "react-icons/fa";
import AlbumPanel from "./albumPanel/AlbumPanel";

const UserPanel = ({
  currentUser,
  updateUser,
  updatedUser,
  setUpdatedUser,
  handleChangeRole,
  updateMessage,
  closeModal,
}) => (
  <>
    <div className={styles.modal}>
      <div className={styles.close_btn} onClick={closeModal}></div>

      <form
        className={styles.edit_form}
        onSubmit={(e) => updateUser(e, currentUser.id)}
      >
        <h1>Edit an user!</h1>
        <input
          placeholder={currentUser.name}
          value={updatedUser.name}
          onChange={(e) =>
            setUpdatedUser({ ...updatedUser, name: e.target.value })
          }
        />
        <input
          placeholder={currentUser.email}
          value={updatedUser.email}
          onChange={(e) =>
            setUpdatedUser({ ...updatedUser, email: e.target.value })
          }
        />
        <select defaultValue={currentUser.role} onChange={handleChangeRole}>
          <option value="0">User</option>
          <option value="1">Admin</option>
        </select>
        <button>Edit!</button>
        {updateMessage.length > 0 && (
          <p className={styles.updateMessage}>{updateMessage}</p>
        )}
      </form>
    </div>
    <div className={styles.modal_bg}></div>
  </>
);

const AdminPanel = ({ user }) => {
  const [users, setUsers] = useState([]); //fetched users
  const [flag, setFlag] = useState(false);
  const [visEdit, setVisEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [updatedUser, setUpdatedUser] = useState({
    name: currentUser.name,
    email: currentUser.email,
    password: currentUser.password,
    role: currentUser.role,
  });
  const [updateMessage, setUpdateMessage] = useState("");
  const [target, setTarget] = useState(""); //value of searchbar
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const result = await axios.get("https://localhost:44338/api/user");
    setUsers(result.data);
    setFlag(false);
  }, [flag]);

  const deleteUser = (id) => {
    axios
      .delete(`https://localhost:44338/api/user/${id}`)
      .then(() => setFlag(true));
  };

  const handleEdit = (user) => {
    setVisEdit(true);
    userSwap(user);
  };

  const closeModal = () => {
    setUpdateMessage("");
    setVisEdit(false);
  };

  const userSwap = (user) => {
    setCurrentUser({});
    setCurrentUser(user);
    setUpdatedUser(user);
  };

  const updateUser = (e, id) => {
    setUpdateMessage("");
    axios
      .put(`https://localhost:44338/api/user/${id}`, updatedUser)
      .then((res) => {
        setUpdateMessage("Succesfully updated user!");
        setUpdatedUser({
          name: "",
          email: "",
          password: currentUser.password,
          role: currentUser.role,
        });

        setFlag(true);
      })
      .catch((err) => {
        console.log(err.message);
        setUpdatedUser({
          name: "",
          email: "",
          password: currentUser.password,
          role: currentUser.role,
        });
      });

    e.preventDefault();
  };

  const handleChangeRole = (e) => {
    setUpdatedUser({ ...updatedUser, role: parseInt(e.target.value) });
  };

  return (
    <div>
      {Object.keys(user).length === 0 || user.role !== 1 ? (
        <p>you are not permitted to view this site.</p>
      ) : (
        <div className={styles.main}>
          <div className={styles.main_bg}>
            <Link to="/admin/album">
              <p className={styles.album_link}>Add album here</p>
            </Link>
            <h1>Admin panel</h1>
            <input
              placeholder="Search for an user"
              onChange={(e) => setTarget(e.target.value)}
            />
            {users.length === 0 ? (
              <p>loading</p>
            ) : (
              <div>
                {users
                  .filter((mappedUser) => {
                    if (target === "") {
                      return users;
                    } else if (
                      mappedUser.name
                        .toLowerCase()
                        .includes(target.toLowerCase())
                    ) {
                      return users;
                    }
                  })
                  .map((mappedUser) => (
                    <div key={mappedUser.id} style={{ display: "flex" }}>
                      <p>{mappedUser.name}</p>
                      <p>{mappedUser.email}</p>
                      <Edit
                        onClick={() => handleEdit(mappedUser)}
                        className={styles.user_btn}
                      />
                      <Delete
                        onClick={() => deleteUser(mappedUser.id)}
                        className={styles.user_btn}
                      />
                    </div>
                  ))}
                {visEdit && (
                  <UserPanel
                    currentUser={currentUser}
                    setVisEdit={setVisEdit}
                    visEdit={visEdit}
                    updateUser={updateUser}
                    updatedUser={updatedUser}
                    setUpdatedUser={setUpdatedUser}
                    handleChangeRole={handleChangeRole}
                    updateMessage={updateMessage}
                    setUpdateMessage={setUpdateMessage}
                    closeModal={closeModal}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
