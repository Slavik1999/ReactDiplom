import React from "react";
import { Link, withRouter, NavLink } from "react-router-dom";

import "./nav-bar.css";

const Header = ({ loggedIn, user }) => {
  if (loggedIn) {
    return (
      <div className="container header d-flex">
        <h2>
          <Link to="/">slavyanin</Link>
        </h2>
        <div className="d-flex">
          <NavLink
            to="/"
            exact
            className="navBar"
            activeClassName="navBarActive"
          >
            Home
          </NavLink>
          <NavLink
            to="/editor"
            exact
            className="navBar"
            activeClassName="navBarActive"
          >
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>{" "}
            NewArticle
          </NavLink>
          <NavLink
            to="/settings"
            exact
            className="navBar"
            activeClassName="navBarActive"
          >
            <i className="fa fa-cog" aria-hidden="true"></i> Settings
          </NavLink>
          <NavLink
            to={`/profile/${user.username}`}
            className="navBar"
            activeClassName="navBarActive"
          >
            <img className="avatar" src={`${user.image}`} alt="" />
            {user.username}
          </NavLink>
        </div>
      </div>
    );
  }
  if (!loggedIn) {
    return (
      <div className="container header d-flex">
        <h2>
          <Link to="/">slavyanin</Link>
        </h2>
        <ul className="d-flex">
          <NavLink
            to="/"
            exact
            className="navBar"
            activeClassName="navBarActive"
          >
            Home
          </NavLink>
          <NavLink
            to="/login"
            exact
            className="navBar"
            activeClassName="navBarActive"
          >
            SignIn
          </NavLink>
          <NavLink
            to="/register"
            exact
            className="navBar"
            activeClassName="navBarActive"
          >
            SignUp
          </NavLink>
        </ul>
      </div>
    );
  }
};

export default withRouter(Header);
