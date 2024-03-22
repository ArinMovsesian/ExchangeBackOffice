import React from 'react';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import { loggedOut } from 'store/actions'
import NestedList from './sidebarList/nestedList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Divider } from '@material-ui/core';

const styles = theme => ({

});
class Drower extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            brokerName: 'کارگزاری',
            displayName: 'کاربر',

        }


    }

    componentDidMount() {

    }


    render() {
        const { classes } = this.props;

        return (
            <Drawer
                variant="permanent"
                onMouseEnter={this.hoverIn}
                onMouseLeave={this.hoverOut}
                classes={{
                    paper: classNames(classes.drawerPaper, !this.props.open && classes.drawerPaperClose),
                }}
                className={classes.bgThemeDarker}
                open={this.props.open}>

                <div className={classes.toolbarIcon}>

                    <Avatar alt="Remy Sharp" src={require('utils/images/Pikad-Logo.jfif')} className={classes.logo} />
                    <h4 className={classes.sidebarHeaderText}>سامانه مدیریت کارگزاری</h4>
                    <IconButton inset className={classes.iconSlide} onClick={this.props.handleDrawerToggle}>
                        <MenuIcon />
                    </IconButton>

                </div>
                <div className={classNames(classes.sidebarMenueItem, "sidebarMenueItem")}>


                    <div className={classes.sidebarHeader}
                        position="static"
                        color="primary"
                        elevation={0}
                        className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0 bg-theme-light"
                    >
                        <Typography className={classes.whitecolor + " " + classes.rtl + " username text-16 whitespace-no-wrap"} color="white">{this.state.displayName}</Typography>
                        <Typography className={classes.whitecolor + " " + classes.rtl + " email text-13 mt-8 opacity-50 whitespace-no-wrap"} color="white">{this.state.brokerName}</Typography>
                        <Avatar
                            className={classNames(classes.avatarSidebar, "avatarSidebar")}
                            alt="user photo"
                            src={require('utils/images/logo.png')}
                        />
                    </div>
                    <Divider className={classes.divider} />

                    <div className={classes.NestedList}>
                        <NestedList open={this.props.open} />

                    </div>

                </div>

            </Drawer>
        )
    }

}
const mapStateToProps = state => {
    return {
        userInfo: state.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loggedOut: () => dispatch(loggedOut())
    };
};

const Sidebar = connect(mapStateToProps, mapDispatchToProps)(Drower);

export default withStyles(styles)(Sidebar);