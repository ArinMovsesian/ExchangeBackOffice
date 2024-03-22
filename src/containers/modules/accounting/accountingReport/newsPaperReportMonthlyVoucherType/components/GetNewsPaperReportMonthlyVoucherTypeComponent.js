import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetNewsPaperReportMonthlyVoucherTypeColumn';
import Grid from '@material-ui/core/Grid';
import './GetNewsPaperReportMonthlyVoucherTypeComponent.css';
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
// import {chequeBookTitleWidoutHeaderTemplate} from "../../../../../../constants/chequeBookTitleWidoutHeaderTemplate";
import moment from 'moment';
import GetMainMarket from "../../../../../../services/GetMainMarkets";
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import '@progress/kendo-ui';
import kendo from "@progress/kendo-ui";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import FaIcon from 'shared/components/Icon/Icon';
import {GridToolbar} from "@progress/kendo-react-grid";
import { excelAndPdfToolbar } from '../../../../../../constants/excelPdfToolbar';
import toastr from 'toastr';
import GetNewsPaperReportMonthlyVoucherTypeServices from '../services/GetNewsPaperReportMonthlyVoucherTypeServices';
import GetFiscalYearsService from '../../../accountingBase/fiscalYear/services/GetFiscalYearsService';
import GetVoucherTypeService from '../../../accountingBase/voucherType/services/GetVoucherTypeService';
import GetCostCentersService from '../../../accountingBase/costCenter/services/GetCostCentersService';
const $ = require("jquery");
let  selectedIds = [];

