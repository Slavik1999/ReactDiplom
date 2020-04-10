export default class WithTokenAndBody {
  _apiBase = "https://conduit.productionready.io/api";
  getResource = async (url, body, method) => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Token ${localStorage.getItem("token")}`,
    };
    const res = await fetch(`${this._apiBase}${url}`, {
      method: method,
      body: JSON.stringify(body),
      headers: headers,
    });

    return await res.json();
  };

  postArticle = async (body) => {
    const article = await this.getResource("/articles/", body, "POST");
    return article;
  };
  editArticle = async (body, slug) => {
    const article = await this.getResource(`/articles/${slug}`, body, "PUT");
    return article;
  };
  deleteArticle = async (slug) => {
    const article = await this.getResource(`/articles/${slug}`, "", "DELETE");
    return article;
  };
  editPerson = async (body) => {
    const person = await this.getResource(`/user`, body, "PUT");
    return person;
  };
}
