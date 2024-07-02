import { SortOrder } from "../../util/SortOrder";

export type CardIssueRequestOrderByInput = {
  businessCode?: SortOrder;
  cardRequestId?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  issueDate?: SortOrder;
  requestStatus?: SortOrder;
  subscriptionType?: SortOrder;
  updatedAt?: SortOrder;
  userId?: SortOrder;
};
