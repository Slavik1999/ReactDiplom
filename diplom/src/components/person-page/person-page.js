import React, { useEffect, useState, useMemo } from "react";
import { Link, withRouter } from "react-router-dom";
import ArticleList from "../article-list";
import Services from "../../services/services";
import GetUser from "../../services/getUser";
import Follow from "../follow";

import "./person-page.css";

const PersonPage = ({ loggedIn, match, username }) => {
  const [user, setUser] = useState("");
  const [userArticles, setUserArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followLink, setFollowLink] = useState("");
  const [articlesPage, setArticlesPage] = useState(0);

  const [myPost, setMyPost] = useState(true);
  const [favoritedPost, setFavoritedPost] = useState(false);

  const [myPostLink, setMyPostLink] = useState(true);
  const [favoritedPostLink, setFavoritedPostLink] = useState(false);

  const [following, setFollowing] = useState("");

  const api = useMemo(() => new Services(), []);
  const getUser = useMemo(() => new GetUser(), []);

  useEffect(() => {
    if (loggedIn) {
      if (myPost) {
        setLoading(true);
        getUser
          .getPersonArticles(match.params.username, articlesPage)
          .then(data => {
            setUserArticles(data);
            setLoading(false);
          });
        getUser.getPerson(match.params.username).then(data => {
          setUser(data.profile);
          setFollowing(data.profile.following);
        });
      } else if (favoritedPost) {
        setLoading(true);
        getUser
          .getFavoritePersonArticles(match.params.username, articlesPage)
          .then(data => {
            setUserArticles(data);
            setLoading(false);
          });
      }
    } else {
      if (myPost) {
        setLoading(true);
        api
          .getPersonArticles(match.params.username, articlesPage)
          .then(data => {
            setUserArticles(data);
            setLoading(false);
          });
        api
          .getPerson(match.params.username)
          .then(data => setUser(data.profile));
      } else if (favoritedPost) {
        setLoading(true);
        api
          .getFavoritePersonArticles(match.params.username, articlesPage)
          .then(data => {
            setUserArticles(data);
            setLoading(false);
          });
      }
    }
  }, [api, match, getUser, loggedIn, articlesPage, myPost, favoritedPost]);

  useEffect(() => {
    const GetFollowing = (username, following) => {
      if (!following) {
        getUser.getFollowing(username);
        setFollowing(true);
      } else {
        getUser.deleteFollowing(username);
        setFollowing(false);
      }
    };
    if (username) {
      if (user.username === username) {
        setFollowLink(
          <Link className="editArticle" to={`/settings`}>
            <i className="fa fa-cog" aria-hidden="true"></i> Edit Profile
            Settings
          </Link>
        );
      } else {
        if (user) {
          setFollowLink(
            <Follow
              loggedIn={loggedIn}
              username={user.username}
              GetFollowing={GetFollowing}
              following={following}
            />
          );
        }
      }
    } else {
      if (user) {
        setFollowLink(
          <Follow
            loggedIn={loggedIn}
            username={user.username}
            GetFollowing={GetFollowing}
            following={following}
          />
        );
      }
    }
  }, [username, loggedIn, user, following, getUser]);

  useEffect(() => {
    if (myPost) {
      setMyPostLink(
        <span className="activeLink" onClick={() => getUserArticles()}>
          My Posts
        </span>
      );
    } else {
      setMyPostLink(
        <span className="link" onClick={() => getUserArticles()}>
          My Posts
        </span>
      );
    }
    if (favoritedPost) {
      setFavoritedPostLink(
        <span className="activeLink" onClick={() => getFavoriteUserArticles()}>
          Favorited Posts
        </span>
      );
    } else {
      setFavoritedPostLink(
        <span className="link" onClick={() => getFavoriteUserArticles()}>
          Favorited Posts
        </span>
      );
    }
  }, [myPost, favoritedPost]);

  const getArticlePage = page => {
    setArticlesPage(page);
  };

  const getUserArticles = () => {
    setFavoritedPost(false);
    setMyPost(true);
    setArticlesPage(0);
  };
  const getFavoriteUserArticles = () => {
    setMyPost(false);
    setFavoritedPost(true);
    setArticlesPage(0);
  };

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
  );
};

export default withRouter(PersonPage);
