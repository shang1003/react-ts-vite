import style from './index.module.less'
import { Ceil } from './components/Ceil';
import DatePicker from "./components/DatePicker"
import { useState } from 'react';
import root from '~/store/root';
import { getweek } from '~/utils';
import { getCourseTable, CourseTableType } from '~/client/user';
import { useFetch,useRefresh } from '~/hooks';
import classNames from 'classnames';

interface CurrentCeilType { id?: string, isShowMenu?: boolean }
const App: React.FC<dynamic.ComponentProps> = (props) => {
    const isOrgadm = root.userinfo.role == "orgadm"
    const { id, student_id, student_name } = isOrgadm && props.data || {};
    const [courses, setCourse] = useState<CourseTableType[]>([])
    const [weeks, setWeeks] = useState(getweek()) // 格式YY-MM-DD
    const [weeksY, setWeeksY] = useState(getweek("YYYY-MM-DD")) // 格式YYYY-MM-DD
    const [currentCeil, setCurrentCeil] = useState<CurrentCeilType>({})
    const [refreshKey, refresh] = useRefresh();
    useFetch(
        () => getCourseTable({ id: id || root.userinfo.id, date: [weeksY[0], weeksY[6]] }),
        ({ data }) => {
            // 创建一个空的课程表数组，包含每节课的时间和每天的课程
            // dayOfWeek 周一到周日(0-6)
            // timeSlot 一天12节课（0-11）
            const timetable: any[] = Array.from({ length: 12 }, (_, timeSlot) =>
                Array.from({ length: 7 }, (_, dayOfWeek) => ({ name: undefined, dayOfWeek, date: weeksY[dayOfWeek], timeSlot }))
            );
            // 将 TeacherCourse 数据填充到课程表数组中            
            data.forEach((course: any) => {
                const { timeSlot, date, name, id, status } = course;
                //new Date(date).getDay() 为0时，是周日
                const dayOfWeek = new Date(date).getDay() == 0 ? 6 : new Date(date).getDay() - 1; // 获取日期对应的星期几（0-6）

                timetable[timeSlot][dayOfWeek] = { ...timetable[timeSlot][dayOfWeek], name, id, status }; // 注意索引从0开始，所以需要减1
            });
            let result: any = []
            timetable.forEach(item => {
                result = [...result, ...item]
            })

            setCourse(result);
        },
        [weeksY, root.userinfo.id,refreshKey]
    );

    const handleData = (data: CurrentCeilType) => {
        setCurrentCeil(data)
    }
    const handleClickDate = (v: any) => {
        setWeeksY(getweek("YYYY-MM-DD", v))
        setWeeks(getweek("YY-MM-DD", v))
    }
    const headerStyle = {
        marginTop: -36
    }

    const header = [
        { id: "", name: "课程", isDisabled: true },
        { id: "", name: `周一 (${weeks[0]})`, isDisabled: true },
        { id: "", name: `周二 (${weeks[1]})`, isDisabled: true },
        { id: "", name: `周三 (${weeks[2]})`, isDisabled: true },
        { id: "", name: `周四 (${weeks[3]})`, isDisabled: true },
        { id: "", name: `周五 (${weeks[4]})`, isDisabled: true },
        { id: "", name: `周六 (${weeks[5]})`, isDisabled: true },
        { id: "", name: `周日 (${weeks[6]})`, isDisabled: true },
    ]
    const courseTime = [
        { timeSlot: 1, name: "09:00-09:45", isDisabled: true },
        { timeSlot: 2, name: "10:00-10:45", isDisabled: true },
        { timeSlot: 3, name: "11:00-11:45", isDisabled: true },
        { timeSlot: 4, name: "12:00-12:45", isDisabled: true },
        { timeSlot: 5, name: "13:00-13:45", isDisabled: true },
        { timeSlot: 6, name: "14:00-14:45", isDisabled: true },
        { timeSlot: 7, name: "15:00-15:45", isDisabled: true },
        { timeSlot: 8, name: "16:00-16:45", isDisabled: true },
        { timeSlot: 9, name: "17:00-17:45", isDisabled: true },
        { timeSlot: 10, name: "18:00-18:45", isDisabled: true },
        { timeSlot: 11, name: "19:00-19:45", isDisabled: true },
        { timeSlot: 12, name: "20:00-20:45", isDisabled: true },
    ]

    return <div >
        <div className={style.header} style={headerStyle}>
            <DatePicker handleClickDate={handleClickDate} />
        </div>
        <div className={classNames(!isOrgadm && style.wrapper2, style.wrapper)}>
            <div className={classNames(style.flex, style.blod)}>
                {
                    header.map((item) => {
                        return <Ceil  flex="flex8" key={item.name} data={item} currentCeil={currentCeil} teacher_id={id} />
                    })
                }
            </div>
            <div className={style.bottom}>
                <div className={style.left}>
                    {courseTime.map((item: any, index: any) => {
                        return <Ceil  key={index} data={item} currentCeil={currentCeil} handleData={handleData} teacher_id={id} />
                    })}
                </div>
                <div className={style.right}>
                    <div className={`${style.flex} ${style.content}`}>
                        {courses.map((item: any, index: any) => {
                            return <Ceil refresh={refresh} key={`${item.date}${item.timeSlot}${root.userinfo.id}${refreshKey}`} studentInfo={{ student_id, student_name }} data={item} currentCeil={currentCeil} handleData={handleData} teacher_id={id} />
                        })}
                    </div>
                </div>

            </div>
        </div>
    </div>;
};

export default App;
