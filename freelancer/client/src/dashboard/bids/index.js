import React from 'react';
import {TextField, ReferenceField} from 'admin-on-rest';
import {TextInput,NumberInput, DisabledInput} from 'admin-on-rest';
import {List, Create, SimpleForm, Datagrid} from 'admin-on-rest';

export const BidList = (props) => (
  <List title="Bids" {...props}>
    <Datagrid>
      <TextField source="id"/>
      <ReferenceField label={"Project"} source="project_id" reference={"projects"}>
        <TextField source={"title"}/>
      </ReferenceField>
      <TextField label={"Bidder"} source={"username"}/>
      <TextField source={"bid_price"}/>
      <TextField source={"bid_days"}/>
    </Datagrid>
  </List>
);

export const