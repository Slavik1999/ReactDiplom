import React, { useEffect, useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation from "./components/nav-bar";
import UserSettings from "./components/user-settings";
import NewArticle from "./components/new-article";
import Header from "./components/header";
import RegistrationFrom from "./components/registration-form";
import AuthorizationForm from "./components/authorization-form";
import HomePage from "./components/home-page";
import PersonPage from "./components/person-page";
import ArticlePage from "./components/article-page";

import ServicesWithToken from "./services/servicesWithToken";

import "./App.css";

const App = () => {
  const servicesWithToken = useMemo(() => new ServicesWithToken(), []);

  const [homePage, setHomePage] = useState("");
  const [change, setChange] = useState("");

  useEffect(() => {
    const changeUser = (change) => {
      setChange(change);
    };

    const home = (loggedIn, user) => {
      return (
        <div className="containerApp">
          <Router>
            <Navigation loggedIn={loggedIn} user={user} />
            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  return (
                    <React.Fragment>
                      <Header />
                      <HomePage loggedIn={loggedIn} />
                    </React.Fragment>
                  );
                }}
              />
              <Route
                path="/article/:slug?"
                render={() => (
                  <ArticlePage loggedIn={loggedIn} username={user.username} />
                )}
              />
              <Route path="/editor/:slug?" component={NewArticle} exact />
              <Route
                path="/settings"
                render={() => (
                  <UserSettings user={user} changeUser={changeUser} />
                )}
              />

              <Route
                path="/register"
                render={() => (
                  <RegistrationFrom
                    loggedIn={loggedIn}
                    changeUser={changeUser}
                  />
                )}
              />
              <Route
                path="/login"
                render={() => (
                  <AuthorizationForm
                    loggedIn={loggedIn}
                    changeUser={changeUser}
                  />
                )}
              />
              <Route
                path="/profile/:username?"
                render={() => (
                  <PersonPage loggedIn={loggedIn} username={user.username} />
                )}
              />
            </Switch>
          </Router>
        </div>
      );
    };

    if (localStorage.getItem("token")) {
      servicesWithToken.getUserLoginInfo().then((data) => {
        setHomePage(home(true, data.user));
      });
    } else {
      setHomePage(home(false, {}));
    }
  }, [servicesWithToken, change]);

  return <React.Fragment>{homePage}</React.Fragment>;
};
export default App;

// const App = () => {
//   const [change, setChange] = useState("");
//   const [loggedIn, setLoggedIn] = useState(null);
//   const [user, setUser] = useState("");

//   const servicesWithToken = useMemo(() => new servicesWithToken(), []);
//   const changeUser = (change) => {
//     setChange(change);
//   };

//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       servicesWithToken.getUserLoginInfo().then((data) => {
//         setLoggedIn(true);
//         setUser(data.user);
//       });
//     } else {
//       setLoggedIn(false);
//       setUser({});
//     }
//   }, [servicesWithToken, change]);

//   return (
//     <div className="containerApp">
//       <Router>
//         <Navigation loggedIn={loggedIn} user={user} />
//         <Switch>
//           <Route
//             exact
//             path="/"
//             render={() => {
//               return (
//                 <React.Fragment>
//                   <Header />
//                   <HomePage loggedIn={loggedIn} />
//                 </React.Fragment>
//               );
//             }}
//           />
//           <Route
//             path="/article/:slug?"
//             render={() => (
//               <ArticlePage loggedIn={loggedIn} username={user.username} />
//             )}
//           />
//           <Route path="/editor/:slug?" component={NewArticle} exact />
//           <Route
//             path="/settings"
//             render={() => <UserSettings user={user} changeUser={changeUser} />}
//           />

//           <Route
//             path="/register"
//             render={() => (
//               <RegistrationFrom loggedIn={loggedIn} changeUser={changeUser} />
//             )}
//           />
//           <Route
//             path="/login"
//             render={() => (
//               <AuthorizationForm loggedIn={loggedIn} changeUser={changeUser} />
//             )}
//           />
//           <Route
//             path="/profile/:username?"
//             render={() => (
//               <PersonPage loggedIn={loggedIn} username={user.username} />
//             )}
//           />
//         </Switch>
//       </Router>
//     </div>
//   );
// };
// export default App;
