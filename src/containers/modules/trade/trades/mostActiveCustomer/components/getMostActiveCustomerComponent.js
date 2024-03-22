import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/mostActiveCustomerColumn';
import Grid from '@material-ui/core/Grid';
import './getMostActiveCustomerComponent.css';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import NoDataDatePicker from "shared/components/persianDatePicker/noDataDatePicker";
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete';
import Input from 'shared/components/formInput/inputForm';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import moment from 'moment';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import '@progress/kendo-ui';
import kendo from "@progress/kendo-ui";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import FaIcon from 'shared/components/Icon/Icon';
import {GridToolbar} from "@progress/kendo-react-grid";
import toastr from 'toastr';
import getMostActiveCustomerService from '../services/getMostActiveCustomerService';
import { excelAndPdfToolbar } from 'constants/excelPdfToolbar';
const $ = require("jquery");
let sortField = 'volumeTransaction';
class getMostActiveCustomerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fromDate: moment(new Date().setDate(new Date().getDate() - 31)),
            toDate:  new Date(),

            columns: Columns(),
            open: false,




            partyType: {
                name: "selectedPartyType",
                field: "title",
                label: "نوع مشتری",
                list: []
            },
            selectedPartyType: { code: 0, title: '' },
            securityTransactionType: {
                name: "selectedSecuritytransactiontype",
                field: "title",
                label: "نوع معامله",
                list: []
            },
            selectedSecuritytransactiontype:{ code: 0, title: '' },

            customerNumbers: 50,

            baseactivitytype: {
                name: "selectedBaseActivityType",
                field: "title",
                label: "مبنای فعالیت",
                list: []
            },
            selectedBaseActivityType:{ code: 0, title: ''}
        }
    }
  

    componentDidMount() {
        GetEnum("partytype", (response)=>  {DropDownListDataProvider(this,"partyType",response)});
        GetEnum("securitytransactiontype", (response)=>  {DropDownListDataProvider(this,"securityTransactionType",response)});
        // GetEnum("baseactivitytype", (response)=>  {DropDownListDataProvider(this,"baseactivitytype",response)});
        GetEnum("baseactivitytype", (response)=>  {
    
            this.setState({
                baseactivitytype: {
                    name: "selectedBaseActivityType",
                    field: "title",
                    label: "مبنای فعالیت",
                    list: response.result,
                },
                selectedBaseActivityType:  response.result[0]
            }, () => {
                this.getTradeList()
            })
        })
       
    }

    handleDate = (value, name) =>{
        console.log([name], value);
        this.setState({
            [name]: value
        })
    };
    handleChange = (value, name) => {
        console.log(value.value);
        let item = value.value;
        this.setState({
            [name]: item
        })
    };


    baseActivityTypeHandleChange = (value) => {
        console.log(value.value);
        if(value.value.code == 1){
            sortField = 'volumeTransaction'; // حجم معاملا
        }else {
            sortField = 'volumeFee'; // حجم کارمزد
        }
        this.setState({
            selectedBaseActivityType: value.value
        })
    };
    handleExpandSearchPanel = () => {
        this.setState({
            open: !this.state.open
        })
    };
    search = () => {
        // $("#receiveList").data("kendoGrid").dataSource.read(this);
       
        this.getTradeList();
    };

    getTradeList = () => {
        let self = this;
        console.log('in GetTrade', self.state.fromDate);
        $("#mostActiveCustomer").kendoGrid({
            dataSource: {
                transport: {
                    read: function (option) {
                        if (option.data.state) {
                            self = option.data
                        }
                        var command = {
                            reportFilter: {
                                partyId: null,
                                partyType:  self.state.selectedPartyType.code,
                                transactionType: self.state.selectedSecuritytransactiontype.code,
                                customerTopCount: self.state.customerNumbers === undefined? 0: parseInt(self.state.customerNumbers,10),
                                baseActivityType: self.state.selectedBaseActivityType.code,
                               
                                dateFilter: {
                                  startDate: self.state.fromDate,
                                  endDate: self.state.toDate
                                }
                            },
                            OptionalFilter: {
                                page: option.data.page ? option.data.page : 1,
                                take: option.data.take ? option.data.take : 50,
                                sort: option.data.sort ? option.data.sort :
                                    [{
                                        field: sortField,
                                        dir: "desc"
                                    }]
                            }
                        };
                        getMostActiveCustomerService.getflatmostactivecustomersMethod(command, function (response) {
                            option.success(response);
                            $("#mostActiveCustomer .k-grid-footer .k-grid-footer-wrap " + "tbody tr td div.total-buyBrokerFee-sum").text(kendo.toString(response.buyBrokerFeeSum, 'n0'));
                            $("#mostActiveCustomer .k-grid-footer .k-grid-footer-wrap " + "tbody tr td div.total-sellBrokerFee-sum").text(kendo.toString(response.sellBrokerFeeSum, 'n0'));
                            $("#mostActiveCustomer .k-grid-footer .k-grid-footer-wrap " + "tbody tr td div.total-totalBrokerFee-sum").text(kendo.toString(response.totalBrokerFeeSum, 'n0'));
                            $("#mostActiveCustomer .k-grid-footer .k-grid-footer-wrap " + "tbody tr td div.total-disCount-sum").text(kendo.toString(response.disCountSum, 'n0'));
                            $("#mostActiveCustomer .k-grid-footer .k-grid-footer-wrap " + "tbody tr td div.total-realFee-sum").text(kendo.toString(response.realFeeSum, 'n0'));
                            $("#mostActiveCustomer .k-grid-footer .k-grid-footer-wrap " + "tbody tr td div.total-tax-sum").text(kendo.toString(response.taxSum, 'n0'));
                            $("#mostActiveCustomer .k-grid-footer .k-grid-footer-wrap " + "tbody tr td div.total-buyPrice-sum").text(kendo.toString(response.buyPriceSum, 'n0'));
                            $("#mostActiveCustomer .k-grid-footer .k-grid-footer-wrap " + "tbody tr td div.total-sellPrice-sum").text(kendo.toString(response.sellPriceSum, 'n0'));
                            $("#mostActiveCustomer .k-grid-footer .k-grid-footer-wrap " + "tbody tr td div.total-totalPrice-sum").text(kendo.toString(response.totalPriceSum, 'n0'));
                            $("#mostActiveCustomer .k-grid-footer .k-grid-footer-wrap " + "tbody tr td div.total-sellNetAmount-sum").text(kendo.toString(response.sellNetAmountSum, 'n0'));
                            $("#mostActiveCustomer .k-grid-footer .k-grid-footer-wrap " + "tbody tr td div.total-buyNetAmount-sum").text(kendo.toString(response.buyNetAmountSum, 'n0'));
                            $("#mostActiveCustomer .k-grid-footer .k-grid-footer-wrap " + "tbody tr td div.total-creditAmount-sum").text(kendo.toString(response.creditAmountSum, 'n0'));
                            $("#mostActiveCustomer .k-grid-footer .k-grid-footer-wrap " + "tbody tr td div.total-volumeTransaction-sum").text(kendo.toString(response.volumeTransactionSum, 'n0'));
                            $("#mostActiveCustomer .k-grid-footer .k-grid-footer-wrap " + "tbody tr td div.total-volumeFee-sum").text(kendo.toString(response.volumeFeeSum, 'n0'));




                            // self.setState({response:response});
                          
                        });
                    }
                },
                pageSize: 50,
                sort: {
                    field: sortField,
                    dir: "desc"
                },
                serverPaging: true,
                serverSorting: true,
                schema: {
                    model: {
                        id: 'id'
                    },
                    data: "result",
                    total: "totalRecords",
                },
                aggregate: [
                    { field: "buyBrokerFee", aggregate: "sum" },
                    { field: "sellBrokerFee", aggregate: "sum" },
                    { field: "totalBrokerFee", aggregate: "sum" },
                    { field: "disCount", aggregate: "sum" },
                    { field: "realFee", aggregate: "sum" },
                    { field: "tax", aggregate: "sum" },
                    { field: "buyPrice", aggregate: "sum" },
                    { field: "sellPrice", aggregate: "sum" },
                    { field: "totalPrice", aggregate: "sum" },
                    { field: "sellNetAmount", aggregate: "sum" },
                    { field: "buyNetAmount", aggregate: "sum" },
                    { field: "creditAmount", aggregate: "sum" },
                    { field: "volumeTransaction", aggregate: "sum" },
                    { field: "volumeFee", aggregate: "sum" },
                ]
            },
            autoBind: true,
            sortable: {
                allowUnsort: false
            },
            resizable: true,
            // reorderable: true,
            // navigatable: false,
            // selectable: "multiple",
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
            
            noRecords: {
                template: '<p class="orange-page font-size-2 no-data">رکوردی جهت نمایش وجود ندارد.</p>'
            },
            toolbar: excelAndPdfToolbar,
            dataBound: function (e) {
                //Select Checkbox Rows by Clicking Anywhere on the Row
                        // let grid = e.sender;
                        // let rows = grid.tbody.find("[role='row']");

                        // rows.unbind("click");
                        // rows.on("click", function (e) {
                        //     if ($(e.target).hasClass("k-checkbox-label")) {
                        //         return;
                        //     }
                        //     let row = $(e.target).closest("tr");
                        //     let checkbox = $(row).find(".k-checkbox");
                        //     checkbox.click();
                        // });
                //Select Checkbox Rows by Clicking Anywhere on the Row
                if (this.dataSource.data().length > 0) {
                    let grid = $("#mostActiveCustomer").data("kendoGrid");
                    let items = grid.dataSource.view();
                    items.map((item, index) => {
                        let id = items[index].uid;
                        let currentRow = grid.table.find("tr[data-uid='" + id + "']");
                        // if (index === this.dataSource.data().length - 1) {
                        if (index === this.dataSource.data().length) {
                            currentRow.css({ display: 'none', visibility: 'hidden' });
                        } else {
                            currentRow.find(".account-code").css({ color: '#039be5', cursor: 'pointer' });
                        }
                    });
                };
              
            },
            columns: self.state.columns,
            change: self.checkBoxSelectHandles,
        });




        $("#mostActiveCustomer .excel-report").on("click", function (item) {
            self.getExcelReport();
          });
          
        $("#mostActiveCustomer .pdf-report").on("click", function (item) {
            self.getPdfReport();
          });
    };




    
    getCommand = () => {
        var grid = $("#mostActiveCustomer").data("kendoGrid");
        var dataSource = grid.dataSource;
    
        var command = {
          reportFilter: {
            partyId: null,
            partyType:  this.state.selectedPartyType.code,
            transactionType: this.state.selectedSecuritytransactiontype.code,
            customerTopCount: this.state.customerNumbers === undefined? 0: parseInt(this.state.customerNumbers,10),
            baseActivityType: this.state.selectedBaseActivityType.code,
            
            dateFilter: {
                startDate: this.state.fromDate,
                endDate: this.state.toDate
            }
          },
          OptionalFilter: {
            page: dataSource ? dataSource.page() : 1,
            take: dataSource ? dataSource.pageSize() : 50,
            // take: option.data.take ? option.data.take : 50,
            sort: dataSource ? dataSource.sort() :
              [{
                field: sortField,
                dir: "asc"
              }]
          }
        }
        return command;
      }
      getExcelReport = () => {
          var command = this.getCommand();
          // alert('excel')
          getMostActiveCustomerService.getExcelExport(command, 'فعال ترین مشتریان');

      }
      getPdfReport = () => {
        var command = this.getCommand();
        // alert('excel')
        getMostActiveCustomerService.getPdfExport(command, 'فعال ترین مشتریان');

    }
    
   
    render() {
        console.log('selectedBaseActivityType',this.state.selectedBaseActivityType);
        return (
            <React.Fragment>

                <Header {...this.props} />
                <Paper className="main-paper-container mostActiveCustomer">
                    <Filter
                     search={this.search}
                     handleExpandSearchPanel={this.handleExpandSearchPanel}
                     {...this.state}
                    >
                        <div classPage={"height-search"}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={2}>
                                        <NoDataDatePicker isNull={false} selectedDate={this.state.fromDate} label="از تاریخ" handleOnChange={(value) => this.handleDate(value, 'fromDate')}/>
                                        {/* <PersianDatePicker selectedDate={this.state.fromDate} label="از تاریخ" handleOnChange={(value) => this.handleDate(value, 'fromDate')}/> */}
                                    
                                </Grid>
                                <Grid item md={2}>
                                        <NoDataDatePicker isNull={false} selectedDate={this.state.toDate} label="از تاریخ" handleOnChange={(value) => this.handleDate(value, 'toDate')}/>
                                        {/* <PersianDatePicker selectedDate={this.state.toDate} label="تا تاریخ" handleOnChange={(value) => this.handleDate(value, 'toDate')} /> */}
                                </Grid>
                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <DropDownComponent
                                            isFilterable={false}
                                            {...this.state.partyType}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            value={this.state.selectedPartyType}
                                        />
                                    </div>
                                </Grid>
                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <DropDownComponent
                                            isFilterable={false}
                                            {...this.state.securityTransactionType}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            value={this.state.selectedSecuritytransactiontype}
                                        />
                                    </div>
                                </Grid>
                                <Grid item md={2}>
                                    <NumberFormatComponent id="" label="تعداد مشریان"
                                                           value={this.state.customerNumbers}
                                                           handleChange={(value) => this.handleChange(value, 'customerNumbers')} type="number" isSeparator={false} />
                                </Grid>
                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <DropDownComponent
                                            isFilterable={false}
                                            {...this.state.baseactivitytype}
                                            handleChange={(value) => this.baseActivityTypeHandleChange(value)}
                                            require
                                            value={this.state.selectedBaseActivityType}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Filter>
                    <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid")}>
                        <div id="mostActiveCustomer" className="height-page"></div>
                    </div>
                </Paper>
             
            </React.Fragment>

        )
    }
}

export default getMostActiveCustomerComponent;
