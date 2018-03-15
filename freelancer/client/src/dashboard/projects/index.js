import React from 'react';
import {List, Datagrid, TextField, ShowButton} from 'admin-on-rest';
import {Edit, SimpleForm, TextInput, LongTextInput} from 'admin-on-rest';
import {Create, DateInput, Show, SimpleShowLayout, DateField, NumberField} from 'admin-on-rest';
import BidButton from './bid-button'

export const ProjList = (props) => (
  <List title="Projects" {...props}>
    <Datagrid>
      <TextField source="title"/>
      <TextField source="description"/>
      <TextField source="employer"/>
      <BidButton/>
      <ShowButton/>
    </Datagrid>
  </List>
);

const ProjTitle = ({record}) => {
  return <span>Project {record ? `"${record.title}"` : ''}</span>;
};

export const ProjEdit = (props) => (
  <Edit title={<ProjTitle/>} {...props}>
    <SimpleForm>
      <TextInput source="title"/>
      <LongTextInput source="description"/>
    </SimpleForm>
  </Edit>
);

export const ProjCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title"/>
      <LongTextInput source="description"/>
      <TextInput source="employer"/>
      <NumberField source="min_budget"/>
      <NumberField source="max_budget"/>
      <DateInput source="start_date"/>
    </SimpleForm>
  </Create>
);

export const ProjShow = (props) => (
  <Show title={<ProjTitle/>} {...props}>
    <SimpleShowLayout>
      <TextField source={"title"}/>
      <TextField source={"description"}/>
      <TextField source={"employer"}/>
      <TextField source={"min_budget"}/>
      <TextField source={"max_budget"}/>
      <DateField source={"start_date"}/>
    </SimpleShowLayout>
  </Show>
);