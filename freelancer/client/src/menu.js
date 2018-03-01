import React from 'react';
import { translate, DashboardMenuItem, MenuItemLink } from 'admin-on-rest';

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
    {logout}
  </div>
);

export default Menu;