import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import { Grid } from '@material-ui/core';
import kendo from '@progress/kendo-ui';
import { Columns4, Columns6 } from '../constants/GetSubsidiaryLedgerBalanceColumn';
import GetSubsidiaryLedgerBalanceService from '../services/GetSubsidiaryLedgerBalanceService';
import GetFiscalYearsService from '../../../../../modules/accounting/accountingBase/fiscalYear/services/GetFiscalYearsService';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import Paper from '@material-ui/core/Paper';
import GetEnum from 'services/getEnum';
import moment from 'moment';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import GetSubsidiaryLedgerService from '../../../accountingBase/subsidaryLedger/services/GetSubsidiaryLedgerService';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetVoucherTypeService from '../../../accountingBase/voucherType/services/GetVoucherTypeService';
import GetGeneralLedgerService from '../../../accountingBase/generalLedger/services/GetGeneralLedgerService'
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import './GetSubsidiaryLedgerBalanceComponent.css'
import { GetMultiSelectElement } from '../../../../../../core/getMultiSelectElement';
import CheckBoxList from '../../../../../../shared/components/checkBoxList/checkBoxList';
import { GetDropDownElement } from '../../../../../../core/getMultiSelectElement';
import GetCostCentersService from '../../../accountingBase/costCenter/services/GetCostCentersService';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import { excelAndPdfToolbar } from '../../../../../../constants/excelPdfToolbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
const $ = require("jquery");

