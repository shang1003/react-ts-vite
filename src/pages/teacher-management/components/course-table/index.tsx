import style from "./index.module.less";
import { Ceil } from "./components/Ceil";
import DatePicker from "../DatePicker";
import { useState, useRef } from "react";
import { useFormModal } from "~/hooks/modal/FormModal";
import { editCourseTable } from "~/client/coursetable";
import root from "~/store/root";
import { getweek } from "~/utils";
import { getCoursetable } from "~/client/coursetable";
import { useFetch, useRefresh } from "~/hooks";
import { getBindStudentList, StudentType } from "~/client/salary";
import { getTeacherDetail } from "~/client/user";
import html2canvas from "html2canvas";
import classNames from "classnames";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Space } from "antd";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration"; // 导入 dayjs 的 duration 插件
import { courseTime } from "~/utils/constants";
import Notify from "~/components/notify";
// 应用 duration 插件
dayjs.extend(duration);
interface CurrentCeilType {
  id?: string;
  isShowMenu?: boolean;
}
const App: React.FC<dynamic.ComponentProps> = (props) => {
  const isTeacher = root.userinfo.role == "teacher";
  let id: any = root.userinfo.id;
  if (!isTeacher) {
    id = useParams().id;
  }

  const [courses, setCourse] = useState<any[]>([]);
  const [studentList, setStudentList] = useState<StudentType[]>([]);
  const [weeks, setWeeks] = useState(getweek()); // 格式YY-MM-DD
  const [weeksY, setWeeksY] = useState(getweek("YYYY-MM-DD")); // 格式YYYY-MM-DD
  const [currentCeil, setCurrentCeil] = useState<CurrentCeilType>({});
  const [refreshKey, refresh] = useRefresh();
  const [teacherInfo, setTeacherInfo] = useState<any>({});
  const { t } = useTranslation();
  const coursetableRef = useRef(null);
  const ceils: any[] = Array.from({ length: 24 * 7 });
  const header = [
    { name: t("course table") },
    { name: `${t("Mo")} (${weeks[0]})` },
    { name: `${t("Tu")} (${weeks[1]})` },
    { name: `${t("We")} (${weeks[2]})` },
    { name: `${t("Th")} (${weeks[3]})` },
    { name: `${t("Fr")} (${weeks[4]})` },
    { name: `${t("Sa")} (${weeks[5]})` },
    { name: `${t("Su")} (${weeks[6]})` },
  ];
  //获取课程
  useFetch(
    () => getCoursetable({ teacher_id: id || root.userinfo.id, dateArr: [weeksY[0], weeksY[6]] }),
    ({ data }) => {
      const res = data.map((course: any) => {
        const { date, start_time, end_time, name, id, status, student_id, student } = course;
        const startTime = dayjs(start_time, "HH:mm");
        const endTime = dayjs(end_time, "HH:mm");
        const h_duration = (dayjs as any).duration(endTime.diff(startTime)).asMinutes();
        const p_duration = (dayjs as any)
          .duration(startTime.diff(dayjs("00:00", "HH:mm")))
          .asMinutes();
        const totalDurationInMinutes = (dayjs as any).duration(24, "hours").asMinutes();
        const h_duration_Ratio = h_duration / totalDurationInMinutes;
        const p_duration_Ratio = p_duration / totalDurationInMinutes;
        const ceilHeight = h_duration_Ratio * 40 * 24;
        const ceilTop = p_duration_Ratio * 40 * 24;
        //new Date(date).getDay() 为0时，是周日
        const dayOfWeek = new Date(date).getDay() == 0 ? 6 : new Date(date).getDay() - 1; // 获取日期对应的星期几（0-6）
        // const ceilLeft = dayOfWeek*; // 获取日期对应的星期几（0-6）
        return {
          name,
          date,
          id,
          status,
          start_time,
          end_time,
          student_id,
          student_name: student.english_name,
          ceilHeight,
          ceilTop,
          dayOfWeek,
        };
      });
      setCourse(res);
    },
    [weeksY, id, refreshKey]
  );
  const create = () => {
    if (!studentList.length) {
      Notify.error(t("error"), t("no students bound to this teacher!"));
      return;
    }
    toggle(true);
  };
  const formItems = [
    {
      name: "student_id",
      label: t("student"),
      type: "select",
      showSearch: true,
      filterOption: (input: string, option: any) => (option?.label ?? "").includes(input),
      options: studentList.map((item) => ({ label: item.chinese_name, value: item.id })),
      required: true,
    },
    {
      name: "date",
      label: t("date"),
      needConfirm: false,
      showTime: false,
      type: "date-picker",
      format: "YYYY-MM-DD",
      required: true,
    },
    {
      name: "time",
      needConfirm: false,
      label: t("class time"),
      type: "time-range-picker",
      format: "HH:mm",
      required: true,
    },
    {
      name: "name",
      label: t("course description"),
      type: "input",
      required: true,
    },
  ];
  //创建课程
  const [toggle, FormModal] = useFormModal({
    submit: (values) => {
      const { student_id, name, date, time } = values;

      const start_time = time[0].format("HH:mm");
      const end_time = time[1].format("HH:mm");
      return editCourseTable({ start_time, end_time, student_id, teacher_id: id, date, name }).then(
        () => {}
      );
    },
    height: 250,
    title: t("course info"),
    formItems,
    refresh,
    formProps: {
      successTip: t("{{name}} success", { name: t("edit") }),
    },
  });

  useFetch(
    () => getBindStudentList(id),
    ({ data }) => {
      setStudentList(data);
    },
    [id]
  );
  useFetch(
    () => {
      return getTeacherDetail({ id });
    },
    (detail) => {
      setTeacherInfo(detail);
    },
    [id]
  );

  const handleData = (data: CurrentCeilType) => {
    setCurrentCeil(data);
  };

  // 下载为图片
  function savePageAsImage() {
    // 使用html2canvas将DOM元素转换为Canvas
    const element = coursetableRef.current as any;
    element.style.height = 1100 + "px";
    html2canvas(element, {
      scrollX: 0,
      scrollY: 0,
    }).then(function (canvas) {
      // 创建一个图像对象
      const image = new Image();
      image.src = canvas.toDataURL("image/png");
      // 创建一个下载链接并触发下载
      const link = document.createElement("a");
      link.href = image.src;
      link.download = `${name} ${weeks[0]}-${weeks[6]}课表.png`;
      link.click();
      element.style.height = "";
    });
  }
  const handleClickDate = (v: any) => {
    setWeeksY(getweek("YYYY-MM-DD", v));
    setWeeks(getweek("YY-MM-DD", v));
  };

  return (
    <div>
      <FormModal />
      <div className={style.header}>
        <Space>
          <DatePicker handleClickDate={handleClickDate} />
          {!isTeacher && (
            <Button
              onClick={() => {
                create();
              }}
              type='primary'
            >
              {t("create")}
            </Button>
          )}
          <div>
            <Button onClick={savePageAsImage}>{t("download")}</Button>
          </div>
        </Space>
      </div>
      <div ref={coursetableRef} key={id} className={classNames(style.wrapper)}>
        <div className={classNames(style.flex, style.blod)}>
          {header.map((item) => {
            return (
              <div key={item.name} className={classNames(style.ceil, style["flex8"])}>
                {item.name}
              </div>
            );
          })}
        </div>
        <div className={style.bottom}>
          <div className={style.left}>
            {courseTime.map((item: any) => {
              return (
                <div key={item.name} className={classNames(style.ceil, style["flex7"])}>
                  {item.name}
                </div>
              );
            })}
          </div>
          <div className={style.right}>
            <div className={`${style.flex}`}>
              {ceils.map((_, index: any) => {
                return <div key={index} className={classNames(style.ceil, style["flex7"])} />;
              })}
              {courses.map((item) => {
                const cssStyle = {
                  height: item.ceilHeight,
                  inset: `${item.ceilTop}px 0% 0 calc(${
                    (1 / 7) * 100 * (item.dayOfWeek as number)
                  }%)`,
                };
                return (
                  <Ceil
                    studentList={studentList}
                    refresh={refresh}
                    style={cssStyle}
                    data={{ ...item, teacher_name: teacherInfo.name, teacher_id: id }}
                    currentCeil={currentCeil}
                    handleData={handleData}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
