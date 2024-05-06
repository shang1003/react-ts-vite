import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { getTime } from "~/utils";
const RangePicker = DatePicker.RangePicker;
const App: React.FC<dynamic.ComponentProps> = (props) => {
  const {
    onChange,
    format = "YYYY-M-D HH:mm:ss",
    value = "",
    showTime = true,
    isRange = false,
    ...res
  } = props;

  const handleChange = (value: any, dateString: any) => {
    onChange(dateString);
  };
  console.log(dayjs(value, format), " dayjs(value, format)");

  const attr = {
    style: { height: "32px" },
    defaultValue: isRange
      ? value && [dayjs(value[0], format), dayjs(value[1], format)]
      : value && dayjs(value, format),
    format,
    showTime,
    onChange: handleChange,

    ...res,
  };
  return (isRange && <RangePicker {...attr} />) || <DatePicker {...attr} />;
};

export default App;
