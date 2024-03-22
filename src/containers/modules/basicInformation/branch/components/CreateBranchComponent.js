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
import Header from 'shared/components/stateHeader/stateHeader';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import IBAN from 'shared/components/iban/textMask';
import styles from 'containers/layout/panel/theme';
import Button from '@material-ui/core/Button';
import Form from 'shared/components/form/form';
import GetEnum from 'services/getEnum';
import GetAllBankNames from 'services/getBanks';
import GetAllRegion from 'services/getRegion';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';

import GetMainMarket from 'services/GetMainMarkets';
class AddBranch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            alternativeBranch: {
                name: "selectedAlternativeBranch",
                feild: "title",
                label: "شعبه جایگزین",
                list: []
            },
            selectedAlternativeBranch: {},


            branch: {
                name: "selectedBranch",
                feild: "title",
                label: "َشعبه",
                list: []
            },
            selectedBranch: {},



            distination: {
                name: "selectedDistination",
                feild: "title",
                label: "نوع مقصد",
                list: []
            },
            selectedDistination: {},



            mainMarket: {
                name: "selectedMainMarkets",
                feild: "title",
                label: "بازار",
               
                list: []
            },
            selectedMainMarkets: [],



            title: '',
            traderCode: '',
            stationSymbol: '',
            managerName: '',
        }
        
    }

    componentDidMount() {
     this.getBranchByfilter();
     this.getAllEnumtypes();
    }

    getBranchByfilter = () => {
        var command = {
            optionalFilter: {
                take: 500,
                page: 1
            }
        }
        GetBranchService.getBranchesByFilter(command, (response) => {
            this.setState({
                alternativeBranch: {
                    name: "selectedAlternativeBranch",
                    feild: "title",
                    label: "شعبه جایگزین",
                    list: response.result
                }
            })
        });
    }
   
    getAllEnumtypes = () => {
        GetEnum("BranchType", (response) => {
            if (response.success) {
                this.setState({
                    branch: {
                        name: "selectedBranch",
                        feild: "title",
                        label: "َشعبه",
                        list: response.result
                    }
                })
            } 
        });
        GetEnum("BranchStationType", (response) => {
            if (response.success) {
                this.setState({
                    distination: {
                        name: "selectedDistination",
                        feild: "title",
                        label: "نوع مقصد",
                        list: response.result
                    }
                })
            }
        });
        GetMainMarket((response) => {
            if (response.success) {
                this.setState({
                    mainMarket: {
                        name: "selectedMainMarkets",
                        feild: "title",
                        label: "بازار",
                        list: response.result
                    }
                })
            }
        });
    }

   
    handleChange = (value, name) => {
        let item = value.value;
        console.log(item);
        this.setState({
            [name]: item
        })
    }

    
    preSubmit() {

        // var mainMarketIds = [];
        // this.state.selectedMainMarkets.map(item => {
        //     mainMarketIds.push(item.id);
        // })
        // return {
        //     title: this.state.title,
        //     alternativeBranchId: this.state.selectedAlternativeBranch ? this.state.selectedAlternativeBranch.id : null,
        //     traderCode: this.state.traderCode,
        //     stationSymbol: this.state.stationSymbol,
        //     managerName: this.state.managerName,
        //     type: this.state.selectedBranch.code,
        //     stationType: this.state.selectedDistination.code,
        //     mainMarketIds: mainMarketIds
        // }
    };

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Header {...this.props} />
                <Form
                    {...this.props}
                    service={AddBranchService.saveBranch}
                    // preSubmit={this.preSubmit}
                    className="form-height"
                    entity={
                        {
                            title: this.state.title,
                            alternativeBranchId: this.state.selectedAlternativeBranch.id,
                            traderCode: this.state.traderCode,
                            stationSymbol: this.state.stationSymbol,
                            managerName: this.state.managerName,
                            stationType: this.state.selectedDistination.code,
                            type: this.state.selectedBranch.code,
                            mainMarketIds: this.state.selectedMainMarkets,

                        }
                      }
                >
                    <Grid container spacing={8}>
                        <Grid item md={12}>
                            <Grid item md={5}>
                                <Input label="عنوان" required handleChange={(e) => this.handleChange(e, 'title')} value={this.state.title} />
                            </Grid>
                        </Grid>
                        <Grid item md={12}>
                            <Grid item md={5}>
                                <div className="k-rtl list-account-bank">
                                    <DropDownComponent {...this.state.alternativeBranch}
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
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
                                    <DropDownComponent {...this.state.branch}
                                        handleChange={(value, name) => this.handleChange(value, name)} nameFeild="branch" isFilterable={false} value={this.state.selectedBranch} />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item md={12}>
                            <Grid item md={5}>
                                <div className="k-rtl list-account-bank">
                                    <DropDownComponent {...this.state.distination}
                                        handleChange={(value, name) => this.handleChange(value, name)} nameFeild="distination" isFilterable={false} value={this.state.selectedDistination} />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item md={12}>
                            <Grid item md={5}>
                                <div className="k-rtl list-account-bank">
                                    <MultiSelectComponent {...this.state.mainMarket}
                                        handleChange={(value, name) => this.handleChange(value, name)} nameFeild="mainMarket" isFilterable={false} value={this.state.selectedMainMarkets} />
                                </div>
                            </Grid>
                        </Grid>
                     
                    </Grid>
                </Form>
            </React.Fragment>
        )
    }
}
AddBranch.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddBranch);