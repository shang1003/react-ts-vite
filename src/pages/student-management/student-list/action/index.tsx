import { Delete } from "./Delete";
import { Edit } from "./Edit";
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
    ],
  },
};
