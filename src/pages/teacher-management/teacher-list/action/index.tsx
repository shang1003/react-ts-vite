import { Delete } from "./Delete";
import { Edit } from "./Edit";
import { CourseTable } from "./CourseTable";
import { ClassRecord } from "./ClassRecord";
import { TeacherSalary } from "./TeacherSalary";
export const actionConfigs = {
  rowActions: {
    firstAction: Delete,
    moreActions: [
      {
        action: Edit,
      },
      {
        action: CourseTable,
      },
      {
        action: ClassRecord,
      },
      {
        action: TeacherSalary,
      },
    ],
  },
};
