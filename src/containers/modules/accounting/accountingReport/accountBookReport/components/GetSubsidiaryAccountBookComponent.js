import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import MainColumns from '../constants/GetAccontBookColumn';
import Grid from '@material-ui/core/Grid';
import kendo from '@progress/kendo-ui';
import Input from 'shared/components/formInput/inputForm';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetFiscalYearsService from '../../../accountingBase/fiscalYear/services/GetFiscalYearsService'
import GetVoucherTypeService from '../../../accountingBase/voucherType/services/GetVoucherTypeService';
import GetEnum from 'services/getEnum'
import moment from 'moment';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import CheckBoxList from '../../../../../../shared/components/checkBoxList/checkBoxList';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import GetSubsidairyAccountBookService from '../services/GetSubsidiaryAccountBookService';
import './GetSubsidiaryAccountBookComponent.css';
import GetSubsidiaryLedgerService from '../../../accountingBase/subsidaryLedger/services/GetSubsidiaryLedgerService';
import { GetDropDownElement } from '../../../../../../core/getMultiSelectElement';
import GetGeneralLedgerService from '../../../accountingBase/generalLedger/services/GetGeneralLedgerService'
import GetCostCentersService from '../../../accountingBase/costCenter/services/GetCostCentersService';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import { ContentAddCircleOutline } from 'material-ui/svg-icons';
import { excelAndPdfToolbar } from '../../../../../../constants/excelPdfToolbar';
const $ = require("jquery");

