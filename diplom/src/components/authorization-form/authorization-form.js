import React, { useState, useMemo } from "react";
import { Redirect } from "react-router";

import Form from "../form";

import Authorisation from "../../services/authorisation";

import "./authorization-form.css";

const AuthorizationForm = ({ changeUser }) => {
  const authorisation = useMemo(() => new Authorisation(), []);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState([]);

  const [redirect, setRedirect] = useState(false);

  const setPasswords = (e) => {
    setPassword(e.target.value);
  };

  const setEmails = (e) => {
    setEmail(e.target.value);
  };

  const setToken = (token) => {
    localStorage.setItem("token", token);
    setRedirect(true);
    changeUser({});
  };

  const getData = () => {
    const user = {
      user: { email, password },
    };
    authorisation.signIn(user).then((data) => {
      try {
        setToken(data.user.token);
      } catch {
        setErrors(data.errors);
      }
    });
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <Form
      setPasswords={setPasswords}
      setEmails={setEmails}
      getData={getData}
      errors={errors}
    />
  );
};
export default AuthorizationForm;
