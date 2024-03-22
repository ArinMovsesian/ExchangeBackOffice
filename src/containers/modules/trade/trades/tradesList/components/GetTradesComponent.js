import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetTradesColumn';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum'
import kendo from '@progress/kendo-ui';

import moment from 'moment';
import './GetTradesComponent.css';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import GetTradesService from '../services/GetTradesService';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete'
import GetPartiesService from '../../../../personsAndCustomers/customers/customersList/services/GetPartiesService';
import { GetAllSectors } from '../../../../../../services/getSectors';
import { searchProducts } from '../../../../../../services/getProducts';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import GetAllProductsPaging from "../../../../../../services/getProducts";
import { productTemplate, productHeaderTemplate } from 'constants/autoCompleteTemplate';
import { excelAndPdfToolbar } from 'constants/excelPdfToolbar';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import '@progress/kendo-ui';

const $ = require("jquery");

class GetTrades extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      /* #region filter state */
      startDate: new Date(),
      response:{},
      columns: Columns(),
      endDate: new Date(),
      isMinimumWage: false,
      isMaximumWage: false,
      dailyAggregate: true,
      open: false,
      /* #region list state */

      transactionStateList: {
        name: "transactionState",
        field: "title",
        label: "وضعیت معامله ",
        list: []
      },
      transactionState: [],
      securityTransactionTypeList: {
        name: "securityTransactionType",
        field: "title",
        label: "نوع معامله ",
        list: []
      },
      securityTransactionType: { code: 0, id: '' },
      partyTypeList: {
        name: "partyType",
        field: "title",
        label: "نوع مشتری ",
        list: []
      },
      partyType: { code: 0, id: '' },
      simpleSecurityExchangeList: {
        name: "simpleSecurityExchange",
        field: "title",
        label: "نوع بازار ",
        list: []
      },
      simpleSecurityExchange: { code: 0, id: '' },
      productTypeList: {
        name: "productType",
        field: "title",
        label: "نوع زیر بازار ",
        list: []
      },
      productType: { code: 0, id: '' },
      branchList: {
        name: "branch",
        field: "title",
        label: "شعبه معامله ",
        list: []
      },
      branch: [],
      isinsList: {
        name: "isins",
        // field: "title",
        placeholder: 'جستجوی نماد',
        dataTextField: 'symbol',
        dataValueField: 'id',
        fieldSearch: 'phrase',
        template: productTemplate,
        headerTemplate: productHeaderTemplate
        // list: []
      },
      isins: [],

      sectorList: {
        name: "sector",
        field: "title",
        label: "صنعت",
        list: []
      },
      sector: { code: 0, id: '' },


      customerList: {
        name: "customers",
        // field: "fullName",
        // list: [],
        // value:'',
        dataTextField: 'fullName',
        dataValueField: 'id',
        placeholder: 'نام نام خانوادگی کد ملی شماره شناسنامه یا نام پدر مشتری را وارد کنید'
      },

      customers: []
     
    };
   



  }

  componentDidMount() {
    GetEnum('transactionstatus', response => DropDownListDataProvider(this, "transactionStateList", response));
    GetEnum('simplesecuritytransactiontype', response => DropDownListDataProvider(this, "securityTransactionTypeList", response));
    GetEnum('partytype', response => DropDownListDataProvider(this, "partyTypeList", response));
    GetEnum('securityexchange', response => DropDownListDataProvider(this, "simpleSecurityExchangeList", response));
    GetEnum('producttype', response => DropDownListDataProvider(this, "productTypeList", response));
    GetBranchService.getBranchesByFilter(null, response => DropDownListDataProvider(this, "branchList", response));
    GetAllSectors(null, response => DropDownListDataProvider(this, "sectorList", response));
    this.getDropDownData();

  }
    


  
  getTransactionStateList() {
    GetEnum('transactionstatus', response => DropDownListDataProvider(this, "transactionStateList", response))
  }

  getSecurityTransactionTypeList() {
    GetEnum('simplesecuritytransactiontype', response => DropDownListDataProvider(this, "securityTransactionTypeList", response))
  }

  getPartyTypeList() {
    GetEnum('partytype', response => DropDownListDataProvider(this, "partyTypeList", response))
  }

  getSimpleSecurityExchangeList() {
    GetEnum('securityexchange', response => DropDownListDataProvider(this, "simpleSecurityExchangeList", response))
  }

  getProductTypeList() {
    GetEnum('producttype', response => DropDownListDataProvider(this, "productTypeList", response))
  }

  getBranchList() {
    GetBranchService.getBranchesByFilter(null, response => DropDownListDataProvider(this, "branchList", response))
  }
  getSectors() {
    GetAllSectors(null, response => DropDownListDataProvider(this, "sectorList", response))
  }

  
  /* #region get drop-Downs */

  getDropDownData() {
    this.getTransactionStateList();
    this.getSecurityTransactionTypeList();
    this.getPartyTypeList();
    this.getSimpleSecurityExchangeList();
    this.getSecurityTransactionTypeList();
    this.getProductTypeList();
    this.getBranchList();
    this.getSectors();
    this.getTradeList();
  }

 

  /* #endregion */


  /* #region handle change filters */

  handleChange = (value, name) => {
    let item = value.value;
    this.setState({
      [name]: item
    })
  }
  handleChangeDate = (value, name) => {

    this.setState({
      [name]: value
    })

  }
  handleChangeCheck = (event, name) => {
    this.setState({
      [name]: event.target.checked
    })

  };

  /* #endregion */
  removeMultiSelectHandles = (event, name) => {
    let list = this.state[name];

    for (let i = 0; i < this.state[name].length; i++) {
      if (event.id == this.state[name][i].id) {
        list.splice(i, 1);
      }
    }
    this.setState({
      [name]: list
    });
    console.log('remove in parent', event);
  };
  addMultiSelectHandles = (event, name) => {
    let list = this.state[name];
    list.push(event);
    this.setState({
      [name]: list
    });

  };
  handleExpandSearchPanel = () => {
    this.setState({
      open: !this.state.open
    })
  };
  search = () =>{
    $("#trades-list").data("kendoGrid").dataSource.read(this);
  };
  getTradeList = () => {
    let self = this;

    $("#trades-list").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              self = option.data
            }
            var command = {
              reportFilter: {
                securityTransactionType: self.state.securityTransactionType ? self.state.securityTransactionType.code : 0,
                partyType: self.state.partyType ? self.state.partyType.code : 0,
                transactionStatuses: self.state.transactionState && self.state.transactionState.length > 0 ? self.state.transactionState.map(t => t.code) : [],
                simpleSecurityExchange: self.state.simpleSecurityExchange ? self.state.simpleSecurityExchange.code : 0,
                productType: self.state.productType ? self.state.productType.code : 0,
                sectors:self.state.sector && self.state.sector.id !=='' ?[self.state.sector.id] : [],
                branches: self.state.branch && self.state.branch.length > 0 ? self.state.branch.map(b => b.id) : [],
                customers: self.state.customers ? self.state.customers.map(c => c.id) : [],
                isins: self.state.isins && self.state.isins.length > 0 ? self.state.isins.map((isin) => isin.isin) : [],
                isMinimumWage: self.state.isMinimumWage,
                isMaximumWage: self.state.isMaximumWage,
                dailyAggregate: self.state.dailyAggregate,
                dateFilter: {
                  startDate: self.state.startDate,
                  endDate: self.state.endDate
                },
              },
              OptionalFilter: {
                page: option.data.page ? option.data.page : 1,
                take: option.data.take ? option.data.take : 50,
                sort: option.data.sort ? option.data.sort :
                  [{
                    field: "date",
                    dir: "asc"
                  }]
              }
            }
            GetTradesService.getAllTradesList(command, function (response) {
              if(response.success){
                console.log("response",response)
                self.setState({response:response})

              }
             option.success(response)
            })
          }
        },

        pageSize: 50,
        sort: {
          field: "date",
          dir: "asc"
        },
        serverPaging: true,
        serverSorting: true,
        schema: {
          data: "result",
          total: "totalRecords"

        },
        aggregate: [
          { field: "volume", aggregate: "sum" },
          { field: "price", aggregate: "sum" },
          { field: "value", aggregate: "sum" },
          { field: "brokerFee", aggregate: "sum" },
          { field: "realFee", aggregate: "sum" },
          { field: "csdFee", aggregate: "sum" },
          { field: "tseFee", aggregate: "sum" },
          { field: "seoFee", aggregate: "sum" },
          { field: "tseTmcFee", aggregate: "sum" },
          { field: "rightToAccessFee", aggregate: "sum" },
          { field: "tax", aggregate: "sum" },
          { field: "totalFee", aggregate: "sum" },
          { field: "discountPercentage", aggregate: "sum" },
          { field: "discount", aggregate: "sum" },
          { field: "netAmount", aggregate: "sum" }
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
      noRecords: {
        template: ' <p class="orange-page font-size-2 no-data">رکوردی جهت نمایش وجود ندارد.</p>'
      },
      toolbar: excelAndPdfToolbar,
      dataBound: function (e) {
        if (this.dataSource.data().length > 0) {
          console.log("trades-list")
          let grid = $("#trades-list").data("kendoGrid");
          let items = grid.dataSource.view();
          items.map((item, index) => {
            let id = item.uid;
            let currentRow = grid.table.find("tr[data-uid='" + id + "']");
            if (index === this.dataSource.data().length - 1) {
              // currentRow.css({ display: 'none', visibility: 'hidden' });
              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-volume-sum").text(kendo.toString(self.state.response.totalVolume, 'n0'));
              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-price-sum").text(kendo.toString(self.state.response.totalPrice, 'n0'));
              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-value-sum").text(kendo.toString(self.state.response.totalValue, 'n0'));
          
              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-brokerFee-sum").text(kendo.toString(self.state.response.totalBrokerFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-realFee-sum").text(kendo.toString(self.state.response.totalRealFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-csdFee-sum").text(kendo.toString(self.state.response.totalCsdFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-tseFee-sum").text(kendo.toString(self.state.response.totalTseFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-seoFee-sum").text(kendo.toString(self.state.response.totalSeoFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-tseTmcFee-sum").text(kendo.toString(self.state.response.totalTseTmcFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-rightToAccessFee-sum").text(kendo.toString(self.state.response.totalRightToAccessFeeFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-tax-sum").text(kendo.toString(self.state.response.totalCsdFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-totalFee-sum").text(kendo.toString(self.state.response.totalTotalFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-discountPercentage-sum").text(kendo.toString(self.state.response.totalDiscountPercentage, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-discount-sum").text(kendo.toString(self.state.response.totalDiscountSum, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-netAmount-sum").text(kendo.toString(self.state.response.totalNetAmount, 'n0'));
            } else {
              currentRow.find(".account-code").css({ color: '#039be5', cursor: 'pointer' });
            }

          });
        };
        

      },
      columns: self.state.columns
      
    });
    $("#trades-list .excel-report").on("click", function (item) {
      self.getExcelReport();
    });
    $("#trades-list .pdf-report").on("click", function (item) {
        self.getPdfReport();
    });
  };
  getCommand = () => {
    var grid = $("#trades-list").data("kendoGrid");
    var dataSource = grid.dataSource;

    var command = {
      reportFilter: {
        securityTransactionType: this.state.securityTransactionType ? this.state.securityTransactionType.code : 0,
        partyType: this.state.partyType ? this.state.partyType.code : 0,
        transactionStatuses: this.state.transactionState && this.state.transactionState.length > 0 ? this.state.transactionState.map(t => t.code) : [],
        simpleSecurityExchange: this.state.simpleSecurityExchange ? this.state.simpleSecurityExchange.code : 0,
        productType: this.state.productType ? this.state.productType.code : 0,
        sectors:this.state.sector && this.state.sector.id !=='' ?[this.state.sector.id] : [],
        branches: this.state.branch && this.state.branch.length > 0 ? this.state.branch.map(b => b.id) : [],
        customers: this.state.customers ? this.state.customers.map(c => c.id) : [],
        isins: this.state.isins && this.state.isins.length > 0 ? this.state.isins.map((isin) => isin.isin) : [],
        isMinimumWage: this.state.isMinimumWage,
        isMaximumWage: this.state.isMaximumWage,
        dailyAggregate: this.state.dailyAggregate,
        dateFilter: {
          startDate: this.state.startDate,
          endDate: this.state.endDate
        },
      },
      OptionalFilter: {
        page: dataSource ? dataSource.page() : 1,
        take: dataSource ? dataSource.pageSize() : 50,
        // take: option.data.take ? option.data.take : 50,
        sort: dataSource ? dataSource.sort() :
          [{
            field: "date",
            dir: "asc"
          }]
      }
    }
    return command;
  };
  getExcelReport = () => {
      var command = this.getCommand();
      // alert('excel')
      GetTradesService.getExcelExport(command, 'معاملات');
  };


  getPdfReport = () => {
    var command = this.getCommand();
    // alert('pdf')
    GetTradesService.getPdfExport(command, "معاملات");

  }
  render() {

    return (
      <React.Fragment>
        <Header {...this.props} />
        <Paper className={"main-paper-container trades-list"}>
          <Filter search={this.search} handleExpandSearchPanel={this.handleExpandSearchPanel} {...this.state}>
            <div classPage={"height-search"}>
              <Grid container spacing={8} className="no-margin">
                <Grid item md={12}>
                  <MultiSelectAutoCompleteComponent
                    {...this.state.customerList}
                    handleChange={(value) => this.addMultiSelectHandles(value, 'customers')}
                    handleRemoveItem={(value) => this.removeMultiSelectHandles(value, 'customers')}
                    service={GetPartiesService.getAllPartyForAutocomplete}
                    defaultValue={this.state.customers.map((c) => { return { fullName: c.fullName, id: c.id } })}
                  />
                  <MultiSelectAutoCompleteComponent
                    {...this.state.isinsList}
                    handleChange={(value) => this.addMultiSelectHandles(value, "isins")}
                    handleRemoveItem={(value) => this.removeMultiSelectHandles(value, 'isins')}
                    service={GetAllProductsPaging.getAllProductsPagingMethod}
                    defaultValue={this.state.isins.map((c) => { return { symbol: c.symbol, id: c.id } })}
                  />
                </Grid>
                <Grid item md={2}>
                  <PersianDatePicker selectedDate={this.state.startDate} label="از تاریخ " handleOnChange={(e) => this.handleChangeDate(e, "startDate")} />
                </Grid>
                <Grid item md={2}>
                  <PersianDatePicker selectedDate={this.state.endDate} label="تا تاریخ" handleOnChange={(e) => this.handleChangeDate(e, "endDate")} />
                </Grid>
                <Grid item md={2}>
                  <div className="k-rtl">
                    <MultiSelectComponent isFilterable {...this.state.transactionStateList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.transactionState} />
                  </div>
                </Grid>
                <Grid item md={2}>
                  <div className="k-rtl">
                    <DropDownComponent isFilterable {...this.state.securityTransactionTypeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.securityTransactionType} />

                  </div>
                </Grid>
                <Grid item md={2}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.simpleSecurityExchangeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.simpleSecurityExchange} />
                  </div>
                </Grid>
                <Grid item md={2}>
                  <div className="k-rtl">
                    <ComboBoxComponent
                      isFilterable
                      {...this.state.productTypeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.productType} />
                  </div>
                </Grid>
                <Grid item md={3}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.sectorList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.sector} />
                  </div>
                </Grid>
                <Grid item md={7}>
                  <div className="k-rtl">
                    <MultiSelectComponent isFilterable {...this.state.branchList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.branch} />
                  </div>
                </Grid>
                <Grid item md={2}>
                  <div className="k-rtl">
                    <DropDownComponent isFilterable {...this.state.partyTypeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.partyType} />

                  </div>
                </Grid>
                <Grid item md={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.isMinimumWage}
                        onChange={(e) => this.handleChangeCheck(e, 'isMinimumWage')}
                        value="isMinimumWage"
                        color="primary"
                      />
                    }
                    label="حداقل کارمزد"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.isMaximumWage}
                        onChange={(e) => this.handleChangeCheck(e, 'isMaximumWage')}
                        value="isMaximumWage"
                        color="primary"
                      />
                    }
                    label="حداکثر کارمزد"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.dailyAggregate}
                        onChange={(e) => this.handleChangeCheck(e, 'dailyAggregate')}
                        value="dailyAggregate"
                        color="primary"
                      />
                    }
                    label="تجمیع روزانه"
                  />
                </Grid>
              </Grid>
            </div>
          </Filter>
          <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid")}>
            <div id="trades-list" className="height-page"></div>
          </div>
        </Paper>
      </React.Fragment>

    )
  }
}

export default GetTrades;
