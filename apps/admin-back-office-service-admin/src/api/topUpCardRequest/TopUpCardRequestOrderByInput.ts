import { SortOrder } from "../../util/SortOrder";

export type TopUpCardRequestOrderByInput = {
  amount?: SortOrder;
  createdAt?: SortOrder;
  currency?: SortOrder;
  id?: SortOrder;
  payementMethod?: SortOrder;
  requestDate?: SortOrder;
  status?: SortOrder;
  topupRequestId?: SortOrder;
  updatedAt?: SortOrder;
  userId?: SortOrder;
};
