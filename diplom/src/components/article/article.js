import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

import GetUser from "../../services/getUser";

import Like from "../article-list-like";
import Tag from "../tag";

import "./article.css";

const Article = ({ article, loggedIn }) => {
  const getUser = useMemo(() => new GetUser(), []);

  const [favoritesCount, setFavoritesCount] = useState(article.favoritesCount);
  const [favorited, setFavorited] = useState(article.favorited);

  const like = (slug, favorited) => {
    if (favorited) {
      deleteLike(slug);
    } else {
      getLike(slug);
    }
  };

  const getLike = (slug) => {
    getUser.getLike(slug);
    setFavorited(true);
    setFavoritesCount(favoritesCount + 1);
  };

  const deleteLike = (slug) => {
    getUser.deleteLike(slug);
    setFavorited(false);
    setFavoritesCount(favoritesCount - 1);
  };

  return (
    <li className="item">
      <div className="header">
        <div className="userInfo">
          <div>
            <span className="avatarSpan">
              <img className="avatar" src={article.author.image} alt="" />
            </span>
          </div>
          <div>
            <Link className="name" to={`/profile/${article.author.username}`}>
              {article.author.username}
            </Link>
            <div className="date">{article.updatedAt}</div>
          </div>
        </div>
        <Like
          loggedIn={loggedIn}
          article={article}
          GetLike={like}
          favoritesCount={favoritesCount}
          favorited={favorited}
        />
      </div>
      <Link className="body" to={`/article/${article.slug}`}>
        <div className="bodyTitle">{article.title}</div>
        <div className="bodyInfo">{article.description}</div>
      </Link>
      <div className="footer">
        <Link className="readMore" to={`/article/${article.slug}`}>
          Read more...
        </Link>
        <Tag tags={article.tagList} />
      </div>
    </li>
  );
};

export default Article;
