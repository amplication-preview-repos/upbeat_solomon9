import { FloatNullableFilter } from "../../util/FloatNullableFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";

export type TopUpCardRequestWhereInput = {
  amount?: FloatNullableFilter;
  currency?: StringNullableFilter;
  id?: StringFilter;
  payementMethod?: StringNullableFilter;
  requestDate?: DateTimeNullableFilter;
  status?: "Option1";
  topupRequestId?: StringNullableFilter;
  userId?: StringNullableFilter;
};
