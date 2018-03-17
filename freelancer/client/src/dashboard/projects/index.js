import React from 'react';
import {List, Datagrid, TextField, ShowButton, ReferenceField, ReferenceArrayField} from 'admin-on-rest';
import {Edit, SimpleForm, TextInput, NumberInput, SingleFieldList} from 'admin-on-rest';
import {Filter, Create, DateInput, Show, SimpleShowLayout, DateField, ChipField} from 'admin-on-rest';
import {ListButton, RefreshButton } from 'admin-on-rest';
import { CardActions } from 'material-ui/Card';
import BidButton from './button-bid'
import EditButton from './button-edit'
import SkillsButton from './button-skills'
import AddSkillButton from '../proj-skills/button-add-skill';
import {getUsername} from '../lib/get-info'

// List

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

// Edit

const ProjTitle = ({record}) => {
  return <span>Project {record ? `"${record.title}"` : ''}</span>;
};

const ProjEditActions = ({basePath, data}) => (
  <CardActions style={cardActionStyle}>
    <ShowButton basePath={basePath} record={data}/>
    <ListButton basePath={basePath} />
    <AddSkillButton record={data}/>
    <RefreshButton />
  </CardActions>
);

export const ProjEdit = (props) => (
  <Edit title={<ProjTitle/>}  actions={<ProjEditActions/>}  {...props}>
    <SimpleForm>
      <TextInput source="title"/>
      <TextInput source="description"/>
      <NumberInput source="min_budget"/>
      <NumberInput source="max_budget"/>
      <DateInput source="start_date"/>
      <ReferenceArrayField label={"skills"} reference={"skills"} source={"skills"}>
        <SingleFieldList>
          <ChipField source={"skill_name"}/>
        </SingleFieldList>
      </ReferenceArrayField>
    </SimpleForm>
  </Edit>
);

export const ProjCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title"/>
      <TextInput source="description"/>
      <TextInput source="employer" defaultValue={getUsername()}/>
      <NumberInput source="min_budget"/>
      <NumberInput source="max_budget"/>
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
      <TextField source={"chosen_bid"}/>
      <ReferenceArrayField label={"skills"} reference={"skills"} source={"skills"}>
        <SingleFieldList>
          <ChipField source={"skill_name"}/>
        </SingleFieldList>
      </ReferenceArrayField>
    </SimpleShowLayout>
  </Show>
)};