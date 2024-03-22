import React from 'react';
import Paper from '@material-ui/core/Paper';
import Header from 'shared/components/stateHeader/stateHeader';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import { GridServer } from '../../../../../../shared/components/kendoGrid/kendoGrid';
import GetAssignRoleToButtonService from '../services/GetAssignRoleToButtonService';
import styles from '../../../../../layout/panel/theme';
import { withStyles } from '@material-ui/core/styles';
import Columns from '../constants/GetAssignRoleToButtonColumns';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import { setUpdateRow } from 'store/actions';
import { connect } from "react-redux";
import '../../menus/components/Menu.css';

class GetAssignRoleToButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonTitle: "",
            sort: [
                {
                    field: "buttonTitle",
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
            buttonItem: {}
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
        GetAssignRoleToButtonService.getAllRole(command, this.successGetAllRole);
    }

    handleChangeRole(item) {
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
            buttonTitle: item.value
        });
    };

    assignAccess(item) {
        this.setState({
            buttonItem: item
        })

        var command = {
            entity: {
                roleName: this.state.role.name,
                menuId: item.id,
                access: item.isAccess
            }
        }
        GetAssignRoleToButtonService.assignRoleToMenu(command, this.successAssignRole);
    }
    successAssignRole(response) {
        if (response.success) {
            var buttonItem = {
                id: this.state.buttonItem.id,
                isAccess: this.state.buttonItem.isAccess
            }
            this.props.setUpdateRow(buttonItem);
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
                            resourceType: 4
                        }}
                        service={GetAssignRoleToButtonService.getAllAccessByFilter}
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
                                    <Input label="عنوان المان" handleChange={this.handleChangeTitle} value={this.state.buttonTitle} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GetAssignRoleToButton));