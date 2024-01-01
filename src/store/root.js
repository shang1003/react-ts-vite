import { observable, action, makeObservable } from "mobx";
class Root {
  constructor() {
    this.lang = localStorage.getItem("lang") || "zh";
    this.userinfo = {
      username:'',
      id:'',
      avatar:''
    };
    makeObservable(this, {
      lang: observable,
      userinfo: observable,
      setLang: action,
      setUserinfo: action,
    });
  }
  setLang = (lang) => {
    this.lang = lang;
  };
  setUserinfo = (info) => {
    this.userinfo = info;
  };
}
export default new Root();
