import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import classNames from 'classnames';
import Input from 'shared/components/formInput/inputForm'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import AddBranchService from '../services/CreateBranchService';
import GetBranchService from '../services/GetBranchService';
import toastr from 'toastr';
import Header from 'shared/components/stateHeader/stateHeader';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import IBAN from 'shared/components/iban/textMask';
import styles from 'containers/layout/panel/theme';
import Button from '@material-ui/core/Button';


class EditBroker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            alternativeBranch: {},
            selectedAlternativeBranch: {},
            branch: {},
            selectedBranch: {},
            distination: {},
            selectedDistination: {},
            mainMarket: {},
            selectedMainMarkets: {},
            title: '',
            traderCode: '',
            stationSymbol: '',
            managerName: '',
        }
        this.successGetBranchesByFilter = this.successGetBranchesByFilter.bind(this);
        this.successGetAllEnumType = this.successGetAllEnumType.bind(this);
        this.successGetMainMarkets = this.successGetMainMarkets.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.cancel = this.cancel.bind(this);
        this.doAction = this.doAction.bind(this);
    }

    componentDidMount() {
        var command = {
            optionalFilter: {
                take: 500,
                page: 1
            }
        }
        GetBranchService.getBranchesByFilter(command, this.successGetBranchesByFilter);
    }

    successGetBranchesByFilter(response) {
        if (response.success) {
            if (response.result && response.result.length > 0) {
                this.setState({
                    alternativeBranch: {
                        name: "selectedAlternativeBranch",
                        feild: "title",
                        label: "شعبه جایگزین",
                        type: "client",
                        list: response.result
                    }
                })
            }
            AddBranchService.getAllEnumType(null, this.successGetAllEnumType);

        }
    }

    successGetAllEnumType(response) {
        if (response.success) {
            this.setState({
                selectedBranch: response.result.BranchType[0],
                selectedDistination: response.result.BranchStationType[0],
                branch: {
                    name: "selectedBranch",
                    feild: "Title",
                    label: "َشعبه",
                    type: "client",
                    list: response.result.BranchType
                },
                distination: {
                    name: "selectedDistination",
                    feild: "Title",
                    label: "نوع مقصد",
                    type: "client",
                    list: response.result.BranchStationType
                }
            }, function () {
                AddBranchService.getMainMarkets(null, this.successGetMainMarkets);
            })
        } 
    }
    successGetMainMarkets(response) {
        if (response.success) {
            this.setState({
                mainMarket: {
                    name: "selectedMainMarkets",
                    feild: "title",
                    label: "بازار",
                    type: "multi-select-client",
                    list: response.result
                }
            })
        }
    }

    handleChange(value, name) {
        let item = value.value
        this.setState({
            [name]: item
        })
    }

    handleChangeCheck = (event, name) => {
        this.setState({
            [name]: event.target.checked
        })

    };


    doAction() {
        const props = this.props;
        var mainMarketIds = [];
        this.state.selectedMainMarkets.map(item => {
            mainMarketIds.push(item.id);
        })
        var command = {
            entity: {
                title: this.state.title,
                alternativeBranchId: this.state.selectedAlternativeBranch ? this.state.selectedAlternativeBranch.id : null,
                traderCode: this.state.traderCode,
                stationSymbol: this.state.stationSymbol,
                managerName: this.state.managerName,
                type: this.state.selectedBranch.Key,
                stationType: this.state.selectedDistination.Key,
                mainMarketIds: mainMarketIds
            }
        };

        AddBranchService.saveBranch(command, function (response) {
            if (!response.isError) {
                toastr.success(response.message);
                props.history.push(props.back.path);
            } else {
                toastr.error(response.message);
            }
        });
    }

    cancel() {
        this.props.history.push(this.props.back.path);
    }
    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Header {...this.props} />
                <WrapperPaper />
                <Paper className="main-paper-container"  >
                    <form className={classes.form + " no-margin padding-right-20"}>
                        <Grid container spacing={8}>
                            <Grid item md={12}>
                                <Grid item md={5}>
                                    <Input label="عنوان" required handleChange={(e) => this.handleChange(e, 'title')} value={this.state.title} />
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid item md={5}>
                                    <div className="k-rtl list-account-bank">
                                        <DropDownComponent {...this.state}
                                            handleChange={(value, name) => this.handleChange(value, name)} nameFeild="alternativeBranch" isFilterable={true}
                                            value={this.state.selectedAlternativeBranch} />
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid item md={5}>
                                    <NumberFormatComponent id="traderCode" label="شناسه معاملگر" required
                                        value={this.state.traderCode}
                                        handleChange={(value) => this.handleChange(value, 'traderCode')} type="number" />
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid item md={5}>
                                    <Input label="نماد ایستگاه معاملاتی" required
                                        isLeftStartText={true}
                                        handleChange={(e) => this.handleChange(e, 'stationSymbol')} value={this.state.stationSymbol} />
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid item md={5}>
                                    <Input label="مدیرعامل" required handleChange={(e) => this.handleChange(e, 'managerName')} value={this.state.managerName} />
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid item md={5}>
                                    <div className="k-rtl list-account-bank">
                                        <DropDownComponent {...this.state}
                                            handleChange={(value, name) => this.handleChange(value, name)} nameFeild="branch" isFilterable={false} value={this.state.selectedBranch} />
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid item md={5}>
                                    <div className="k-rtl list-account-bank">
                                        <DropDownComponent {...this.state}
                                            handleChange={(value, name) => this.handleChange(value, name)} nameFeild="distination" isFilterable={false} value={this.state.selectedDistination} />
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid item md={5}>
                                    <div className="k-rtl list-account-bank">
                                        <DropDownComponent {...this.state}
                                            handleChange={(value, name) => this.handleChange(value, name)} nameFeild="mainMarket" isFilterable={false} value={this.state.selectedMainMarkets} />
                                    </div>
                                </Grid>
                            </Grid>
                            <div className="action-base">

                                <Button
                                    type="button"

                                    onClick={this.doAction}
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}>
                                    ثبت
                                </Button>
                                <Button
                                    type="button"

                                    onClick={this.cancel}
                                    variant="contained"
                                    color="white"
                                    className={classes.submit}>
                                    انصراف
                                </Button>
                            </div>
                            <br />
                        </Grid>
                    </form>
                    <br />
                </Paper>
            </React.Fragment>
        )
    }
}
EditBroker.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditBroker);