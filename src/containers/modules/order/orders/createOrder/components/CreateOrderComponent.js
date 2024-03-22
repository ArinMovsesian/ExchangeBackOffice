import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import classNames from 'classnames';
import Input from 'shared/components/formInput/inputForm'
import Email from 'shared/components/email/email'
import Header from 'shared/components/stateHeader/stateHeader'
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes, { func } from 'prop-types';
import styles from '../../../../../layout/panel/theme'
import DropDownComponent from 'shared/components/dropDown/dropDown';
import Form from 'shared/components/form/pureForm';
import NationalCode from 'shared/components/nationalCode/nationalCode';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import Fieldset from 'shared/components/fieldset/fieldset';
import GetEnum from 'services/getEnum';
import GetAllBankNames from '../../../../../../services/getBanks';
import GetAllRegion from '../../../../../../services/getRegion';
import GetMainMarket from '../../../../../../services/GetMainMarkets';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import DropDownListDataProvider from '../../../../../../core/dropDownListDataProvider';
import getBankAccountUsages from "../../../../../../services/getBankAccountUsages";
import AddOrdersService from '../services/CreateOrdersService';
import { Paper } from '@material-ui/core';
import TabList from 'shared/components/tab/tab';
import CreateSellOrderComponent from './CreateSellOrderComponent';
import CreateBuyOrderComponent from './CreateBuyOrderComponent';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';

import Detail from 'shared/components/kendoGrid/detailPanel/detailPanel';
import GetPartiesService from '../../../../personsAndCustomers/customers/customersList/services/GetPartiesService';
import './CreateOrderComponent.css'
import { productTemplate, productHeaderTemplate } from 'constants/autoCompleteTemplate';


