import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import { showNotification as showNotificationAction } from 'admin-on-rest';
import FlatButton from 'material-ui/FlatButton';

class HireButton extends Component{

  constructor(props){
    super(props);
    this.state = {
      isChosen: false,
    }
  }


  static propTypes = {
    push: PropTypes.func,
    showNotification: PropTypes.func,
    record: PropTypes.object,
    client: PropTypes.object,
  };


  componentDidMount(){
    const{record} = this.props;
    const url = `${process.env.REACT_APP_API_URL}/projects/` + record.project_id;
    fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json=>{
        if ( json.chosen_bid === record.id)
          this.setState({isChosen:true});
        this.setState({employer: json.employer});
      })
      .catch( e => {
        console.error(e);
      })
  }

  handleClick =  () => {
    const{push, record, showNotification} = this.props;

    if (this.state.isChosen){
      showNotification('Someone is already hired');
    } else {
      const url = `${process.env.REACT_APP_API_URL}/hire/` + record.project_id;
      fetch(url, {
        method:'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'chosen_bid': record.id})
      })
        .then(() => {
          showNotification('Hired!');
          push('/projects/' + record.project_id + '/show');
        })
        .catch((e) => {
          console.error(e);
          showNotification('Failed to Hire');
        })
    }
  };

  render() {
    const {
      client:{
        token
      }
    } = this.props;

    const isDisabled = this.state.isChosen || this.state.employer !== token.username;
    return <FlatButton label={"Hire"} disabled={isDisabled} onClick={this.handleClick}/>
  }
}

const mapStateToProps = state => ({
  client: state.client,
});

export default connect(mapStateToProps, {
  showNotification: showNotificationAction,
  push: pushAction
})(HireButton);
