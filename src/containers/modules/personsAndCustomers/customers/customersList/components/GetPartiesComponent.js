import React from 'react';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridServer } from '../../../../../../shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/getPartiesColumns';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import FaIcon from 'shared/components/Icon/Icon';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../../../../layout/panel/theme';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import GetPartiesService from '../services/GetPartiesService';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import IBAN from 'shared/components/iban/textMask';
import GetAllRegion from '../../../../../../services/getRegion';
import GetAllBankNames from '../../../../../../services/getBanks';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';

import DropDownListDataProvider from "core/dropDownListDataProvider";
import  './GetPartiesComponent.css';
import moment from 'moment';
import GetMainMarket from '../../../../../../services/GetMainMarkets';
import NoDataDatePicker from 'shared/components/persianDatePicker/noDataDatePicker';
class GetParties extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pharse: null,
            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جتسجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
            },
            selectedParty: {fullName : ''},
            detailLedgerCode: null,
            accountNumber: null,
            iban: null,
            bank: {
                name: "selectedBank",
                feild: "title",
                label: "نام بانک",
                list: []
            },
            selectedBank: null,
            birthDatePlace: {
                name: "selectedRegion",
                feild: "title",
                label: "محل تولد",
                list: []
            },
            birthDate: null,
            selectedBirthDatePlace: null,
            fatherName: '',
            branch: {
                name: "selectedBranch",
                feild: "title",
                label: "شعبه ثبت کننده",
                list: []
            },
            selectedBranch: null,

            sort: [{
                field: "party.created",
                dir: "desc"
            }],
            BirthDate:null,


            mainMarket: {
                name:"mainMarketSelected",
                field:'title',
                list:[],
                label:"بازار"
            },
            mainMarketSelected: [],

        };
        this.handleChange = this.handleChange.bind(this);
        this.handlePartyChange = this.handlePartyChange.bind(this);
        this.handleBankNameChange = this.handleBankNameChange.bind(this);
        this.handleSelectedChange = this.handleSelectedChange.bind(this);
        this.successGetAllRegionsByFilter = this.successGetAllRegionsByFilter.bind(this);
        this.successGetAllBankNames = this.successGetAllBankNames.bind(this);
        this.successGetBranchesByFilter = this.successGetBranchesByFilter.bind(this);
        this.handleBirthDate = this.handleBirthDate.bind(this);
    }
    componentDidMount(){
        this.getAllRegistry();
        GetAllBankNames(this.successGetAllBankNames);
        this.getBranchByFilter();
        GetMainMarket( (response)=>  DropDownListDataProvider(this,"mainMarket",response));
    }
    getAllRegistry() {
        var command = {
            optionalFilter: {
                take: 500,
                page: 1
            }
        }
        GetAllRegion(command, this.successGetAllRegionsByFilter);
    }
    successGetAllRegionsByFilter(response) {

        if (response.success) {
            this.setState({
                birthDatePlace: {
                    name: "selectedBirthDatePlace",
                    feild: "title",
                    label: "محل تولد",
                    list: response.result
                }
            })
          
        }
    }
    successGetAllBankNames(response) {
        if (response.success) {

            this.setState({
                bank: {
                    name: "selectedBank",
                    feild: "title",
                    label: "نام بانک",
                    type: "client",
                    list: response.result
                }
            });
        
        } 
    }
    getBranchByFilter(){
        var command = {
            optionalFilter: {
                take: 500,
                page: 1

            }
        };
        GetBranchService.getBranchesByFilter(command, this.successGetBranchesByFilter)
    }
    successGetBranchesByFilter(response) {
        if (response.success) {
      
            this.setState({
                branch: {
                    name: "selectedBranch",
                    feild: "title",
                    label: "عنوان شعبه کارگزاری",
                    list: response.result
                }
            });
        
        } 
    }
    handleChange(value, name) {
        let item = value.value;
        this.setState({
            [name]: item
        })
    };
    handlePartyChange(item) {
        this.setState({
            selectedParty: item.value
        })
    }
    handleBankNameChange(item) {
        this.setState({
            selectedBank: item.value
        })
    }
    handleSelectedChange(item, name) {
        this.setState({
            [name]: item.value
        })
    }
    handleBirthDate(value){
        this.setState({
            BirthDate: value,
        })
    }
    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container party"}>
                    <GridServer
                        reportFilter={
                            {
                                partyId: this.state.selectedParty != '' ? this.state.selectedParty.id : null,
                                namePhrase: this.state.pharse,
                                branchId: this.state.selectedBranch ? this.state.selectedBranch.id : null,
                                bankNameId: this.state.selectedBank ? this.state.selectedBank.codeId : null,
                                fatherName: this.state.fatherName,
                                birthPlaceId: this.state.selectedBirthDatePlace ? this.state.selectedBirthDatePlace.id : null,
                                birthDate: this.state.BirthDate,
                                detailLedgerCode: this.state.detailLedgerCode,
                                accountNumber: this.state.accountNumber,
                                iban: this.state.iban,
                                mainMarkets: this.state.mainMarketSelected.length> 0 ? this.state.mainMarketSelected.map(s=>{return s.id}) : [],
                            }
                        }
                        {... this.props}
                        {... this.state}
                        preSearch={this.preSearch}
                        service={GetPartiesService.getAllPartyByFilter}
                        Columns={Columns}
                        sort={this.state.sort}
                        classHeightOpenPanel={"height-open-grid"}
                        reRender={true}>

                        <div classPage={"height-search"}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={12}>
                                    <AutoCompleteComponent {...this.state.party}
                                        handleChange={(value) => this.handlePartyChange(value)}
                                        value={this.state.selectedParty.fullName}
                                        service={GetPartiesService.getAllPartyForAutocomplete} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={2}>
                                    <Input label="نام پدر" handleChange={(e) => this.handleChange(e, 'fatherName')} value={this.state.fatherName} />
                                </Grid>
                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <DropDownComponent {...this.state.birthDatePlace}
                                            handleChange={(value, name) => this.handleSelectedChange(value, name)} isFilterable={true}
                                            value={this.state.selectedBirthDatePlace} />
                                    </div>
                                </Grid>
                                <Grid item md={2}>
                                    <NoDataDatePicker isNull={true} selectedDate={this.state.BirthDate} label="تاریخ تولد" handleOnChange={this.handleBirthDate}/>
                                    {/* <PersianDatePicker selectedDate={this.state.BirthDate} label="تاریخ تولد" handleOnChange={this.handleBirthDate} /> */}
                                </Grid>
                                <Grid item md={3}>
                                    <NumberFormatComponent id="detailLedgerCode" label="کد تفضیل"
                                        value={this.state.detailLedgerCode}
                                        handleChange={(value, error) => this.handleChange(value, 'detailLedgerCode')} type="number" />
                                </Grid>
                                <Grid item md={3}>
                                    <NumberFormatComponent id="accountNumber" label="شماره حساب" value={this.state.accountNumber}
                                        handleChange={(value, error) => this.handleChange(value, 'accountNumber')} type="number" />
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} className="no-margin">
                               
                                <Grid item md={3}>
                                    <IBAN handleChange={(value) => this.handleChange(value, 'iban')} value={this.state.iban} />
                                </Grid>
                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <DropDownComponent {...this.state.bank}
                                            handleChange={(value) => this.handleBankNameChange(value)} isFilterable={true}
                                            value={this.state.selectedBank} />
                                    </div>
                                </Grid>
                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <DropDownComponent {...this.state.branch}
                                            handleChange={(value, name) => this.handleSelectedChange(value, name)} isFilterable={true}
                                            value={this.state.selectedBranch} />
                                    </div>
                                </Grid>
                                <Grid item md={5}>
                                    <div className="k-rtl">
                                        <MultiSelectComponent
                                            {...this.state.mainMarket}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            isFilterable={true}
                                            value={this.state.mainMarketSelected} />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </GridServer>
                </Paper>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(GetParties);