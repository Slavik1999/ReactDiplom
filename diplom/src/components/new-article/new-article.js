import React, { useMemo, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router";

import ErrorList from "../error-list";

import WithTokenAndBody from "../../services/withTokenAndBody";
import ServicesWithToken from "../../services/servicesWithToken";

import "./new-article.css";

const NewArticle = ({ match }) => {
  const withTokenAndBody = useMemo(() => new WithTokenAndBody(), []);
  const servicesWithToken = useMemo(() => new ServicesWithToken(), []);

  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [tagList, setTagList] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [errors, setErrors] = useState("");

  const article = {
    article: {},
  };
  useEffect(() => {
    if (match.params.slug) {
      servicesWithToken.getArticle(match.params.slug).then((data) => {
        setSlug(data.article.slug);
        setTitle(data.article.title);
        setDescription(data.article.description);
        setBody(data.article.body);
        setTagList(data.article.tagList);
      });
    } else {
      setSlug("");
      setTitle("");
      setDescription("");
      setBody("");
      setTagList([]);
    }
  }, [servicesWithToken, match]);
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
      withTokenAndBody.editArticle(article, slug).then((data) => {
        try {
          setRedirect(true);
        } catch {
          setErrors(data.errors);
        }
      });
    } else {
      withTokenAndBody.postArticle(article).then((data) => {
        try {
          setSlug(data.article.slug);
          setRedirect(true);
        } catch {
          setErrors(data.errors);
        }
      });
    }
  };

  if (redirect) {
    return <Redirect to={`/article/${slug}`} />;
  }

  return (
    <div className="form container">
      <ErrorList errors={errors} />
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
