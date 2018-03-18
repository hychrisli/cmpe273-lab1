import React from 'react';
import {TextField, ReferenceField, ShowButton, BooleanField} from 'admin-on-rest';
import {List, Datagrid, Show, SimpleShowLayout} from 'admin-on-rest';
import DelButton from './button-delete'
import HireButton from './button-hire'

export const BidList = (props) => (
  <List title="Bids" {...props}>
    <Datagrid>
      <TextField source="id"/>
      <ReferenceField label={"Project"} source="project_id" reference={"projects"} linkType="show">
        <TextField source={"title"}/>
      </ReferenceField>
      <TextField label={"Bidder"} source={"username"}/>
      <TextField source={"is_active"}/>
      <TextField source={"bid_price"}/>
      <TextField source={"bid_days"}/>
      <ShowButton/>
      <HireButton/>
      <DelButton/>
    </Datagrid>
  </List>
);

const BidTitle = ({record}) => {
  return <span>Bid {record ? `by ${record.username}` : ''}</span>;
};

export const BidShow = (props) => (
  <Show {...props} title={<BidTitle/>} >
    <SimpleShowLayout>
      <TextField source="id"/>
      <ReferenceField label={"Project"} source="project_id" reference={"projects"} linkType="show">
        <TextField source={"title"}/>
      </ReferenceField>
      <TextField label={"Bidder"} source={"username"}/>
      <TextField source={"bid_price"}/>
      <TextField source={"bid_days"}/>
    </SimpleShowLayout>
  </Show>
);
