import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

import ServicesWithToken from "../../services/servicesWithToken";

import Like from "../like";
import TagList from "../tag-list";

import "./article.css";

const Article = ({ article, loggedIn }) => {
  const servicesWithToken = useMemo(() => new ServicesWithToken(), []);

  const [favoritesCount, setFavoritesCount] = useState(article.favoritesCount);
  const [favorited, setFavorited] = useState(article.favorited);

  const like = (slug, favorited) => {
    if (favorited) {
      deleteLike(slug);
    } else {
      setLike(slug);
    }
  };

  const setLike = (slug) => {
    servicesWithToken.getLike(slug);
    setFavorited(true);
    setFavoritesCount(favoritesCount + 1);
  };

  const deleteLike = (slug) => {
    servicesWithToken.deleteLike(slug);
    setFavorited(false);
    setFavoritesCount(favoritesCount - 1);
  };

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
            <div className="date">
              {formatDate(new Date(article.updatedAt))}
            </div>
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
        <TagList tags={article.tagList} />
      </div>
    </li>
  );
};

export default Article;
