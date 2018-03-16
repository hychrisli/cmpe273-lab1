import React from 'react';
import {Route, Router} from 'react-router-dom';
import Profile from './profile';
import BidCreate from "./bid";


export default [
    <Route exact path="/profile" component={Profile}/>,
    <Route exact path="/bids/create" component={BidCreate}/>
]