import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import ExitToAppOutlined from '@material-ui/icons/ExitToAppOutlined';
import LockOpen from '@material-ui/icons/LockOpen';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import UserIcon from '@material-ui/icons/';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import NotificationsIcon from '@material-ui/icons/Notifications';
import classNames from 'classnames';
import { connect } from "react-redux";
import { loggedOut } from 'store/actions';
import Avatar from '@material-ui/core/Avatar';
import { changePassword } from '../../../constants/navbarAdress';
class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      redirect: false,
      userTitle: "",
      fundDetails: {
        CompanyRegisterNumber: null,
        SeoRegisterNumber: null,

      },
      show: false,
    }

    this.logOut = this.logOut.bind(this);
    this.goToChangePass = this.goToChangePass.bind(this);


  }
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  logOut() {
    // this.props.loggedOut()
    this.setState({
      redirect: true
    });
  }

  goToLogIn() {
    window.location.href = '/login'
  }
  goToChangePass() {

    this.props.history.push(changePassword);
    this.setState({ anchorEl: null });
  }
  exit() {
    localStorage.removeItem("authentication");
    window.location.href = '/login'
  }
  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const openProfileSettingMenue = Boolean(anchorEl);

    return (
      <Toolbar disableGutters={!this.props.open} className={classes.toolbar}>



        <Button
          aria-owns={openProfileSettingMenue ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
          className={classes.navbarIcon}
        >
          <Typography className={classes.rtl}>کاربر</Typography>
          <Avatar alt="Remy Sharp" src={require('utils/images/logo.png')} className={classes.avatar} />

        </Button>
        <Menu

          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={openProfileSettingMenue}
          onClose={this.handleClose}
        >
          <MenuItem className={classes.menuNavbar} onClick={this.handleClose}>  <AccountCircleOutlined /> اطلاعات کاربر </MenuItem>
          <MenuItem className={classes.menuNavbar} onClick={this.goToChangePass}> <LockOpen /> تغییر رمز  </MenuItem>
          <MenuItem className={classes.menuNavbar} onClick={this.exit}> <ExitToAppOutlined /> خروج  </MenuItem>
        </Menu>

      </Toolbar>
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

const Navbar = connect(mapStateToProps, mapDispatchToProps)(Header);

export default Navbar;