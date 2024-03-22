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
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import GetVoucherType from '../../../accountingBase/voucherType/services/GetVoucherTypeService';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetFiscalYearsService from '../../../accountingBase/fiscalYear/services/GetFiscalYearsService'
import GetVoucherTypeService from '../../../accountingBase/voucherType/services/GetVoucherTypeService';
import GetEnum from 'services/getEnum'
import moment from 'moment';
import GetDetailAccountBookService from '../services/GetDetailAccountBookService';
import CheckBoxList from '../../../../../../shared/components/checkBoxList/checkBoxList';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './GetDetailAccountBookComponent.css';
import { detailLedgerTemplate, detailLedgerHeaderTemplate } from '../../../../../../constants/autoCompleteTemplate';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import GetSubsidiaryLedgerService from '../../../accountingBase/subsidaryLedger/services/GetSubsidiaryLedgerService';
import GetDetailLedgerService from '../../../accountingBase/detailLedger/services/GetDetailLedgerService';
import { GetDropDownElement } from '../../../../../../core/getMultiSelectElement';
import GetGeneralLedgerService from '../../../accountingBase/generalLedger/services/GetGeneralLedgerService'
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import { excelAndPdfToolbar } from '../../../../../../constants/excelPdfToolbar';
const $ = require("jquery");

class GetDetailAccountBook extends React.Component {
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
      voucherType: this.props.location.state && this.props.location.state.voucherType ? this.props.location.state.voucherType : [],
      mainClassId: this.props.location.state && this.props.location.state.mainClassId ? this.props.location.state.mainClassId : {id:0},
      accountBalanaceRemainType: this.props.location.state && this.props.location.state.accountBalanaceRemainType ? this.props.location.state.accountBalanaceRemainType : { id: 0 },
      reRender: false,
      submitType: '',
      reRenderGrid: false,
      selectedDetailLedger: { id: 0 },
      toDate: this.props.location.state && this.props.location.state.toDate ? this.props.location.state.toDate : moment(new Date),
      fromDate: this.props.location.state && this.props.location.state.fromDate ? this.props.location.state.fromDate : moment(new Date),
      fromSubsidiaryLedger:this.props.location.state && this.props.location.state.fromSubsidiaryLedger ? this.props.location.state.fromSubsidiaryLedger :{ id: 0 },
      toSubsidiaryLedger:this.props.location.state && this.props.location.state.toSubsidiaryLedger ? this.props.location.state.toSubsidiaryLedger :{ id: 0 },
      columns: MainColumns(),
      branch: this.props.location.state && this.props.location.state.branch ? this.props.location.state.branch : { id: 0 },
      selectedSubmitType: { code: 0 },
      selectedYear: this.props.location.state && this.props.location.state.fiscalYear ? this.props.location.state.fiscalYear : { code: 0 },
      voucherMastrerState: { code: 0 },
      fromGeneralLedger: this.props.location.state && this.props.location.state.fromGeneralLedgerCode ? this.props.location.state.fromGeneralLedgerCode : { code: '' },
      fromDetailLedger: this.props.location.state && this.props.location.state.fromDetailLedger ? this.props.location.state.fromDetailLedger : { id: 0 },
      toDetailLedger: this.props.location.state && this.props.location.state.toDetailLedger ? this.props.location.state.toDetailLedger : { id: 0 },
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

