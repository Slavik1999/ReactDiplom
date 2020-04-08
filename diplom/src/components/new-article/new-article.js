import React, { useMemo, useEffect, useState } from "react";
import WithToken from "../../services/withToken";
import Services from "../../services/services";
import { withRouter } from "react-router-dom";

import "./new-article.css";
import { Redirect } from "react-router";

const NewArticle = ({ match }) => {
  const withToken = useMemo(() => new WithToken(), []);
  const services = useMemo(() => new Services(), []);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [tagList, setTagList] = useState([]);
  const [redirect, setRedirect] = useState("");
  const article = {
    article: {},
  };
  useEffect(() => {
    if (match.params.slug) {
      services.getArticle(match.params.slug).then((data) => {
        setSlug(data.article.slug);
        setTitle(data.article.title);
        setDescription(data.article.description);
        setBody(data.article.body);
        setTagList(data.article.tagList);
      });
    }
  }, [services, match]);
  useEffect(() => {
    article.article = {
      tagList,
      title,
      description,
      body,
    };
  }, [title, description, body, tagList, article]);
  const getArticle = () => {
    if (match.params.slug) {
      withToken.editArticle(article, slug).then((data) => {
        setRedirect(<Redirect to={`/article/${data.article.slug}`} />);
      });
    } else {
      withToken.postArticle(article).then((data) => {
        setRedirect(<Redirect to={`/article/${data.article.slug}`} />);
      });
    }
  };
  return (
    <div className="form container">
      {redirect}
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          getArticle();
        }}
      >
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Article Title"
            value={title}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Whats's this article about?"
            value={description}
          />
        </div>
        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your article (in markdown)"
            value={body}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setTagList(e.target.value.split(" "))}
            placeholder="Enter Tags"
            value={tagList}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Publish Article
        </button>
      </form>
    </div>
  );
};
export default withRouter(NewArticle);