class GetSubsidiaryAccountBook extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fromVoucherNumber: this.props.location.state && this.props.location.state.fromVoucherNumber ? this.props.location.state.fromVoucherNumber : 0,
      toVoucherNumber: this.props.location.state && this.props.location.state.toVoucherNumber ? this.props.location.state.toVoucherNumber : 0,
      toDebit: 0,
      fromDebit: 0,
      toRemain: 0,
      fromRemain: 0,
      fromCredit: 0,
      toCredit: 0,
      voucherMasterId: 0,
      reRender: false,
      submitType: '',
      reRenderGrid: false,
      haveRemain: false,
      selectedSubmitType: { code: 0 },
      noLastTrades: false,
      voucherType: this.props.location.state && this.props.location.state.voucherType ? this.props.location.state.voucherType : [],
      accountBalanaceRemainType: this.props.location.state && this.props.location.state.accountBalanaceRemainType ? this.props.location.state.accountBalanaceRemainType : { code:0 },
      fromSubsidiaryLedgerCode: this.props.location.state && this.props.location.state.fromSubsidiaryLedger ? this.props.location.state.fromSubsidiaryLedger : {  },
      toSubsidiaryLedgerCode: this.props.location.state && this.props.location.state.toSubsidiaryLedger ? this.props.location.state.toSubsidiaryLedger : {  },
      balanceSheetColumn: this.props.location.state && this.props.location.state.balanceSheetColumn ?
        this.props.location.state.balanceSheetColumn : {
          code: 1
        },

      open:false,
      columns: MainColumns(),
      generalLedger: this.props.location.state && this.props.location.state.generalLedger ? this.props.location.state.generalLedger : { code: '' },
      fromDate: this.props.location.state && this.props.location.state.fromDate ? this.props.location.state.fromDate : moment(new Date),
      toDate: this.props.location.state && this.props.location.state.toDate ? this.props.location.state.toDate : moment(new Date),
      branch: this.props.location.state && this.props.location.state.branch ? this.props.location.state.branch : { id: 0 },
      costCenter: this.props.location.state && this.props.location.state.costCenter ? this.props.location.state.costCenter : { code: 0, title: '' },
      costCenterList: {
        name: "costCenter",
        label: "مرکز هزینه",
        field: "title",
        list: []
      },
      selectedYear: this.props.location.state && this.props.location.state.fiscalYear ? this.props.location.state.fiscalYear : { code: 0 },
      voucherMastrerState: { code: 0 },
      subsidiaryLedger: { fullTitle: '', id: 0, code: "" },
      detailLedger: { fullTitle: '', id: 0, code: "" },
      branchList: {
        name: "branch",
        feild: "title",
        label: "شعبه",
        list: []
      },

      fiscalYearList: {
        name: "selectedYear",
        feild: "title",
        label: "سال مالی",
        list: []
      },
      voucherMasterStateList: {
        name: "voucherMastrerState",
        feild: "title",
        label: "وضعیت سند",
        list: []
      },
      fromSubsidiaryLedger: this.props.location.state && this.props.location.state.fromSubsidiaryLedger ? this.props.location.state.fromSubsidiaryLedger : { id: 0 },
      fromSubsidiaryLedgerList: {
        name: "fromSubsidiaryLedger",
        field: "fullTitle",
        label: " از حساب معین",
        list: []
      },
      toSubsidiaryLedger : this.props.location.state && this.props.location.state.toSubsidiaryLedger ? this.props.location.state.toSubsidiaryLedger : { id: 0 },
      toSubsidiaryLedgerList: {
        name: "toSubsidiaryLedger",
        field: "fullTitle",
        label: " تا حساب معین",
        list: []
      },
      exceptionCatagory: this.props.location.state && this.props.location.state.exceptionCatagory ? this.props.location.state.exceptionCatagory : [],
      exceptionCatagoryList: {
        name: "exceptionCatagory",
        field : "code",
        list: []
      },
      generalLedgerList: {
        name: "generalLedger",
        field: "fullTitle",
        label: " حساب کل",
        list: []
      },
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
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleLoadingFiscalYear = this.handleLoadingFiscalYear.bind(this);
    this.handleExpandSearchPanel = this.handleExpandSearchPanel.bind(this);
    this.successGetFiscalYears = this.successGetFiscalYears.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
    this.getFiscalYears = this.getFiscalYears.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.getFiscalYears();
    this.getDropDownData();
  }

  getDropDownData() {
    let defaultCommand = {
      entity: ""
    }
    GetBranchService.getBranchesByFilter(null, (response) => DropDownListDataProvider(this, "branchList", response));
    GetEnum("getexceptioncategory", (response) => DropDownListDataProvider(this, "exceptionCatagoryList", response));
    GetCostCentersService.getCostCenters(null, (response) => {
      DropDownListDataProvider(this, "costCenterList", response);

    })
    GetVoucherTypeService(null, (response) => DropDownListDataProvider(this, "voucherType", response));
    GetEnum("vouchermasterstate", (response) => DropDownListDataProvider(this, "voucherMasterStateList", response))
    GetGeneralLedgerService.getGeneralLedgers(defaultCommand, (response) => {
      DropDownListDataProvider(this, "generalLedgerList", response);
      GetDropDownElement(this, this.props.location.state, 'generalLedgerCode', ['fromGeneralLedger', 'toGenralLedgerCode'], response);
    })
    GetVoucherTypeService(null, (response) => DropDownListDataProvider(this, "voucherCategoryIncludeList", response));
    GetVoucherTypeService(null, (response) => DropDownListDataProvider(this, "voucherCategoryExcludeList", response));
  }

  getFiscalYears() {
  
    GetFiscalYearsService.getFiscalYears(null, this.successGetFiscalYears);
  }

  successGetFiscalYears(response) {

    if (response.success) {
      if (this.props.location.state) {
      this.setState({
        fiscalYear: this.props.location.state.fiscalYear,
        fromDate: this.props.location.state.fromDate,
        toDate: this.props.location.state.toDate,
        fiscalYearList: {
          name: "selectedYear",
          feild: "title",
          label: "سال مالی ",
          list: response.result
        },
      }, function () {
        this.getSubsidiaryLedgers();
        this.getSubsidiaryAccountBooks();
      }
      )
    }
    else {
      this.setState({
        selectedYear: response.result[0],
        fromDate: response.result[0].startDate,
        toDate: response.result[0].endDate,
        fiscalYearList: {
          name: "selectedYear",
          feild: "title",
          label: "سال مالی ",
          list: response.result
        }
      }, function () {
        this.getSubsidiaryLedgers();
        this.getSubsidiaryAccountBooks();
      })
    }
     
    }
  }

  getSubsidiaryLedgers() {
    GetSubsidiaryLedgerService.getsubsidiaryledgers(null, (response) => {
      if (response.success) {
            this.setState({
            
              fromSubsidiaryLedgerList: {
                name: "fromSubsidiaryLedger",
                field: "fullTitle",
                label: "کد معین از",
                list: response.result
              },
              toSubsidiaryLedgerList: {
                name: "toSubsidiaryLedger",
                field: "fullTitle",
                label: "کد معین تا",
                list: response.result
              }
            })
   
      }

    })
  }

  getCommand = () => {
    var grid = $("#subsidiary-account-book").data("kendoGrid");
    var dataSource = grid.dataSource;

    var command = {
      reportFilter: {
        fomSubsidiaryLedgerId: this.state.fromGeneralLedger ? this.state.fromGeneralLedger.id : 0,
        toSubsidiaryLedgerId: this.state.toGeneralLedger ? this.state.toGeneralLedger.id : 0,
        description: this.state.description,
        noLastTrades: this.state.noLastTrades,
        branchId: this.state.branch ? this.state.branch.id : '',
        fiscalYearId: this.state.selectedYear.id,
        fromVoucherId: this.state.fromVoucherNumber,
        toVoucherId: this.state.toVoucherNumber,
        voucherCategoryExceptions: [...this.state.exceptionCatagory, ...this.state.voucherCategoryExclude.map((vc) => { return vc.code })],
        voucherCategoryInclude :  [...this.state.voucherCategoryInclude.map((vc) => { return vc.code })],
        fromCredit: this.state.fromCredit,
        toCredit: this.state.toCredit,
        fromDebit: this.state.fromDebit,
        toDebit: this.state.toDebit,
        fromRemain: this.state.fromRemain,
        toRemain: this.state.toRemain,
        voucherMasterState: this.state.voucherMasterState,
        haveRemain: this.state.haveRemain,
        costCenterId: this.state.costCenter ? this.state.costCenter.id : '',
        dateFilter: {
          startDate: this.state.fromDate,
          endDate: this.state.toDate
        },
        // subsidiaryLedgerId: e.data.subsidiaryLedgerId
      },
  
      OptionalFilter: {
        page: dataSource ? dataSource.page() : 1,
        take: dataSource ? dataSource.pageSize() : 50,
        // take: option.data.take ? option.data.take : 50,
        sort: dataSource && dataSource.sort()? dataSource.sort() :
          [{
            field: "subsidiaryLedgerCode",
            dir: "asc"
          }]
      }

    }

    return command;
  }
  getExcelReport = () => {
  
    // var command = this.getCommand();
    // GetGeneralAccountBookService.getExcelExport(command,'general-account-book');

  }
  getPdfReport() {
    // var command = this.getCommand();
    // GetGeneralLedgerService.getPdfExport(command, function (response) {
    // });
  }
  getSubsidiaryAccountBooks() {
    let self = this;
    $("#subsidiary-account-book").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              self = option.data
            }
            let command = {
              reportFilter: {
                fromSubsidiaryLedgerId: self.state.fromSubsidiaryLedger ? self.state.fromSubsidiaryLedger.id : 0,
                toSubsidiaryLedgerId: self.state.toSubsidiaryLedger ? self.state.toSubsidiaryLedger.id : 0,
                description: self.state.description,
                generalLedgerId:self.state.generalLedger.id,
                noLastTrades: self.state.noLastTrades,
                branchId: self.state.branch ? self.state.branch.id : '',
                fiscalYearId: self.state.selectedYear.id,
                fromVoucherId: self.state.fromVoucherNumber,
                toVoucherId: self.state.toVoucherNumber,
                voucherCategoryExceptions: [...self.state.exceptionCatagory, ...self.state.voucherCategoryExclude.map((vc) => { return vc.code })],
                voucherCategoryInclude :  [...self.state.voucherCategoryInclude.map((vc) => { return vc.code })],
                fromCredit: self.state.fromCredit,
                toCredit: self.state.toCredit,
                fromDebit: self.state.fromDebit,
                toDebit: self.state.toDebit,
                fromRemain: self.state.fromRemain,
                toRemain: self.state.toRemain,
                voucherMasterState: self.state.voucherMasterState,
                haveRemain: self.state.haveRemain,
                costCenterId: self.state.costCenter ? self.state.costCenter.id : '',
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
                    field: "subsidiaryLedgerCode",
                    dir: "asc"
                  }]
              }
            }
            GetSubsidairyAccountBookService.getSubsidiaryAccountBooks(command, function (response) {
              if (response.result) {
                response.result.map(item => {
                  item.detail = {
                    result: item.resultList,
                    totalRecords: item.totalRecords
                  };
                  item.resultList.push({
                    totalCreditSum: item.totalCreditSum,
                    totalDebitSum: item.totalDebitSum,
                    totalRemainSum: item.totalRemainSum
                  })
                  item.subsidiaryLedgerId = item.resultList[0].subsidiaryLedgerId
                });
              } else {
                response = {
                  result : [],
                  totalRecords : 0
                }
              }
              option.success(response)
            });
          }

        },
        pageSize: 50,
        serverPaging: true,
        serverSorting: true,
        schema: {
          data: "result",
          total: "totalRecords"
        }
      },
      autoBind: true,
      columns: self.state.columns,
      pageable: {
        pageSizes: [50, 150, 200],
        buttonCount: 5,
        messages: {
          itemsPerPage: "تعداد سطر در هر صفحه",
          display: "{0} - {1} از {2} مورد",
          empty: ""
        }
      },
      noRecords: {
        template: ' <p class="no-data">رکوردی جهت نمایش وجود ندارد.</p>'
      },
      toolbar: excelAndPdfToolbar,
      dataBound: function () {
        $("#subsidiary-account-book .excel-report").on("click", function () {
          self.getExcelReport();
          // alert('exel')
        });
        $("#subsidiary-account-book .pdf-report").on("click", function () {
          self.getPdfReport();
          // alert('pdf')
        });
      },
      detailTemplate: kendo.template($("#template").html()),
      detailInit: function (e) {
        let detailRow = e.detailRow;
        detailRow.find(".detail-account-book").kendoGrid({
          dataSource: {
            transport: {
              read: function (option) {
                if (e.data.isFirst) {
                  e.data.isFirst = false;
                  option.success(e.data.detail)
                } else {
                  let command = {
                    reportFilter: {
                      fomSubsidiaryLedgerId: self.state.fromGeneralLedger ? self.state.fromGeneralLedger.id : 0,
                      toSubsidiaryLedgerId: self.state.toGeneralLedger ? self.state.toGeneralLedger.id : 0,
                      description: self.state.description,
                      noLastTrades: self.state.noLastTrades,
                      branchId: self.state.branch ? self.state.branch.id : '',
                      fiscalYearId: self.state.selectedYear.id,
                      fromVoucherId: self.state.fromVoucherNumber,
                      toVoucherId: self.state.toVoucherNumber,
                      voucherCategoryExceptions: [...self.state.exceptionCatagory, ...self.state.voucherCategoryExclude.map((vc) => { return vc.code })],
                      voucherCategoryInclude :  [...self.state.voucherCategoryInclude.map((vc) => { return vc.code })],
                      fromCredit: self.state.fromCredit,
                      toCredit: self.state.toCredit,
                      fromDebit: self.state.fromDebit,
                      toDebit: self.state.toDebit,
                      fromRemain: self.state.fromRemain,
                      toRemain: self.state.toRemain,
                      voucherMasterState: self.state.voucherMasterState,
                      haveRemain: self.state.haveRemain,
                      costCenterId: self.state.costCenter ? self.state.costCenter.id : '',
                      dateFilter: {
                        startDate: self.state.fromDate,
                        endDate: self.state.toDate
                      },
                      subsidiaryLedgerId: e.data.subsidiaryLedgerId
                    },
                    OptionalFilter: {
                      page: option.data.page,
                      take: option.data.take,
                      sort: option.data.sort

                    }
                  }

                  GetSubsidairyAccountBookService.getSpecificSubsidiaryAccountBooks(command, (response) => {
                    option.success(response);
                  })
                }

              }
            },
            pageSize: 1000,
            sort: {
              field: "subsidiaryLedgerCode",
              dir: "asc"
            },
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            schema: {
              data: "result",
              total: "totalRecords"

            },
            aggregate: [
              { field: "debit", aggregate: "sum" },
              { field: "credit", aggregate: "sum" },
              { field: "remain", aggregate: "sum" }]
          },

          sortable: {
            allowUnsort: false
          },
          resizable: false,
          scrollable : false,
          autoBind: true,
          pageable: {
            pageSizes: [1000, 1500, 2000],
            buttonCount: 5,
            messages: {
              itemsPerPage: "تعداد سطر در هر صفحه",
              display: "{0} - {1} از {2} مورد",
              empty: ""
            }
          },
          noRecords: {
            template: ' <p class="no-data">رکوردی جهت نمایش وجود ندارد.</p>'
          },
          dataBound: function (e) {
          //   var scrollOffset = {
          //     left:10000 ,
          // };
          //   var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
          //   container.scrollLeft(scrollOffset.left);
            let mainGrid = $("#subsidiary-account-book").data("kendoGrid");
            let mainItems = mainGrid.dataSource.view();
            let list = this.dataSource.data();
            let mainId = "";
            mainItems.map((item, index) => {
              if (list[0].fullSubsidiaryTitle === item.masterTitle) {
                mainId = mainItems[index].uid;
              }
            });
            if (this.dataSource.data().length > 0) {
              let grid = $(".detail-account-book").data("kendoGrid");
              let items = this.dataSource.data();
              items.map((item, index) => {
                let id = items[index].uid;
                let currentRow = grid.table.find("tr[data-uid='" + id + "']");
                if (index === this.dataSource.data().length - 1) {
                  currentRow.css({ display: 'none', visibility: 'hidden' });
                  currentRow.find(".subsidiary-account-book").css({ color: '#039be5', cursor: 'pointer' });

                  $("#subsidiary-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                    "tr td div.total-debit-sum").text(kendo.toString(item.totalDebitSum, 'n0'));

                  $("#subsidiary-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                    "tr td div.total-credit-sum").text(kendo.toString(item.totalCreditSum, 'n0'));
                    if(item.totalRemainSum>=0)
                    $("#subsidiary-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                    "tr td div.total-remain-sum").text(kendo.toString(item.totalRemainSum, 'n0'));
                      else{
                        $("#subsidiary-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                        "tr td div.total-remain-sum red-color").text(kendo.toString(item.totalRemainSum, 'n0'));
                      }
                  
                }
              });
            };
          },
          columns: [
            {
              title: "تاریخ",
              width: "80px",
              attributes: { class: "text-center" },
              field: "voucherDateJalali",
              footerTemplate: "<div>جمع صفحه</div><div>جمع کل</div>",
            },
            {
              title: "شماره سند",
              width: "70px",
              attributes: { class: "text-center" },
              field: "voucherNumber"
            },
            {
              title: "شرح",
              width: "400px",
              field: "description"
            },
            {
              title: "بدهکار",
              width: "180px",
              filter: "numeric",
              format: "{0:n0}",
              attributes: { class: "text-left" },
              aggregates: ["sum"],
              footerTemplate: "<div class='text-left'>#=kendo.toString(sum, 'n0')#</div>" +
                '<div class="total-debit-sum text-left"></div>',
              field: "debit"
            },
            {
              title: "بستانکار",
              width: "180px",
              filter: "numeric",
              format: "{0:n0}",
              attributes: { class: "text-left" },
              aggregates: ["sum"],
              footerTemplate: "<div class='text-left'>#=kendo.toString(sum, 'n0')#</div>" +
                '<div class="total-credit-sum text-left"></div>',
              field: "credit"
            },
            {
              title: "مانده",
              width: "180px",
              filter: "numeric",
              format: "{0:n0}",
              template: '#if(data.remain>=0){#' +
              '<b>#= Math.abs(data.remain).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b>#}' +
              'else {#' +
              '<b class="red-color">(#= Math.abs(data.remain).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b>#}#',
              footerTemplate: '#if(sum>=0){#' +
              '<div class="text-left"><b  class="text-left">#= Math.abs(sum).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b></div>#}' +
              'else {#' +
              '<div class="text-left"><b class="red-color">(#= Math.abs(sum).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b></div>#}#'+
              '<div class="total-remain-sum text-left"></div>',
              attributes: { class: "text-left" },
              // footerTemplate: "<div class='text-left'>#=kendo.toString(sum, 'n0')#</div>" +
              //   '<div class="total-remain-sum text-left"></div>',
              aggregates: ["sum"],
              field: "remain"
            },
            {
              title: "شعبه",
              width: "100px",
              field: "branchName"
            }
          ]

        });
      },
      dataBound: function (e) {
      //   var scrollOffset = {
      //     left:10000 ,
      // };
      //   var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
      //   container.scrollLeft(scrollOffset.left);
        if (this.dataSource.data().length > 0) {
          let grid = $("#subsidiary-account-book").data("kendoGrid");
          let items = grid.dataSource.view();
          items.map((item, index) => {
            item.isFirst = true;
          });
        }

        var grid = $("#subsidiary-account-book").data("kendoGrid");
        grid.expandRow(".k-master-row");


      }
    });
  }

  handleLoadingFiscalYear(response) {
    let lastFiscalYear = response.result[response.result.length - 1];
    this.setState({ fromDate: lastFiscalYear.startDate, toDate: lastFiscalYear.lastDate });
  }

  handleChange(value, name) {
    let item = value.value;
    this.setState({
      [name]: item
    })
  }



  handleChangeFiscalYear(value) {
    let item = value.value;
    this.setState({
      selectedYear: item,
      fromDate: item.startDate,
      toDate: item.endDate,
      reRender: true
    });
  }

  handleChangeDate(value, name) {
    this.setState({
      [name]: value
    }, function () {
    })
  }
  handleExpandSearchPanel() {
    this.setState({
      open: !this.state.open

    })
  }

  handleChangeCheck = (event, name) => {
    this.setState({
      [name]: event.target.checked
    })

  };
  search() {
    if($("#subsidiary-account-book").data("kendoGrid")!==undefined)
    $("#subsidiary-account-book").data("kendoGrid").dataSource.read(this);
    else{
      this.getFiscalYears();
     
    }
   
  }
  render() {
   
    return (
      <React.Fragment>
        {/* <Header  {...this.props} browserBack={this.props.location.state ? this.props.location.state.browserBack === true : false} /> */}
        <Header {...this.props} backParams={
          this.props.location.state===undefined ?undefined:
         this.props.location.state &&  this.props.location.state.accountCode!==undefined ? {   
          fiscalYear: this.state.selectedYear,
          fromDate: this.state.fromDate,
          toDate: this.state.toDate,
          branch: this.state.branch,
          balanceSheetColumn: this.props.location.state.balanceSheetColumn,
          fromVoucherNumber: this.state.fromVoucherNumber,
          toVoucherNumber: this.state.toVoucherNumber,
          accountBalanaceRemainType: this.props.location.state.accountBalanaceRemainType,
          costCenter: this.state.costCenter,
          exceptionCatagory: this.state.exceptionCatagory,
          voucherType: this.state.voucherType,
          fromSubsidiaryLedger : this.state.fromSubsidiaryLedger,
          toSubsidiaryLedger : this.state.toSubsidiaryLedger,
          accountCode:this.props.location.state.accountCode}:
          {   
          fiscalYear: this.state.selectedYear,
          fromDate: this.state.fromDate,
          toDate: this.state.toDate,
          branch: this.state.branch,
          balanceSheetColumn: this.state.balanceSheetColumn,
          fromVoucherNumber: this.state.fromVoucherNumber,
          toVoucherNumber: this.state.toVoucherNumber,
          accountBalanaceRemainType: this.state.accountBalanaceRemainType,
          costCenter: this.state.costCenter,
          exceptionCatagory: this.state.exceptionCatagory,
          voucherType: this.state.voucherType,
          fromSubsidiaryLedger : this.props.location.state.fromSubsidiaryLedger,
          toSubsidiaryLedger : this.props.location.state.toSubsidiaryLedger,
          
          }
        } />
        <Paper className={"main-paper-container subsidiary-account-book  not-aggregate"}>
          <Filter search={this.search}
            handleExpandSearchPanel={this.handleExpandSearchPanel} {...this.state}>
            <div classPage={"height-search"}>
              <Grid container spacing={8} className="no-margin">

                <Grid item md={4}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.fromSubsidiaryLedgerList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.fromSubsidiaryLedger} />
                  </div>
                </Grid>
                <Grid item md={4}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.toSubsidiaryLedgerList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.toSubsidiaryLedger} />
                  </div>
                </Grid>
                <Grid item md={4}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.generalLedgerList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.generalLedger} />
                  </div>
                </Grid>


                <Grid item md={2}>
                  <div className="k-rtl">
                    <DropDownComponent isFilterable {...this.state.fiscalYearList}
                      handleChange={(value, name) => this.handleChangeFiscalYear(value)}
                      value={this.state.selectedYear} />
                  </div>
                </Grid>
                <Grid item md={2}>
                  <PersianDatePicker selectedDate={this.state.fromDate} label="از تاریخ " handleOnChange={(e) => this.handleChangeDate(e, "fromDate")} />
                </Grid>
                <Grid item md={2}>
                  <PersianDatePicker selectedDate={this.state.toDate} label="تا تاریخ" handleOnChange={(e) => this.handleChangeDate(e, "toDate")} />
                </Grid>
                <Grid item md={2}>
                  <div className="k-rtl">
                    <DropDownComponent isFilterable {...this.state.voucherMasterStateList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.voucherMasterState} />
                  </div>
                </Grid>
                <Grid item md={2}>
                  <div className="k-rtl">
                    <DropDownComponent isFilterable {...this.state.branchList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.branch} />
                  </div>
                </Grid>
                <Grid item md={2}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.costCenterList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.costCenter} />
                  </div>
                </Grid>
                <Grid item md={2}>
                  <Input label="شماره سند از " type="number" handleChange={(e) => this.handleChange(e, 'fromVoucherNumber')} value={this.state.fromVoucherNumber} />
                </Grid>
                <Grid item md={2}>
                  <Input label="شماره سند تا" type="number" handleChange={(e) => this.handleChange(e, 'toVoucherNumber')} value={this.state.toVoucherNumber} />
                </Grid>
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
                  <Input label="مانده از " type="number" handleChange={(e) => this.handleChange(e, 'fromRemain')} value={this.state.fromRemain} />
                </Grid>
                <Grid item md={2}>
                  <Input label="مانده تا" type="number" handleChange={(e) => this.handleChange(e, 'toRemain')} value={this.state.toRemain} />
                </Grid>
                <Grid item md={4}>
                  <div className="k-rtl">
                    <MultiSelectComponent isFilterable {...this.state.voucherCategoryIncludeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.voucherCategoryInclude} />
                  </div>
                </Grid>
                <Grid item md={4}>
                  <div className="k-rtl">
                    <MultiSelectComponent isFilterable {...this.state.voucherCategoryExcludeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.voucherCategoryExclude} />
                  </div>
                </Grid>

              </Grid>
              <Grid container spacing={8} className="no-margin">
                <CheckBoxList {...this.state.exceptionCatagoryList} value={this.state.exceptionCatagory} handleChange={(value, name) => this.handleChange(value, name)} />
                <Grid item md={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.noLastTrades}
                        onChange={(e) => this.handleChangeCheck(e, 'noLastTrades', true)}
                        value="noLastTrades"
                        color="primary"
                      />
                    }
                    label="فاقد معاملات آخر"
                  />
                </Grid>
                <Grid item md={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.haveRemain}
                        onChange={(e) => this.handleChangeCheck(e, 'haveRemain', true)}
                        value="haveRemain"
                        color="primary"
                      />
                    }
                    label="با مانده دوره"
                  />
                </Grid>
              </Grid>
            </div>
          </Filter>
          <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid")}>
            <div id="subsidiary-account-book" className="height-page"></div>
            <script type="text/x-kendo-template" id="template">
              <div className="tabstrip">
                <div className="detail-account-book"></div>
              </div>
            </script>
          </div>
        </Paper>
      </React.Fragment>

    )
  }
}

export default GetSubsidiaryAccountBook;
