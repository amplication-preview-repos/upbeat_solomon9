import { TopUpCardRequest as TTopUpCardRequest } from "../api/topUpCardRequest/TopUpCardRequest";

export const TOPUPCARDREQUEST_TITLE_FIELD = "currency";

export const TopUpCardRequestTitle = (record: TTopUpCardRequest): string => {
  return record.currency?.toString() || String(record.id);
};
