import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import Article from "../article";

import "./article-list.css";

const ArticleList = ({ loggedIn, articles, getArticlePage, articlesPage }) => {
  const [arrayOfButtons, setArrayOfButtons] = useState([]);
  const [pageOfArticles, setPageOfArticles] = useState(0);

  useEffect(() => {
    if (articles.articlesCount > 10) {
      setArrayOfButtons(
        Array.from(Array(Math.ceil(articles.articlesCount / 10)).keys())
      );
      setPageOfArticles(articlesPage);
    }
  }, [articles, articlesPage]);

  const buttons = arrayOfButtons.map((page) => {
    let className = "page-item";
    if (pageOfArticles === page) {
      className += " active";
    }
    return (
      <li className={className} key={page}>
        <span className="page-link button" onClick={() => getArticlePage(page)}>
          {page + 1}
        </span>
      </li>
    );
  });
  const articleList = articles.articles.map((article) => {
    return <Article loggedIn={loggedIn} article={article} key={article.slug} />;
  });
  return (
    <React.Fragment>
      <ul className="ulBody">{articleList}</ul>
      <ul className="buttons pagination pagination-sm">{buttons}</ul>
    </React.Fragment>
  );
};

export default withRouter(ArticleList);
