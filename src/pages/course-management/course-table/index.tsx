import style from './index.module.less'
import { Ceil } from './components/Ceil';
import { useState } from 'react';
import { getweek } from '~/utils';
import { getCourseTable, CourseTableType } from '~/client/user';
import { useFetch } from '~/hooks';
const weeks = getweek()
const App: React.FC<dynamic.ComponentProps> = (props) => {
    const { content, className, disabled, onChange, value, ...res } = props;
    useFetch(
        getCourseTable,
        ({ data }) => {
            return setCourse(data);
        },
        []
    );
    const header = [
        { id: "1", name: "课程", isDisabled: true },
        { id: "2", name: `周一 (${weeks[0]})`, isDisabled: true },
        { id: "3", name: `周二 (${weeks[1]})`, isDisabled: true },
        { id: "4", name: `周三 (${weeks[2]})`, isDisabled: true },
        { id: "5", name: `周四 (${weeks[3]})`, isDisabled: true },
        { id: "6", name: `周五 (${weeks[4]})`, isDisabled: true },
        { id: "7", name: `周六 (${weeks[5]})`, isDisabled: true },
        { id: "8", name: `周日 (${weeks[6]})`, isDisabled: true },
    ]

    const [courses, setCourse] = useState<CourseTableType[]>([])
    return <div className={style.wrapper}>
        <div className={style.flex}>
            {header.map((item, index) => {
                return <Ceil key={index} data={item} />
            })}
            {courses.map((item, index) => {
                return <Ceil key={index} data={item} />
            })}
        </div>
    </div>;
};

export default App;
