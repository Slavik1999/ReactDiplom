import React, { useState, useMemo } from "react";
import { Redirect } from "react-router";

import Form from "../form";

import Authorisation from "../../services/authorisation";

import "./authorization-form.css";

const AuthorizationForm = ({ changeUser }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState([]);

  const [redirect, setRedirect] = useState(false);

  const authorisation = useMemo(() => new Authorisation(), []);

  const user = {
    user: { email, password },
  };

  const setPasswords = (e) => {
    setPassword(e.target.value);
  };

  const setEmails = (e) => {
    setEmail(e.target.value);
  };

  const getData = () => {
    authorisation.signIn(user).then((data) => {
      try {
        getToken(data.user.token);
      } catch {
        getErrors(data.errors);
      }
    });
  };

  const getToken = (token) => {
    localStorage.setItem("token", token);
    setRedirect(true);
    changeUser({});
  };

  const getErrors = (errors) => {
    const arr = [];
    for (let key in errors) {
      arr.push(`${key} ${errors[key]}`);
    }
    setErrors(arr);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <React.Fragment>
      <Form
        setPasswords={setPasswords}
        setEmails={setEmails}
        getData={getData}
        errors={errors}
      />
    </React.Fragment>
  );
};
export default AuthorizationForm;
