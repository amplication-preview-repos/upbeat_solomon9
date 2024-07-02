import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";

export type CardIssueRequestWhereInput = {
  businessCode?: StringNullableFilter;
  cardRequestId?: StringNullableFilter;
  id?: StringFilter;
  issueDate?: DateTimeNullableFilter;
  requestStatus?: "Option1";
  subscriptionType?: "Option1";
  userId?: StringNullableFilter;
};
