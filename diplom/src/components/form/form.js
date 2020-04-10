import React from "react";
import { Link } from "react-router-dom";

import ErrorList from "../error-list";

import "./form.css";

const Form = ({ setNames, setEmails, setPasswords, getData, errors }) => {
  let header = "Sign in";
  let inputName;
  let askingLink = (
    <Link className="linkForm" to="/register">
      Need an account?
    </Link>
  );

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
    askingLink = (
      <Link className="linkForm" to="/login">
        Have an account?
      </Link>
    );
  }
  return (
    <div className="form container">
      <h1>{header}</h1>
      {askingLink}
      <ErrorList errors={errors} />
      <form
        className="form"
        onSubmit={(e) => {
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
