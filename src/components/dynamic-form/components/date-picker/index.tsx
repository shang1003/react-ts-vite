import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs'
import { getTime } from '~/utils';

const App: React.FC<dynamic.ComponentProps> = (props) => {
    const { onChange, value = '', ...res } = props;
    const handleChange = (
        value: any,
    ) => {
        onChange(dayjs(value).format('YYYY-MM-DD HH:mm:ss'))
    };

    return <DatePicker style={{height:'32px'}} size='large' defaultValue={value && dayjs(getTime(value), 'YYYY-M-D HH:mm:ss')} format="YYYY-M-D HH:mm:ss" showTime onChange={handleChange}  {...res} />

};

export default App;