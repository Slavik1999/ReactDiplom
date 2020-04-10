import React, { useState, useEffect, useMemo } from "react";
import { Link, withRouter } from "react-router-dom";

import Services from "../../services/services";
import ServicesWithToken from "../../services/servicesWithToken";

import ArticleList from "../article-list";
import PopularTags from "../popular-tags";

import "./home-page.css";

const HomePage = ({ loggedIn }) => {
  const services = useMemo(() => new Services(), []);
  const servicesWithToken = useMemo(() => new ServicesWithToken(), []);

  const [yourFeedLink, setYourFeedLink] = useState("");
  const [globalFeedLink, setGlobalFeedLink] = useState("");
  const [tagLink, setTagLink] = useState("");
  const [tag, setTag] = useState("");
  const [articles, setArticles] = useState([]);
  const [articlesPage, setArticlesPage] = useState(0);

  const [yourFeed, setYourFeed] = useState(true);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unmounted = false;
    if (loggedIn) {
      if (yourFeed) {
        setLoading(true);
        servicesWithToken.getFeedArticles(articlesPage).then((articles) => {
          if (!unmounted) {
            setArticles(articles);
            setLoading(false);
          }
        });
      }
      if (!yourFeed) {
        setLoading(true);
        servicesWithToken.getArticles(articlesPage, tag).then((articles) => {
          if (!unmounted) {
            setArticles(articles);
            setLoading(false);
          }
        });
      }
    }
    if (!loggedIn) {
      setLoading(true);
      services.getArticles(articlesPage, tag).then((articles) => {
        if (!unmounted) {
          setArticles(articles);
          setLoading(false);
        }
      });
    }
    return () => {
      unmounted = true;
    };
  }, [loggedIn, services, servicesWithToken, tag, yourFeed, articlesPage]);

  const getArticlePage = (page) => {
    setArticlesPage(page);
  };

  const getFeedList = (choose, tags) => {
    setYourFeed(choose);
    setTag(tags);
    setArticlesPage(0);
  };

  useEffect(() => {
    let yourFeedLinkClassName = "link";
    let globalFeedLinkClassName = "link";
    if (loggedIn) {
      if (yourFeed) {
        yourFeedLinkClassName = "activeLink";
        setTagLink("");
      } else {
        globalFeedLinkClassName = "activeLink";
      }

      setYourFeedLink(
        <span
          className={yourFeedLinkClassName}
          onClick={() => getFeedList(true, "")}
        >
          Your feed
        </span>
      );
    }
    if (!loggedIn) {
      globalFeedLinkClassName = "activeLink";
      setYourFeedLink(
        <Link className="link" to="/login">
          Your feed
        </Link>
      );
    }
    if (tag) {
      globalFeedLinkClassName = "link";
      setTagLink(<span className="activeLink">{`#${tag}`}</span>);
    } else {
      setTagLink("");
    }

    setGlobalFeedLink(
      <span
        className={globalFeedLinkClassName}
        onClick={() => getFeedList(false, "")}
      >
        Global feed
      </span>
    );
  }, [loggedIn, yourFeed, tag]);

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
      <PopularTags getArticleListByTag={getFeedList} />
    </div>
  );
};

export default withRouter(HomePage);
