import dayjs from "dayjs";
import { t } from "i18next";

export function debounce(func: any, delay: any) {
  let timerId: any;
  return function (this: any) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
}

export const getTime = (time: string) => {
  if (!time) {
    return "-";
  }
  return dayjs(time).format("YYYY-M-D HH:mm:ss");
};

export const getweek = (format: string = "YY-MM-DD", date?: any) => {
  const today = (date && dayjs(date)) || dayjs(); // 今日
  let startOfWeek = today.startOf("week"); // 获取一周的开始日期 （上周日）
  if (today.day() === 0) {
    // 如果给定日期是周日 startOfWeek 会变成本周日开始
    startOfWeek = startOfWeek.subtract(7, "day"); //返回上周日
  }
  const startDate = startOfWeek.add(1, "day"); // 设置指定日期所在周的第一天（周一）
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = startDate.add(i, "day");
    dates.push(date.format(format));
  }
  return dates;
};

export const download = async (callback: Function, title = "download") => {
  const data = await callback();
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${title}.xlsx`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
export const renderLabel = (v: string) => {
  return v ? t(v) : "-";
};

export const getColorData: any = (t: any) => {
  return [
    // 1: "#4cc2ee",//正常出勤
    // 2: "#ff0000",//体验课
    // 3: "#9d9d9d",// 学生正常取消
    // 4: "#ffff00",// 学生紧急取消
    // 5: "#a419d3",//教师紧急取消
    // 6: "#ff9900",//教师正常取消
    // 7: "#fa0eb7",//教师缺勤
    { key: "0", label: t("not started"), color: "#FFFFFF" },
    { key: "1", label: t("normal attendance"), color: "#4cc2ee" },
    { key: "2", label: t("experience course"), color: "#ff0000" },
    { key: "3", label: t("student cancellation"), color: "#9d9d9d" },
    { key: "4", label: t("student emergency cancellation"), color: "#ffff00" },
    { key: "5", label: t("teacher emergency cancellation"), color: "#a419d3" },
    { key: "6", label: t("teacher cancellation"), color: "#ff9900" },
    { key: "7", label: t("teacher absent"), color: "#fa0eb7" },
    { key: "8", label: t("delete course") },
  ];
};
export const getTrialClass: any = (t: any) => {
  return [
    { value: "1", label: t("european and american trial classes") },
    { value: "2", label: t("philippines trial classes") },
    { value: "3", label: t("chinese teachers trial classes") },
    { value: "4", label: t("chinese class trial classes") },
  ];
};

export const getClassCategory = (t: any) => {
  return [
    { value: "1", label: t("european and american formal classes") },
    { value: "2", label: t("philippines formal classes") },
    { value: "3", label: t("chinese teachers formal classes") },
    { value: "4", label: t("chinese teaching group class") },
  ];
};

export const validateInNumber = (value: any, t: any) => {
  if (value && !/^\d+$/.test(value)) {
    return Promise.reject(t("please enter a valid integer"));
  }
  return Promise.resolve();
};

export const validateNumber = (value: any, t: any) => {
  if (value && !/^(-)?\d+(\.\d+)?$/.test(value)) {
    return Promise.reject(t("please enter a valid number."));
  }
  return Promise.resolve();
};
