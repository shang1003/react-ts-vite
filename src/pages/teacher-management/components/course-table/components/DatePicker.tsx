import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
const App: React.FC<any> = (props) => {
    const { handleClickDate } = props
    const disabledDate = (current: dayjs.Dayjs | null) => {
        if (current) {
            // 获取当前日期的结束时间
            const currentEndOfWeek = dayjs().endOf('week');
            // 判断当前日期是否在本周以后
            return current.isAfter(currentEndOfWeek);
        }

        return false; // 允许选择当前日期
    };
    return <DatePicker allowClear={false} defaultValue={dayjs()} picker='week' onChange={handleClickDate} />;
};

export default App;