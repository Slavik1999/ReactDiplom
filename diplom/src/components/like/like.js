import React from "react";
import { Link, withRouter } from "react-router-dom";

import "./like.css";

const Like = ({ ...props }) => {
  const {
    loggedIn,
    article,
    GetLike,
    favoritesCount,
    favorited,
    articlePage,
  } = props;

  let className = "like";
  let likeBody = `Favorite Article (${favoritesCount})`;

  if (articlePage) {
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
  }
  if (!articlePage) {
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
  }
};

export default withRouter(Like);
