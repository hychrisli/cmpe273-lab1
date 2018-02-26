import React from 'react';
import { List, Datagrid, TextField } from 'admin-on-rest';

export const ProjList = (props) => (
  <List title="Projects" {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="body" />
    </Datagrid>
  </List>
);