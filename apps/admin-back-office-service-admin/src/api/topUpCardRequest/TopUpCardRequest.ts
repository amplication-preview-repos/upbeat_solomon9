export type TopUpCardRequest = {
  amount: number | null;
  createdAt: Date;
  currency: string | null;
  id: string;
  payementMethod: string | null;
  requestDate: Date | null;
  status?: "Option1" | null;
  topupRequestId: string | null;
  updatedAt: Date;
  userId: string | null;
};
