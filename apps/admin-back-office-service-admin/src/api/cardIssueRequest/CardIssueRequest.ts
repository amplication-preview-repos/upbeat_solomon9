export type CardIssueRequest = {
  businessCode: string | null;
  cardRequestId: string | null;
  createdAt: Date;
  id: string;
  issueDate: Date | null;
  requestStatus?: "Option1" | null;
  subscriptionType?: "Option1" | null;
  updatedAt: Date;
  userId: string | null;
};
