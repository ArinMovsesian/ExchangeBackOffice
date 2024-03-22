import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum'
import moment from 'moment';
import './GetTradeNumberComponent.css';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete'
import GetPartiesService from '../../../../personsAndCustomers/customers/customersList/services/GetPartiesService';
import GetTradeNumberService from '../services/GetTradeNumberService';
import Columns from '../constants/GetTradeNumberColumn';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import MenuItem from '@material-ui/core/MenuItem';
import '@progress/kendo-ui';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import kendo from '@progress/kendo-ui';
import UpdateTradeNumber from './updateFee/UpdateTradeNumberComponent';
import { connect } from "react-redux";
import AssignRightAcceptance from './assignRightAcceptance/AssignRightAcceptanceComponent';
import { excelAndPdfToolbar } from 'constants/excelPdfToolbar';
const $ = require("jquery");
class GetTradeNumberComponent extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      open:false,
      openUpdateFee:false,
      openAssignRightAcceptance:false,
      dataItem:{},
      /* #region filter state */
      date: new Date(),

   
      /* #region list state */
      
      response:{},
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
        field: "title",
        label: "نمادها",
        list: []
      },
      isins: { code: 0, id: '' },

      sectorList: {
        name: "sector",
        field: "title",
        label: "صنعت",
        list: []
      },
     
      sector: { code: 0, id: '' },
      feeEditTypeList: {
        name: "feeEditType",
        field: "title",
        label: "ویرایش موارد مشابه",
        list: []
      },



      /* #endregion */

      /* #endregion */
    }
    /* #region bind */
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleExpandSearchPanel = this.handleExpandSearchPanel.bind(this);

    /* #endregion */



  }

  componentDidMount() {
    this.getDropDownData();
    this.getTradeNumberList();

  }

  componentDidUpdate(prevProps,prevState){
    if(this.props.setUpdateRow!==prevProps.setUpdateRow){
    this.getTradeNumberList();

    }
  }
  /* #region get drop-Downs */

  getDropDownData() {
    this.getTransactionStateList();
    this.getSecurityTransactionTypeList();
    this.getSecurityTransactionTypeList();
   this.getBranchList();
   this.getFeeEditType();
  }



  getTransactionStateList() {
    GetEnum('transactionstatus', response => DropDownListDataProvider(this, "transactionStateList", response))
  }

  getFeeEditType(){
    GetEnum("getfeeedittype",response=>DropDownListDataProvider(this,"feeEditTypeList",response));
  }
  getSecurityTransactionTypeList() {
    GetEnum('simplesecuritytransactiontype', response => DropDownListDataProvider(this, "securityTransactionTypeList", response))
  }
  
  getBranchList() {
    GetBranchService.getBranchesByFilter(null, response => DropDownListDataProvider(this, "branchList", response))
  }


  /* #endregion */


  /* #region handle change filters */

  handleChange(value, name) {
    let item = value.value;

    this.setState({

      [name]: item
    })
  }

  handleChangeDate(value, name) {
    this.setState({
      [name]: value
    });


  }

  handleExpandSearchPanel() {
    this.setState({
      open: !this.state.open
    })
  }

  setCloseModal(name){

    this.setState({[name]:false},function(){
      
    })
  }
  
  search() {
    $("#trades-number-list").data("kendoGrid").dataSource.read(this);
  }


  getTradeNumberList() {
    let self = this;

    $("#trades-number-list").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              self = option.data
            }
            console.log("self.state.branch",self.state.branch)
            var command = {
              reportFilter: {
                

                  date: self.state.date,
                  branches:self.state.branch.length>0? self.state.branch.map(b=>b.id):[],
                  transactionStatuses: self.state.transactionState && self.state.transactionState.length>0 ?self.state.transactionState.map((t)=>t.code):[],
                  securityTransactionType: self.state.securityTransactionType?self.state.securityTransactionType.code:''
                
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
            GetTradeNumberService.getAllTradeNumber(command, function (response) {
              if(response.success)
              self.setState({response:response})
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
          let grid = $("#trades-number-list").data("kendoGrid");
          let items = grid.dataSource.view();
          items.map((item, index) => {
            let id = items[index].uid;
            let currentRow = grid.table.find("tr[data-uid='" + id + "']");
            if (index === this.dataSource.data().length - 1) {
              currentRow.css({ display: 'none', visibility: 'hidden' });

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-volume-sum").text(kendo.toString(self.state.totalVolume, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-price-sum").text(kendo.toString(self.state.totalPrice, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-value-sum").text(kendo.toString(self.state.totalValue, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-brokerFee-sum").text(kendo.toString(self.state.totalBrokerFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-realFee-sum").text(kendo.toString(self.state.totalRealFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-csdFee-sum").text(kendo.toString(self.state.totalCsdFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-tseFee-sum").text(kendo.toString(self.state.totalTseFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-seoFee-sum").text(kendo.toString(self.state.totalSeoFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-tseTmcFee-sum").text(kendo.toString(self.state.totalTseTmcFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-rightToAccessFee-sum").text(kendo.toString(self.state.totalRightToAccessFeeFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-tax-sum").text(kendo.toString(self.state.totalCsdFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-totalFee-sum").text(kendo.toString(self.state.totalTotalFee, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-discountPercentage-sum").text(kendo.toString(self.state.totalDiscountPercentage, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-discount-sum").text(kendo.toString(self.state.totalDiscount, 'n0'));

              $("#trades-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-netAmount-sum").text(kendo.toString(self.state.totalNetAmount, 'n0'));


            } else {
              currentRow.find(".account-code").css({ color: '#039be5', cursor: 'pointer' });
            }
          });
        };
        $("#trades-number-list tbody tr td div.text-center div.dropdown div.dropdown-menu span.updateFee").on("click", function (item) {
          var grid = $("#trades-number-list").data("kendoGrid");
          var row = $(item.target).closest("tr");
          var dataItem = grid.dataItem(row);
          self.setState({openUpdateFee:true,dataItem:{id:dataItem.id}});
         
        });
        $("#trades-number-list tbody tr td div.text-center div.dropdown div.dropdown-menu span.assignRightAcceptance").on("click", function (item) {
          var grid = $("#trades-number-list").data("kendoGrid");
          var row = $(item.target).closest("tr");
          var dataItem = grid.dataItem(row);
          self.setState({openAssignRightAcceptance:true,dataItem:{id:dataItem.id}});
         
        });



      },
      columns: Columns()
    });

    $("#trades-number-list .excel-report").on("click", function (item) {
      self.getExcelReport();
    });
    $("#trades-number-list .pdf-report").on("click", function (item) {
      self.getPdfReport();
    });

  };
  /* #endregion */
  getCommand = () => {
    var grid = $("#trades-number-list").data("kendoGrid");
    var dataSource = grid.dataSource;

    var command = {
      reportFilter: {
        
        date: this.state.date,
        branches:this.state.branch.length>0? this.state.branch.map(b=>b.id):[],
        transactionStatuses: this.state.transactionState && this.state.transactionState.length>0 ?this.state.transactionState.map((t)=>t.code):[],
        securityTransactionType: this.state.securityTransactionType?this.state.securityTransactionType.code:''
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
  }
  getExcelReport = () => {
      var command = this.getCommand();
      // alert('excel')
      GetTradeNumberService.getExcelExport(command, 'اعلامیه خریدو فروش');
  }
  getPdfReport = () => {
    var command = this.getCommand();
    // alert('excel')
    GetTradeNumberService.getPdfExport(command, 'اعلامیه خریدو فروش');
  }
  render() {

    return (
      <React.Fragment>
        <Header {...this.props} />
        <Paper className={"main-paper-container trade-number"}>
          {/* <GridServer
            {...this.props}
            {...this.state}
            sort={[
              {
                field: "date",
                dir: "desc"
              }
            ]}
 
            
            reloadColumnAfterGet={true}
            service={GetTradeNumberService.getAllTradeNumber}
            Columns={Columns}
            reportFilter={
              {

                date: this.state.date,
                branches: this.state.branch,
                transactionStatuses: this.state.transactionState && this.state.transactionState.length>0 ?this.state.transactionState.map((t)=>t.code):[],
                securityTransactionType: this.state.securityTransactionType?this.state.securityTransactionType.code:''
              }
            }
            callServiceAgain={true}
            reRender
            classHeightOpenPanel={"height-open-grid"}
          > */}
            <Filter search={this.search}
            handleExpandSearchPanel={this.handleExpandSearchPanel}
            {...this.state}>
            <div classPage={"height-search"}>
              <Grid container spacing={8} className="no-margin">

                <Grid item md={2}>
                  <PersianDatePicker selectedDate={this.state.date} label="تاریخ " handleOnChange={(e) => this.handleChangeDate(e, "date")} />
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
                    <ComboBoxComponent isFilterable {...this.state.securityTransactionTypeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.securityTransactionType} />

                  </div>
                </Grid>

                <Grid item md={6}>
                  <div className="k-rtl">
                    <MultiSelectComponent isFilterable {...this.state.branchList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.branch} />
                  </div>
                </Grid>
              </Grid>
            </div>
            </Filter>
          {/* </GridServer> */}
          <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid")}>
            <div id="trades-number-list" className="height-page"></div>
          </div>
        </Paper>

        <UpdateTradeNumber dataItem={this.state.dataItem} feeEditTypeList={this.state.feeEditTypeList} open={this.state.openUpdateFee} setCloseModal={(e)=>this.setCloseModal("openUpdateFee",e)}/>
        <AssignRightAcceptance dataItem={this.state.dataItem} feeEditTypeList={this.state.feeEditTypeList} open={this.state.openAssignRightAcceptance} setCloseModal={(e)=>this.setCloseModal("openAssignRightAcceptance",e)}/>
      </React.Fragment>

    )
  }
}

const mapStateToProps = state => {

  return {
   
      setUpdateRow:state.setUpdateRow
  };
};

/*<-------------------connect------------->*/
const GetTradeNumber = connect(mapStateToProps)(GetTradeNumberComponent);



export default GetTradeNumber;
