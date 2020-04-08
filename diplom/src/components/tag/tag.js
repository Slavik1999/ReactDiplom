import React from "react";

import "./tag.css";

const Tag = ({ tags, getArticleListByTag }) => {
  const elements = tags.map(item => {
    if (getArticleListByTag) {
      return (
        <span
          className="tag"
          key={item}
          onClick={() => getArticleListByTag(item)}
        >
          {item}
        </span>
      );
    } else {
      return (
        <span className="tag" key={item}>
          {item}
        </span>
      );
    }
  });
  return <div className="tags1">{elements}</div>;
};

export default Tag;
