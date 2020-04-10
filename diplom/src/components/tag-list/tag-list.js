import React from "react";

import Tag from "../tag";

import "./tag-list.css";

const TagList = ({ getArticleListByTag, tags }) => {
  const tagList = tags.map((tag) => {
    return (
      <Tag tag={tag} key={tag} getArticleListByTag={getArticleListByTag} />
    );
  });
  return <div className="tagList">{tagList}</div>;
};
export default TagList;
