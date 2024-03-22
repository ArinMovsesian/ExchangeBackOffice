import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
// import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
// import Columns from '../constants/GetReceiveListColumn';
import Grid from '@material-ui/core/Grid';
import './GetPaymentAndReceiveListComponent.css';
import DropDownComponent from 'shared/components/dropDown/dropDown';
// import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete';
// import Input from 'shared/components/formInput/inputForm';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
// import {chequeBookTitleWidoutHeaderTemplate} from "../../../../../../constants/chequeBookTitleWidoutHeaderTemplate";
import moment from 'moment';
import GetMainMarket from "../../../../../../services/GetMainMarkets";
import GetChequeBookServices from "../../../chequeManagement/chequeBook/services/GetChequeBookServices";
import Columns from "../constants/GetPaymentAndReceiveListConstants";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';

import { excelAndPdfToolbar } from '../../../../../../constants/excelPdfToolbar';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
// import GetAllCashFlowCategoryService from "../../../Receivce/receiveList/services/GetAllCashFlowCategoryService";
import kendo from "@progress/kendo-ui";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import FaIcon from 'shared/components/Icon/Icon';
import GetPaymentAndReceiveServices from "../services/GetPaymentAndReceiveServices";
const $ = require("jquery");

class GetPaymentAndReceiveListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fromDate: moment(new Date()),
            toDate: moment(new Date().setDate(new Date().getDate() + 7)),
            fromPrice: null,
            toPrice: null,
            cashFlowState: {
                name:"cashFlowStateSelected",
                field:'title',
                list:[],
                label:"وضعیت"
            },
            cashFlowStateSelected: [],


            mainMarket: {
                name:"mainMarketSelected",
                field:'title',
                list:[],
                label:"بازار"
            },
            mainMarketSelected: [],




            columns: Columns(),
            open: false,



            transactionType: {
                name: "selectedTransactionType",
                field: "title",
                label: "نوع تراکنش",
                list: []
            },
            selectedTransactionType: { code: 0, title: '' },


            bankDeposit: {
                name: "bankDepositSelected",
                // field: "fullName",
                // list: [],
                // value:'',
                placeholder: 'بانک دریافتی',
                dataTextField: 'fullAccountNumber',
                dataValueField: 'id',
                fieldSearch: 'phrase',
                template: null,
                headerTemplate: null
            },
            bankDepositSelected: [],
        };
    }

    componentDidMount() {
        GetMainMarket( (response)=>  DropDownListDataProvider(this,"mainMarket",response));
        // GetEnum("cashflowstate", (response)=>  {DropDownListDataProvider(this,"cashFlowState",response)});
        GetEnum("CashFlowStateExceptDeleted", (response)=>  {DropDownListDataProvider(this,"cashFlowState",response)});
        GetEnum("cashflowtransactiontype", (response)=>  {DropDownListDataProvider(this,"transactionType",response)});
        this.getTradeList();
    }

    handleChange = (value, name) => {
        let item = value.value;
        this.setState({
            [name]: item
        })
    };
    handleDate = (value, name) =>{
        this.setState({
            [name]: value
        })
    };
    handleExpandSearchPanel = () => {
        this.setState({
            open: !this.state.open
        })
    };
    search = () => {
        // $("#paymentAndReceiveList").data("kendoGrid").dataSource.read(this);
        this.getTradeList();
    };
    getCommand = () => {
        var grid = $("#paymentAndReceiveList").data("kendoGrid");
        var dataSource = grid.dataSource;
    
        var command = {
            reportFilter: {
                id: 0,
                startAmount: this.state.fromPrice,
                endAmount: this.state.toPrice,
                states: this.state.cashFlowStateSelected.length> 0 ? this.state.cashFlowStateSelected.map(s=>{return s.code}) : [],
                mainMarkets: this.state.mainMarketSelected.length> 0 ? this.state.mainMarketSelected.map(s=>{return s.id}) : [],
                bankDeposits: this.state.bankDepositSelected.length > 0 ?  this.state.bankDepositSelected.map((v) => v.id):[],
                startDate: this.state.fromDate,
                endDate: this.state.toDate,
                cashFlowTransactionType: this.state.selectedTransactionType.code
            },
            OptionalFilter: {
                page: dataSource ? dataSource.page() : 1,
                take: dataSource ? dataSource.pageSize() : 50,
                // take: option.data.take ? option.data.take : 50,
                sort: dataSource ? dataSource.sort() :
                [{
                    field: "dueDate",
                    dir: "asc"
                }]
            }
        }
        return command;
      }
    getExcelReport = () => {
        var command = this.getCommand();
    };
    getPdfReport = () => {alert('pdf')}
    getTradeList = () => {
        let self = this;

        $("#paymentAndReceiveList").kendoGrid({
            dataSource: {
                transport: {
                    read: function (option) {
                        if (option.data.state) {
                            self = option.data
                        }
                        var command = {
                            reportFilter: {
                                id: 0,
                                startAmount: self.state.fromPrice? parseInt(self.state.fromPrice.replace(/,/g, '')) : '',
                                endAmount: self.state.toPrice? parseInt(self.state.toPrice.replace(/,/g, '')) : '',
                                states: self.state.cashFlowStateSelected.length> 0 ? self.state.cashFlowStateSelected.map(s=>{return s.code}) : [],
                                mainMarkets: self.state.mainMarketSelected.length> 0 ? self.state.mainMarketSelected.map(s=>{return s.id}) : [],
                                bankDeposits: self.state.bankDepositSelected.length > 0 ?  self.state.bankDepositSelected.map((v) => v.id):[],
                                startDate: self.state.fromDate,
                                endDate: self.state.toDate,
                                cashFlowTransactionType: self.state.selectedTransactionType.code
                            },
                            OptionalFilter: {
                                page: option.data.page ? option.data.page : 1,
                                take: option.data.take ? option.data.take : 50,
                                sort: option.data.sort ? option.data.sort :
                                    [{
                                        field: "dueDate",
                                        dir: "asc"
                                    }]
                            }
                        };
                        GetPaymentAndReceiveServices.getflatreceiveandpaymentMethod(command, function (response) {
                            option.success(response);
                            $("#paymentAndReceiveList .k-grid-footer .k-grid-footer-wrap " + "tbody tr td div.total-amount-sum").text(kendo.toString(response.totalAmountSum, 'n0'));
                            $("#paymentAndReceiveList .k-grid-footer .k-grid-footer-wrap " + "tbody tr td div.total-remainValue-sum").text(kendo.toString(response.totalRemainValueSum, 'n0'));
                            $("#paymentAndReceiveList .k-grid-footer .k-grid-footer-wrap " + "tbody tr td div.total-requestedAmount-sum").text(kendo.toString(response.totalRequestedAmountSum, 'n0'));
                        })
                    }
                },

                pageSize: 50,
                sort: {
                    field: "dueDate",
                    dir: "asc"
                },
                serverPaging: true,
                serverSorting: true,
                schema: {
                    data: "result",
                    total: "totalRecords"

                },
                aggregate: [
                    { field: "remainValue", aggregate: "sum" },
                    { field: "amount", aggregate: "sum" },
                    { field: "requestedAmount", aggregate: "sum" },
                ]
            },

            autoBind: true,
            sortable: {
                allowUnsort: false
            },
            resizable: true,
            reorderable: true,
            navigatable: false,
            columnMenu: {
                messages: {
                    sortAscending: "صعودی",
                    sortDescending: "نزولی",
                    columns: "ستون ها"
                }
            },
            pageable: {
                pageSizes: [50, 150, 200],
                buttonCount: 5,
                messages: {
                    itemsPerPage: "تعداد سطر در هر صفحه",
                    display: "{0} - {1} از {2} مورد",
                    empty: ""
                }
            },
            allowCopy: true,
            toolbar: excelAndPdfToolbar,
            noRecords: {
                template: '<p class="orange-page font-size-2 no-data">رکوردی جهت نمایش وجود ندارد.</p>'
            },
            dataBound: function (e) {
                var scrollOffset = {
                    left:10000 ,
                };
                  var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
                  container.scrollLeft(scrollOffset.left);
                if (this.dataSource.data().length > 0) {
                    let grid = $("#paymentAndReceiveList").data("kendoGrid");
                    let items = grid.dataSource.view();
                    items.map((item, index) => {
                        let id = items[index].uid;
                        let currentRow = grid.table.find("tr[data-uid='" + id + "']");
                        // if (index === this.dataSource.data().length - 1) {
                        if (index === this.dataSource.data().length ) {
                            currentRow.css({ display: 'none', visibility: 'hidden' });




                        } else {
                            currentRow.find(".account-code").css({ color: '#039be5', cursor: 'pointer' });
                        }
                    });
                };
                $("#paymentAndReceiveList .excel-report").on("click", function (item) {
                    self.getExcelReport();
                  });
                  $("#paymentAndReceiveList .pdf-report").on("click", function (item) {
                    self.getPdfReport();
                  });
                // $("#paymentAndReceiveList tbody tr td span.edit").on("click", function (item) {
                //     var grid = $("#paymentAndReceiveList").data("kendoGrid");
                //     var row = $(item.target).closest("tr");
                //     var dataItem = grid.dataItem(row);
                //     console.log('self', self);
                //     self.props.history.push(
                //         {
                //             pathname: '/main/cashFlow/receive/editReceive',
                //             state: {
                //                 sateParams:{
                //                     partyId:  dataItem.partyId,
                //                     id: dataItem.id,
                //                     fullName: dataItem.fullName,
                //                     nationalId: dataItem.nationalId
                //                 }
                //             }
                //
                //         })
                // });
                //
                $("#paymentAndReceiveList tbody tr td span.delete").on("click", function (item) {
                    // var grid = $("#paymentAndReceiveList").data("kendoGrid");
                    // var row = $(item.target).closest("tr");
                    // var dataItem = grid.dataItem(row);
                    // alert(dataItem.id);

                    self.setState({
                        modalStatus: true
                    })
                    // console.log('self', self);
                    // self.props.history.push(
                    //     {
                    //         pathname: '/main/cashFlow/receive/editReceive',
                    //         state: {
                    //             sateParams:{
                    //                 partyId:  dataItem.partyId,
                    //                 id: dataItem.id,
                    //                 fullName: dataItem.fullName,
                    //                 nationalId: dataItem.nationalId
                    //             }
                    //         }
                    //
                    //     })
                });


            },
            columns: self.state.columns
        });

    };
    removeMultiSelectHandles = (event, name) => {
        let list = this.state[name];

        for(let i = 0; i < this.state[name].length; i++){
            if(event.id == this.state[name][i].id){
                list.splice(i,1);
            }
        }
        this.setState({
            [name]: list
        });
        console.log('remove in parent', event);
    };
    addMultiSelectHandles = (event, name) =>{
        let list = this.state[name];
        list.push(event);
        this.setState({
            [name]: list
        });
        console.log('add in parent', event);
    };

    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container paymentAndReceiveList"}>
                    <Filter
                        search={this.search}
                        handleExpandSearchPanel={this.handleExpandSearchPanel}
                        {...this.state}
                    >
                        <div classPage={"height-search"}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={2}>
                                    <PersianDatePicker selectedDate={this.state.fromDate} label="از تاریخ" handleOnChange={(value) => this.handleDate(value, 'fromDate')} />
                                </Grid>
                                <Grid item md={2}>
                                    <PersianDatePicker selectedDate={this.state.toDate} label="تا تاریخ" handleOnChange={(value) => this.handleDate(value, 'toDate')} />
                                </Grid>
                                <Grid item md={3}>
                                    <NumberFormatComponent id="" label="از مبلغ"
                                                           value={this.state.fromPrice}
                                                           handleChange={(value) => this.handleChange(value, 'fromPrice')} type="number" isSeparator={true}/>
                                </Grid>
                                <Grid item md={3}>
                                    <NumberFormatComponent id="" label="تا مبلغ"
                                                           value={this.state.toPrice}
                                                           handleChange={(value) => this.handleChange(value, 'toPrice')} type="number" isSeparator={true}/>
                                </Grid>

                            </Grid>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={5}>
                                    <div className="k-rtl">
                                        <MultiSelectComponent
                                            {...this.state.cashFlowState}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            isFilterable={true}
                                            value={this.state.cashFlowStateSelected} />
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
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={2}>
                                <div className="k-rtl">
                                    <DropDownComponent
                                        isFilterable={false}
                                        {...this.state.transactionType}
                                        handleChange={(value, name) => this.handleChange(value, name)}
                                        value={this.state.selectedTransactionType}
                                    />
                                </div>

                                </Grid>
                                <Grid item md={8}>
                                    <MultiSelectAutoCompleteComponent
                                        {...this.state.bankDeposit}
                                        handleChange={(value) => this.addMultiSelectHandles(value, 'bankDepositSelected')}
                                        handleRemoveItem={(value) => this.removeMultiSelectHandles(value, 'bankDepositSelected')}
                                        service={GetChequeBookServices.searchBankDepositMethod}
                                        defaultValue={this.state.bankDepositSelected.map((c) =>  {return {fullAccountNumber: c.fullAccountNumber, id: c.id}})}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </Filter>
                    <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid")}>
                        <div id="paymentAndReceiveList" className="height-page"></div>
                    </div>
                </Paper>
            </React.Fragment>

        )
    }
}

export default GetPaymentAndReceiveListComponent;
