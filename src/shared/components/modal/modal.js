import React from 'react';
import Paper from '@material-ui/core/Paper';

// import './GetTradeNumberComponent.css';

import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import FaIcon from 'shared/components/Icon/Icon';
import styles from 'containers/layout/panel/theme';
import { connect } from "react-redux";


class ModalComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
          open:false
    }
    this.setCloseModal=this.setCloseModal.bind(this);
   
  }

  componentDidUpdate(prevProps,prevState){
    if(prevProps.open!==this.props.open){
      this.setState({open:this.props.open},function(){
      })

    }
 }
  setCloseModal(){
    this.setState({open:false});
  }
  // shouldComponentUpdate(prevProps,prevState){
  //   return prevProps.open!==this.props.open;
  // }
  render() {
    const { classes } = this.props;
    return (
      <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={this.state.open}
      onClose={this.setCloseModal}
    >

      <Paper style={this.props.style}>
        <h3 >
          <FaIcon color="gray" name={this.props.icon} size={20} />
          <span style={{ marginRight: '5px' }}>{this.props.title}</span>

        </h3>
        <hr />
          {this.props.children}
       

      </Paper>


    </Modal>
    );
  }
}
Modal.defaultProps={
  style:{
    width: '70%',
    padding: '1rem .5rem ',
    height: 'auto',
    outline: 'none',
    position: 'absolute',
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
    backgroundColor: '#fff',
    top: '27%',
    left: "25%",
    marginLeft: '-300px',
    marginTop: '-150px',
  }
}
export default withStyles(styles)(ModalComponent);
