import { CourseTable } from "./CourseTable";
import { ClassRecord } from "./ClassRecord";
import { TeacherSalary } from "./TeacherSalary";
// import { Bind } from "./Bind";
export const actionConfigs = {
  rowActions: {
    // firstAction: Bind,
    firstAction: CourseTable,
    moreActions: [
      // {
      //   action: CourseTable,
      // },
      {
        action: ClassRecord,
      },
      {
        action: TeacherSalary,
      },
    ],
  },
};
