import React from 'react';
import Paper from '@material-ui/core/Paper';
import Header from 'shared/components/stateHeader/stateHeader';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import { GridServer } from '../../../../../../shared/components/kendoGrid/kendoGrid';
import GetAssignRoleToMenuService from '../services/GetAssignRoleToMenuService';
import styles from '../../../../../layout/panel/theme';
import { withStyles } from '@material-ui/core/styles';
import Columns from '../constants/GetAssignRoleToMenuColumns';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import { setUpdateRow } from 'store/actions';
import { connect } from "react-redux";
import '../../menus/components/Menu.css';

class GetAssignRoleToMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuTitle: "",
            sort: [
                {
                    field: "menuTitle",
                    dir: "asc"
                }
            ],
            roleDropDowm: {
                name: "role",
                feild: "name",
                label: "نقش",
                list: []
            },
            role: {},
            menuItem: {}
        }
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.successGetAllRole = this.successGetAllRole.bind(this);
        this.handleChangeRole = this.handleChangeRole.bind(this);
        this.successAssignRole = this.successAssignRole.bind(this);
        this.assignAccess = this.assignAccess.bind(this);
    };

    componentDidMount() {
        this.getAllRole();
    }

    getAllRole() {
        var command = {
            reportFilter: ""
        }
        GetAssignRoleToMenuService.getAllRole(command, this.successGetAllRole);
    }

    handleChangeRole(item) {
        console.log(item);
        this.setState({
            role: item.value,
        })
    }
    successGetAllRole(response) {
        if (response.success) {
            this.setState({
                roleDropDowm: {
                    name: "role",
                    feild: "name",
                    label: "نقش",
                    list: response.result
                }
            });
        }
    }

    handleChangeTitle(item) {
        this.setState({
            menuTitle: item.value
        });
    };

    assignAccess(item) {
        this.setState({
            menuItem: item
        })

        var command = {
            entity: {
                roleName: this.state.role.name,
                menuId: item.id,
                access: item.isAccess
            }
        }
        console.log(command);
        GetAssignRoleToMenuService.assignRoleToMenu(command, this.successAssignRole);
    }
    successAssignRole(response) {
        if (response.success) {
            var menuItem = {
                id: this.state.menuItem.id,
                isAccess: this.state.menuItem.isAccess
            }
            this.props.setUpdateRow(menuItem);
        }
    }
    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container menu-page "} >
                    <GridServer
                        assignAccess={(item) => this.assignAccess(item)}
                        reportFilter={{
                            roleName: this.state.role.name,
                            resourceType: 3
                        }}
                        service={GetAssignRoleToMenuService.getAllAccessByFilter}
                        Columns={Columns}
                        sort={this.state.sort}
                        classHeightOpenPanel={"height-open-grid"}
                        requestToService={false}
                    >
                        <div classPage={"height-search"}>

                            <Grid container spacing={8} className="m-0">
                                <Grid item md={3}>
                                    <DropDownComponent {...this.state.roleDropDowm}
                                        handleChange={(value) => this.handleChangeRole(value)} isFilterable={true}
                                        value={this.state.role} />
                                </Grid>
                                <Grid item md={4} className="padding-right-10">
                                    <Input label="عنوان منو" handleChange={this.handleChangeTitle} value={this.state.menuTitle} />
                                </Grid>
                            </Grid>
                        </div>
                    </GridServer>
                </Paper>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        setUpdateRow: data => dispatch(setUpdateRow(data)),

    };

};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GetAssignRoleToMenu));