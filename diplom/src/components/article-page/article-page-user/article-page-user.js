import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Like from "../../like";
import Follow from "../../follow";

import "./article-page-user.css";

const ArticlePageUser = ({
  loggedIn,
  username,
  article,
  author,
  favoritesCount,
  favorited,
  following,
  like,
  follow,
  deleteArticle,
}) => {
  const [likeLink, setLikeLink] = useState("");
  const [followLink, setFollowLink] = useState("");

  useEffect(() => {
    if (author.username === username) {
      setFollowLink(
        <Link className="editArticle" to={`/editor/${article.slug}`}>
          Edit Article
        </Link>
      );
      setLikeLink(
        <span className="deleteArticle" onClick={() => deleteArticle()}>
          Delete Article
        </span>
      );
    } else {
      setLikeLink(
        <Like
          loggedIn={loggedIn}
          favorited={favorited}
          favoritesCount={favoritesCount}
          article={article}
          GetLike={like}
          articlePage={true}
        />
      );
      setFollowLink(
        <Follow
          loggedIn={loggedIn}
          following={following}
          username={author.username}
          GetFollowing={follow}
        />
      );
    }
  }, [
    article,
    author,
    loggedIn,
    favorited,
    favoritesCount,
    following,
    username,
    follow,
    like,
    deleteArticle,
  ]);

  function formatDate(date) {
    var dd = date.getDate();
    if (dd < 10) dd = "0" + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = "0" + mm;

    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = "0" + yy;

    return dd + "." + mm + "." + yy;
  }

  return (
    <div className="articleInfo ">
      <div className="articleUserInfo">
        <img className="avatar" src={author.image} alt="" />
      </div>
      <div className="articleUserLink">
        <Link className="name" to={`/profile/${author.username}`}>
          {author.username}
        </Link>
        <div className="date">{formatDate(new Date(article.updatedAt))}</div>
      </div>
      <div className="articleButtons">
        {followLink}
        {likeLink}
      </div>
    </div>
  );
};

export default ArticlePageUser;
