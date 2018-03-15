import React, {Component} from 'react';
import {DisabledInput} from 'admin-on-rest';

class BidInfo extends Component {

  render() {
    return (
      <div>
        <DisabledInput label={"Bidder"} source={"username"} defaultValue={"xyz"}/>
        <DisabledInput label={"Bidder"} source={"project_id"} defaultValue={"2"}/>
      </div>
    )
  }

}
export default BidInfo;
