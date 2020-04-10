export default class Authorisation {
  _apiBase = "https://conduit.productionready.io/api";
  getResource = async (url, body, method) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const res = await fetch(`${this._apiBase}${url}`, {
      method: method,
      body: JSON.stringify(body),
      headers: headers,
    });

    return await res.json();
  };

  signIn = async (body) => {
    const signin = await this.getResource(`/users/login`, body, "POST");
    return signin;
  };
  registration = async (body) => {
    const registration = await this.getResource(`/users`, body, "POST");
    return registration;
  };
}
