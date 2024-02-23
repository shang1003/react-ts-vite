import { Delete } from "./Delete";
import { Edit } from "./Edit";
import { ClassRecord } from "./ClassRecord";
import { Bind } from "./Bind";
export const actionConfigs = {
  rowActions: {
    firstAction: Bind,
    moreActions: [
      {
        action: Delete,
      },
      {
        action: Edit,
      },
      {
        action: ClassRecord,
      },
    ],
  },
};
