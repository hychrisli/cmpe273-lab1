import React from 'react'
import {setClient} from '../client/actions'
import {Redirect} from 'react-router-dom'


export function checkIndexAuthorization({dispatch}){
  return () => {
    if (checkAuthorization(dispatch)) {
      return <Redirect to={"/profile"}/>;
    }
    return <Redirect to={"/login"}/>;
  }
}

export function checkWidgetAuthorization({dispatch, getState}){
  return ()=>{
    const client = getState().client;
    if ( client && client.token) return <Redirect to={"/profile"}/>;

    if(checkAuthorization(dispatch)) return <Redirect to={"/profile"}/>;

    return <Redirect to={"/login"}/>;
  }
}

function checkAuthorization(dispatch){
  const storedToken = localStorage.getItem('token');

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