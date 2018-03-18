import React from 'react';
import {List, Datagrid, TextField, ImageField} from 'admin-on-rest';


export const UserList = (props) => (
  <List title="Users" {...props}>
    <Datagrid>
      <TextField source="username"/>
      <ImageField source="image_url" elStyle={{size : 30}}/>
    </Datagrid>
  </List>
);