import { observable, action, makeObservable } from "mobx";
class Root {
  constructor() {
    this.lang = localStorage.getItem("lang") || "zh";
    this.username = "";
    makeObservable(this, {
      lang: observable,
      username: observable,
      setLang: action,
      setUsername: action,
    });
  }
  setLang = (lang) => {
    this.lang = lang;
  };
  setUsername = (name) => {
    this.username = name;
  };
}
export default new Root();
