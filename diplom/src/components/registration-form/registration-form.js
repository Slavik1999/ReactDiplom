import React, { useState, useMemo } from "react";
import { Redirect } from "react-router-dom";

import Form from "../form";

import Authorisation from "../../services/authorisation";

import "./registration-form.css";

const RegistrationFrom = ({ changeUser }) => {
  const authorisation = useMemo(() => new Authorisation(), []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState([]);

  const [redirect, setRedirect] = useState(false);

  const setNames = (e) => {
    setUsername(e.target.value);
  };
  const setPasswords = (e) => {
    setPassword(e.target.value);
  };
  const setEmails = (e) => {
    setEmail(e.target.value);
  };

  const getData = () => {
    const user = {
      user: { email, password, username },
    };
    authorisation.registration(user).then((data) => {
      try {
        setToken(data.user.token);
      } catch {
        setErrors(data.errors);
      }
    });
  };

  const setToken = (token) => {
    localStorage.setItem("token", token);
    setRedirect(true);
    changeUser({});
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <React.Fragment>
      <Form
        setNames={setNames}
        setPasswords={setPasswords}
        setEmails={setEmails}
        getData={getData}
        errors={errors}
      />
    </React.Fragment>
  );
};
export default RegistrationFrom;
