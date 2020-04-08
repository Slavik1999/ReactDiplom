export default class Services {
  _apiBase = "https://conduit.productionready.io/api";
  getResource = async url => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  getTags = async () => {
    const tags = await this.getResource(`/tags/`);
    return tags;
  };
  getArticles = async (page, tag) => {
    const articles = await this.getResource(
      `/articles?tag=${tag}&limit=10&amp;offset=${page * 10}/`
    );
    return articles;
  };
  getArticle = async slug => {
    const article = await this.getResource(`/articles/${slug}/`);
    return article;
  };
  getPerson = async username => {
    const article = await this.getResource(`/profiles/${username}`);
    return article;
  };
  getPersonArticles = async (username, page) => {
    const article = await this.getResource(
      `/articles?author=${username}&limit=10&offset=${page * 10}`
    );
    return article;
  };
  getFavoritePersonArticles = async (username, page) => {
    const article = await this.getResource(
      `/articles?favorited=${username}&limit=10&offset=${page * 10}`
    );
    return article;
  };
}
//https://conduit.productionready.io/api/users/login
// const user = {
//   user: {
//     email: "Slava2019@yandex.ru",
//     password: "qqqqww12",
//     username: "Slaa2019"
//   }
// };
// const headers = {
//   accept: "application/json",
//   "content-type": "application/json"
// };

// fetch("https://conduit.productionready.io/api/users", {
//   method: "POST",
//   body: JSON.stringify(user),
//   headers: headers
// }).then(response => console.log(response));
