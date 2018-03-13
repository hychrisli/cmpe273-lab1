import React from 'react'
import {setClient} from '../client/actions'
import {Route, Redirect} from 'react-router-dom'
import Dashboard from "../dashboard";
import Login from '../login';


export function checkIndexAuthorization({dispatch}){
  return () => {
    if (checkAuthorization(dispatch)) {
      return <Redirect to={"/dashboard"}/>;
    }
    return <Redirect to={"/login"}/>;
  }
}

export function checkLoginAuthorization({dispatch, getState}) {
  return ()=>{

    const client = getState().client;
    console.log(client);
    if ( client && client.token) return <Redirect to={"/dashboard"}/>;

    console.log('here check');
    if(checkAuthorization(dispatch)) return <Redirect to={"/dashboard"}/>;

    console.log("Load login");
    return <Route path={"/login"} component={Login}/>;
  }
}


export function checkWidgetAuthorization({dispatch, getState}){
  return ()=>{
    const client = getState().client;
    if ( client && client.token) return <Route path={"/dashboard"} component={Dashboard}/>;

    if(checkAuthorization(dispatch)) return <Route path={"/dashboard"} component={Dashboard}/>;

    return <Redirect to={"/login"}/>;
  }
}

function checkAuthorization(dispatch){
  const storedToken = localStorage.getItem('token');
  console.log("storedToken");
  console.log(storedToken);

  if ( storedToken ) {
    const token = JSON.parse(storedToken);

    const createdDate = new Date(token.created);
    const created = Math.round(createdDate.getTime() / 1000);
    const ttl = 1209600;
    const expiry = created + ttl;

    if (created > expiry) return false;

    dispatch(setClient(token));
    return true
  }

  return false
}