import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import { Grid } from '@material-ui/core';
import '@progress/kendo-ui';
import GetFiscalYearsService from '../../../accountingBase/fiscalYear/services/GetFiscalYearsService';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import Paper from '@material-ui/core/Paper';
import GetEnum from 'services/getEnum';
import moment from 'moment';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetCostCentersService from '../../../accountingBase/costCenter/services/GetCostCentersService';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import CheckBoxList from '../../../../../../shared/components/checkBoxList/checkBoxList';
import GetVoucherTypeService from '../../../accountingBase/voucherType/services/GetVoucherTypeService';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import './GetLiquidityReportComponent.css';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import { excelAndPdfToolbar } from '../../../../../../constants/excelPdfToolbar';
import GetLiquidityReportService from '../services/GetLiquidityReportService';
import { Columns } from '../constants/GetLiquidityReportColumn';
const $ = require("jquery");


class GetLiquidityReportComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      isColumn6: this.props.location.state && this.props.location.state.balanceSheetColumnType ? this.props.location.state.balanceSheetColumnType.code === 2 : false,
      reRender: false,
      branch: this.props.location.state && this.props.location.state.branch ? this.props.location.state.branch : {
        id: 0
      },
      columns: Columns(),

      balanceSheetColumnType: this.props.location.state && this.props.location.state.balanceSheetColumnType !== undefined ? this.props.location.state.balanceSheetColumnType : {
        code: 1
      },
      fromVoucherNumber: this.props.location.state && this.props.location.state.fromVoucherNumber ? this.props.location.state.fromVoucherNumber : '',
      toVoucherNumber: this.props.location.state && this.props.location.state.toVoucherNumber ? this.props.location.state.toVoucherNumber : '',
      accountBalanaceRemainType: this.props.location.state && this.props.location.state.accountBalanaceRemainType ? this.props.location.state.accountBalanaceRemainType : 1,
      fromDate: this.props.location.state && this.props.location.state.fromDate ? this.props.location.state.fromDate :  moment(new Date().setDate(new Date().getDate() - 2)),
      toDate: this.props.location.state && this.props.location.state.toDate ? this.props.location.state.toDate : moment(new Date()),
      costCenter: this.props.location.state && this.props.location.state.costCenter ? this.props.location.state.costCenter : { id: 0 },
      exceptionCatagory: this.props.location.state && this.props.location.state.exceptionCatagory ? this.props.location.state.exceptionCatagory : [],
      voucherState: [],
      fiscalYear: this.props.location.state && this.props.location.state.fiscalYear ? this.props.location.state.fiscalYear : {
        id: 0
      },

      fiscalYearDropDowm: {
        name: "fiscalYear",
        feild: "title",
        label: "سال مالی ",
        list: []
      },
      voucherStateList: {
        name: "voucherState",
        feild: "title",
        label: "وضعیت سند",
        list: []
      },
      dataItem: null

    }

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.getLiquidityList = this.getLiquidityList.bind(this);
    this.handleExpandSearchPanel = this.handleExpandSearchPanel.bind(this);
    this.search = this.search.bind(this);
    this.getExcelReport = this.getExcelReport.bind(this);
    this.getPdfReport = this.getPdfReport.bind(this);
    this.getCommand = this.getCommand.bind(this);
    this.successGetVoucherMasterState = this.successGetVoucherMasterState.bind(this);
  }

  componentDidMount() {
    GetEnum("vouchermasterstate", this.successGetVoucherMasterState)
  }
  
  successGetVoucherMasterState(response){
    var selectedVoucherMasterState=response.result.filter(r=>r.code===2 || r.code===3);
    let voucherStateList=  {
      name: "voucherState",
      feild: "title",
      label: "وضعیت سند",
      list: response.result
    };
    this.setState({voucherState:selectedVoucherMasterState,voucherStateList:voucherStateList});
    this.getLiquidityList();

  }


  getCommand() {
    var grid = $("#liquidity-report-list").data("kendoGrid");
    var dataSource = grid.dataSource;

    var command = {
      reportFilter: {
        states: this.state.voucherState && this.state.voucherState.length>0 ? this.state.voucherState.map(s => s.code):[],
        
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
            field: "accountCode",
            dir: "asc"
          }]
      }
    }
    return command;
  }
  getExcelReport() {
    var command = this.getCommand();
    GetLiquidityReportService.getExcelExport(command, 'liquidity-report-list');

  }
  getPdfReport() {
    var command = this.getCommand();

    GetLiquidityReport.getPdfExport(command, function (response) {
    });

  }
  getExcelColumnReport(column) {
    GetLiquidityReportService.getColumnExcelExport(column, 'liquidity-report-list');

  }
  getPdfColumnReport(column) {


    GetLiquidityReport.getColumnPdfExport(column, function (response) {
    });

  }
  getLiquidityList() {
    let self = this;

    $("#liquidity-report-list").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              self = option.data
            }
            var command = {
              reportFilter: {
                voucherStates: self.state.voucherState && self.state.voucherState.length>0 ? self.state.voucherState.map(s => s.code):[],

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
                    field: "voucherDate",
                    dir: "asc"
                  }]
              }
            }
            GetLiquidityReportService.getList(command, function (response) {
              option.success(response)
            })
          }
        },

        pageSize: 50,
        sort: {
          field: "voucherDate",
          dir: "asc"
        },
        serverPaging: true,
        serverSorting: true,
        schema: {
          data: "result",
          total: "totalRecords",
          model: {
          
          }
        },


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
        template: ' <p class="orange-page font-size-2 no-data">رکوردی جهت نمایش وجود ندارد.</p>'
      },
      dataBound: function (e) {
        var scrollOffset = {
          left:10000 ,
      };
        var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
        container.scrollLeft(scrollOffset.left);
        if (this.dataSource.data().length > 0) {
          let grid = $("#liquidity-report-list").data("kendoGrid");
          let items = grid.dataSource.view();
          items.map((item, index) => {
            let id = items[index].uid;
            let currentRow = grid.table.find("tr[data-uid='" + id + "']");
            currentRow.find(".account-code").css({ color: '#039be5', cursor: 'pointer' });
          })
        }
        $("#liquidity-report-list .excel-report").on("click", function (item) {
          self.getExcelReport();
        });
        $("#liquidity-report-list .pdf-report").on("click", function (item) {
          self.getPdfReport();
        });

        $("#liquidity-report-list .liquidity-excel").on("click", function (item) {
          var grid = $("#detail-ledger-balance").data("kendoGrid");
          var row = $(item.target).closest("tr");
          var dataItem = grid.dataItem(row);
          self.getExcelColumnReport(dataItem);
        });
        $("#liquidity-report-list .liquidity-pdf").on("click", function (item) {
          var grid = $("#detail-ledger-balance").data("kendoGrid");
          var row = $(item.target).closest("tr");
          var dataItem = grid.dataItem(row);
          self.getPdfColumnReport(dataItem);
        });

      },
      columns: self.state.columns
    });

  };

  handleChangeFiscalYear(item) {
    this.setState({
      fiscalYear: item.value,
      fromDate: item.value.startDate,
      toDate: item.value.endDate,
    })
  }
  handleChange(item, name) {
    this.setState({
      [name]: item.value
    })
  }
  handleChangeDate(item, name) {
    this.setState({
      [name]: item
    })
  }


  handleExpandSearchPanel() {
    this.setState({
      open: !this.state.open

    })
  }

  search() {
    if ($("#liquidity-report-list").data("kendoGrid") !== undefined)
      $("#liquidity-report-list").data("kendoGrid").dataSource.read(this);
    else {
      this.getLiquidityList();

    }
  }


  render() {

    return (

      <React.Fragment>
        <Header {...this.props} />
        <Paper className={"main-paper-container liquidity-report-list"}>
          <Filter search={this.search}
            handleExpandSearchPanel={this.handleExpandSearchPanel} {...this.state}>

            <div classPage={"height-search"}>
              <Grid container spacing={8} className="no-margin">





                <Grid item md={2} >
                  <PersianDatePicker label="از تاریخ" max={this.state.toDate} handleOnChange={(e) => this.handleChangeDate(e, 'fromDate')} selectedDate={this.state.fromDate} />
                </Grid>
                <Grid item md={2} >
                  <PersianDatePicker label="تا تاریخ" min={this.state.fromDate} handleOnChange={(e) => this.handleChangeDate(e, 'toDate')} selectedDate={this.state.toDate} />
                </Grid>

                <Grid item md={6}>
                  <div className="k-rtl">
                    <MultiSelectComponent isFilterable {...this.state.voucherStateList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.voucherState} />
                  </div>
                </Grid>
              </Grid>
              {/* <Grid container spacing={8} className="no-margin">
                <CheckBoxList {...this.state.exc  eptionCatagoryList} value={this.state.exceptionCatagory} handleChange={(value, name) => this.handleChange(value, name)} />
              </Grid> */}
            </div>

          </Filter>
          <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid")}>
            <div id="liquidity-report-list" className="height-page"></div>
          </div>
        </Paper>
      </React.Fragment >

    )
  }
}
const GetLiquidityReport = GetLiquidityReportComponent
export default GetLiquidityReport;