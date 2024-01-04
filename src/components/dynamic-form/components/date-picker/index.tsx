import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs'
import { getTime } from '~/utils';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    console.log('onOk: ', value);
};

const App: React.FC<dynamic.ComponentProps> = (props) => {
    const { onChange, value = '', ...res } = props;
    const handleChange = (
        value: any,
    ) => {
        onChange(dayjs(value).format('YYYY-MM-DD HH:mm:ss'))
    };
    console.log(value, dayjs(value, 'YYYY-MM-DD HH:mm:ss'), '=====ss');

    return <DatePicker defaultValue={value && dayjs(getTime(value), 'YYYY-M-D HH:mm:ss')} format="YYYY-M-D HH:mm:ss" showTime onChange={handleChange} onOk={onOk} {...res} />

};

export default App;