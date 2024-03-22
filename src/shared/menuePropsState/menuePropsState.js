import React from 'react';
import Button from '@material-ui/core/Button';
import FaIcon from '../components/Icon/Icon'

import { renderComponent } from 'recompose';


// class MenuPopupState extends React.Component{
//   constructor(props){
//     super(props);
//     this.anchorEl = React.createRef();
//     this.state={
//      open:false
//     }
//      this.handleToggle=this.handleToggle.bind(this);
//      this.handleClose=this.handleClose.bind(this);

//   }

//    handleToggle() {
//     this.setState((state)=>({open:!state.open})) 
//   }

//    handleClose(event) {
//     if (this.anchorEl.current.contains(event.target)) {
//       return;
//     }

//     this.setState({open:false}) 
//   }

//  render(){
//   return (

//   //   <div>
//   //   <Button
//   //     buttonRef={this.anchorEl}
//   //     aria-owns={this.state.open ? 'menu-list-grow' : undefined}
//   //     aria-haspopup="true"
//   //     style={{
//   //       minWidth:30,
//   //       minHeight:30,
//   //       padding:0,
//   //       marginRight:30

//   //     }}
//   //     onClick={this.handleToggle}
//   //     color="primary"
//   //   >
//   //    {this.props.label ? this.props.label : ''}
//   //                   {this.props.icon ? <FaIcon name={this.props.icon} size={13} /> : ''}
//   //   </Button>
//   //   <Popper open={this.state.open} style={{zIndex:10000000}} anchorEl={this.anchorEl.current} transition disablePortal>
//   //     {({ TransitionProps, placement }) => (
//   //       <Grow
//   //         {...TransitionProps}
//   //         id="menu-list-grow"
//   //         style={{ transformOrigin:  'center bottom',zIndex:10000000 }}
//   //       >
//   //         <Paper style={{zIndex:10000000}}>
//   //           <ClickAwayListener onClickAway={this.handleClose}>
//   //             <MenuList style={{zIndex:10000000}}>
//   //             {this.props.children}
//   //             </MenuList>
//   //           </ClickAwayListener>
//   //         </Paper>
//   //       </Grow>
//   //     )}
//   //   </Popper>
//   // </div>



// );


//     }
// }


// export default MenuPopupState;


import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state/index';

function MenuPopupState(props) {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {popupState => (
        <React.Fragment>
          <Button
            style={{
              minWidth: 30,
              minHeight: 30,
              padding: 0,
              marginRight: 0,
              borderRadius:"50%"
            }}
            color="primary"
            {...bindTrigger(popupState)}>
            {props.label ? this.props.label : ''}
            {props.icon ? <FaIcon name={props.icon} size={13} /> : ''}
          </Button>
          <Menu  style={{ transformOrigin:  'center bottom' }} {...bindMenu(popupState)}>
            {props.children}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}

export default MenuPopupState;