

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import styles from './nestedListTheme';
import 'utils/fonts/isw.css';
import DisplayLink from './displayLink';
import DropDownList from './dropDownList';
import LinkGroup from './linkGroup';
import classNames from 'classnames';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import NestedListService from './services/nestedListService';
import sideBarMenuList from './nestedListItem';
class NestedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      search: '',
      searchItems: [],
      menuList: []
    };
    this.displayList = this.displayList.bind(this);
    this.handleChangeSearchField = this.handleChangeSearchField.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.successGetAllAccessedMenu = this.successGetAllAccessedMenu.bind(this);
  }


  componentDidMount() {
    this.getAllAccessedMenu();
  }

  getAllAccessedMenu() {
    var command = {
      entity: {
        dateFilter: {

        }
      }
    };
    NestedListService.getAllAccessedMenu(command, this.successGetAllAccessedMenu)
  }
  successGetAllAccessedMenu(response) {

    if (response.success) {
      this.setState({ menuList: response.result }, () => {
        this.setState({ searchItems: sideBarMenuList.searchItems(response.result, this.state.search) });
      });
    }
  }
  displayList(item, classes) {
    if (item.menu.parenMenuResourceId == null && item.menu.type == 3) {

      return (<LinkGroup key={item.menu.id} title={item.menu.menuTitle} children={item.childs} />)

    } else if (item.menu.parenMenuResourceId != null && item.menu.type == 3 && item.childs.length > 0) {

      return (<DropDownList key={item.menu.id} children={item.childs} title={item.menu.menuTitle} open={item.open} icon={item.menu.menuIcon} />)

    } else if (item.menu.type == 3 && item.childs.length == 0) {

      return (<DisplayLink id={item.menu.id} icon={item.menu.menuIcon} title={item.menu.menuTitle} to={item.menu.menuPage.pageLink} />);

    }
  }

  handleSearch() {

    this.setState({ searchItems: sideBarMenuList.searchItems(this.state.menuList, this.state.search) });
  }
  handleChangeSearchField(event) {
    this.setState({ search: event.target.value }, () => {
      this.handleSearch();
    });

  }
  enterSubmit = (event) => {
    if (event.keyCode == 13) {
      this.handleSearch();
    }
  };


  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>


        <Paper className={classNames(classes.searchPaper, "searchPaper")} elevation={1}>

          <InputBase className={classes.input} value={this.state.search} onChange={this.handleChangeSearchField} onKeyDown={this.enterSubmit} placeholder="جستجوی عناوین" />
          <IconButton className={classes.searchIcon} onClick={this.handleSearch} aria-label="Search">
            <SearchIcon />
          </IconButton>

        </Paper>
        <List>
          {
            this.state.searchItems.map(item => {
              return (this.displayList(item, classes))
            })
          }
        </List>
      </React.Fragment>

    );
  };

};

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);
