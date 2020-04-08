import React, { useState, useEffect, useMemo } from "react";
import Services from "../../services/services";
// import Authorisation from "../../services/authorisation";
import GetUser from "../../services/getUser";
import { Link, withRouter } from "react-router-dom";

import ArticleList from "../article-list";
import TagList from "../tag-list";

import "./home-page.css";

const HomePage = ({ loggedIn }) => {
  const [yourFeedLink, setYourFeedLink] = useState("");
  const [globalFeedLink, setGlobalFeedLink] = useState("");
  const [tagLink, setTagLink] = useState("");
  const [tag, setTag] = useState("");
  const [articles, setArticles] = useState([]);
  const [articlesPage, setArticlesPage] = useState(0);

  const [yourFeed, setYourFeed] = useState(true);
  const [globalFeed, setGlobalFeed] = useState(false);

  const [loading, setLoading] = useState(true);

  const api = useMemo(() => new Services(), []);
  const getUser = useMemo(() => new GetUser(), []);

  useEffect(() => {
    if (loggedIn) {
      if (globalFeed) {
        if (tag) {
          setLoading(true);
          getUser.getArticles(articlesPage, tag).then(articles => {
            setArticles(articles);
            setLoading(false);
          });
        } else {
          setLoading(true);
          getUser.getArticles(articlesPage, "").then(articles => {
            setArticles(articles);
            setLoading(false);
          });
        }
      } else if (yourFeed) {
        setLoading(true);
        getUser.getFeedArticles(articlesPage).then(articles => {
          setArticles(articles);
          setLoading(false);
        });
      }
    } else if (!loggedIn) {
      if (tag) {
        setLoading(true);
        api.getArticles(articlesPage, tag).then(articles => {
          setArticles(articles);
          setLoading(false);
        });
      } else {
        setLoading(true);
        api.getArticles(articlesPage, "").then(articles => {
          setArticles(articles);
          setLoading(false);
        });
      }
    }
  }, [loggedIn, api, getUser, tag, yourFeed, globalFeed, articlesPage]);

  const getArticlePage = page => {
    setArticlesPage(page);
  };

  const getArticleListByTag = tags => {
    setYourFeed(false);
    setGlobalFeed(true);
    setTag(tags);
    setArticlesPage(0);
  };

  const getGlobalFeed = () => {
    setYourFeed(false);
    setGlobalFeed(true);
    setArticlesPage(0);
    setTag("");
  };

  const getYourFeed = () => {
    setGlobalFeed(false);
    setYourFeed(true);
    setArticlesPage(0);
    setTag("");
  };

  useEffect(() => {
    if (loggedIn) {
      if (yourFeed) {
        setYourFeedLink(
          <span className="activeLink" onClick={getYourFeed}>
            Your feed
          </span>
        );
        setTagLink("");
      } else {
        setYourFeedLink(
          <span className="link" onClick={getYourFeed}>
            Your feed
          </span>
        );
      }
      if (globalFeed) {
        if (tag) {
          setGlobalFeedLink(
            <span className="link" onClick={getGlobalFeed}>
              Global feed
            </span>
          );
          setTagLink(<span className="activeLink">{`#${tag}`}</span>);
        } else {
          setGlobalFeedLink(
            <span className="activeLink" onClick={getGlobalFeed}>
              Global feed
            </span>
          );
          setTagLink("");
        }
      } else {
        setGlobalFeedLink(
          <span className="link" onClick={getGlobalFeed}>
            Global feed
          </span>
        );
      }
    } else {
      if (tag) {
        setGlobalFeedLink(
          <Link className="link" to="/" onClick={getGlobalFeed}>
            Global feed
          </Link>
        );
        setTagLink(<span className="activeLink">{`#${tag}`}</span>);
      } else {
        setGlobalFeedLink(
          <Link className="activeLink" to="/" onClick={getGlobalFeed}>
            Global feed
          </Link>
        );
        setTagLink("");
      }
      setYourFeedLink(
        <Link className="link" to="/login" name="options" id="option1">
          Your feed
        </Link>
      );
    }
  }, [loggedIn, globalFeed, yourFeed, tag]);

  const Loading = loading ? <h3>Loading articles...</h3> : null;
  const articleList = !loading ? (
    <ArticleList
      loggedIn={loggedIn}
      articles={articles}
      getArticlePage={getArticlePage}
      articlesPage={articlesPage}
    />
  ) : null;
  const noArticles =
    !loading && !articles.articlesCount ? (
      <div className="noArticles">No articles are here... yet.</div>
    ) : null;
  return (
    <div className="container body">
      <div className="container">
        <div>
          {yourFeedLink}
          {globalFeedLink}
          {tagLink}
        </div>
        <div className="container article">
          {articleList}
          {Loading}
          {noArticles}
        </div>
      </div>
      <TagList getArticleListByTag={getArticleListByTag} />
    </div>
  );
};

export default withRouter(HomePage);
