import React, { useEffect, useState, useMemo } from "react";
import { withRouter, Redirect } from "react-router-dom";

import Services from "../../services/services";
import GetUser from "../../services/getUser";
import WithToken from "../../services/withToken";

import Tag from "../tag";

import ArticlePageUser from "./article-page-user";

import "./article-page.css";

const ArticlePage = ({ loggedIn, match, username }) => {
  const [article, setArticle] = useState("");
  const [tags, setTags] = useState([]);
  const [author, setAuthor] = useState("");
  const [favoritesCount, setFavoritesCount] = useState("");
  const [favorited, setFavorited] = useState(false);
  const [following, setFollowing] = useState(false);

  const [redirect, setRedirect] = useState(false);

  const services = useMemo(() => new Services(), []);
  const withToken = useMemo(() => new WithToken(), []);
  const getUser = useMemo(() => new GetUser(), []);

  useEffect(() => {
    if (loggedIn) {
      getUser.getArticle(match.params.slug).then((data) => {
        setArticle(data.article);
        setTags(data.article.tagList);
        setAuthor(data.article.author);
        setFavorited(data.article.favorited);
        setFavoritesCount(data.article.favoritesCount);
        setFollowing(data.article.author.following);
      });
    }
    if (!loggedIn) {
      services.getArticle(match.params.slug).then((data) => {
        setArticle(data.article);
        setTags(data.article.tagList);
        setAuthor(data.article.author);
        setFavorited(data.article.favorited);
        setFavoritesCount(data.article.favoritesCount);
        setFollowing(data.article.author.following);
      });
    }
  }, [services, getUser, match, loggedIn]);

  const deleteArticle = () => {
    withToken.deleteArticle(article.slug).then(setRedirect(true));
  };

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

  const follow = (username, following) => {
    if (following) {
      unfollow(username);
    } else {
      getFollow(username);
    }
  };

  const getFollow = (username) => {
    getUser.getFollowing(username);
    setFollowing(true);
  };

  const unfollow = (username) => {
    getUser.deleteFollowing(username);
    setFollowing(false);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <React.Fragment>
      <div className="articleHeader">
        <div className="articleName container">
          <h1>{article.title}</h1>
        </div>
        <div className="container">
          <ArticlePageUser
            loggedIn={loggedIn}
            article={article}
            author={author}
            username={username}
            favoritesCount={favoritesCount}
            favorited={favorited}
            following={following}
            follow={follow}
            like={like}
            deleteArticle={deleteArticle}
          />
        </div>
      </div>
      <div className="container articleBody">
        <span className="articleBodyText">{article.body}</span>
        <div className="footer">
          <Tag tags={tags} />
        </div>
        <div className="articleUserInfoBody">
          <ArticlePageUser
            loggedIn={loggedIn}
            article={article}
            author={author}
            username={username}
            favoritesCount={favoritesCount}
            favorited={favorited}
            following={following}
            follow={follow}
            like={like}
            deleteArticle={deleteArticle}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ArticlePage);
