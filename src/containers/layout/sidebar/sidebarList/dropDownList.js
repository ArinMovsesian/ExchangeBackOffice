import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
import DisplayLink from './displayLink';
import FaIcon from '../../../../shared/components/Icon/Icon'

class DropDownList extends React.Component {
    /* #region LifeCycle Methods */
    constructor(props) {
        super(props);
        this.state = { open: this.props.open };

        this.handleClick = this.handleClick.bind(this);

    }
    componentDidMount() {

    }
    componentDidUpdate(prevProp, prevState) {

    }
    render() {
        
        const { classes } = this.props;
        return (
            <React.Fragment>
                <ListItem button onClick={this.handleClick} className={classes.sidebarListItem}>
                    <ListItemIcon>
                    <FaIcon  name={this.props.icon} size={14}/>

                    </ListItemIcon>
                   
                    <ListItemText inset primary={this.props.title} className={classes.sidebarListItemText} />
                    {this.state.open ? <ExpandLess className={classes.expand} /> : <ExpandMore className={classes.expand} />}
              
                    
                </ListItem >    
               
                    <Collapse in={this.state.open} timeout="auto" >

                        <List component="div" disablePadding>
                            {


                                this.props.children.map(item => {

                                    return (
                                            <DisplayLink  id={item.menu.id} icon={item.menu.menuIcon} title={item.menu.menuTitle} to={item.menu.menuPage.pageLink} />
                                    )

                                })}

                        </List>
                    </Collapse>
                </React.Fragment>


            

        )
    }
    /* #endregion */

    /* #region event Handler */
    handleClick() {
        this.setState({ open: !this.state.open });
    }
    /* #endregion */
}
DropDownList.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(styles)(DropDownList);