export interface CourseInfoType {
  teacher_name?: string;
  name?: string;
  student_name?: string;
  date?: string;
  start_time?: string;
  end_time?: string;
  colorInfo: Record<string, any>;
  status?: any;
}
import { useTranslation } from "react-i18next";
export const CourseInfo: React.FC<CourseInfoType> = (info) => {
  console.log(info);

  const { t } = useTranslation();
  return (
    <>
      <p>
        {t("course name")}：{info.name}
      </p>
      <p>
        {t("teacher name")}：{info.teacher_name}
      </p>
      <p>
        {t("student name")}：{info.student_name}
      </p>
      <p>
        {t("class time")}：{info.date} {info.start_time}~{info.end_time}
      </p>
      <p>
        {t("course status")}：{info.status ? info.colorInfo.label : t("not started")}
      </p>
    </>
  );
};
