import { observable, action, makeObservable, makeAutoObservable } from "mobx";
import { ORGADM, OTHER_ROLE, TEACHER_ROLE } from "~/utils/constants";
class Root {
  constructor() {
    this.lang = localStorage.getItem("lang") || "en";
    this.refreshKey = 0;
    this.userinfo = {
      username: "",
      english_name: "",
      id: "",
      role: "teacher",
      avatar: "",
    };
    makeObservable(this, {
      lang: observable,
      userinfo: observable,
      refreshKey: observable,
      setLang: action,
      setUserinfo: action,
      refresh: action,
    });
    // makeAutoObservable(this)
  }

  get isOrgadmRole() {
    return this.userinfo.role == ORGADM;
  }
  get isTeacherRole() {
    return this.userinfo.role == TEACHER_ROLE;
  }
  get isOtherRole() {
    return OTHER_ROLE.includes(this.userinfo.role);
  }
  setLang = (lang) => {
    this.lang = lang;
  };
  setUserinfo = (info) => {
    this.userinfo = info;
  };
  refresh() {
    this.refreshKey = Date.now();
  }
}
export default new Root();
