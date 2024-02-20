import dayjs from "dayjs";

export function throttle(func, delay) {
  let timerId;
  let lastExecTime = 0;

  return function (...args) {
    const currentTime = Date.now();
    const elapsed = currentTime - lastExecTime;

    if (!timerId && elapsed >= delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - elapsed);
    }
  };
}

export function debounce(func, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export const getTime = (time) => {
  if (!time) {
    return "-"
  }
  return dayjs(time).format("YYYY-M-D HH:mm:ss");
};


export const getweek = (format = "YY-MM-DD", date) => {
  const today = date && dayjs(date) || dayjs();// 今日
  let startOfWeek = today.startOf('week'); // 获取一周的开始日期 （上周日）
  if (today.day() === 0) { // 如果给定日期是周日 startOfWeek 会变成本周日开始
    startOfWeek = startOfWeek.subtract(7, 'day'); //返回上周日
  }
  const startDate = startOfWeek.add(1, 'day'); // 设置指定日期所在周的第一天（周一）
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = startDate.add(i, 'day');
    dates.push(date.format(format));
  }
  return dates
}

export const download = async (callback, title = "download") => {

  const data = await callback()
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${title}.xlsx`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

}
export const renderLabel = (v) => {
  return v ? v : "-";
}

