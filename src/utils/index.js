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
  return dayjs(time).format("YYYY-M-D HH:mm:ss");
};


export const getweek = (format = "MM-DD") => {
  const startDate = dayjs(getTime(Date.now())).startOf('week').add(1, 'day'); // 设置指定日期所在周的第一天（周一）
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = startDate.add(i, 'day');
    dates.push(date.format(format));
  }
  return dates
}

