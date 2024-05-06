import { Delete } from "./Delete";
import { Edit } from "./Edit";
export const actionConfigs = {
  rowActions: {
    firstAction: Delete,
    moreActions: [
      {
        action: Edit
      }
    ],
  },
};
