import React from "react";

import "./tag.css";

const Tag = ({ tag, getArticleListByTag }) => {
  if (getArticleListByTag) {
    return (
      <span className="tag" onClick={() => getArticleListByTag(false, tag)}>
        {tag}
      </span>
    );
  } else {
    return <span className="tag">{tag}</span>;
  }
};

export default Tag;
