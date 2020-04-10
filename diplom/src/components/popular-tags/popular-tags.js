import React, { useEffect, useState, useMemo } from "react";
import Services from "../../services/services";

import TagList from "../tag-list";

import "./popular-tags.css";

const PopularTags = ({ getArticleListByTag }) => {
  const services = useMemo(() => new Services(), []);

  const [tags, setTag] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unmounted = false;
    services
      .getTags()
      .then((data) => data.tags)
      .then((data) => {
        if (!unmounted) {
          setTag(data);
          setLoading(false);
        }
      });

    return () => {
      unmounted = true;
    };
  }, [services]);

  const Loading = loading ? <h5>Loading tags...</h5> : null;
  const tagList = !loading ? (
    <TagList tags={tags} getArticleListByTag={getArticleListByTag} />
  ) : null;
  return (
    <div className="container containerTags">
      <div className="headerTag">Popular Tags</div>
      {Loading}
      {tagList}
    </div>
  );
};
export default PopularTags;
