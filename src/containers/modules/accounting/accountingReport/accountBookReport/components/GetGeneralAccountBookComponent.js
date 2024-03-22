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
import GetGeneralAccountBookService from '../services/GetGeneralAccountBookService';
import './GetGeneralAccountBookComponent.css';
import { GetDropDownElement } from '../../../../../../core/getMultiSelectElement';
import GetGeneralLedgerService from '../../../accountingBase/generalLedger/services/GetGeneralLedgerService'
import CheckBoxList from '../../../../../../shared/components/checkBoxList/checkBoxList';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import GetCostCentersService from '../../../accountingBase/costCenter/services/GetCostCentersService';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import { excelAndPdfToolbar } from '../../../../../../constants/excelPdfToolbar';
const $ = require("jquery");

class GetGeneralAccountBook extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fromVoucherNumber: this.props.location.state && this.props.location.state.fromVoucherNumber ? this.props.location.state.fromVoucherNumber : 0,
      toVoucherNumber: this.props.location.state && this.props.location.state.toVoucherNumber ? this.props.location.state.toVoucherNumber : 0,
      accountBalanaceRemainType:this.props.location.state && this.props.location.state.accountBalanaceRemainType ? this.props.location.state.accountBalanaceRemainType: 1,

      toDebit: 0,
      fromDebit: 0,
      toRemain: 0,
      fromRemain: 0,
      fromCredit: 0,
      toCredit: 0,
      voucherMasterId: 0,
      open: false,
      haveRemain: false,
      submitType: '',
      columns: MainColumns(),
      fromDate: this.props.location.state && this.props.location.state.fromDate ? this.props.location.state.fromDate : moment(new Date),
      toDate: this.props.location.state && this.props.location.state.toDate ? this.props.location.state.toDate : moment(new Date),
      selectedSubmitType: { code: 0 },
      voucherMastrerState: { code: 0 },
      noLastTrades: false,
      branch: this.props.location.state && this.props.location.state.branch ? this.props.location.state.branch : { id: 0 },
      branchList: {
        name: "branch",
        feild: "title",
        label: "شعبه",
        list: []
      },
      selectedYear: this.props.location.state && this.props.location.state.fiscalYear ? this.props.location.state.fiscalYear : { code: 0 },
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
      fromGeneralLedger: this.props.location.state && this.props.location.state.fromGeneralLedger ? this.props.location.state.fromGeneralLedger : { id: 0 },
      fromGeneralLedgerList: {
        name: "fromGeneralLedger",
        field: "fullTitle",
        label: "کد کل از",
        list: []
      },
      toGeneralLedger: this.props.location.state && this.props.location.state.toGeneralLedger ? this.props.location.state.toGeneralLedger : { id: 0 },
      toGeneralLedgerList: {
        name: "toGeneralLedger",
        field: "fullTitle",
        label: "کد کل تا",
        list: []
      },
      exceptionCatagory: this.props.location.state && this.props.location.state.exceptionCatagory ? this.props.location.state.exceptionCatagory : [],
      exceptionCatagoryList: {
        name: "exceptionCatagory",
        field:"code",
        list: []


      },
      costCenter: this.props.location.state && this.props.location.state.costCenter ? this.props.location.state.costCenter : { code: 0, title: '' },
      costCenterList: {
        name: "costCenter",
        label: "مرکز هزینه",
        field: "title",
        list: []
      },
      voucherCategoryInclude: this.props.location.state && this.props.location.state.voucherType ? this.props.location.state.voucherType : [],
      voucherCategoryIncludeList: {
        name: "voucherCategoryInclude",
        label: "شامل نوع سند",
        field: "title",
        list: []
      },
      voucherCategoryExclude: [],
      voucherCategoryExcludeList: {
        name: "voucherCategoryExclude",
        label: "فاقد نوع سند",
        field: "title",
        list: []
      }
    }


    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
    this.handleLoadingFiscalYear = this.handleLoadingFiscalYear.bind(this);
    this.successGetFiscalYears = this.successGetFiscalYears.bind(this);
    this.handleExpandSearchPanel = this.handleExpandSearchPanel.bind(this);
    this.getGeneralLedgers = this.getGeneralLedgers.bind(this);
    this.getFiscalYears = this.getFiscalYears.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.getFiscalYears();
    this.getDropDownData();

  }
  getDropDownData() {

    GetBranchService.getBranchesByFilter(null, (response) => DropDownListDataProvider(this, "branchList", response));
    GetEnum("getexceptioncategory", (response) => DropDownListDataProvider(this, "exceptionCatagoryList", response));
    GetCostCentersService.getCostCenters(null, (response) => {
      DropDownListDataProvider(this, "costCenterList", response);
    })
    // GetVoucherTypeService(null, (response) => DropDownListDataProvider(this, "voucherType", response));
    GetEnum("vouchermasterstate", (response) => DropDownListDataProvider(this, "voucherMasterStateList", response))
    GetVoucherTypeService(null, (response) => DropDownListDataProvider(this, "voucherCategoryIncludeList", response));
    GetVoucherTypeService(null, (response) => DropDownListDataProvider(this, "voucherCategoryExcludeList", response));
  }

  getFiscalYears() {
    GetFiscalYearsService.getFiscalYears(null, this.successGetFiscalYears);
  }

  getGeneralLedgers() {
    GetGeneralLedgerService.getGeneralLedgers(null, (response) => {
      if (response.success) {
        this.getGeneralAccountBook();
       
            this.setState({
              fromGeneralLedgerList: {
                name: "fromGeneralLedger",
                field: "fullTitle",
                label: "کد کل از",
                list: response.result
              },
              toGeneralLedgerList: {
                name: "toGeneralLedger",
                field: "fullTitle",
                label: "کد کل تا",
                list: response.result
              }
            })
       

      }

    })
  }
  successGetFiscalYears(response) {
    if (response.success) {
      if(!this.props.location.state){
        this.setState({
          selectedYear: response.result[1],
          fromDate: response.result[1].startDate,
          toDate: response.result[1].endDate,
          fiscalYearList: {
            name: "selectedYear",
            feild: "title",
            label: "سال مالی ",
            list: response.result
          }
        })
      }
      this.getGeneralLedgers();;
    }
  }
  getCommand = () => {
    var grid = $("#general-account-book").data("kendoGrid");
    var dataSource = grid.dataSource;

    var command = {
      reportFilter: {
        fromGeneralLedgerId: this.state.fromGeneralLedger ? this.state.fromGeneralLedger.id : 0,
        toGeneralLedgerId: this.state.toGeneralLedger ? this.state.toGeneralLedger.id : 0,
        description: this.state.description,
        noLastTrades: true,
        branchId: this.state.branch ? this.state.branch.id : '',
        fiscalYearId: this.state.selectedYear.id,
        fromVoucherId: this.state.fromVoucherNumber,
        toVoucherId: this.state.toVoucherNumber,
        voucherCategoryExceptions: [...this.state.exceptionCatagory, ...this.state.voucherCategoryExclude.map((vc) => { return vc.code })],
        // voucherCategoryExceptions: [...self.state.voucherCategoryExclude.map((vc) => { return vc.code })],
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
        // generalLedgerId: e.data.generalLedgerId
      },
  
      OptionalFilter: {
        page: dataSource ? dataSource.page() : 1,
        take: dataSource ? dataSource.pageSize() : 50,
        // take: option.data.take ? option.data.take : 50,
        sort: dataSource && dataSource.sort()? dataSource.sort() :
          [{
            field: "generalLedgerCode",
            dir: "asc"
          }]
      }

    }

    return command;
  }
  getExcelReport = () => {
  
    var command = this.getCommand();
    GetGeneralAccountBookService.getExcelExport(command,'general-account-book');

  }
  getPdfReport = () => {
    // var command = this.getCommand();
    // GetGeneralLedgerService.getPdfExport(command, function (response) {
    // });
  }
  getGeneralAccountBook() {
    let self = this;
    $("#general-account-book").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              self = option.data
            }
            let command = {
              reportFilter: {
                fromGeneralLedgerId: self.state.fromGeneralLedger ? self.state.fromGeneralLedger.id : 0,
                toGeneralLedgerId: self.state.toGeneralLedger ? self.state.toGeneralLedger.id : 0,
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
                }
              },
              OptionalFilter: {
                page: option.data.page ? option.data.page : 1,
                take: option.data.take ? option.data.take : 50,
                sort: option.data.sort ? option.data.sort :
                  [{
                    field: "generalLedgerCode",
                    dir: "asc"
                  }]
              }
            }
            GetGeneralAccountBookService.getGeneralAccountBooks(command, function (response) {
              if (response.result && response.result.length > 0) {
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
                  item.generalLedgerId = item.resultList[0].generalLedgerId
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
      toolbar: excelAndPdfToolbar,
      noRecords: {
        template: ' <p class="no-data">رکوردی جهت نمایش وجود ندارد.</p>'
      },
      dataBound: function () {
        $("#general-account-book .excel-report").on("click", function () {
          self.getExcelReport();
          // alert('exel')
        });
        $("#general-account-book .pdf-report").on("click", function () {
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
                      fromGeneralLedgerId: self.state.fromGeneralLedger ? self.state.fromGeneralLedger.id : 0,
                      toGeneralLedgerId: self.state.toGeneralLedger ? self.state.toGeneralLedger.id : 0,
                      description: self.state.description,
                      noLastTrades: true,
                      branchId: self.state.branch ? self.state.branch.id : '',
                      fiscalYearId: self.state.selectedYear.id,
                      fromVoucherId: self.state.fromVoucherNumber,
                      toVoucherId: self.state.toVoucherNumber,
                      voucherCategoryExceptions: [...self.state.exceptionCatagory, ...self.state.voucherCategoryExclude.map((vc) => { return vc.code })],
                      // voucherCategoryExceptions: [...self.state.voucherCategoryExclude.map((vc) => { return vc.code })],
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
                      generalLedgerId: e.data.generalLedgerId
                    },
                    OptionalFilter: {
                      page: option.data.page,
                      take: option.data.take,
                      sort: option.data.sort

                    }
                  }

                  GetGeneralAccountBookService.getspecificgeneralaccountbooks(command, (response) => {
                    option.success(response);
                  })
                }

              }
            },
            pageSize: 1000,
            sort: {
              field: "generalLedgerCode",
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
          //   var scrollOffset = {
          //     left:10000 ,
          // };
          //   var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
          //   container.scrollLeft(scrollOffset.left);
            let mainGrid = $("#general-account-book").data("kendoGrid");
            let mainItems = mainGrid.dataSource.view();
            let list = this.dataSource.data();
            let mainId = "";
            mainItems.map((item, index) => {
              if (list[0].fullGeneralLedgerTitle === item.masterTitle) {
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

                  $("#general-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                    "tr td div.total-debit-sum").text(kendo.toString(item.totalDebitSum, 'n0'));

                  $("#general-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                    "tr td div.total-credit-sum").text(kendo.toString(item.totalCreditSum, 'n0'));

                    if(item.totalRemainSum>=0)
                    $("#general-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                    "tr td div.total-remain-sum").text(kendo.toString(item.totalRemainSum, 'n0')
                    );
                      else{
                        $("#general-account-book .k-grid-content tr[data-uid='" + mainId + "'] + tr.k-detail-row .detail-account-book .k-grid-footer " +
                    "tr td div.total-remain-sum red-color").text(kendo.toString(item.totalRemainSum, 'n0')
                    );
                      }
            



                }
              });
            };
            $("#general-account-book .excel-report").on("click", function () {
              self.getExcelReport();
     
            });
            $("#general-account-book .pdf-report").on("click", function () {
              self.getPdfReport();
            });
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
              // attributes: { class: "text-left" },
              // template: '#if(data.remain>=0){#' +
              // '<b>#= Math.abs(data.remain).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b>#}' +
              // 'else {#' +
              // '<b class="red-color">(#= Math.abs(data.remain).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b>#}#',
              footerTemplate: '#if(sum>=0){#' +
              '<div class="text-left"><b  class="text-left">#= Math.abs(sum).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b></div>#}' +
              'else {#' +
              '<div class="text-left"><b class="red-color">(#= Math.abs(sum).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b></div>#}#'+
              '<div class="total-remain-sum text-left"></div>',
              // footerTemplate: '#if(sum>=0){#' +
              // '<b  class="text-left">#= Math.abs(sum).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b>#}' +
              // 'else {#' +
              // '<b class="red-color">(#= Math.abs(sum).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b>#}#',

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
          let grid = $("#general-account-book").data("kendoGrid");
          let items = grid.dataSource.view();
          items.map((item, index) => {
            item.isFirst = true;
          });
        }

        var grid = $("#general-account-book").data("kendoGrid");
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

  handleChangeCheck = (event, name) => {
    this.setState({
      [name]: event.target.checked
    })

  };


  handleChangeFiscalYear(value) {
    let item = value.value;
    this.setState({
      selectedYear: item,
      fromDate: item.startDate,
      toDate: item.endDate,
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

  search() {
    // $("#general-account-book").data("kendoGrid").dataSource.read(this);
    if($("#general-account-book").data("kendoGrid")!==undefined)
    $("#general-account-book").data("kendoGrid").dataSource.read(this);
    else{
      this.getFiscalYears();
     
    }
  }
  render() {
    return (
      <React.Fragment>
        {/* <Header  {...this.props} browserBack={this.props.location.state ? this.props.location.state.browserBack === true : false} /> */}
        <Header {...this.props} backParams={
     this.props.location.state===undefined ?undefined:      {   
            // backButton: { path: this.props.path, title: this.props.title },
          fiscalYear: this.state.selectedYear,
          fromDate: this.state.fromDate,
          toDate: this.state.toDate,
          branch: this.state.branch,
          balanceSheetColumnType: this.state.balanceSheetColumnType,
          fromVoucherNumber: this.state.fromVoucherNumber,
          toVoucherNumber: this.state.toVoucherNumber,
          accountBalanaceRemainType: this.state.accountBalanaceRemainType,
          costCenter: this.state.costCenter,
          exceptionCatagory: this.state.exceptionCatagory,
          voucherType: this.state.voucherCategoryInclude,
          
          }
        } />
        <Paper className={"main-paper-container general-account-book not-aggregate"}>
          <Filter search={this.search}
            handleExpandSearchPanel={this.handleExpandSearchPanel} {...this.state}>
            <div classPage={"height-search"}>
              <Grid container spacing={8} className="no-margin">
                <Grid item md={3}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.fromGeneralLedgerList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.fromGeneralLedger} />
                  </div>
                </Grid>
                <Grid item md={3}>
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
                <Grid item md={6}>
                  <Input label="شرح ردیف سند" handleChange={(e) => this.handleChange(e, 'description')} value={this.state.description} />
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
            <div id="general-account-book" className="height-page"></div>
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

export default GetGeneralAccountBook;
