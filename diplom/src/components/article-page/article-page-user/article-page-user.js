import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Like from "../../article-page-like";
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
    setLikeLink(
      <Like
        loggedIn={loggedIn}
        favorited={favorited}
        favoritesCount={favoritesCount}
        article={article}
        GetLike={like}
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

  return (
    <div className="articleInfo ">
      <div className="articleUserInfo">
        <img className="avatar" src={author.image} alt="" />
      </div>
      <div className="articleUserLink">
        <Link className="name" to={`/profile/${author.username}`}>
          {author.username}
        </Link>
        <div className="date">{article.updatedAt}</div>
      </div>
      <div className="articleButtons">
        {followLink}
        {likeLink}
      </div>
    </div>
  );
};

export default ArticlePageUser;
