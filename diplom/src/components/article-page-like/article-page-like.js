import React from "react";
import { Link, withRouter } from "react-router-dom";

import "./article-page-like.css";

const Like = ({ loggedIn, article, GetLike, favoritesCount, favorited }) => {
  let className = "like";
  let likeBody = `Favorite Article (${favoritesCount})`;

  if (loggedIn) {
    if (favorited) {
      className += "Favorite";
      likeBody = `Unfavorite Article (${favoritesCount})`;
    }
    return (
      <span
        className={className}
        key={`Likes${favoritesCount}`}
        onClick={() => GetLike(article.slug, favorited)}
      >
        <i className="fa fa-heart" aria-hidden="true"></i>
        {likeBody}
      </span>
    );
  }

  if (!loggedIn) {
    return (
      <Link className="like" to="/login" key={`Likes${favoritesCount}`}>
        <i className="fa fa-heart" aria-hidden="true"></i>
        {likeBody}
      </Link>
    );
  }
};

export default withRouter(Like);
