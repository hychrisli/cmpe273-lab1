import React from 'react';
import {DashboardMenuItem, MenuItemLink } from 'admin-on-rest';
import Logout from './logout'

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
      key={"projects"}
      to={`projects`}
      primaryText={"Projects"}
      onClick={onMenuTap}/>
    <MenuItemLink
      key={"profile"}
      to={`profile`}
      primaryText={"Profile"}
      onClick={onMenuTap}/>
    <Logout/>
  </div>
);


export default Menu;
