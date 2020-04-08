import React, { useEffect, useState, useMemo } from "react";
import Services from "../../services/services";
import Tag from "../tag";

import "./tag-list.css";

const TagList = ({ getArticleListByTag }) => {
  const api = useMemo(() => new Services(), []);

  const [tags, setTag] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getTags()
      .then(data => data.tags)
      .then(data => {
        setTag(data);
        setLoading(false);
      });
  }, [api]);

  const Loading = loading ? <h5>Loading tags...</h5> : null;
  const tagList = !loading ? (
    <Tag tags={tags} getArticleListByTag={getArticleListByTag} />
  ) : null;
  return (
    <div className="container containerTags">
      <div className="headerTag">Popular Tags</div>
      {Loading}
      {tagList}
    </div>
  );
};
export default TagList;
