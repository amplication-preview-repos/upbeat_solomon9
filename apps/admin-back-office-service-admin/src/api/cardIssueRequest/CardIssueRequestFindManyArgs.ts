import { CardIssueRequestWhereInput } from "./CardIssueRequestWhereInput";
import { CardIssueRequestOrderByInput } from "./CardIssueRequestOrderByInput";

export type CardIssueRequestFindManyArgs = {
  where?: CardIssueRequestWhereInput;
  orderBy?: Array<CardIssueRequestOrderByInput>;
  skip?: number;
  take?: number;
};
