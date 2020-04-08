import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./form.css";

const Form = ({ setNames, setEmails, setPasswords, getData, errors }) => {
  const [error, setError] = useState([]);

  useEffect(() => {
    if (errors) {
      setError(errors);
    }
  }, [errors]);

  let header = "";
  let inputName = "";
  let link = "";

  if (setNames) {
    header = "Sign up";
    inputName = (
      <div className="form-group">
        <input
          type="name"
          className="form-control"
          onChange={setNames}
          placeholder="Username"
        />
      </div>
    );
    link = (
      <Link className="linkForm" to="/login">
        Have an account?
      </Link>
    );
  } else {
    header = "Sign in";
    link = (
      <Link className="linkForm" to="/register">
        Need an account?
      </Link>
    );
  }

  const errorList = error.map(error => {
    return <li key={error}>{error}</li>;
  });

  return (
    <div className="form container">
      <h1>{header}</h1>
      {link}
      <ul>{errorList}</ul>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          getData();
        }}
      >
        {inputName}
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={setEmails}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            onChange={setPasswords}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
      </form>
    </div>
  );
};
export default Form;
