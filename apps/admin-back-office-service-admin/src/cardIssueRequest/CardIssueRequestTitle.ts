import { CardIssueRequest as TCardIssueRequest } from "../api/cardIssueRequest/CardIssueRequest";

export const CARDISSUEREQUEST_TITLE_FIELD = "businessCode";

export const CardIssueRequestTitle = (record: TCardIssueRequest): string => {
  return record.businessCode?.toString() || String(record.id);
};
