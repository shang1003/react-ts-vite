import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs'
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    console.log('onOk: ', value);
};

const App: React.FC<dynamic.ComponentProps> = (props) => {
    const { onChange, value, ...res } = props;
    const handleChange = (
        value: DatePickerProps['value'] | RangePickerProps['value'],
    ) => {
        onChange(value)
    };
    return <DatePicker defaultValue={dayjs(value, 'YYYY-MM-DD mm:ss')}   format="YYYY-MM-DD HH:mm:ss"  showTime onChange={handleChange} onOk={onOk} {...res} />

};

export default App;