import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  NumberInput,
  TextInput,
  DateTimeInput,
  SelectInput,
} from "react-admin";

export const TopUpCardRequestEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <NumberInput label="amount" source="amount" />
        <TextInput label="currency" source="currency" />
        <TextInput label="payement_method" source="payementMethod" />
        <DateTimeInput label="requestDate" source="requestDate" />
        <SelectInput
          source="status"
          label="status"
          choices={[{ label: "Option 1", value: "Option1" }]}
          optionText="label"
          allowEmpty
          optionValue="value"
        />
        <TextInput label="topup_request_id" source="topupRequestId" />
        <TextInput label="userId" source="userId" />
      </SimpleForm>
    </Edit>
  );
};
