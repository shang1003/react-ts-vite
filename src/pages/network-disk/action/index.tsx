import { Delete } from "./Delete";
import { Preview } from "./Preview";
import { Download } from "./Download";
export const actionConfigs = {
  rowActions: {
    firstAction: Preview,
    moreActions: [
      {
        action: Download,
      },
      {
        action: Delete,
      },
    ],
  },
};