class GetSubsidaryLedgerBalance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isColumn6: this.props.location.state && this.props.location.state.balanceSheetColumn ? this.props.location.state.balanceSheetColumn.code === 2 : false,
      branch: this.props.location.state && this.props.location.state.branch ? this.props.location.state.branch : {
        id: 0
      },
      balanceSheetColumnType: this.props.location.state && this.props.location.state.balanceSheetColumn ?
        this.props.location.state.balanceSheetColumn : {
          code: 1
        },
      isNotConsiderSettlementDays: this.props.location.state && this.props.location.state.isNotConsiderSettlementDays ? this.props.location.state.isNotConsiderSettlementDays : false,
      response:{},
      fromVoucherNumber: this.props.location.state && this.props.location.state.fromVoucherNumber ? this.props.location.state.fromVoucherNumber : '',
      toVoucherNumber: this.props.location.state && this.props.location.state.toVoucherNumber ? this.props.location.state.toVoucherNumber : '',
      accountBalanaceRemainType: this.props.location.state && this.props.location.state.accountBalanaceRemainType ? this.props.location.state.accountBalanaceRemainType : { code: 0 },
      costCenter: this.props.location.state && this.props.location.state.costCenter ? this.props.location.state.costCenter : { id: 0 },
      fromSubsidiaryLedgerCode: this.props.location.state && this.props.location.state.fromSubsidiaryLedger ? this.props.location.state.fromSubsidiaryLedger : {},
      toSubsidiaryLedgerCode: this.props.location.state && this.props.location.state.toSubsidiaryLedger ? this.props.location.state.toSubsidiaryLedger : {},

      fromDate: this.props.location.state && this.props.location.state.fromDate ? this.props.location.state.fromDate : moment(new Date()),
      toDate: this.props.location.state && this.props.location.state.toDate ? this.props.location.state.toDate : moment(new Date()),
      accountcodesForApi: [],
      accountCodes: [],
      reRender: false,
      accountBalanaceRemainTypeList: {
        name: "accountBalanaceRemainType",
        feild: "title",
        label: "مانده",
        list: []
      },
      balanceSheetColumn: {
        name: "balanceSheetColumnType",
        feild: "title",
        label: "نوع تراز",
        list: []
      },
      fiscalYear: this.props.location.state && this.props.location.state.fiscalYear ? this.props.location.state.fiscalYear : { code: 0 },
      fiscalYearDropDowm: {
        name: "fiscalYear",
        feild: "title",
        label: "سال مالی ",
        list: []
      },
      branchDropDowm: {
        name: "branch",
        field: "title",
        label: "شعبه",
        list: []
      },
      fromSubsidiaryLedgerCodeList: {
        name: "fromSubsidiaryLedgerCode",
        field: "fullTitle",
        label: "کد معین از",
        list: []
      },
      toSubsidiaryLedgerCodeList: {
        name: "toSubsidiaryLedgerCode",
        field: "fullTitle",
        label: "کد معین تا",
        list: []
      },
      fromGeneralLedgerCodeList: {
        name: "fromGeneralLedgerCode",
        field: "fullTitle",
        label: "کد کل از",
        list: []
      },
      toGeneralLedgerCodeList: {
        name: "toGeneralLedgerCode",
        field: "fullTitle",
        label: "کد کل تا",
        list: []
      },
      accountCodesList: {
        name: "accountCodes",
        feild: "title",
        label: "کدهای کل",
        list: []
      },
      voucherTypeList: {
        name: "voucherType",
        feild: "title",
        label: "نوع سند",
        list: []
      },
      voucherType: this.props.location.state && this.props.location.state.voucherType ? this.props.location.state.voucherType : [],
      exceptionCatagory: this.props.location.state && this.props.location.state.exceptionCatagory ? this.props.location.state.exceptionCatagory : [],
      exceptionCatagoryList: {
        name: "exceptionCatagory",
        field: "code",
        list: []
      },
      costCenterList: {
        name: "costCenter",
        label: "مرکز هزینه",
        field: "title",
        list: []
      },
      open: false,
      columns: this.props.location.state && this.props.location.state.balanceSheetColumn ? this.props.location.state.balanceSheetColumn.code === 1 ? Columns4() : Columns6() : Columns4()
    }

    this.successGetFiscalYears = this.successGetFiscalYears.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.getFiscalYears = this.getFiscalYears.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleExpandSearchPanel = this.handleExpandSearchPanel.bind(this);
    this.getExcelReport = this.getExcelReport.bind(this);
    this.getPdfReport = this.getPdfReport.bind(this);
    this.getCommand = this.getCommand.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);

  }

  componentDidMount() {

    if (this.props.location.state && this.props.location.state.accountCode) {

      this.setState({
        accountCodes: [{ code: this.props.location.state.accountCode }]
      });
    }


    this.getDropDownData();
  }

  getDropDownData() {
    let defaultCommand = {
      entity: ""
    };
    GetEnum("balancesheetcolumntype", (response) => {
      DropDownListDataProvider(this, "balanceSheetColumn", response);

      if (this.props.location.state && this.props.location.state.balanceSheetColumn)
        this.setState({ balanceSheetColumnType: this.props.location.state.balanceSheetColumn, isColumn6: this.props.location.state.balanceSheetColumn.code === 2 })
      else
        this.setState({ balanceSheetColumnType: response.result[0] })
    });
    GetCostCentersService.getCostCenters(null, (response) => {
      DropDownListDataProvider(this, "costCenterList", response);
    });
    GetEnum("getexceptioncategory", (response) => DropDownListDataProvider(this, "exceptionCatagoryList", response));
    GetEnum("accountbalanaceremaintype", (response) => DropDownListDataProvider(this, "accountBalanaceRemainTypeList", response));
    this.getBranches();
    GetVoucherTypeService(null, (response) => DropDownListDataProvider(this, "voucherTypeList", response));
    GetSubsidiaryLedgerService.getsubsidiaryledgers(defaultCommand, (response) => {
      DropDownListDataProvider(this, "fromSubsidiaryLedgerCodeList", response)
      DropDownListDataProvider(this, "toSubsidiaryLedgerCodeList", response);
    });

    GetGeneralLedgerService.getGeneralLedgers(defaultCommand, (response) => {
      DropDownListDataProvider(this, "fromGeneralLedgerCodeList", response);
      DropDownListDataProvider(this, "toGeneralLedgerCodeList", response);
      DropDownListDataProvider(this, "accountCodesList", response);
      if (this.props.location.state && this.props.location.state.accountCode)
        GetMultiSelectElement(this, this.props.location.state, "accountCode", "accountCodes", response)
    });

    this.getFiscalYears();


  }

  handleChangeCheck = name => (event) => {
    this.setState({
      isLastLevel: event.target.checked,
      [name]: event.target.checked
    })

  };

  getCommand() {
    var grid = $("#subsidiary-ledger-balance").data("kendoGrid");
    var dataSource = grid.dataSource;

    var command = {


      reportFilter: {
        isNotConsiderSettlementDays: this.state.isNotConsiderSettlementDays,

        accountCodes: this.state.accountCodes.length > 0 ? this.state.accountCodes.map(ac => ac.code) : [],
        vouhcerCategoryExcetionListCode: this.state.exceptionCatagory,
        voucherCategoryInclude: this.state.voucherType.length > 0 ? this.state.voucherType.map((vt) => vt.code) : [],
        fiscalYearId: this.state.fiscalYear.id,
        balanceSheetColumnType: this.state.balanceSheetColumnType.code,
        branchId: this.state.branch ? this.state.branch.id : 0,
        fromVoucherNumber: this.state.fromVoucherNumber !== '' ? this.state.fromVoucherNumber : null,
        toVoucherNumber: this.state.toVoucherNumber !== '' ? this.state.toVoucherNumber : null,
        accountBalanaceRemainType: this.state.accountBalanaceRemainType.code,
        costCenterId: this.state.costCenter ? this.state.costCenter.id : 0,
        fromSubsidiaryLedgerCode: this.state.fromSubsidiaryLedgerCode ? this.state.fromSubsidiaryLedgerCode.code : '',
        toSubsidiaryLedgerCode: this.state.toSubsidiaryLedgerCode ? this.state.toSubsidiaryLedgerCode.code : '',
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
    GetSubsidiaryLedgerBalanceService.getExcelExport(command, 'subsiadary-ledger-balance');

  }
  getPdfReport() {
    var command = this.getCommand();
    GetSubsidiaryLedgerBalanceService.getPdfExport(command, 'subsiadary-pdf');

  }
  getNormalSubsidiaryLedgerBalanceSheet() {
    let self = this;

    $("#subsidiary-ledger-balance").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              self = option.data
            }
            var command = {
              reportFilter: {
                isNotConsiderSettlementDays: self.state.isNotConsiderSettlementDays,

                accountCodes: self.state.accountCodes.length > 0 ? self.state.accountCodes.map(ac => ac.code) : [],
                vouhcerCategoryExcetionListCode: self.state.exceptionCatagory,
                voucherCategoryInclude: self.state.voucherType.length > 0 ? self.state.voucherType.map((vt) => vt.code) : [],
                fiscalYearId: self.state.fiscalYear.id,
                balanceSheetColumnType: self.state.balanceSheetColumnType.code,
                branchId: self.state.branch ? self.state.branch.id : 0,
                fromVoucherNumber: self.state.fromVoucherNumber !== '' ? self.state.fromVoucherNumber : null,
                toVoucherNumber: self.state.toVoucherNumber !== '' ? self.state.toVoucherNumber : null,
                accountBalanaceRemainType: self.state.accountBalanaceRemainType.code,
                costCenterId: self.state.costCenter ? self.state.costCenter.id : 0,
                fromSubsidiaryLedgerCode: self.state.fromSubsidiaryLedgerCode ? self.state.fromSubsidiaryLedgerCode.code : '',
                toSubsidiaryLedgerCode: self.state.toSubsidiaryLedgerCode ? self.state.toSubsidiaryLedgerCode.code : '',
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
                    field: "accountCode",
                    dir: "asc"
                  }]
              }
            }

            GetSubsidiaryLedgerBalanceService.getNormalSubsidiaryLedgerBalanceSheet(command, function (response) {
              if (response.result && response.result.length > 0) {
                // response.result.push({
                //   totalCreditLeave: response.totalCreditLeave,
                //   totalCreditSum: response.totalCreditSum,
                //   totalCreditTurnover: response.totalCreditTurnover,
                //   totalDebitLeave: response.totalDebitLeave,
                //   totalDebitSum: response.totalDebitSum,
                //   totalDebitTurnover: response.totalDebitTurnover
                // });


                console.log("fffff",self.state.response);
                self.setState({
                  response: {

                    totalCreditLeave: response.totalCreditLeave,
                    totalCreditSum: response.totalCreditSum,
                    totalCreditTurnover: response.totalCreditTurnover,
                    totalDebitLeave: response.totalDebitLeave,
                    totalDebitSum: response.totalDebitSum,
                    totalDebitTurnover: response.totalDebitTurnover
                  }
                })

                // option.success(response);

              } else {
                response = {
                  result: [],
                  totalRecords: 0
                }
              }
              option.success(response)

            })
          }
        },

        pageSize: 50,
        sort: {
          field: "accountCode",
          dir: "asc"
        },
        serverPaging: true,
        serverSorting: true,
        schema: {
          data: "result",
          total: "totalRecords",
          model: {
            fields: {
              accountCode: "accountCode",
              accountTitle: "accountTitle",
              debitTurnover: "debitTurnover",
              creditTurnover: "creditTurnover",
              debitSum: "debitSum",
              creditSum: "creditSum",
              debitLeave: "debitLeave",
              creditLeave: "creditLeave"
            }
          }
        },
        aggregate: [
          { field: "debitTurnover", aggregate: "sum" },
          { field: "creditTurnover", aggregate: "sum" },
          { field: "debitSum", aggregate: "sum" },
          { field: "creditSum", aggregate: "sum" },
          { field: "debitLeave", aggregate: "sum" },
          { field: "creditLeave", aggregate: "sum" }]
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
        //   var scrollOffset = {
        //     left:10000 ,
        // };
        //   var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
        //   container.scrollLeft(scrollOffset.left);
        if (this.dataSource.data().length > 0) {
          let grid = $("#subsidiary-ledger-balance").data("kendoGrid");
          let items = grid.dataSource.view();
          items.map((item, index) => {
            let id = items[index].uid;
            let currentRow = grid.table.find("tr[data-uid='" + id + "']");
            // if (index === this.dataSource.data().length - 1) {
              // currentRow.css({ display: 'none', visibility: 'hidden' });

              $("#subsidiary-ledger-balance .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-debit-sum").text(kendo.toString(self.state.response.totalDebitSum, 'n0'));

              $("#subsidiary-ledger-balance .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-credit-sum").text(kendo.toString(self.state.response.totalCreditSum, 'n0'));

              $("#subsidiary-ledger-balance .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-debit-leave").text(kendo.toString(self.state.response.totalDebitLeave, 'n0'));

              $("#subsidiary-ledger-balance .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-credit-leave").text(kendo.toString(self.state.response.totalCreditLeave, 'n0'));

              $("#subsidiary-ledger-balance .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-debit-turnover").text(kendo.toString(self.state.response.totalDebitTurnover, 'n0'));

              $("#subsidiary-ledger-balance .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-credit-turnover").text(kendo.toString(self.state.response.totalCreditTurnover, 'n0'));
            // } else {
              currentRow.find(".account-code").css({ color: '#039be5', cursor: 'pointer' });
            // }
          });
        };

        $("#subsidiary-ledger-balance .excel-report").on("click", function (item) {
          self.getExcelReport();
        });
        $("#subsidiary-ledger-balance .pdf-report").on("click", function (item) {
          self.getPdfReport();
        });
        $("#subsidiary-ledger-balance tbody tr td div.subsidiary-account-book").on("click", function (item) {

          var grid = $("#subsidiary-ledger-balance").data("kendoGrid");
          var row = $(item.target).closest("tr");
          let dataItem = grid.dataItem(row);
          self.props.history.push(
            {

              pathname: self.props.detail[1].path,
              state: self.props.location.state === undefined ? {
                backButton: { path: self.props.path, title: self.props.title },

                fiscalYear: self.state.fiscalYear,
                fromDate: self.state.fromDate,
                toDate: self.state.toDate,
                branch: self.state.branch,
                balanceSheetColumn: self.state.balanceSheetColumnType,
                fromVoucherNumber: self.state.fromVoucherNumber !== '' ? Number(self.state.fromVoucherNumber) : 0,
                toVoucherNumber: self.state.toVoucherNumber !== '' ? Number(self.state.toVoucherNumber) : 0,
                accountBalanaceRemainType: self.state.accountBalanaceRemainType,
                costCenter: self.state.costCenter,
                exceptionCatagory: self.state.exceptionCatagory,
                voucherType: self.state.voucherType,

                fromSubsidiaryLedgerCode: {
                  fullTitle: dataItem.accountTitle,
                  code: dataItem.accountCode
                },
                toSubsidiaryLedgerCode: {
                  fullTitle: dataItem.accountTitle,
                  code: dataItem.accountCode
                }

              } :
                self.props.location.state && self.props.location.state.accountCode !== undefined ? {
                  backButton: { path: self.props.path, title: self.props.title },
                  fiscalYear: self.state.fiscalYear,
                  fromDate: self.state.fromDate,
                  toDate: self.state.toDate,
                  branch: self.state.branch,
                  balanceSheetColumn: self.state.balanceSheetColumn,
                  fromVoucherNumber: self.state.fromVoucherNumber,
                  toVoucherNumber: self.state.toVoucherNumber,
                  accountBalanaceRemainType: self.state.accountBalanaceRemainType,
                  costCenter: self.state.costCenter,
                  exceptionCatagory: self.state.exceptionCatagory,
                  voucherType: self.state.voucherType,
                  accountCode: self.props.location.state.accountCode,
                  fromSubsidiaryLedger: {
                    id: dataItem.accountId,
                    fullTitle: dataItem.accountTitle
                  },
                  toSubsidiaryLedger: {
                    id: dataItem.accountId,
                    fullTitle: dataItem.accountTitle
                  }
                } :
                  {
                    backButton: { path: self.props.path, title: self.props.title },
                    fiscalYear: self.state.fiscalYear,
                    fromDate: self.state.fromDate,
                    toDate: self.state.toDate,
                    branch: self.state.branch,
                    balanceSheetColumn: self.state.balanceSheetColumn,
                    fromVoucherNumber: self.state.fromVoucherNumber,
                    toVoucherNumber: self.state.toVoucherNumber,
                    accountBalanaceRemainType: self.state.accountBalanaceRemainType,
                    costCenter: self.state.costCenter,
                    exceptionCatagory: self.state.exceptionCatagory,
                    voucherType: self.state.voucherType,
                    fromSubsidiaryLedger: {
                      id: dataItem.accountId,
                      fullTitle: dataItem.accountTitle
                    },
                    toSubsidiaryLedger: {
                      id: dataItem.accountId,
                      fullTitle: dataItem.accountTitle
                    }
                  }
            })
        });
        $("#subsidiary-ledger-balance tbody tr td div.account-code").on("click", function (item) {
          console.log("subsidiary-account-book", self.state)

          var grid = $("#subsidiary-ledger-balance").data("kendoGrid");
          var row = $(item.target).closest("tr");
          var dataItem = grid.dataItem(row);
          self.props.history.push(
            {
              pathname: self.props.detail[0].path,
              state: self.props.location.state === undefined ?
                {

                  fiscalYear: self.state.fiscalYear,
                  fromDate: self.state.fromDate,
                  toDate: self.state.toDate,
                  branch: self.state.branch,
                  balanceSheetColumn: self.state.balanceSheetColumnType,
                  fromVoucherNumber: self.state.fromVoucherNumber !== '' ? Number(self.state.fromVoucherNumber) : 0,
                  toVoucherNumber: self.state.toVoucherNumber !== '' ? Number(self.state.toVoucherNumber) : 0,
                  accountBalanaceRemainType: self.state.accountBalanaceRemainType,
                  costCenter: self.state.costCenter,
                  exceptionCatagory: self.state.exceptionCatagory,
                  voucherType: self.state.voucherType,

                  fromSubsidiaryLedgerCode: {
                    fullTitle: dataItem.accountTitle,
                    code: dataItem.accountCode
                  },
                  toSubsidiaryLedgerCode: {
                    fullTitle: dataItem.accountTitle,
                    code: dataItem.accountCode
                  }
                }
                :
                self.props.location.state && self.props.location.state.accountCode !== undefined ? {

                  fiscalYear: self.state.fiscalYear,
                  fromDate: self.state.fromDate,
                  toDate: self.state.toDate,
                  branch: self.state.branch,
                  balanceSheetColumn: self.state.balanceSheetColumnType,
                  fromVoucherNumber: self.state.fromVoucherNumber !== '' ? Number(self.state.fromVoucherNumber) : 0,
                  toVoucherNumber: self.state.toVoucherNumber !== '' ? Number(self.state.toVoucherNumber) : 0,
                  accountBalanaceRemainType: self.state.accountBalanaceRemainType,
                  costCenter: self.state.costCenter,
                  exceptionCatagory: self.state.exceptionCatagory,
                  voucherType: self.state.voucherType,
                  accountCode: self.props.location.state.accountCode,

                  fromSubsidiaryLedgerCode: {
                    fullTitle: dataItem.accountTitle,
                    code: dataItem.accountCode
                  },
                  toSubsidiaryLedgerCode: {
                    fullTitle: dataItem.accountTitle,
                    code: dataItem.accountCode
                  }
                } :

                  {

                    fiscalYear: self.state.fiscalYear,
                    fromDate: self.state.fromDate,
                    toDate: self.state.toDate,
                    branch: self.state.branch,
                    balanceSheetColumn: self.state.balanceSheetColumnType,
                    fromVoucherNumber: self.state.fromVoucherNumber !== '' ? Number(self.state.fromVoucherNumber) : 0,
                    toVoucherNumber: self.state.toVoucherNumber !== '' ? Number(self.state.toVoucherNumber) : 0,
                    accountBalanaceRemainType: self.state.accountBalanaceRemainType,
                    costCenter: self.state.costCenter,
                    exceptionCatagory: self.state.exceptionCatagory,
                    voucherType: self.state.voucherType,

                    fromSubsidiaryLedgerCode: {
                      fullTitle: dataItem.accountTitle,
                      code: dataItem.accountCode
                    },
                    toSubsidiaryLedgerCode: {
                      fullTitle: dataItem.accountTitle,
                      code: dataItem.accountCode
                    }
                  }



            })
        });
      },
      columns: self.state.columns
    });
  }

  getFiscalYears() {


    GetFiscalYearsService.getFiscalYears(null, this.successGetFiscalYears);
  }
  getBranches() {
    var command = {
      optionalFilter: {
        take: 500,
        page: 1

      }
    }
    GetBranchService.getBranchesByFilter(command, (response) => {
      DropDownListDataProvider(this, "branchDropDowm", response);
      GetDropDownElement(this, this.props.location.state, "branch", "branch", response, "id")
    });
  }
  successGetFiscalYears(response) {
    if (response.success) {
      if (this.props.location.state) {

        this.setState({
          fiscalYear: this.props.location.state.fiscalYear,
          fromDate: this.props.location.state.fromDate,
          toDate: this.props.location.state.toDate,
          fiscalYearDropDowm: {
            name: "fiscalYear",
            feild: "title",
            label: "سال مالی ",
            list: response.result
          }
        })
      }
      else {
        this.setState({
          fiscalYear: response.result[0],
          reRender: true,
          fromDate: response.result[0].startDate,
          toDate: new Date(),
          fiscalYearDropDowm: {
            name: "fiscalYear",
            feild: "title",
            label: "سال مالی ",
            list: response.result
          }
        })
      }
      this.getNormalSubsidiaryLedgerBalanceSheet();
    }
  }
  handleChangeFiscalYear(item) {
    this.setState({
      fiscalYear: item.value,
      fromDate: item.value.startDate,
      toDate: item.value.endDate,
      reRender: true
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

  handleChangeColumn(item) {

    this.setState({
      balanceSheetColumnType: item.value,
      isColumn6: item.value && item.value.code === 2,
      columns: item.value.code === 1 ? Columns4() : Columns6()
    }, function () {
      $("#subsidiary-ledger-balance").data().kendoGrid.destroy();
      $("#subsidiary-ledger-balance").empty();
      this.getNormalSubsidiaryLedgerBalanceSheet();
    })
  }

  handleExpandSearchPanel() {
    this.setState({
      open: !this.state.open
    })
  }

  search() {
    if ($("#subsidiary-ledger-balance").data("kendoGrid") !== undefined)
      $("#subsidiary-ledger-balance").data("kendoGrid").dataSource.read(this);
    else {
      this.getFiscalYears();
      // $("#subsidiary-ledger-balance").data("kendoGrid").dataSource.read(this);
    }
  }

  render() {


    return (
      <React.Fragment>

        {/* <Header {...this.props} browserBack={this.props.location.state ? this.props.location.state.browserBack === true : false} /> */}
        <Header {...this.props} backParams={
          this.props.location.state === undefined ? undefined : {
            // backButton: { path: this.props.path, title: this.props.title },

            fiscalYear: this.state.fiscalYear,
            fromDate: this.state.fromDate,
            toDate: this.state.toDate,
            branch: this.state.branch,
            balanceSheetColumnType: this.state.balanceSheetColumnType,
            fromVoucherNumber: this.state.fromVoucherNumber,
            toVoucherNumber: this.state.toVoucherNumber,
            accountBalanaceRemainType: this.state.accountBalanaceRemainType,
            costCenter: this.state.costCenter,
            exceptionCatagory: this.state.exceptionCatagory,
            voucherType: this.state.voucherType,

          }
        } />
        <Paper className={"main-paper-container subsidiary-ledger-balance"}>
          <Filter search={this.search}
            handleExpandSearchPanel={this.handleExpandSearchPanel} {...this.state}>
            <div classPage={"height-search"}>
              <Grid container spacing={8} className="no-margin">
                <Grid item md={2}>
                  <DropDownComponent {...this.state.fiscalYearDropDowm}
                    handleChange={(value, name) => this.handleChangeFiscalYear(value)} isFilterable={true}
                    value={this.state.fiscalYear} />
                </Grid>
                <Grid item md={2} >
                  <PersianDatePicker label="از تاریخ" max={this.state.toDate} handleOnChange={(e) => this.handleChangeDate(e, 'fromDate')} selectedDate={this.state.fromDate} />
                </Grid>
                <Grid item md={2} >
                  <PersianDatePicker label="تا تاریخ" min={this.state.fromDate} handleOnChange={(e) => this.handleChangeDate(e, 'toDate')} selectedDate={this.state.toDate} />
                </Grid>
                <Grid item md={2}>
                  <ComboBoxComponent {...this.state.branchDropDowm}
                    handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                    value={this.state.branch} />
                </Grid>
                <Grid item md={2}>
                  <DropDownComponent {...this.state.balanceSheetColumn}
                    handleChange={(value, name) => this.handleChangeColumn(value, name)} isFilterable={false}
                    value={this.state.balanceSheetColumnType} />
                </Grid>
                <Grid item md={2}>
                  <DropDownComponent {...this.state.accountBalanaceRemainTypeList}
                    handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false}
                    value={this.state.accountBalanaceRemainType} />
                </Grid>
                <Grid item md={6}>
                  <div className="k-rtl">
                    <MultiSelectComponent isFilterable {...this.state.voucherTypeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.voucherType} />
                  </div>
                </Grid>
                <Grid item md={2} >
                  <NumberFormatComponent id="fromVoucherNumber" label="شماره سند از"
                    value={this.state.fromVoucherNumber}
                    handleChange={(value, error) => this.handleChange(value, 'fromVoucherNumber')} type="number" />
                </Grid>
                <Grid item md={2} >
                  <NumberFormatComponent id="toVoucherNumber" label="شماره سند تا"
                    value={this.state.toVoucherNumber}
                    handleChange={(value, error) => this.handleChange(value, 'toVoucherNumber')} type="number" />
                </Grid>
                <Grid item md={2}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.costCenterList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.costCenter} />
                  </div>
                </Grid>

                <Grid item md={3}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.fromSubsidiaryLedgerCodeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.fromSubsidiaryLedgerCode} />
                  </div>
                </Grid>
                <Grid item md={3}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.toSubsidiaryLedgerCodeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.toSubsidiaryLedgerCode} />
                  </div>
                </Grid>
                <Grid item md={3}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.fromGeneralLedgerCodeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.fromGeneralLedgerCode} />
                  </div>
                </Grid>
                <Grid item md={3}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.toGeneralLedgerCodeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.toGeneralLedgerCode} />
                  </div>
                </Grid>
                <Grid item md={12}>
                  <div className="k-rtl">
                    <MultiSelectComponent {...this.state.accountCodesList}
                      handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true} value={this.state.accountCodes} />
                  </div>
                </Grid>
                <CheckBoxList {...this.state.exceptionCatagoryList} value={this.state.exceptionCatagory} handleChange={(value, name) => this.handleChange(value, name)} />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.isNotConsiderSettlementDays}
                      onChange={this.handleChangeCheck('isNotConsiderSettlementDays')}
                      value="isLastLevel"
                      color="primary"
                    />
                  }
                  label="فاقد معاملات آخر"
                />
              </Grid>

            </div>
          </Filter>
          <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid")}>
            <div id="subsidiary-ledger-balance" className="height-page"></div>
          </div>
        </Paper>
      </React.Fragment>
    )
  }
}
export default GetSubsidaryLedgerBalance;
