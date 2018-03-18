import React from 'react';
import {TextField, ReferenceField, CardActions, CreateButton} from 'admin-on-rest';
import {TextInput, RefreshButton} from 'admin-on-rest';
import {List, Datagrid, Filter} from 'admin-on-rest';
import {SimpleForm, Create, Show, SelectArrayInput} from 'admin-on-rest';
import {connect} from "react-redux";
import BackToSkills from './back-to-profile'
import AddSkillButton from './button-add-skill';

const cardActionStyle = {
  zIndex: 2,
  display: 'inline-block',
  float: 'right',
};

const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label={"Username"} source={"username"}/>
  </Filter>
);

const UserSkillListActions = ({basePath, data}) => (
  <CardActions style={cardActionStyle}>
    <CreateButton record={data}/>
    <AddSkillButton record={data}/>
    <RefreshButton />
  </CardActions>
);

export const UserSkillList = (props) => (
  <List title="My Skills" filters={<UserFilter/>} {...props} >
    <Datagrid>
      <TextField source="id"/>
      <ReferenceField label={"Skill"} source="skill_id" reference={"skills"} linkType="show">
        <TextField source={"skill_name"}/>
      </ReferenceField>
    </Datagrid>
  </List>
);


const UserSkillCreate = (props) => {
  const {
    client:{token:{username}},
    skillChoices
  } = props;

  if ( skillChoices[0] === undefined){
    return (
      <BackToSkills/>
    );
  }
  else {
    return (
      <Create {...props} title={"Add Skill for " + username}>
        <SimpleForm redirect={'/user-skills?filter={"username"%3A"'+username+'"}'} submitOnEnter={false}>
          <TextInput source="username" defaultValue={username}/>
          <SelectArrayInput source="skill_id" choices={skillChoices} optionText="skill_name" optionValue="id" />
        </SimpleForm>
      </Create> )
  }

};

const mapStateToProps = (state) => ({
  client: state.client,
  skillChoices: state.skillChoices,
});

export const MySkillCreate = connect(mapStateToProps)(UserSkillCreate);
