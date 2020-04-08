import React from "react";
import { Link, withRouter } from "react-router-dom";

import "./follow.css";

const ArticlePageFollow = ({ loggedIn, GetFollowing, following, username }) => {
  let className = "articleFollow";
  let followBody = `+ Follow ${username}`;

  if (loggedIn) {
    if (following) {
      className = "articleUnfollow";
      followBody = `+ Unfollow ${username}`;
    }
    return (
      <span
        className={className}
        key={`Follow${username}`}
        onClick={() => GetFollowing(username, following)}
      >
        {followBody}
      </span>
    );
  }
  if (!loggedIn) {
    return (
      <Link className={className} to="/login" key={`Follow${username}`}>
        {followBody}
      </Link>
    );
  }
};

export default withRouter(ArticlePageFollow);
