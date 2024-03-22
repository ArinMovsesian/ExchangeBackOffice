import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link, NavLink } from 'react-router-dom';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import items from './nestedListItem';
import styles from './nestedListTheme';
import 'utils/fonts/isw.css';
import { Typography } from '@material-ui/core';
import FaIcon from '../../../../shared/components/Icon/Icon'

class DisplayLink extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }
  componentDidUpdate(prevProp, prevState) {
  }
  

  changeRoute() {
    this.setState.routeId = this.props.id;
    // this.setState({
    //   routeId : this.props.id
    // })
    //console.log(location);
  }
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        {/* <NavLink to={this.props.to} activeClassName="active" className={classes.sidebarListItem}> */}
        <ListItem button exact component={NavLink} to={this.props.to} key={this.props.id} activeClassName="active"
          className={classes.sidebarListItem}>

          <FaIcon name={this.props.icon} size={14} />
          <ListItemText inset primary={this.props.title} className={classes.sidebarListItemText} />

        </ListItem>
        {/* </NavLink> */}
      </React.Fragment>
    )
  }
};
DisplayLink.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(DisplayLink);