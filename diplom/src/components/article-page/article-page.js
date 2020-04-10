import React, { useEffect, useState, useMemo } from "react";
import { withRouter, Redirect } from "react-router-dom";

import Services from "../../services/services";
import ServicesWithToken from "../../services/servicesWithToken";
import WithTokenAndBody from "../../services/withTokenAndBody";

import TagList from "../tag-list";

import ArticlePageUser from "./article-page-user";

import "./article-page.css";

const ArticlePage = ({ loggedIn, match, username }) => {
  const services = useMemo(() => new Services(), []);
  const withTokenAndBody = useMemo(() => new WithTokenAndBody(), []);
  const servicesWithToken = useMemo(() => new ServicesWithToken(), []);

  const [article, setArticle] = useState(null);
  const [tags, setTags] = useState([]);
  const [author, setAuthor] = useState("");
  const [favoritesCount, setFavoritesCount] = useState("");
  const [favorited, setFavorited] = useState(false);
  const [following, setFollowing] = useState(false);

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    let service;
    if (loggedIn) {
      service = servicesWithToken;
    } else {
      service = services;
    }
    service.getArticle(match.params.slug).then((data) => {
      setArticle(data.article);
      setTags(data.article.tagList);
      setAuthor(data.article.author);
      setFavorited(data.article.favorited);
      setFavoritesCount(data.article.favoritesCount);
      setFollowing(data.article.author.following);
    });
  }, [services, servicesWithToken, match, loggedIn]);

  const deleteArticle = () => {
    withTokenAndBody.deleteArticle(article.slug).then(setRedirect(true));
  };

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

  const follow = (username, following) => {
    if (following) {
      deleteFollow(username);
    } else {
      setFollow(username);
    }
  };

  const setFollow = (username) => {
    servicesWithToken.getFollowing(username);
    setFollowing(true);
  };

  const deleteFollow = (username) => {
    servicesWithToken.deleteFollowing(username);
    setFollowing(false);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  const articlePageUser = (
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
  );

  return (
    <React.Fragment>
      {article && (
        <React.Fragment>
          <div className="articleHeader">
            <div className="articleName container">
              <h1>{article.title}</h1>
            </div>
            <div className="container">{articlePageUser}</div>
          </div>
          <div className="container articleBody">
            <span className="articleBodyText">{article.body}</span>
            <div className="footer">
              <TagList tags={tags} />
            </div>
            <div className="articleUserInfoBody">{articlePageUser}</div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default withRouter(ArticlePage);
