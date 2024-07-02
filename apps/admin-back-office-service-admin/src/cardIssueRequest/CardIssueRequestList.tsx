import * as React from "react";
import { List, Datagrid, ListProps, TextField, DateField } from "react-admin";
import Pagination from "../Components/Pagination";

export const CardIssueRequestList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"CardIssueRequests"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show">
        <TextField label="business_code" source="businessCode" />
        <TextField label="card_request_id" source="cardRequestId" />
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <TextField label="issue_date" source="issueDate" />
        <TextField label="request_status" source="requestStatus" />
        <TextField label="subscription_Type" source="subscriptionType" />
        <DateField source="updatedAt" label="Updated At" />
        <TextField label="userId" source="userId" />
      </Datagrid>
    </List>
  );
};
