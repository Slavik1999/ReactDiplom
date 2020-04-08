export default class GetUser {
  _apiBase = "https://conduit.productionready.io/api";
  getResource = async (url, method) => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Token ${localStorage.getItem("token")}`
    };
    const res = await fetch(`${this._apiBase}${url}`, {
      method: method,
      headers: headers
    });

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  getUserLoginInfo = async () => {
    const article = await this.getResource(`/user`, "GET");
    return article;
  };
  getLike = async slug => {
    const user = await this.getResource(`/articles/${slug}/favorite`, "POST");
    return user;
  };
  deleteLike = async slug => {
    const user = await this.getResource(`/articles/${slug}/favorite`, "DELETE");
    return user;
  };
  getFollowing = async username => {
    const user = await this.getResource(`/profiles/${username}/follow`, "POST");
    return user;
  };
  deleteFollowing = async username => {
    const user = await this.getResource(
      `/profiles/${username}/follow`,
      "DELETE"
    );
    return user;
  };
  getArticles = async (page, tag) => {
    const articles = await this.getResource(
      `/articles?tag=${tag}&limit=10&amp;offset=${page * 10}/`,
      "GET"
    );
    return articles;
  };
  getFeedArticles = async page => {
    const articles = await this.getResource(
      `/articles/feed?limit=10&amp;offset=${page * 10}/`,
      "GET"
    );
    return articles;
  };
  getPersonArticles = async (username, page) => {
    const article = await this.getResource(
      `/articles?author=${username}&limit=10&offset=${page * 10}`,
      "GET"
    );
    return article;
  };
  getFavoritePersonArticles = async (username, page) => {
    const article = await this.getResource(
      `/articles?favorited=${username}&limit=10&offset=${page * 10}`,
      "GET"
    );
    return article;
  };
  getArticle = async slug => {
    const article = await this.getResource(`/articles/${slug}`, "GET");
    return article;
  };
  getPerson = async username => {
    const article = await this.getResource(`/profiles/${username}`, "GET");
    return article;
  };
}

// /api/articles/feed?limit=10&offset=0
