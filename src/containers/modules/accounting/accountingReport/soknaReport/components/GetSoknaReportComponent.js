import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetSoknaReportColumn';
import Grid from '@material-ui/core/Grid';
import './GetSoknaReportComponent.css';
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
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';

import moment from 'moment';
import GetMainMarket from "../../../../../../services/GetMainMarkets";


import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import '@progress/kendo-ui';
import kendo from "@progress/kendo-ui";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import FaIcon from 'shared/components/Icon/Icon';
// import DeleteReceiveService from "../services/DeleteReceiveService";
import {GridToolbar} from "@progress/kendo-react-grid";
// import confirmationReceiveService from "../services/confirmationReceiveService";
// import finalConfirmationReceiveService from "../services/finalConfirmationReceiveService";
// import { excelAndPdfToolbar } from '../../../../../../constants/excelPdfToolbar';
import toastr from 'toastr';
import GetSoknaReportService from '../services/GetSoknaReportService';
import GetPartiesService from '../../../../personsAndCustomers/customers/customersList/services/GetPartiesService';
const $ = require("jquery");

class GetSoknaReportComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جتسجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
            },
            selectedParty: {fullName: '', id: 0},
            fromCredit: null,
            toCredit: null,
            columns: Columns(),
            open: false,
           
        }
    }
  
    componentDidMount() {
      
        this.getTradeList();
    }
   
    search = () => {
        // $("#receiveList").data("kendoGrid").dataSource.read(this);
        this.getTradeList();
    };
    getTradeList = () => {
        let self = this;
        $("#soknaReport").kendoGrid({
            dataSource: {
                transport: {
                    read: function (option) {
                        if (option.data.state) {
                            self = option.data
                        }
                        var command = {
                            reportFilter: {
                                PartyId: self.state.selectedParty.id,
                                FromCredit: self.state.fromCredit ? parseInt(self.state.fromCredit.replace(/,/g, '')) : '',
                                ToCredit: self.state.toCredit ? parseInt(self.state.toCredit.replace(/,/g, '')) : '',
                                
                            },
                            OptionalFilter: {
                                page: option.data.page ? option.data.page : 1,
                                take: option.data.take ? option.data.take : 50,
                                sort: option.data.sort ? option.data.sort :
                                    [{
                                        field: "remainT0",
                                        dir: "desc"
                                    }]
                            }
                        };
                        GetSoknaReportService.GetSoknaReportServiceMethod(command, function (response) {
                            // $("#soknaReport .k-grid-footer .k-grid-footer-wrap " +
                            //     "tbody tr td div.total-amount-sum").text(kendo.toString(response.totalAmountSum, 'n0'));
                            option.success(response);
                        })
                    }
                },
                pageSize: 50,
                sort: {
                    field: "remainT0",
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
                    { field: "remainT0", aggregate: "sum" },
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
            dataBound: function (e) {
                var scrollOffset = {
                    left:10000 ,
                };
                  var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
                  container.scrollLeft(scrollOffset.left);
                if (this.dataSource.data().length > 0) {
                    let grid = $("#soknaReport").data("kendoGrid");
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
        });

    };


    
    handleExpandSearchPanel = () => {
        this.setState({
            open: !this.state.open
        })
    };

   //Pdf and Excel Export Methods

    getCommand = () => {
        var grid = $("#receiveList").data("kendoGrid");
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
            endDate: this.state.toDate
          },
          OptionalFilter: {
            page: dataSource ? dataSource.page() : 1,
            take: dataSource ? dataSource.pageSize() : 50,
            // take: option.data.take ? option.data.take : 50,
            sort: dataSource ? dataSource.sort() :
              [{
                field: "fullPartyName",
                dir: "asc"
              }]
          }
        }
        return command;
    }
    getExcelReport = () => {
        var command = this.getCommand();
        alert('excel');
        // GetAllCashFlowCategoryService.getExcelExport(command, 'receiveListExcel');
    
    }
    getPdfReport = () => {
    var command = this.getCommand();
    alert('pdf');
    // GetAllCashFlowCategoryService.getPdfExport(command, "receiveListPdf");

    }

    //Pdf and Excel Export Methods
    handleChange = (value, name) => {
        console.log([name],value.value);
        let item = value.value;
        this.setState({
            [name]: item
        })
    };
    render() {
       
        return (
            <React.Fragment>

                <Header {...this.props} />
                <Paper className="main-paper-container soknaReport">
                    <Filter
                     search={this.search}
                     handleExpandSearchPanel={this.handleExpandSearchPanel}
                     {...this.state}
                    >
                        <div classPage={"height-search"}>
                        <Grid container spacing={8} className="no-margin">
                                <Grid item md={12}>
                                    <AutoCompleteComponent {...this.state.party}
                                        handleChange={(value) => this.handleChange(value, 'selectedParty')}
                                        value={this.state.selectedParty.fullName}
                                        service={GetPartiesService.getAllPartyForAutocomplete} />
                                </Grid>
                                <Grid item md={3}>
                                    <NumberFormatComponent id="" label="از مانده"
                                                           value={this.state.fromCredit}
                                                           handleChange={(value) => this.handleChange(value, 'fromCredit')} type="number" isSeparator={true} />
                                </Grid>
                                <Grid item md={3}>
                                    <NumberFormatComponent id="" label="تا مانده"
                                                           value={this.state.toCredit}
                                                           handleChange={(value) => this.handleChange(value, 'toCredit')} type="number" isSeparator={true} />
                                </Grid>

                            </Grid>
                     
                            
                        </div>

                    </Filter>
                    <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid")}>
                        <div id="soknaReport" className="height-page"></div>
                    </div>
                </Paper>
             

            </React.Fragment>

        )
    }
}

export default GetSoknaReportComponent;
