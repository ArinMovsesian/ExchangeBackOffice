/* #region imports */
/* #region import react main  */
import React from 'react';
import { connect } from "react-redux";
/* #endregion */
/* #region import materials imports */
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Fade from '@material-ui/core/Fade';
import { setUserAccessPages } from '../../../store/actions';
import { getAllPageAccessByUsername } from '../../../services/getAllPages'
/* #endregion */
/* #region import layout Components */
import Navbar from '../navbar/navbar';
import Sidebar from '../sidebar/sidebar';
/* #endregion */
/* #region import other components */
import MainMdoules from '../../modules/mainModule';
/* #endregion */

/* #region import theme  */
import styles from './theme';
import { UserAccessPagesContext } from '../../../contextes/userAccessPagesContext';

/* #endregion */
/* #endregion */
/* #region Components Body */

class PanelComponent extends React.Component {
  /* #region lifeCycle Methods */
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      userAccessPages: []
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.successGetUserAccessPages = this.successGetUserAccessPages.bind(this);

  }


  componentDidMount() {
    this.getUserAccessPages();
  }

  getUserAccessPages() {
    getAllPageAccessByUsername(this.successGetUserAccessPages);
  }
  successGetUserAccessPages(response) {
    if (response.success) {
      //setUserAccessPages(response.result);
      this.setState({ userAccessPages: response.result });
    }
  }

  render() {
    const { classes } = this.props;
    return (

      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >

          <Navbar classes={classes} open={this.state.open} {...this.props} />
        </AppBar >
        <Sidebar location={this.props.location} classes={classes} handleDrawerToggle={this.handleDrawerToggle} open={this.state.open} />
        <main className={classes.content} >
          <div className={classes.appBarSpacer} />
          <div style={{ overflow: "hidden" }} className={this.state.open ? classes.noMarginLeft + " " + classes.heightMainPage : classes.backOfRouterClose}>
            {/* <UserAccessPagesContext.Provider value={this.state.userAccessPages}> */}
              <MainMdoules className={classes.mainModule} />
            {/* </UserAccessPagesContext.Provider> */}
          </div>
        </main>
      </div>
    );
  }
  /* #endregion */

  /* #region event handler Methods */
  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };
  /* #endregion */
}

const mapStateToProps = (state) => {
  return {
    loadingBar: state.loadingBar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserAccessPages: data => dispatch(setUserAccessPages(data)),
  }
}

/* #endregion */
/* #region theme config */

/* #endregion */
const Panel = connect(mapStateToProps)(PanelComponent);

Panel.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Panel);