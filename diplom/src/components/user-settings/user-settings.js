import React, { useEffect, useMemo, useState } from "react";
import { Redirect } from "react-router-dom";
import WithTokenAndBody from "../../services/withTokenAndBody";

import "./user-settings.css";
import ErrorList from "../error-list";

const UserSettings = ({ user, changeUser }) => {
  const withTokenAndBody = useMemo(() => new WithTokenAndBody(), []);

  const [id, setId] = useState("");
  const [email, setUserEmail] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setUserBio] = useState("");
  const [image, setUserImage] = useState("");
  const [password, setUserPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [errors, setErrors] = useState([]);

  const userObj = {
    user: {},
  };

  useEffect(() => {
    setId(user.id);
    setUserEmail(user.email);
    setCreatedAt(user.createdAt);
    setUsername(user.username);
    setUserBio(user.bio);
    setUserImage(user.image);
  }, [user]);

  useEffect(() => {
    userObj.user = {
      id,
      email,
      createdAt,
      updatedAt: new Date().toISOString(),
      username,
      bio,
      image,
      token: localStorage.getItem("token"),
      password,
    };
  }, [id, email, createdAt, username, bio, image, password, userObj]);

  const editProfile = () => {
    withTokenAndBody.editPerson(userObj).then((data) => {
      if (data.errors) {
        setErrors(data.errors);
      } else {
        changeUser({});
        setRedirect(true);
      }
      // try {
      //   changeUser({});
      //   setRedirect(true);
      // } catch {
      //   setErrors(data.errors);
      // }
    });
  };

  const logOut = () => {
    localStorage.clear();
    changeUser({});
    setRedirect(true);
  };

  if (redirect) {
    let linkPath = "/";
    if (localStorage.getItem("token")) {
      linkPath += `profile/${username}`;
    }
    return <Redirect to={linkPath} />;
  }

  return (
    <div className="form container">
      <h2>Your Settings</h2>
      <ErrorList errors={errors} />
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          editProfile();
        }}
      >
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="URL of profile picture"
            onChange={(e) => {
              setUserImage(e.target.value);
            }}
            value={image || ""}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Short bio about you"
            value={bio || ""}
            onChange={(e) => {
              setUserBio(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="New password"
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Update Settings
        </button>
      </form>
      <button className="btnLogout" onClick={logOut}>
        Click it to Logout
      </button>
    </div>
  );
};
export default UserSettings;
