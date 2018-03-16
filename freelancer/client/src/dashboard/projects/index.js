import React from 'react';
import {List, Datagrid, TextField, ShowButton} from 'admin-on-rest';
import {Edit, SimpleForm, TextInput, LongTextInput} from 'admin-on-rest';
import {Filter, Create, DateInput, Show, SimpleShowLayout, DateField, NumberField} from 'admin-on-rest';
import {ListButton, RefreshButton } from 'admin-on-rest';
import { CardActions } from 'material-ui/Card';
import BidButton from './button-bid'
import EditButton from './button-edit'
import SkillsButton from './button-skills'

const ProjFilter = (props) => (
  <Filter {...props}>
    <TextInput label={"Employer"} source={"employer"}/>
  </Filter>
);

export const ProjList = (props) => (
  <List title="Projects" {...props} filters={<ProjFilter/>}>
    <Datagrid>
      <TextField source="title"/>
      <TextField source="description"/>
      <TextField source="employer"/>
      <BidButton/>
      <EditButton/>
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

const cardActionStyle = {
  zIndex: 2,
  display: 'inline-block',
  float: 'right',
};


const ProjShowActions = ({basePath, data}) => (
  <CardActions style={cardActionStyle}>
    <ListButton basePath={basePath} />
    <RefreshButton />
    <SkillsButton record={data}/>
  </CardActions>
);


export const ProjShow = (props) => {
  return (
  <Show {...props} actions={<ProjShowActions/>} title={<ProjTitle/>} >
    <SimpleShowLayout>
      <TextField source={"title"}/>
      <TextField source={"description"}/>
      <TextField source={"employer"}/>
      <TextField source={"min_budget"}/>
      <TextField source={"max_budget"}/>
      <DateField source={"start_date"}/>
    </SimpleShowLayout>
  </Show>
)};