class GetNewsPaperReportMonthlyVoucherTypeComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: Columns(),
            open: false,


            toDebit: undefined,
            fromDebit: undefined,
            toCredit: undefined,
            fromCredit: undefined,
           
          
          
            fiscalYearList: {
              name: "selectedYear",
              feild: "title",
              label: "سال مالی",
              list: []
            },
            selectedYear:  { title: '', id: 0 },




           
              voucherMasterStateList: {
                name: "voucherMastrerState",
                label: "وضعیت سند",
                field: "title",
                list: []
              },
              voucherMastrerState: [],


              voucherCategoryIncludeList: {
                name: "voucherCategoryInclude",
                label: "شامل نوع سند",
                field: "title",
                list: []
              },
              voucherCategoryInclude: [],


              voucherCategoryExcludeList: {
                name: "voucherCategoryExclude",
                label: "فاقد نوع سند",
                field: "title",
                list: []
              },
              voucherCategoryExclude: [],

              costCenterList: {
                name: "costCenter",
                label: "مرکز هزینه",
                field: "title",
                list: []
              },
              costCenter: [],
              
            toRemain: 0,
            fromRemain: 0,
            
        }
    }
   
    componentDidMount() {
       
        this.getTradeList();
        GetFiscalYearsService.getFiscalYears(null, (response) => DropDownListDataProvider(this, "fiscalYearList", response));
        GetEnum("vouchermasterstate", (response) => DropDownListDataProvider(this, "voucherMasterStateList", response));
        GetVoucherTypeService(null, (response) => DropDownListDataProvider(this, "voucherCategoryIncludeList", response));
        GetVoucherTypeService(null, (response) => DropDownListDataProvider(this, "voucherCategoryExcludeList", response));

        GetCostCentersService.getCostCenters(null, (response) => {
            console.log('cost center', response);
            DropDownListDataProvider(this, "costCenterList", response);
      
          })
      
    }
   
    handleExpandSearchPanel = () => {
        this.setState({
            open: !this.state.open
        })
    };
    
   
    search = () => {
        $("#NewsPaperReportMonthlyVoucherType").data("kendoGrid").dataSource.read(this);
        // this.getTradeList();
    };
    getTradeList = () => {
        let self = this;
       
        $("#NewsPaperReportMonthlyVoucherType").kendoGrid({
            dataSource: {
                transport: {
                    read: function (option) {
                        if (option.data.state) {
                            self = option.data
                        }
                        var command = {
                            reportFilter: {
                                fromDebit: self.state.fromDebit === undefined || self.state.fromDebit === '' ? 0 : self.state.fromDebit,
                                toDebit: self.state.toDebit === undefined || self.state.toDebit === '' ? 0 : self.state.toDebit,
                                fiscalYearId: self.state.selectedYear.id,
                                fromCredit: self.state.fromCredit === undefined || self.state.fromCredit === '' ? 0 : self.state.fromCredit,
                                toCredit: self.state.toCredit === undefined || self.state.toCredit === '' ? 0 : self.state.toCredit,
                                accountBalanceRemainType: 0,
                                month: 5,
                                year: 2019,
                                description: "",
                                voucherState: self.state.voucherMastrerState.length === 0 ? [] : self.state.voucherMastrerState.map((index) => { return index.code }),
                                exceptionVoucherCategory:  self.state.voucherCategoryExclude.length === 0 ? [] : self.state.voucherCategoryExclude.map((index) => { return index.code }),
                                includeVoucherCategory:  self.state.voucherCategoryInclude.length === 0 ? [] : self.state.voucherCategoryInclude.map((index) => { return index.code }),
                                costCenter: self.state.costCenter.length === 0 ? [] : self.state.costCenter.map((index) => { return index.id }),
                            },
                            OptionalFilter: {
                                page: option.data.page ? option.data.page : 1,
                                take: option.data.take ? option.data.take : 50,
                                sort: option.data.sort ? option.data.sort :
                                    [{
                                        field: "accountTitle",
                                        dir: "asc"
                                    }]
                            }
                        };
                        GetNewsPaperReportMonthlyVoucherTypeServices.getnewspaperreportmonthlyvouchertypeMethod(command, function (response) {
                            option.success(response);
                        })
                    }
                },
                pageSize: 50,
                sort: {
                    field: "accountTitle",
                    dir: "asc"
                },
                serverPaging: true,
                serverSorting: true,
                schema: {
                    data: "result",
                    total: "totalRecords",
                },
                aggregate: [
                   
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
            toolbar: `${excelAndPdfToolbar}`,
            dataBound: function (e) {
                var scrollOffset = {
                    left:10000 ,
                };
                  var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
                  container.scrollLeft(scrollOffset.left);
                if (this.dataSource.data().length > 0) {
                    let grid = $("#NewsPaperReportMonthlyVoucherType").data("kendoGrid");
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
        $("#NewsPaperReportMonthlyVoucherType .excel-report").on("click", function (item) {
            self.getExcelReport();
        });
        $("#NewsPaperReportMonthlyVoucherType .pdf-report").on("click", function (item) {
            self.getPdfReport();
        });
    };
   
   
    
    getCommand = () => {
        var grid = $("#NewsPaperReportMonthlyVoucherType").data("kendoGrid");
        var dataSource = grid.dataSource;
    
        var command = {
          reportFilter: {
            fromDebit: this.state.fromDebit === undefined || this.state.fromDebit === '' ? 0 : this.state.fromDebit,
            toDebit: this.state.toDebit === undefined || this.state.toDebit === '' ? 0 : this.state.toDebit,
            fiscalYearId: this.state.selectedYear.id,
            fromCredit: this.state.fromCredit === undefined || this.state.fromCredit === '' ? 0 : this.state.fromCredit,
            toCredit: this.state.toCredit === undefined || this.state.toCredit === '' ? 0 : this.state.toCredit,
            accountBalanceRemainType: 0,
            month: 5,
            year: 2019,
            description: "",
            voucherState: this.state.voucherMastrerState.length === 0 ? [] : this.state.voucherMastrerState.map((index) => { return index.code }),
            exceptionVoucherCategory:  this.state.voucherCategoryExclude.length === 0 ? [] : this.state.voucherCategoryExclude.map((index) => { return index.code }),
            includeVoucherCategory:  this.state.voucherCategoryInclude.length === 0 ? [] : this.state.voucherCategoryInclude.map((index) => { return index.code }),
            costCenter: this.state.costCenter.length === 0 ? [] : this.state.costCenter.map((index) => { return index.id }),
          },
          OptionalFilter: {
            page: dataSource ? dataSource.page() : 1,
            take: dataSource ? dataSource.pageSize() : 50,
            // take: option.data.take ? option.data.take : 50,
            sort: dataSource ? dataSource.sort() :
              [{
                field: "accountTitle",
                dir: "asc"
              }]
          }
        }
        return command;
      }
     getExcelReport = () => {
        var command = this.getCommand();
        
        GetNewsPaperReportMonthlyVoucherTypeServices.getExcelExport(command, "دفتر روزنامه - سند ماهانه");
    
      }

    
      getPdfReport = () => {
      
        var command = this.getCommand();
      
        GetNewsPaperReportMonthlyVoucherTypeServices.getPdfExport(command, "دفتر روزنامه - سند ماهانه");
    
      }


    handleChange = (value, name) => {
        console.log(value.value);
        let item = value.value;
        this.setState({
          [name]: item
        })
      }
    render() {
    
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className="main-paper-container NewsPaperReportMonthlyVoucherType">
                    <Filter
                     search={this.search}
                     handleExpandSearchPanel={this.handleExpandSearchPanel}
                     {...this.state}
                    >
                        <div classPage={"height-search"}>
                        


                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={2}>
                                <Input label="بدهکار از " type="number" handleChange={(e) => this.handleChange(e, 'fromDebit')} value={this.state.fromDebit} />
                            </Grid>
                            <Grid item md={2}>
                                <Input label="بدهکار تا" type="number" handleChange={(e) => this.handleChange(e, 'toDebit')} value={this.state.toDebit} />
                            </Grid>

                            <Grid item md={2}>
                                <Input label="بستانکار از " type="number" handleChange={(e) => this.handleChange(e, 'fromCredit')} value={this.state.fromCredit} />
                            </Grid>
                            <Grid item md={2}>
                                <Input label="بستانکار تا" type="number" handleChange={(e) => this.handleChange(e, 'toCredit')} value={this.state.toCredit} />
                            </Grid>
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <DropDownComponent isFilterable {...this.state.fiscalYearList}
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.selectedYear} />
                                </div>
                            </Grid>
                        </Grid>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={5}>
                                    <div className="k-rtl">
                                        <MultiSelectComponent isFilterable {...this.state.voucherMasterStateList}
                                        handleChange={(value, name) => this.handleChange(value, name)}
                                        value={this.state.voucherMastrerState} />
                                    </div>
                                </Grid>
                                <Grid item md={5}>
                                    <div className="k-rtl">
                                        <MultiSelectComponent isFilterable {...this.state.voucherCategoryIncludeList}
                                        handleChange={(value, name) => this.handleChange(value, name)}
                                        value={this.state.voucherCategoryInclude} />
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={5}>
                                    <div className="k-rtl">
                                        <MultiSelectComponent isFilterable {...this.state.voucherCategoryExcludeList}
                                        handleChange={(value, name) => this.handleChange(value, name)}
                                        value={this.state.voucherCategoryExclude} />
                                    </div>
                                </Grid>
                                <Grid item md={5}>
                                    <div className="k-rtl">
                                        <MultiSelectComponent isFilterable {...this.state.costCenterList}
                                        handleChange={(value, name) => this.handleChange(value, name)}
                                        value={this.state.costCenter} />
                                    </div>
                                </Grid>
                            </Grid>




                        </div>
                    </Filter>
                    <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid")}>
                        <div id="NewsPaperReportMonthlyVoucherType" className="height-page"></div>
                    </div>
                </Paper>
            </React.Fragment>

        )
    }
}

export default GetNewsPaperReportMonthlyVoucherTypeComponent;
