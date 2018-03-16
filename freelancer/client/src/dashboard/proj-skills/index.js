import React from 'react';
import {TextField, ReferenceField} from 'admin-on-rest';
import {TextInput} from 'admin-on-rest';
import {List, Create, SimpleForm, Datagrid, Filter} from 'admin-on-rest';

const ProjFilter = (props) => (
  <Filter {...props}>
    <TextInput label={"Project Id"} source={"project_id"}/>
  </Filter>
);

export const ProjSkillList = (props) => (
  <List title="Skills" {...props} filters={<ProjFilter/>}>
    <Datagrid>
      <TextField source="id"/>
      <ReferenceField label={"Project"} source="project_id" reference={"projects"}>
        <TextField source={"title"}/>
      </ReferenceField>
      <ReferenceField label={"Skill"} source="skill_id" reference={"skills"}>
        <TextField source={"skill_name"}/>
      </ReferenceField>
    </Datagrid>
  </List>
);

export const ProjSkillCreate = (props) => (
  <Create {...props} >
    <SimpleForm>
      <TextInput source="skill_name"/>
    </SimpleForm>
  </Create>
);
