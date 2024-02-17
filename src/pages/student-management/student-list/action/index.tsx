import { Delete } from "./Delete";
import { Edit } from "./Edit";
import { ClassRecord } from "./ClassRecord";
export const actionConfigs = {
  rowActions: {
    firstAction: Delete,
    moreActions: [
      {
        action: Edit,
      },
      {
        action: ClassRecord,
      },
    ],
  },
};
