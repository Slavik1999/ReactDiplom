import React, { useEffect, useState, useMemo } from "react";
import { Link, withRouter } from "react-router-dom";
import ArticleList from "../article-list";
import Follow from "../follow";

import Services from "../../services/services";
import ServicesWithToken from "../../services/servicesWithToken";

import "./person-page.css";

const PersonPage = ({ loggedIn, match, username }) => {
  const services = useMemo(() => new Services(), []);
  const servicesWithToken = useMemo(() => new ServicesWithToken(), []);

  const [user, setUser] = useState("");
  const [userArticles, setUserArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(null);

  const [articlesPage, setArticlesPage] = useState(0);

  const [favoritedPost, setFavoritedPost] = useState(false);

  const [followLink, setFollowLink] = useState("");
  const [myPostLink, setMyPostLink] = useState(true);
  const [favoritedPostLink, setFavoritedPostLink] = useState(false);

  useEffect(() => {
    let unmounted = false;
    let service;
    if (loggedIn) {
      service = servicesWithToken;
    } else {
      service = services;
    }
    if (favoritedPost) {
      setLoading(true);
      service
        .getFavoritePersonArticles(match.params.username, articlesPage)
        .then((data) => {
          if (!unmounted) {
            setUserArticles(data);
            setLoading(false);
          }
        });
    } else {
      setLoading(true);
      service
        .getPersonArticles(match.params.username, articlesPage)
        .then((data) => {
          if (!unmounted) {
            setUserArticles(data);
            setLoading(false);
          }
        });
      service.getPerson(match.params.username).then((data) => {
        if (!unmounted) {
          setUser(data.profile);
          setFollowing(data.profile.following);
        }
      });
    }
    return () => {
      unmounted = true;
    };
  }, [
    services,
    match,
    servicesWithToken,
    loggedIn,
    articlesPage,
    favoritedPost,
  ]);

  useEffect(() => {
    const getFollowing = (username, following) => {
      if (!following) {
        servicesWithToken.getFollowing(username);
        setFollowing(true);
      } else {
        servicesWithToken.deleteFollowing(username);
        setFollowing(false);
      }
    };
    if (user.username === username) {
      setFollowLink(
        <Link className="editArticle" to={`/settings`}>
          <i className="fa fa-cog" aria-hidden="true"></i> Edit Profile Settings
        </Link>
      );
    } else {
      setFollowLink(
        <Follow
          loggedIn={loggedIn}
          username={user.username}
          GetFollowing={getFollowing}
          following={following}
        />
      );
    }
  }, [username, loggedIn, user, following, servicesWithToken]);

  const getArticlePage = (page) => {
    setArticlesPage(page);
  };

  const getArticles = (choose) => {
    setFavoritedPost(choose);
    setArticlesPage(0);
  };

  useEffect(() => {
    let favoritedPostClassName = "link";
    let myPostClassName = "link";

    if (favoritedPost) {
      favoritedPostClassName = "activeLink";
    } else {
      myPostClassName = "activeLink";
    }
    setFavoritedPostLink(
      <span
        className={favoritedPostClassName}
        onClick={() => getArticles(true)}
      >
        Favorited Posts
      </span>
    );
    setMyPostLink(
      <span className={myPostClassName} onClick={() => getArticles(false)}>
        My Posts
      </span>
    );
  }, [favoritedPost]);

  const Loading = loading ? <h3>Loading articles...</h3> : null;
  const UserArticles = !loading ? (
    <ArticleList
      articles={userArticles}
      loggedIn={loggedIn}
      getArticlePage={getArticlePage}
      articlesPage={articlesPage}
    />
  ) : null;
  const noArticles =
    !loading && !userArticles.articlesCount ? (
      <div className="noArticles">No articles are here... yet.</div>
    ) : null;
  return (
    <React.Fragment>
      {user && (
        <React.Fragment>
          <div className="profileHeader">
            <div className="profileAvatar">
              <img className="avatar" src={user.image} alt="" />
              <br></br>
              <span className="profileName">{user.username}</span>
              <br></br>
              <span className="bio">{user.bio}</span>
            </div>
            <div className="container buttonFollow">{followLink}</div>
          </div>

          <div className="container linkProfiles">
            {myPostLink}
            {favoritedPostLink}
            {Loading}
            {noArticles}
            {UserArticles}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default withRouter(PersonPage);