      fromSubsidiaryLedgerList: {
        name: "fromSubsidiaryLedger",
        field: "fullTitle",
        label: " از حساب معین",
        list: []
      },
      toSubsidiaryLedgerList: {
        name: "toSubsidiaryLedger",
        field: "fullTitle",
        label: " تا حساب معین",
        list: []
      },
      fromGeneralLedgerList: {
        name: "fromGeneralLedger",
        field: "fullTitle",
        label: " از حساب کل",
        list: []
      },
      toGeneralLedgerList: {
        name: "fromGeneralLedger",
        field: "fullTitle",
        label: " تا حساب کل ",
        list: []
      },
      exceptionCatagory: this.props.location.state && this.props.location.state.exceptionCatagory ? this.props.location.state.exceptionCatagory : [],
      exceptionCatagoryList: {
        name: "exceptionCatagory",
        field: "code",
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
      voucherCategoryExclude: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleLoadingFiscalYear = this.handleLoadingFiscalYear.bind(this);
    this.handleExpandSearchPanel = this.handleExpandSearchPanel.bind(this);
    this.successGetFiscalYears = this.successGetFiscalYears.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
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
    GetSubsidiaryLedgerService.getsubsidiaryledgers(defaultCommand, (response) => {
      DropDownListDataProvider(this, "fromSubsidiaryLedgerList", response);
      DropDownListDataProvider(this, "toSubsidiaryLedgerList", response);
      GetDropDownElement(this, this.props.location.state, 'fromSubsidiaryLedgerCode', 'fromSubsidiaryLedger', response);
      this.setState({ reRenderGrid: true })
    });
    GetVoucherTypeService(null, (response) => DropDownListDataProvider(this, "voucherType", response));
    GetEnum("vouchermasterstate", (response) => DropDownListDataProvider(this, "voucherMasterStateList", response))
    GetGeneralLedgerService.getGeneralLedgers(defaultCommand, (response) => {
      DropDownListDataProvider(this, "fromGeneralLedgerList", response);
      DropDownListDataProvider(this, "toGeneralLedgerList", response);
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
        selectedYear: this.props.location.state.fiscalYear,
        fromDate: this.props.location.state.fromDate,
        toDate: this.props.location.state.toDate,
        fiscalYearList: {
          name: "selectedYear",
          feild: "title",
          label: "سال مالی ",
          list: response.result
        }
        
      },function () {
        this.getDetailAccountBooks();}
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
        this.getDetailAccountBooks();
      })
    }
   
    }
  }
  getCommand = () => {
    var grid = $("#subsidiary-account-book").data("kendoGrid");
    var dataSource = grid.dataSource;

    var command = {
      reportFilter: {
        fromDetailLedgerId: this.state.fromDetailLedger ? this.state.fromDetailLedger.id : 0,
        toDetailLedgerId: this.state.toDetailLedger ? this.state.toDetailLedger.id : 0,
        description: this.state.description,
        noLastTrades: this.state.noLastTrades,
        branchId: this.state.branch ? this.state.branch.id : '',
        fiscalYearId: this.state.selectedYear.id,
        fromVoucherId: this.state.fromVoucherNumber,
        toVoucherId: this.state.toVoucherNumber,
        voucherCategoryExceptions: [...this.state.exceptionCatagory, ...this.state.voucherCategoryExclude.map((vc) => { return vc.code })],
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
        }
        // subsidiaryLedgerId: e.data.subsidiaryLedgerId
      },
  
      OptionalFilter: {
        page: dataSource ? dataSource.page() : 1,
        take: dataSource ? dataSource.pageSize() : 50,
        // take: option.data.take ? option.data.take : 50,
        sort: dataSource && dataSource.sort()? dataSource.sort() :
          [{
            field: "detailLedgerCode",
            dir: "asc"
          }]
      }

    }

    return command;
  }
  getExcelReport = () => {
    var command = this.getCommand();
    GetDetailAccountBookService.getExcelExport(command,'subsidiary-account-book');
  }
  getPdfReport() {
    // var command = this.getCommand();
    // GetGeneralLedgerService.getPdfExport(command, function (response) {
    // });
  }
  getDetailAccountBooks() {
    let self = this;
    $("#detail-account-book-grid").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              self = option.data
            }
            let command = {
              reportFilter: {
                fromDetailLedgerId: self.state.fromDetailLedger ? self.state.fromDetailLedger.id : 0,
                toDetailLedgerId: self.state.toDetailLedger ? self.state.toDetailLedger.id : 0,
                description: self.state.description,
                noLastTrades: self.state.noLastTrades,
                branchId: self.state.branch ? self.state.branch.id : '',
                fiscalYearId: self.state.selectedYear.id,
                fromVoucherId: self.state.fromVoucherNumber,
                toVoucherId: self.state.toVoucherNumber,
                voucherCategoryExceptions: [...self.state.exceptionCatagory, ...self.state.voucherCategoryExclude.map((vc) => { return vc.code })],
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
                    field: "detailLedgerCode",
                    dir: "asc"
                  }]
              }
            }
            GetDetailAccountBookService.getDetailAccountBooks(command, function (response) {
              if (response.result && response.result.length > 0) {
                response.result.map(item => {
                  item.detail = {
                    result: item.resultList,
                    totalRecords: item.totalRecords
                  };
                  // item.resultList.push({
                  //   totalCreditSum: item.totalCreditSum,
                  //   totalDebitSum: item.totalDebitSum,
                  //   totalRemainSum: item.totalRemainSum
                  // })
                  item.detailLedgerId = item.resultList[0].detailLedgerId
                });
              } else {
                response.result = []
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
        $("#detail-account-book-grid .excel-report").on("click", function () {
          self.getExcelReport();
          // alert('exel')
        });
        $("#detail-account-book-grid .pdf-report").on("click", function () {
          self.getPdfReport();
          // alert('pdf')
        });
      },
      detailTemplate: kendo.template($("#template").html()),
      detailInit: function (e) {
        let detailRow = e.detailRow;
        detailRow.find(".detail-ledger-account-book").kendoGrid({
          dataSource: {
            transport: {
              read: function (option) {
                if (e.data.isFirst) {
                  e.data.isFirst = false;
                  option.success(e.data.detail)
                } else {
                  console.log(e,option)
                  let command = {
                    reportFilter: {
                      fromDetailLedgerId: self.state.fromDetailLedger ? self.state.fromDetailLedger.id : 0,
                      toDetailLedgerId: self.state.toDetailLedger ? self.state.toDetailLedger.id : 0,
                      description: self.state.description,
                      noLastTrades: self.state.noLastTrades,
                      branchId: self.state.branch ? self.state.branch.id : '',
                      fiscalYearId: self.state.selectedYear.id,
                      fromVoucherId: self.state.fromVoucherNumber,
                      toVoucherId: self.state.toVoucherNumber,
                      voucherCategoryExceptions: [...self.state.exceptionCatagory, ...self.state.voucherCategoryExclude.map((vc) => { return vc.code })],
                      fromCredit: self.state.fromCredit,
                      toCredit: self.state.toCredit,
                      fromDebit: self.state.fromDebit,
                      toDebit: self.state.toDebit,
                      fromRemain: self.state.fromRemain,
                      toRemain: self.state.toRemain,
                      voucherMasterState: self.state.voucherMasterState,
                      haveRemain: self.state.haveRemain,
                      subsidiaryLedgerId:e.data.subsidiaryLedgerId,
                      costCenterId: self.state.costCenter ? self.state.costCenter.id : '',
                      dateFilter: {
                        startDate: self.state.fromDate,
                        endDate: self.state.toDate
                      },
                      detailLedgerId: e.data.detailLedgerId
                    },
                    OptionalFilter: {
                      page: option.data.page,
                      take: option.data.take,
                      sort: option.data.sort

                    }
                  }

                  GetDetailAccountBookService.getSpecificDetailAccountBooks(command, (response) => {
                   
                    option.success(response);
                  })
                }

              }
            },
            pageSize: 1000,
            sort: {
              field: "detailLedgerCode",
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
          scrollable: false,
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
         
            let mainGrid = $("#detail-account-book-grid").data("kendoGrid");
            let mainItems = mainGrid.dataSource.view();
            let list = this.dataSource.data();
            let mainId = "";
            mainItems.map((item, index) => {
              if (list[0].fullDetailLedgerTitle === item.masterTitle) {
                mainId = mainItems[index].uid;
              }
            });
            if (this.dataSource.data().length > 0) {
              let grid = $(".detail-ledger-account-book").data("kendoGrid");
              let items = this.dataSource.data();
              items.map((item, index) => {
                let id = items[index].uid;
                let currentRow = grid.table.find("tr[data-uid='" + id + "']");
                if (index === this.dataSource.data().length - 1 ) {
                  currentRow.css({ display: 'none', visibility: 'hidden' });
                  currentRow.find(".detail-account-book-class").css({ color: '#039be5', cursor: 'pointer' });
                 
                  $("#detail-account-book-grid .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-ledger-account-book .k-grid-footer " +
                    "tr td div.total-debit-sum").text(kendo.toString(item.totalDebitSum, 'n0'));
              

                  $("#detail-account-book-grid .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-ledger-account-book .k-grid-footer " +
                    "tr td div.total-credit-sum").text(kendo.toString(item.totalCreditSum, 'n0'));
                
                  if(item.totalRemainSum>=0)
                  $("#detail-account-book-grid .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-ledger-account-book .k-grid-footer " +
                    "tr td div.total-remain-sum").text(kendo.toString(item.totalRemainSum, 'n0'));
                    else{
                      $("#detail-account-book-grid .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-ledger-account-book .k-grid-footer " +
                      "tr td div.total-remain-sum red-color").text(kendo.toString(item.totalRemainSum, 'n0'));
                    }
                }
              });
            };
          },
          columns: [
            {
              title: "تاریخ",
              width: "70px",
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
     

        if (this.dataSource.data().length > 0) {
          let grid = $("#detail-account-book-grid").data("kendoGrid");
          let items = grid.dataSource.view();
          items.map((item, index) => {
            item.isFirst = true;
          });
        }

        var grid = $("#detail-account-book-grid").data("kendoGrid");
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
    // $("#detail-account-book-grid").data("kendoGrid").dataSource.read(this);
    if($("#detail-account-book-grid").data("kendoGrid")!==undefined)
    $("#detail-account-book-grid").data("kendoGrid").dataSource.read(this);
    else{
      this.getFiscalYears();
     
    }
  }
  render() {
    return (
      <React.Fragment>
        {/* <Header  {...this.props} browserBack={this.props.location.state ? this.props.location.state.browserBack === true : false} /> */}
        <Header {...this.props} backParams={
         this.props.location.state &&  this.props.location.state.accountCode!==undefined ? {   
          fiscalYear: this.state.selectedYear,
          fromDate: this.state.fromDate,
          toDate: this.state.toDate,
          branch: this.state.branch,
          mainClassId:this.state.mainClassId,
          balanceSheetColumn: this.state.balanceSheetColumn,
          fromVoucherNumber: this.state.fromVoucherNumber,
          toVoucherNumber: this.state.toVoucherNumber,
          accountBalanaceRemainType: this.state.accountBalanaceRemainType,
          costCenter: this.state.costCenter,
          exceptionCatagory: this.state.exceptionCatagory,
          voucherType: this.state.voucherType,
          fromSubsidiaryLedgerCode : this.state.fromSubsidiaryLedger,
          toSubsidiaryLedgerCode : this.state.toSubsidiaryLedger,
          accountCode:this.props.location.state.accountCode}:
          {   
          fiscalYear: this.state.selectedYear,
          fromDate: this.state.fromDate,
          toDate: this.state.toDate,
          mainClassId:this.state.mainClassId,

          branch: this.state.branch,
          balanceSheetColumn: this.state.balanceSheetColumn,
          fromVoucherNumber: this.state.fromVoucherNumber,
          toVoucherNumber: this.state.toVoucherNumber,
          accountBalanaceRemainType: this.state.accountBalanaceRemainType,
          costCenter: this.state.costCenter,
          exceptionCatagory: this.state.exceptionCatagory,
          voucherType: this.state.voucherType,
          fromSubsidiaryLedgerCode : this.state.fromSubsidiaryLedger,
          toSubsidiaryLedgerCode : this.state.toSubsidiaryLedger,
          
          }
        } />
        <Paper className={"main-paper-container detail-account-book-class not-aggregate"}>
          <Filter search={this.search}
            handleExpandSearchPanel={this.handleExpandSearchPanel} {...this.state}>
            <div classPage={"height-search"}>

              <Grid container spacing={8} className="no-margin">
                <Grid item md={6}>

                  <div className="k-rtl">
                    <AutoCompleteComponent
                      handleChange={(value) => this.handleChange(value, "fromDetailLedger")}
                      headerTemplate={detailLedgerHeaderTemplate}
                      fieldSearch={"searchPhrase"}
                      field="fullTitle"
                      template={detailLedgerTemplate}
                      value={this.state.fromDetailLedger.fullTitle}
                      label="از حساب تفصیلی"
                      placeholder="کد حسساب یا کد تفصیل را وارد کنید"
                      service={GetDetailLedgerService.getDetailLedgersForAutoComplete} />
                  </div>
                </Grid>
                <Grid item md={6}>

                  <div className="k-rtl">
                    <AutoCompleteComponent
                      handleChange={(value) => this.handleChange(value, "toDetailLedger")}
                      headerTemplate={detailLedgerHeaderTemplate}
                      fieldSearch={"searchPhrase"}
                      field="fullTitle"
                      template={detailLedgerTemplate}
                      value={this.state.toDetailLedger.fullTitle}
                      label="تا حساب تفصیلی"
                      placeholder="کد حسساب یا کد تفصیل را وارد کنید"
                      service={GetDetailLedgerService.getDetailLedgersForAutoComplete} />
                  </div>
                </Grid>
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
                <Grid item md={2}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.fromGeneralLedgerList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.fromGeneralLedger} />
                  </div>
                </Grid>
                <Grid item md={2}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.toGeneralLedgerList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.toGeneralLedger} />
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
            <div id="detail-account-book-grid" className="height-page"></div>
            <script type="text/x-kendo-template" id="template">
              <div className="tabstrip">
                <div className="detail-ledger-account-book"></div>
              </div>
            </script>
          </div>
        </Paper>
      </React.Fragment>

    )
  }
}

export default GetDetailAccountBook;
