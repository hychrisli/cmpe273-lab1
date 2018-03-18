import React from 'react';
import { connect } from 'react-redux';
import {DashboardMenuItem, MenuItemLink, getResources } from 'admin-on-rest';
import {getUsername} from "./lib/get-info";
import {Divider} from 'material-ui'


const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
  },
};


const Menu = ({onMenuTap, translate, logout}) => (
  <div style={styles.main}>
    <DashboardMenuItem onClick={onMenuTap} />
    <MenuItemLink
      to={"/projects?"}
      primaryText={"Projects"}
      onClick={onMenuTap}/>
    <MenuItemLink
      to={"/bids?"}
      primaryText={"Bids"}
      onClick={onMenuTap}/>
    <MenuItemLink
      to={"/skills?"}
      primaryText={"All Skills"}
      onClick={onMenuTap}/>
    <Divider/>
    <br/>
    <MenuItemLink
      to={"/profile"}
      primaryText={"Profile"}
      onClick={onMenuTap}/>
    <MenuItemLink
      to={'/user-skills?filter={"username"%3A"'+ getUsername() +'"}'}
      primaryText={"My Skills"}
      onClick={onMenuTap}/>
    <MenuItemLink
      to={'/projects?filter={"employer"%3A"'+ getUsername()+'"}'}
      primaryText={"My Projects"}
      onClick={onMenuTap}/>
    <MenuItemLink
      to={'/bids?filter={"username"%3A"'+ getUsername()+'"}'}
      primaryText={"My Bids"}
      onClick={onMenuTap}/>
    {logout}
  </div>
);

const mapStateToProps = state => ({
  resources: getResources(state),
});
export default connect(mapStateToProps)(Menu);

