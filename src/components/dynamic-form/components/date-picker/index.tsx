import React from 'react';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';

const { RangePicker } = DatePicker;
const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    console.log('onOk: ', value);
};

const App: React.FC<dynamic.ComponentProps> = (props) => {
    const { onChange, value, ...res } = props;
    const handleChange = (
        value: DatePickerProps['value'] | RangePickerProps['value'],
        dateString: [string, string] | string,
    ) => {
        onChange(value)
    };
    return <DatePicker defaultValue={value} showTime onChange={handleChange} onOk={onOk} {...res} />

};

export default App;