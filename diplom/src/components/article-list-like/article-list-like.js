import React from "react";
import { Link, withRouter } from "react-router-dom";

import "./article-list-like.css";

const Like = ({ loggedIn, article, GetLike, favoritesCount, favorited }) => {
  let className = "like";

  if (loggedIn) {
    if (favorited) {
      className += "Favorite";
    }
    return (
      <span
        to="/"
        className={className}
        key={`Likes${favoritesCount}`}
        onClick={() => GetLike(article.slug, favorited)}
      >
        <i className="fa fa-heart" aria-hidden="true"></i>
        {favoritesCount}
      </span>
    );
  }
  if (!loggedIn) {
    return (
      <Link className={className} to="/login" key={`Likes${favoritesCount}`}>
        <i className="fa fa-heart" aria-hidden="true"></i>
        {favoritesCount}
      </Link>
    );
  }
};

export default withRouter(Like);
