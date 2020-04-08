import React, { useEffect, useMemo, useState } from "react";
import { Redirect } from "react-router-dom";
import WithToken from "../../services/withToken";

import "./user-settings.css";

const NewArticle = ({ user, changeUser }) => {
  const [id, setId] = useState("");
  const [email, setUserEmail] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setUserBio] = useState("");
  const [image, setUserImage] = useState("");
  const [password, setUserPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [errors, setErrors] = useState([]);

  const withToken = useMemo(() => new WithToken(), []);

  const userObj = {
    user: {}
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
      updatedAt: Date.now(),
      username,
      bio,
      image,
      token: localStorage.getItem("token"),
      password
    };
  }, [id, email, createdAt, username, bio, image, password, userObj]);

  const editProfile = () => {
    withToken.editPerson(userObj).then(data => {
      if (data.errors) {
        const arr = [];
        for (let val in data.errors) {
          arr.push(`${val} ${data.errors[val]}`);
        }
        setErrors(arr);
      } else {
        changeUser({});
        setRedirect(true);
      }
    });
  };

  const logOut = () => {
    localStorage.clear();
    changeUser({});
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  const erroring = errors.map(error => {
    return <li key={error}>{error}</li>;
  });

  return (
    <div className="form container">
      <h2>Your Settings</h2>
      <ul>{erroring}</ul>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          editProfile();
        }}
      >
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="URL of profile picture"
            onChange={e => {
              setUserImage(e.target.value);
            }}
            value={image}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={e => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Short bio about you"
            value={bio}
            onChange={e => {
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
            onChange={e => {
              setUserEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="New password"
            onChange={e => {
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
export default NewArticle;
