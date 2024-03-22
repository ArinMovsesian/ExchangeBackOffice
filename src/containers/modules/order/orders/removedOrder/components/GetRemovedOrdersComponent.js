import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetRemovedOrdersColumn';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum'
import kendo from '@progress/kendo-ui';
import moment from 'moment';
import './GetRemovedOrdersComponent.css';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import GetRemovedOrdersService from '../services/GetRemovedOrdersService';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete'
import GetPartiesService from '../../../../personsAndCustomers/customers/customersList/services/GetPartiesService';
import { searchProducts } from '../../../../../../services/getProducts';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import GetAllProductsPaging from "../../../../../../services/getProducts";
import { productTemplate, productHeaderTemplate } from 'constants/autoCompleteTemplate';
import Button from "@material-ui/core/Button";
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import '@progress/kendo-ui';
import FaIcon from 'shared/components/Icon/Icon';
import Modal from "@material-ui/core/Modal";
import { excelAndPdfToolbar } from '../../../../../../constants/excelPdfToolbar';
import { Typography, CircularProgress } from '@material-ui/core';
import toastr from 'toastr';
const $ = require("jquery");
let date = new Date();
let selectedIds = [];

class GetRemovedOrders extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      /* #region filter state */
      columns: Columns(),
      endDate: new Date(),
      startDate: moment(new Date().setDate(new Date().getDate() - 2)),
      fromSerialNumber: '',
      toSerialNumber: '',
      deleteDescription: '',
      deleteId: null,
      /* #region list state */


      branchList: {
        name: "branch",
        field: "title",
        label: "شعبه معامله ",
        list: []
      },
      branch: [],
      orderStateList: {
        name: "orderState",
        field: "title",
        label: "وضعیت سفارش ",
        list: []
      },
      orderState: [],
      orderTypeList: {
        name: "orderState",
        field: "title",
        label: "جهت سفارش",
        list: []
      },
      orderType: {},
      simpleSecurityExchangeList: {
        name: "simpleSecurityExchange",
        field: "title",
        label: "نوع بازار ",
        list: []
      },
      simpleSecurityExchange: { code: 0, id: '' },

      orderRejectionReasonList: {
        name: "orderRejectionReason",
        field: "title",
        label: "دلیل حذف سفارش",
        list: []
      },
      orderRejectionReason: { code: 0, id: '' },

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

      customerList: {
        name: "customer",
        // field: "fullName",
        // list: [],
        // value:'',
        field: 'fullName',
        dataValueField: 'id',
        placeholder: 'نام نام خانوادگی کد ملی شماره شناسنامه یا نام پدر مشتری را وارد کنید'
      },

      customer: { id: 0, fullName: '' },
      modalStatus: false,


      /* #endregion */

      /* #endregion */
    };
    /* #region bind */

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.removeMultiSelectHandles = this.removeMultiSelectHandles.bind(this);
    this.addMultiSelectHandles = this.addMultiSelectHandles.bind(this);
    this.handleExpandSearchPanel = this.handleExpandSearchPanel.bind(this);
    this.handleModal = this.handleModal.bind(this);
   this.search = this.search.bind(this);

    /* #endregion */



  }

  componentDidMount() {

    this.getDropDownData();

  }
  /* #region get drop-Downs */

  getDropDownData() {
    this.getBranchList();
    this.getOrderType();
    this.getOrderRejectionReason();
    this.getOrderState();
    this.getOrderList();
  }




  handleModal() {

    this.setState({ deleteDescription: '', orderRejectionReason: { code: 0, id: '' }, deleteModal: false });

  }



  getBranchList() {
    GetBranchService.getBranchesByFilter(null, response => DropDownListDataProvider(this, "branchList", response))
  }

  getOrderType() {
    GetEnum('securityexchange', response => DropDownListDataProvider(this, "simpleSecurityExchangeList", response))

  }
  getOrderRejectionReason() {
    GetEnum('Getorderrejectionreason', response => DropDownListDataProvider(this, "orderRejectionReasonList", response))

  }
  getOrderState() {
    GetEnum('getDailyOrderState', response => DropDownListDataProvider(this, "orderStateList", response))



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
    })

  }

  handleChangeCheck = (event, name) => {
    this.setState({
      [name]: event.target.checked
    })

  };

  /* #endregion */
  removeMultiSelectHandles(event, name) {
    let list = this.state[name];

    for (let i = 0; i < this.state[name].length; i++) {
      if (event.id == this.state[name][i].id) {
        list.splice(i, 1);
      }
    }
    this.setState({
      [name]: list
    });
  }
  addMultiSelectHandles(event, name) {
    let list = this.state[name];
    list.push(event);
    this.setState({
      [name]: list
    });

  }


  handleExpandSearchPanel() {
    this.setState({
      open: !this.state.open
    })
  }

  handlePartyChange(value) {
    console.log(value)
    this.setState({ customer: value.value });
  }

  search() {
    console.log(this.state.customer);
    $("#removed-order-list").data("kendoGrid").dataSource.read(this);
  }
  checkBoxSelectHandles = (arg) => {

    let temp = Object.keys(arg.sender._selectedIds);
    // arg.sender._data.map((value) => {
    //     if(value.id == temp[0]){
    //     }
    // })
    let convertedTemp = temp.map((value) => {
      return parseInt(value, 10);
    });
    console.log(convertedTemp, arg.sender._selectedIds, temp, arg);
    if (convertedTemp.length === 0) {
      $('#delete').attr('disabled', 'disabled');
    } else {
      $('#delete').removeAttr('disabled');
    }
    selectedIds = convertedTemp;
  };
  getOrderList() {
    let self = this;

    $("#removed-order-list").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              self = option.data
            }
            var command = {
              reportFilter: {
                partyId: self.state.customer.id,
                isins: self.state.isins.length > 0 ? self.state.isins.map(i => i.isin) : [],
                orderState: self.state.orderState.length > 0 ? self.state.orderState.map(order => order.code) : [],
                orderType: self.state.simpleSecurityExchange.code,
                fromSerialNumber: self.state.fromSerialNumber !== '' ? Number(self.state.fromSerialNumber) : 0,
                toSerialNumber: self.state.toSerialNumber !== '' ? Number(self.state.toSerialNumber) : 0,
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
            GetRemovedOrdersService.getAllOrdersList(command, function (response) {
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
          model: {
            id: 'id'
          },
          data: "result",
          total: "totalRecords"

        },
        aggregate: [
          { field: "amount", aggregate: "sum" },
          { field: "volume", aggregate: "sum" },
          { field: "price", aggregate: "sum" },
          { field: "remainingAmount", aggregate: "sum" },
          { field: "remainingVolume", aggregate: "sum" },

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
      toolbar: `${excelAndPdfToolbar}`,
      change: self.checkBoxSelectHandles,
      dataBound: function (e) {
        var scrollOffset = {
          left:10000 ,
      };
        var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
        container.scrollLeft(scrollOffset.left);
        if (this.dataSource.data().length > 0) {
          let grid = $("#removed-order-list").data("kendoGrid");
          let items = grid.dataSource.view();
          let rows = grid.tbody.find("[role='row']");

          rows.unbind("click");
          rows.on("click", function (e) {
            if ($(e.target).hasClass("k-checkbox-label")) {
              return;
            }
            let row = $(e.target).closest("tr");
            let checkbox = $(row).find(".k-checkbox");
            checkbox.click();
          });
          items.map((item, index) => {
            let id = items[index].uid;
            let currentRow = grid.table.find("tr[data-uid='" + id + "']");
            if (index === this.dataSource.data().length - 1 && this.dataSource.data().length > 1) {
              // console.log("index1111",index,this.dataSource.data().length - 1)
              // currentRow.css({ display: 'none', visibility: 'hidden' });
              $("#delete").on("click", function () {
                self.setState({
                  deleteModal: true,
                })
              });
              $("#removed-order-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-amount-sum").text(kendo.toString(item.totalAmountSum, 'n0'));

              $("#removed-order-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-volume-sum").text(kendo.toString(item.totalVolumeSum, 'n0'));

              $("#removed-order-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-price-sum").text(kendo.toString(item.totalPriceeSum, 'n0'));

              $("#removed-order-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-remainingAmount-sum").text(kendo.toString(item.totalRemainingAmountSum, 'n0'));

              $("#removed-order-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-remainingVolume-sum").text(kendo.toString(item.totalRemainingVolumeSum, 'n0'));
              $("#removed-order-list tbody tr td span.edit").on("click", function (item) {
                var grid = $("#removed-order-list").data("kendoGrid");
                var row = $(item.target).closest("tr");
                var dataItem = grid.dataItem(row);
                console.log("dataItem", dataItem)
                self.props.history.push(
                  {
                    pathname: '/main/order/orders/updateOrder',
                    state: {
                      stateParams: {
                        selectedParty: { id: dataItem.partyId, fullName: dataItem.partyFullName },
                        selectedBranch: { title: dataItem.branchName, id: dataItem.branchId },
                        selectedProduct: { symbol: dataItem.symbol, fullProductName: dataItem.symbol, id: dataItem.productId },
                        orderSide: dataItem.orderSide,
                        serialNumber: dataItem.serialNumber,
                        amount: dataItem.amount,
                        maxPrice: dataItem.maxPrice,
                        minPrice: dataItem.minPrice,
                        quantity: dataItem.volume,
                        dataCondition: dataItem.dateCondition,
                        toDate: dataItem.validUntil,
                        description: dataItem.senderDescription,
                        id: dataItem.id

                      }
                    }

                  })
              });

              $("#removed-order-list tbody tr td span.delete").on("click", function (item) {
                var grid = $("#removed-order-list").data("kendoGrid");
                var row = $(item.target).closest("tr");
                var dataItem = grid.dataItem(row);

                self.setState({

                  selectedId: dataItem.id
                }, function () {
                  self.setState({
                    deleteModal: true
                  });
                })

              });

            }
            else {
              currentRow.find(".account-code").css({ color: '#039be5', cursor: 'pointer' });
            }

          });
        };




      },
      columns: Columns()
    });

    $("#removed-order-list .excel-report").on("click", function (item) {
      self.getExcelReport();
    
    });
    $("#removed-order-list .pdf-report").on("click", function (item) {
        self.getPdfReport();
       
    });

  };


 
  getCommand = () => {
        var grid = $("#removed-order-list").data("kendoGrid");
        var dataSource = grid.dataSource;

        var command = {
        reportFilter: {
          partyId: this.state.customer.id,
          isins: this.state.isins.length > 0 ? this.state.isins.map(i => i.isin) : [],
          orderState: this.state.orderState.length > 0 ? this.state.orderState.map(order => order.code) : [],
          orderType: this.state.simpleSecurityExchange.code,
          fromSerialNumber: this.state.fromSerialNumber !== '' ? Number(this.state.fromSerialNumber) : 0,
          toSerialNumber: this.state.toSerialNumber !== '' ? Number(this.state.toSerialNumber) : 0,
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
  }
  getExcelReport = () => {
      var command = this.getCommand();
      // alert('excel')
      GetRemovedOrdersService.getExcelExport(command, 'سفارش های ابطال شده');

  }

  getPdfReport = () => {
    var command = this.getCommand();
    // alert('pdf')
    GetRemovedOrdersService.getPdfExport(command, "سفارش های ابطال شده");

  }
  render() {

    return (
      <React.Fragment>
        <Header {...this.props} />
        <Paper className={"main-paper-container removed-order-list"}>
          <Filter search={this.search}
            handleExpandSearchPanel={this.handleExpandSearchPanel} {...this.state}>

            <div classPage={"height-search"}>
              <Grid container spacing={8} className="no-margin">

                <Grid item md={12}>
                  <AutoCompleteComponent {...this.state.customerList}
                    handleChange={(value) => this.handlePartyChange(value)}
                    value={this.state.customer.fullName}
                    service={GetPartiesService.getAllPartyForAutocomplete} />
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
                    <ComboBoxComponent isFilterable {...this.state.simpleSecurityExchangeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.simpleSecurityExchange} />
                  </div>
                </Grid>
                <Grid item md={2}>
                  <Input label="از شماره سریال " type="number" handleChange={(e) => this.handleChange(e, 'fromSerialNumber')} value={this.state.fromSerialNumber} />
                </Grid>
                <Grid item md={2}>
                  <Input label="تا سند سریال " type="number" handleChange={(e) => this.handleChange(e, 'toSerialNumber')} value={this.state.toSerialNumber} />
                </Grid>
             

         








              </Grid>
            </div>

          </Filter>
          <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid")}>
            <div id="removed-order-list" className="height-page"></div>
          </div>
        </Paper>
    
      </React.Fragment>
              
    )
  }

}

export default GetRemovedOrders;

