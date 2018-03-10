import React from 'react';
import { connect } from 'react-redux';
import {DashboardMenuItem, MenuItemLink, getResources } from 'admin-on-rest';
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
      to={"/projects"}
      replace
      primaryText={"Projects"}
      onClick={onMenuTap}/>
    <MenuItemLink
      to={"/profile"}
      primaryText={"Profile"}
      onClick={onMenuTap}/>
    <Logout/>
  </div>
);

const mapStateToProps = state => ({
  resources: getResources(state),
});
export default connect(mapStateToProps)(Menu);