import GetAllProductsPaging from '../../../../../../services/getProducts';
import GetTradingBookService from '../../../../accounting/accountingBase/tradingBook/servies/getTradingBookService';
import NumericBySign from '../../../../../../shared/components/numericBySign/numericBySign';
import { yellow } from '@material-ui/core/colors';
class AddOrderComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جتسجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
            },
            selectedParty: { fullName: '', id: 0 },
            product: {
                name: "selectedProduct",
                field: "symbol",
                placeholder: "جستجوی نماد",
            },

            selectedProduct: { fullProductName: '', id: 0 },
            tradingBook: {},
            branchDropDowm: {
                name: "branch",
                feild: "title",
                label: "شعبه",
                list: []
            },
            tradingBook: {},
            branch: { id: 0 },
            tabList: [
                { label: "خرید", key: 1, id: 1, component: <CreateBuyOrderComponent displayName="CreateBuyOrderComponent"    {...props} /> },
                { label: "فروش", key: 2, id: 2, component: <CreateSellOrderComponent displayName="CreateSellOrderComponent"    {...props} /> },
            ]

        };

        this.getAllEnumtypes = this.getAllEnumtypes.bind(this);
        this.refresh = this.refresh.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getBranchByFilter = this.getBranchByFilter.bind(this);
        this.handlePartyChange = this.handlePartyChange.bind(this);
        // this.getTardingBookByPartyId = this.getTardingBookByPartyId.bind(this);
        this.getBranches = this.getBranches.bind(this);
        this.successGetBranch = this.successGetBranch.bind(this);
        this.setTabList = this.setTabList.bind(this);
        this.reloadOrder = this.reloadOrder.bind(this);
        this.getTradingBook = this.getTradingBook.bind(this);
        this.successGetTradingBook = this.successGetTradingBook.bind(this);
        // this.getTardingBookByPartyId = this.getTardingBookByPartyId.bind(this);
    }

    componentDidMount() {
        this.getAllEnumtypes();
        // this.getBranchByFilter();
        this.getBranches();
        this.setTabList();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.branch !== this.state.branch || this.state.selectedParty !== prevState.selectedParty || this.state.selectedProduct !== prevState.selectedProduct || JSON.stringify(this.state.tradingBook)!==JSON.stringify(prevState.tradingBook))
            this.setTabList();
    }
    handleChange(value, name) {
        let item = value.value;
        this.setState({
            [name]: item
        })
    }

    reloadOrder() {

        this.setState({ selectedProduct: { symbol: '', id: 0 }, tradingBook: {}, selectedParty: { fullName: '', id: 0 }, branch: { id: 0 } })
    }
    setTabList() {
        this.setState({
            tabList: [
                { label: "خرید", key: 1, id: 1, component: <CreateBuyOrderComponent displayName="CreateBuyOrderComponent" reloadOrder={this.reloadOrder}    {...this.props} branchId={this.state.branch.id} partyId={this.state.selectedParty.id} buyingPower= {this.state.tradingBook.buyingPower} productId={this.state.selectedProduct.id} /> },
                { label: "فروش", key: 2, id: 2, component: <CreateSellOrderComponent displayName="CreateSellOrderComponent" reloadOrder={this.reloadOrder}  {...this.props} branchId={this.state.branch.id} partyId={this.state.selectedParty.id} productId={this.state.selectedProduct.id} /> },
            ]
        })
    }


    getBranches() {

        GetBranchService.getTseBranches(this.successGetBranch);
    }
    successGetBranch(response) {
        console.log("111",response.result)

        if (response.result) {
            console.log("111",response.result)

            this.setState({
                branchDropDowm: {
                    name: "branch",
                    feild: "title",
                    label: "شعبه",
                    list: response.result
                }
            })
        }
    }

    getAllEnumtypes() {


    }




    getBranchByFilter() {
        var command = {
            optionalFilter: {
                take: 500,
                page: 1

            }
        };
        GetBranchService.getTseBranchesByFilter(command, (response) => DropDownListDataProvider(this, "branch", response))
    }




    refresh() {
        this.setState(this.getAllRegistry());
        this.getAllRegistry();
    }

    handlePartyChange(value) {

        var command = {
            entity: value.value.id
        }

        if (value.value)
            this.setState({ selectedParty: value.value }, this.getTradingBook(command));

    }
    handleProductChange(value) {



        this.setState({ selectedProduct: value.value });

    }
    getTradingBook(command) {
        console.log("command", command)
        GetTradingBookService.getTradingBookByPartyId(command, this.successGetTradingBook)
    }
    successGetTradingBook(response) {
        if (response.success)
            this.setState({ tradingBook: response.result });

    }
    // getTardingBookByPartyId(partyId) {

    //     // AddOrdersService.getTradingBookByPartyId()
    // }
    render() {
        console.log(this.state.tradingBook.blockRemain)
        return (
            <React.Fragment>
                <Header {...this.props} />

                <Paper>
                    <br />



                    <Fieldset marginRight legend={'اطلاعات مشتری'}>
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={2}>
                                <div className="create-order">

                                    <DropDownComponent {...this.state.branchDropDowm}
                                        isRequired
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                                        value={this.state.branch} />
                                </div>
                            </Grid>
                            <Grid item md={10}>
                                <div className="create-order">
                                    <AutoCompleteComponent

                                        {...this.state.party}
                                        handleChange={(value) => this.handlePartyChange(value)}
                                        value={this.state.selectedParty.fullName}
                                        service={GetPartiesService.getAllPartyForAutocomplete} />
                                </div>

                            </Grid>
                            <Grid item md={12} style={{ backgroundColor: '#b4ff002e', marginLeft: 4 }}>
                                <Grid container spacing={8} className="no-margin">
                                    {/* <Grid item md={2}><h4 style={{fontWeight:'bold'}}>اطلاعات مشتری :</h4></Grid> */}

                                    <Grid item md={2}><h5>بلوکه شده :
                            <NumericBySign field={this.state.tradingBook.blockRemain} />
                                    </h5></Grid>


                                    <Grid item md={2}><h5>مانده :
                            <NumericBySign field={this.state.tradingBook.remainT0} />
                                    </h5></Grid>
                                    <Grid item md={2}><h5>اعتبار:
                            <NumericBySign field={this.state.tradingBook.creditAmount} />

                                    </h5></Grid>
                                    <Grid item md={2}><h5>قدرت خرید:
                            <NumericBySign field={this.state.tradingBook.buyingPower} />

                                    </h5></Grid>
                                    <Grid item md={2}><h5>پرتفوی:</h5></Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Fieldset>
                    {/* <Fieldset  marginRight legend={'شعبه'}>
                    <Grid item md={2}>
                    <div className="create-order">
                 
                  <DropDownComponent {...this.state.branchDropDowm}
                    handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                    value={this.state.branch} />
                    </div>
                </Grid>
                    </Fieldset> */}
                    <Fieldset marginRight legend={'نماد'}>
                        <Grid container spacing={8} className="no-margin">

                            <Grid item md={12}>
                                <div className="create-order">
                                    <AutoCompleteComponent
                                        fieldSearch="phrase"
                                        {...this.state.product}
                                        handleChange={(value) => this.handleProductChange(value)}
                                        value={this.state.selectedProduct.symbol}
                                        service={GetAllProductsPaging.getAllProductsPagingMethod}
                                        headerTemplate={productHeaderTemplate}
                                        template={productTemplate}
                                    />
                                </div>

                            </Grid>
                        </Grid>
                    </Fieldset>
                    <br />

                </Paper>


                <br />
                <TabList updatePerChange style={{ height: 535, marginTop: -15 }} redIndicator list={this.state.tabList}></TabList>


            </React.Fragment >
        )
    }
}

AddOrderComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddOrderComponent);