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
import AddOrdersService from '../services/UpdateOrdersService';
import { Paper } from '@material-ui/core';
import TabList from 'shared/components/tab/tab';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import Detail from 'shared/components/kendoGrid/detailPanel/detailPanel';
import GetPartiesService from '../../../../personsAndCustomers/customers/customersList/services/GetPartiesService';
import './UpdateOrderComponent.css'
import { productTemplate, productHeaderTemplate } from 'constants/autoCompleteTemplate';
import GetAllProductsPaging from '../../../../../../services/getProducts';
import UpdateBuyOrderComponent from './UpdateBuyOrderComponent';
import UpdateSellOrderComponent from './UpdateSellOrderComponent';
import NumericBySign from '../../../../../../shared/components/numericBySign/numericBySign';
import GetTradingBookService from '../../../../accounting/accountingBase/tradingBook/servies/getTradingBookService';
import UpdateForDoneOrderComponent from "./UpdateForDoneOrderComponent";

class UpdateOrderComponent extends React.Component {
    constructor(props) {
        super(props);


        this.state = {

            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جتسجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
            },
            selectedParty: this.props.location.state && this.props.location.state.stateParams.selectedParty ? this.props.location.state.stateParams.selectedParty : { fullName: '', id: 0 },
            product: {
                name: "selectedProduct",
                field: "symbol",
                placeholder: "جستجوی نماد",
            },

            selectedProduct: this.props.location.state && this.props.location.state.stateParams.selectedProduct ? this.props.location.state.stateParams.selectedProduct : { fullProductName: '', id: 0 },
            tradingBook: {},
            branchDropDowm: {
                name: "branch",
                feild: "title",
                label: "شعبه",
                list: [],
                dataItemKey: 'title'

            },
            branch: this.props.location.state && this.props.location.state.stateParams.selectedBranch ? this.props.location.state.stateParams.selectedBranch : { id: 0 },
            tabList: [
                {
                    label: "خرید", key: 1, id: 1, component: <UpdateBuyOrderComponent displayName="UpdateBuyOrderComponent"    {...props} branchId={this.props.location.state.stateParams.selectedBranch.id} partyId={this.props.location.state.stateParams.selectedParty.id}
                        productId={this.props.location.state.stateParams.selectedProduct.id} />
                },
                { label: "فروش", key: 2, id: 2, component: <UpdateSellOrderComponent displayName="UpdateSellOrderComponent"    {...props} branchId={this.props.location.state.stateParams.selectedBranch.id} partyId={this.props.location.state.stateParams.selectedParty.id} productId={this.props.location.state.stateParams.selectedProduct.id} /> },
            ],
            tabForUpdateSerialNummber: this.props.location.state.stateParams.orderSide === 1 ? [
                {
                    label: "خرید", key: 1, id: 1, component:
                        <UpdateForDoneOrderComponent
                            displayName="UpdateBuyOrderComponent"
                            {...props}
                            branchId={this.props.location.state.stateParams.selectedBranch.id}
                            partyId={this.props.location.state.stateParams.selectedParty.id}
                            productId={this.props.location.state.stateParams.selectedProduct.id}
                            ids={this.props.location.state.ids} />
                },

            ] :
                [
                    {
                        label: "فروش", key: 2, id: 2, component:
                            <UpdateForDoneOrderComponent
                                displayName="UpdateSellOrderComponent"
                                {...props}
                                branchId={this.props.location.state.stateParams.selectedBranch.id}
                                partyId={this.props.location.state.stateParams.selectedParty.id}
                                productId={this.props.location.state.stateParams.selectedProduct.id}
                                ids={this.props.location.state.ids} />
                    },

                ]

        };

        console.log("costructor", this.state.branch, this.props.location.state.stateParams.selectedBranch);
        this.getAllEnumtypes = this.getAllEnumtypes.bind(this);
        this.refresh = this.refresh.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getBranchByFilter = this.getBranchByFilter.bind(this);
        this.handlePartyChange = this.handlePartyChange.bind(this);
        this.getTardingBookByPartyId = this.getTardingBookByPartyId.bind(this);
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
        this.getBranchByFilter();
        this.getBranches();
        this.setTabList();
        this.getTradingBook({ value: this.props.location.state && this.props.location.state.stateParams.selectedParty ? this.props.location.state.stateParams.selectedParty : { fullName: '', id: 0 } })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.branch !== this.state.branch || this.state.selectedParty !== prevState.selectedParty || this.state.selectedProduct !== prevState.selectedProduct)
            this.setTabList();
    }
    handleChange(value, name) {
        let item = value.value;
        this.setState({
            [name]: item
        })
    }

    reloadOrder() {

        this.setState({ selectedProduct: { symbol: '', id: 0 }, selectedParty: { fullName: '', id: 0 }, branch: { id: 0 } })
    }
    setTabList() {
        console.log()
        this.setState({
            tabList: [
                { label: "خرید", key: 1, id: 1, component: <UpdateBuyOrderComponent displayName="UpdateBuyOrderComponent" reloadOrder={this.reloadOrder} buyingPower={this.state.tradingBook.buyingPower}   {...this.props} branchId={this.state.branch.id} partyId={this.state.selectedParty.id} productId={this.state.selectedProduct.id} /> },
                { label: "فروش", key: 2, id: 2, component: <UpdateSellOrderComponent displayName="UpdateSellOrderComponent" reloadOrder={this.reloadOrder}  {...this.props} branchId={this.state.branch.id} partyId={this.state.selectedParty.id} productId={this.state.selectedProduct.id} /> },
            ]
        })
    }


    getBranches() {
        var command = {
            optionalFilter: {
                take: 500,
                page: 1

            }
        }
        GetBranchService.getTseBranches(this.successGetBranch);
    }
    successGetBranch(response) {
        if (response.result) {
            console.log("111", response.result)
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
        GetBranchService.getBranchesByFilter(command, (response) => DropDownListDataProvider(this, "branch", response))
    }
    refresh() {
        this.setState(this.getInitialState());
        this.getAllRegistry();
    }
    handlePartyChange(value) {


        this.setState({ selectedParty: value.value }, this.getTradingBook(value));

    }
    handleProductChange(value) {



        this.setState({ selectedProduct: value.value });

    }
    getTradingBook(value) {
        var command = {
            entity: value.value.id
        }

        if (value.value)
            GetTradingBookService.getTradingBookByPartyId(command, this.successGetTradingBook)
    }
    successGetTradingBook(response) {
        if (response.success)
            this.setState({ tradingBook: response.result });

    }
    getTardingBookByPartyId(partyId) {

        // AddOrdersService.getTradingBookByPartyId()
    }
    render() {

        console.log("ttttt", this.props.location.state)
        return (
            <React.Fragment>
                <Header {...this.props}
                    backParams={{ ids: this.props.location.state.stateParams.ids }}

                />

                <Paper>
                    <br />



                    <Fieldset marginRight legend={'اطلاعات مشتری'}>
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={2}>
                                {/* {!this.props.location.state.stateParams.orderIsDone? */}
                                <div className="create-order">

                                    <DropDownComponent
                                        isDisabled={this.props.location.state.stateParams.orderIsDone}
                                        {...this.state.branchDropDowm}
                                        handleChange={(value, name) => this.handleChange(value, name)}
                                        isFilterable={true}
                                        value={this.state.branch} />
                                </div>
                                {/* :
                                        <div style={{ marginTop: -15 }}>
                                        <Input label="شعبه" 
                                            value={this.props.location.state.stateParams.selectedBranch.title}

                                            disabled required />
                                    </div>
                                    } */}




                            </Grid>
                            <Grid item md={10}>
                                {!this.props.location.state.stateParams.orderIsDone ?
                                    <div className="create-order">

                                        <AutoCompleteComponent
                                            isDisabled={!this.props.location.state.stateParams.orderIsDone}

                                            {...this.state.party}
                                            handleChange={(value) => this.handlePartyChange(value)}
                                            value={this.state.selectedParty.fullName}
                                            service={GetPartiesService.getAllPartyForAutocomplete} />





                                    </div>
                                    :
                                    <div style={{ marginTop: -15 }}>
                                        <Input label="عنوان مشتری"
                                            value={this.props.location.state.stateParams.selectedParty.fullName}

                                            disabled required />
                                    </div>
                                }

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

                    <Fieldset marginRight legend={'نماد'}>
                        <Grid container spacing={8} className="no-margin">

                            <Grid item md={12}>
                                {!this.props.location.state.stateParams.orderIsDone ?
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
                                    :
                                    <div style={{ marginTop: -15 }}>
                                        <Input label="نماد"
                                            value={this.props.location.state.stateParams.selectedProduct.symbol} disabled required />
                                    </div>
                                }

                            </Grid>
                        </Grid>
                    </Fieldset>
                    <br />

                </Paper>


                <br />
                {!this.props.location.state.stateParams.orderIsDone ?
                    <TabList
                        updatePerChange
                        style={{ height: 535, marginTop: -15 }}
                        redIndicator
                        list={this.state.tabList}
                        selectedTab={this.state.tabList[this.props.location.state.stateParams.orderSide - 1].component}
                    ></TabList> :
                    <TabList
                        updatePerChange
                        style={{ height: 535, marginTop: -15 }}
                        redIndicator
                        red={this.props.location.state.stateParams.orderSide === 2}
                        list={this.state.tabForUpdateSerialNummber}
                        selectedTab={this.state.tabForUpdateSerialNummber[0].component}

                    ></TabList>
                }



            </React.Fragment >
        )
    }
}

UpdateOrderComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    orderIsDone: false
};

export default withStyles(styles)(UpdateOrderComponent);