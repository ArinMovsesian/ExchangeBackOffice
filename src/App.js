
/* #region imports */
import React, { Component } from 'react';
import { connect } from "react-redux";
import { setToken, setUserInfo,setEnum } from './store/actions';
import Panel from './containers/layout/panel/panel';
import {SetToken} from 'core/axiosHelper';
import {SetEnums} from 'core/enumProvider';

import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
/* #endregion */


class Application extends Component {

  /* #region lifeCycles */

/*<--------------------constructor------------------->*/
  constructor(props) {
    super(props);

    this.state = {
      isSidebarActive: false,
      userTitle: '',
      auth: '',
      location:''
    };
  }


/*<-------------------componentWillMount------------->*/
  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
     this.setState({location:location});
    });
  }
/*<-------------------componentWillUnmount------------->*/

  componentWillUnmount() {
    this.unlisten();
}
/*<-------------------componentDidMount------------->*/

  componentDidMount() {
  
    // var auth=JSON.parse(localStorage.getItem("authentication"));
  
    //   this.setState({ auth: auth },function(){
     
    //   });
    //   SetToken(auth);
    //   this.props.setToken(auth);
    
    }
   

   
    
 
  

  /*<-------------------render------------->*/
  render() {
    return (
      this.state.auth ? <Panel location={this.state.location} history={this.props.history}/> :   ''
    );
  }
  /* #endregion */
}


const mapStateToProps = state => {
  return {
    accessToken: state.accessToken
  };
};


const mapDispatchToProps = dispatch => {
  return {
    setToken: data => dispatch(setToken(data)),
    setUserInfo: data => dispatch(setUserInfo(data)),
    SetEnum:data=>dispatch(setEnum(data))
  };

};


/*<-------------------connect------------->*/
const App = connect(mapStateToProps, mapDispatchToProps)(Application);

/*<-------------------export------------->*/
export default App;
