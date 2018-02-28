import React from 'react';
import {Create, DateInput, Show, SimpleShowLayout, RichTextField, DateField, NumberField} from 'admin-on-rest';

export const ProjShow = (props) => (
  <Show title={<ProjTitle/>} {...props}>
    <SimpleShowLayout>
      <TextField source={"title"}/>
      <TextField source={"description"}/>
      <TextField source={"employer"}/>
      <NumberField source={"min_budget"}/>
      <NumberField source={"max_budget"}/>
      <DateField source={"start_date"}/>
    </SimpleShowLayout>
  </Show>
);