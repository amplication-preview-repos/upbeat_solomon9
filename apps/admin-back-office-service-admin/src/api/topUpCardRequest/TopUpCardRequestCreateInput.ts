export type TopUpCardRequestCreateInput = {
  amount?: number | null;
  currency?: string | null;
  payementMethod?: string | null;
  requestDate?: Date | null;
  status?: "Option1" | null;
  topupRequestId?: string | null;
  userId?: string | null;
};
