import React, { useEffect, useState } from "react";

import "./error-list.css";

const ErrorList = ({ errors }) => {
  const [error, setError] = useState([]);

  useEffect(() => {
    if (errors) {
      const arr = [];
      for (let key in errors) {
        arr.push(`${key} ${errors[key]}`);
      }
      setError(arr);
    }
  }, [errors]);

  const errorListItem = error.map((error) => {
    return <li key={error}>{error}</li>;
  });

  return <ul>{errorListItem}</ul>;
};
export default ErrorList;
