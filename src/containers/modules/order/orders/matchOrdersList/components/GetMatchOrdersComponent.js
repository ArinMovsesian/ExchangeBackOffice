import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetMatchOrdersColumn';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum'
import kendo from '@progress/kendo-ui';
import moment from 'moment';
import './GetMatchOrdersComponent.css';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
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
import GetMatchOrdersService from '../services/GetMatchOrdersService';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import Detail from '../../../../../../shared/components/kendoGrid/detailPanel/detailPanel';

const $ = require("jquery");
let date = new Date();
let selectedIds = [];

class GetMatchOrders extends React.Component {

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
      open: true,
      /* #region list state */

      requestCancel: false,
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
      description: '',
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
    this.handleClose = this.handleClose.bind(this);
    this.reRenderGrid = this.reRenderGrid.bind(this);
    this.search = this.search.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
    this.checkBoxSelectHandles = this.checkBoxSelectHandles.bind(this);

    /* #endregion */



  }

  componentDidMount() {
    this.getDropDownData();

  }
  /* #region get drop-Downs */

  getDropDownData() {
    this.getMatchOrderList();
  }




  handleModal() {

    this.setState({ deleteDescription: '', orderRejectionReason: { code: 0, id: '' }, deleteModal: false });

  }



  getBranchList() {
    GetBranchService.getTseBranches(response => DropDownListDataProvider(this, "branchList", response))
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

    this.setState({ customer: value.value });
  }

  search() {

    $("#match-orders-list").data("kendoGrid").dataSource.read(this);
  }
  checkBoxSelectHandles = (arg) => {

    let temp = Object.keys(arg.sender._selectedIds);


    let convertedTemp = temp.map((value) => {
      return parseInt(value, 10);
    });

    if (convertedTemp.length === 0) {
      $('#delete').attr('disabled', 'disabled');
    } else {
      $('#delete').removeAttr('disabled');
    }
    selectedIds = convertedTemp;
  };
  getMatchOrderList() {
    let self = this;

    $("#match-orders-list").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              self = option.data
            }
            var command = {
              reportFilter:self.props.location.state? self.props.location.state.stateParams.id:0,


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


            GetMatchOrdersService.getAllMatchOrderList(command, function (response) {
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
            id: 'id',
            // matchOrderId:'matchOrderId'
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
      toolbar: `
     
      <button id="delete"  disabled="true">حذف</button>${excelAndPdfToolbar}`,
      change: self.checkBoxSelectHandles,
      dataBound: function (e) {
        var scrollOffset = {
          left:10000 ,
      };
        var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
        container.scrollLeft(scrollOffset.left);
        if (this.dataSource.data().length > 0) {
          let grid = $("#match-orders-list").data("kendoGrid");
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
          $("#delete").on("click", function () {
            self.setState({
              deleteModal: true,
            })
          });
          $("#add").on("click", function (item) {



            self.props.history.push(
              {
                pathname: '/main/order/orders/addMatchOrder',
                state: {
                  stateParams: {
                    id: self.props.location.state.stateParams.id,

                    orderId:self.props.location.state.stateParams.orderId,
                    dailyOrderId:self.props.location.state.stateParams.dailyOrderId,
                    serialNumber: self.props.location.state.stateParams.serialNumber,
                    dateJalali: self.props.location.state.stateParams.dateJalali
                  }
                }

              })


          });
          $("#match-orders-list tbody tr td span.edit").on("click", function (item) {
            var grid = $("#match-orders-list").data("kendoGrid");
            var row = $(item.target).closest("tr");
            var dataItem = grid.dataItem(row);

            self.props.history.push(
              {
                pathname: '/main/order/orders/updateOrder',
                state: {
                  stateParams: {
                    selectedParty: { id: dataItem.partyId, fullName: dataItem.partyFullName },
                    selectedBranch: { title: dataItem.stationTitle, id: dataItem.stationId },
                    selectedProduct: { symbol: dataItem.symbol, fullProductName: dataItem.symbol, id: dataItem.productId },
                    orderSide: dataItem.orderSide,
                    serialNumber: dataItem.serialNumber,
                    amount: dataItem.amount.toString(),
                    maxPrice: dataItem.price.toString(),
                    minPrice: dataItem.price.toString(),
                    volume: dataItem.volume.toString(),
                    dateCondition: dataItem.validUntil !== '0001-01-01T00:00:00',
                    toDate: dataItem.validUntil,
                    description: dataItem.senderDescription,
                    id: dataItem.id,
                    priceCondition: (dataItem.price && dataItem.price > 0) || (dataItem.maxPrice && dataItem.maxPrice > 0) || (dataItem.minPrice && dataItem.minPrice > 0) ? { code: 2, title: "شرط قیمت" } : { code: 1, title: "قیمت تابلو" }

                  }
                }

              })
          });


          $("#match-orders-list tbody tr td span.delete").on("click", function (item) {
            var grid = $("#match-orders-list").data("kendoGrid");
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


          items.map((item, index) => {

            let id = items[index].uid;
            let currentRow = grid.table.find("tr[data-uid='" + id + "']");
            if (index === this.dataSource.data().length - 1 && this.dataSource.data().length > 1) {
              // console.log("index1111",index,this.dataSource.data().length - 1)
              // currentRow.css({ display: 'none', visibility: 'hidden' });

              $("#match-orders-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-amount-sum").text(kendo.toString(item.totalAmountSum, 'n0'));

              $("#match-orders-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-volume-sum").text(kendo.toString(item.totalVolumeSum, 'n0'));

              $("#match-orders-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-price-sum").text(kendo.toString(item.totalPriceeSum, 'n0'));

              $("#match-orders-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-remainingAmount-sum").text(kendo.toString(item.totalRemainingAmountSum, 'n0'));

              $("#match-orders-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-remainingVolume-sum").text(kendo.toString(item.totalRemainingVolumeSum, 'n0'));


            }
            else {
              currentRow.find(".account-code").css({ color: '#039be5', cursor: 'pointer' });
            }

          });
        };




      },
      columns: Columns()
    });
    $("#match-orders-list .excel-report").on("click", function (item) {
      self.getExcelReport();

    });
    $("#match-orders-list .pdf-report").on("click", function (item) {
      self.getPdfReport();

    });
  };




  getCommand = () => {
    var grid = $("#match-orders-list").data("kendoGrid");
    var dataSource = grid.dataSource;

    var command = {
      reportFilter: {
        requestCancel: this.state.requestCancel,
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
    GetMatchOrdersService.getExcelExport(command, 'فهرست سفارش های فعال');

  }

  getPdfReport = () => {
    var command = this.getCommand();
    // alert('pdf')
    GetMatchOrdersService.getPdfExport(command, "فهرست سفارش های فعال");

  }




  reRenderGrid() {

    var command = {
      entity: {
        securityTransactionIds: this.state.selectedId ? [this.state.selectedId] : selectedIds,
        orderId: this.props.location.state.stateParams.orderId,
        dailyOrderId: this.props.location.state.stateParams.dailyOrderId,

      },


    };
    var self = this;
    GetMatchOrdersService.deleteSecurityTransaction(command, (res) => {

      if (res.success) {

        toastr.success(res.message);
        self.search();

        if (self.state.selectedId)
          self.setState({
            selectedId: null,
            deleteModal: false
          });
        else {
          self.setState({
            deleteModal: false
          });
        }

      }
      else {
        self.setState({
          selectedId: null,
        });
      }

    })
  };
  //close modal
  handleClose = () => {
    this.setState({ deleteModal: false });
  };



  render() {
   console.log("backadd",this.props.location.state.stateParams)
    return (
      <React.Fragment>
        <Header {...this.props} routeStateParams={ {stateParams: {
                    id: this.props.location.state.stateParams.id,
                    serialNumber: this.props.location.state.stateParams.serialNumber,
                    dateJalali: this.props.location.state.stateParams.dateJalali,

                  }}}/>
        <Paper className={"main-paper-container match-orders-list fade-in"}>
          {/* <Detail openDetail={this.state.open} search={this.search}
         handleExpandDetailPanel={this.handleExpandSearchPanel} >
                               
                                    </Detail> */}
          <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid")}>
            <div id="match-orders-list" className="height-page"></div>
          </div>
        </Paper>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.deleteModal}
          onClose={this.handleClose}
        >
          <Paper style={{
            width: '600px',
            padding: '1rem .5rem ',
            height: 'auto',
            outline: 'none',
            position: 'absolute',
            boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
            backgroundColor: '#fff',
            top: '50%',
            left: '45%',
            marginLeft: '-300px',
            marginTop: '-150px',
          }}>
            <h3>
              <FaIcon color="gray" name="fa fa-trash" size={20} />
              <span style={{ marginRight: '5px' }}>حذف</span>

            </h3>
            <hr />
            <div style={{ position: 'relative' }}>

              <Grid container spacing={8} className="no-margin">
                <h3> آیا از حذف اعلامیه خرید  مطمئن هستید ؟</h3>
              </Grid>

            </div>
            <br />
            <Button variant="contained" color="secondary" style={{ backgroundColor: 'red', color: '#FFF' }} onClick={this.reRenderGrid}>
              حذف
                        </Button>
            <Button variant="contained" color="secondary" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={this.handleClose}>
              انصراف
                        </Button>
          </Paper>
        </Modal>
      </React.Fragment>

    )
  }
}

export default GetMatchOrders;

