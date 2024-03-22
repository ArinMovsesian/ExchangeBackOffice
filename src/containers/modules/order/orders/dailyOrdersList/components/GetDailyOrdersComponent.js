import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetDailyOrdersColumn';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum'
import kendo from '@progress/kendo-ui';
import moment from 'moment';
import './GetDailyOrdersComponent.css';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import GetDailyOrdersService from '../services/GetDailyOrdersService';
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

class GetDailyOrders extends React.Component {

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
        name: "orderType",
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

    $("#orders-daily-list").data("kendoGrid").dataSource.read(this);
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

    if (convertedTemp.length === 0) {
      $('#delete').attr('disabled', 'disabled');
      $('#add').attr('disabled', 'disabled');
    }
    else {
      $('#delete').removeAttr('disabled');
      $('#add').removeAttr('disabled');
    }
    selectedIds = convertedTemp;
  };
  getOrderList() {
    let self = this;

    $("#orders-daily-list").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              self = option.data
            }
            var command = {
              reportFilter: {
                requestCancel: self.state.requestCancel,
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
            GetDailyOrdersService.getAllOrdersList(command, function (response) {
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
      toolbar: `
     
      <button id="delete"  disabled="true">ابطال</button>${excelAndPdfToolbar}`,
      change: self.checkBoxSelectHandles,
      dataBound: function (e) {
        var scrollOffset = {
          left:10000 ,
      };
        var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
        container.scrollLeft(scrollOffset.left);
        if (this.dataSource.data().length > 0) {
          let grid = $("#orders-daily-list").data("kendoGrid");
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
          $("#orders-daily-list tbody tr td span.edit").on("click", function (item) {
            var grid = $("#orders-daily-list").data("kendoGrid");
            var row = $(item.target).closest("tr");
            var dataItem = grid.dataItem(row);
            console.log("dataItem", dataItem.validUntil !== '0001-01-01T00:00:00')
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

          $("#orders-daily-list tbody tr td span.delete").on("click", function (item) {
            var grid = $("#orders-daily-list").data("kendoGrid");
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

              $("#orders-daily-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-amount-sum").text(kendo.toString(item.totalAmountSum, 'n0'));

              $("#orders-daily-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-volume-sum").text(kendo.toString(item.totalVolumeSum, 'n0'));

              $("#orders-daily-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-price-sum").text(kendo.toString(item.totalPriceeSum, 'n0'));

              $("#orders-daily-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-remainingAmount-sum").text(kendo.toString(item.totalRemainingAmountSum, 'n0'));

              $("#orders-daily-list .k-grid-footer .k-grid-footer-wrap " +
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
    $("#orders-daily-list .excel-report").on("click", function (item) {
      self.getExcelReport();

    });
    $("#orders-daily-list .pdf-report").on("click", function (item) {
      self.getPdfReport();

    });
  };




  getCommand = () => {
    var grid = $("#orders-daily-list").data("kendoGrid");
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
    GetDailyOrdersService.getExcelExport(command, 'فهرست سفارش های فعال');

  }

  getPdfReport = () => {
    var command = this.getCommand();
    // alert('pdf')
    GetDailyOrdersService.getPdfExport(command, "فهرست سفارش های فعال");

  }




  reRenderGrid() {
    console.log(this.state.selectedId);
    var command = {
      entity: {
        orderIds: this.state.selectedId ? [this.state.selectedId] : selectedIds,
        OrderRejectionReason: this.state.orderRejectionReason.code,
        description: this.state.orderRejectionReason.code === 9 ? this.state.description : null
      }
    };
    var self = this;
    GetDailyOrdersService.deleteOrder(command, (res) => {

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

    return (
      <React.Fragment>
        <Header {...this.props} />
        <Paper className={"main-paper-container orders-daily-list"}>
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
                <Grid item md={2}>
                  <FormControlLabel
                    style={{ marginTop: 14 }}
                    control={
                      <Checkbox
                        checked={this.state.requestCancel}
                        onChange={(value) => this.handleChangeCheck(value, 'requestCancel')}
                        value="requestCancel"
                        color="primary"

                      />
                    }
                    label="درخواست انصراف مشتری"
                  />
                </Grid>
                <Grid item md={12}>
                  <div className="k-rtl">
                    <MultiSelectComponent isFilterable {...this.state.orderStateList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.orderState} />
                  </div>
                </Grid>

                {/* <Grid item md={7}>
                  <div className="k-rtl">
                    <MultiSelectComponent isFilterable {...this.state.branchList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.branch} />
                  </div>
                </Grid> */}








              </Grid>
            </div>

          </Filter>
          <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid")}>
            <div id="orders-daily-list" className="height-page"></div>
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
                <Grid item md={11}>
                  <div className="k-rtl">
                    <DropDownComponent {...this.state.orderRejectionReasonList}
                      handleChange={(value) => this.handleChange(value, 'orderRejectionReason')} isFilterable={false}
                      value={this.state.orderRejectionReason} required />
                  </div>
                </Grid>
                {
                  this.state.orderRejectionReason.code === 9 ?
                    <Grid item md={11}>
                      <Input isMultiLine label=" توضیحات مشتری" textArea handleChange={(e) => this.handleChange(e, 'description')}
                        value={this.state.description} />
                    </Grid>
                    : ''
                }
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

export default GetDailyOrders;


// class GetDailyOrders extends React.Component {

//   constructor(props) {
//     super(props)

//     this.state = {
//       /* #region filter state */
//       endDate: new Date(),
//       startDate:moment(new Date().setDate(new Date().getDate() - 2)),
//       columns: Columns(),
//       // endDate: new Date(),
//       fromSerialNumber:'',
//       toSerialNumber:'',

//       /* #region list state */


//       branchList: {
//         name: "branch",
//         field: "title",
//         label: "شعبه معامله ",
//         list: []
//       },
//       branch: [],
//       orderStateList: {
//         name: "orderState",
//         field: "title",
//         label: "وضعیت سفارش ",
//         list: []
//       },
//       orderState: [],
//       orderTypeList: {
//         name: "orderState",
//         field: "title",
//         label: "جهت سفارش",
//         list: []
//       },
//       orderType: {},
//       simpleSecurityExchangeList: {
//         name: "simpleSecurityExchange",
//         field: "title",
//         label: "نوع بازار ",
//         list: []
//       },
//       simpleSecurityExchange: { code: 0, id: '' },

//       isinsList: {
//         name: "isins",
//         // field: "title",
//         placeholder: 'جستجوی نماد',
//         dataTextField: 'symbol',
//         dataValueField: 'id',
//         fieldSearch: 'phrase',
//         template: productTemplate,
//         headerTemplate: productHeaderTemplate
//         // list: []
//       },
//       isins: [],

//       customerList: {
//         name: "customer",
//         // field: "fullName",
//         // list: [],
//         // value:'',
//         field: 'fullName',
//         dataValueField: 'id',
//         placeholder: 'نام نام خانوادگی کد ملی شماره شناسنامه یا نام پدر مشتری را وارد کنید'
//       },

//       customer: {id:0,fullName:''},
//       modalStatus: false,


//       /* #endregion */

//       /* #endregion */
//     };
//     /* #region bind */

//     this.handleChange = this.handleChange.bind(this);
//     this.handleChangeDate = this.handleChangeDate.bind(this);
//     this.removeMultiSelectHandles = this.removeMultiSelectHandles.bind(this);
//     this.addMultiSelectHandles = this.addMultiSelectHandles.bind(this);
//     this.handleExpandSearchPanel = this.handleExpandSearchPanel.bind(this);

//     /* #endregion */



//   }

//   componentDidMount() {

//     this.getDropDownData();

//   }
//   /* #region get drop-Downs */

//   getDropDownData() {
//     this.getBranchList();
//     this.getOrderType();
//     this.getOrderState();
//     this.getOrderList();
//   }








//   getBranchList() {
//     GetBranchService.getBranchesByFilter(null, response => DropDownListDataProvider(this, "branchList", response))
//   }

//   getOrderType() {
//     GetEnum('securityexchange', response => DropDownListDataProvider(this, "simpleSecurityExchangeList", response))

//   }

//   getOrderState(){
//     GetEnum('getOrderState', response => DropDownListDataProvider(this, "orderStateList", response))



//   }




//   /* #endregion */


//   /* #region handle change filters */

//   handleChange(value, name) {
//     let item = value.value;
//     this.setState({
//       [name]: item
//     })
//   }
//   handleChangeDate(value, name) {

//     this.setState({
//       [name]: value
//     })

//   }

//   handleChangeCheck = (event, name) => {
//     this.setState({
//       [name]: event.target.checked
//     })

//   };

//   /* #endregion */
//   removeMultiSelectHandles(event, name) {
//     let list = this.state[name];

//     for (let i = 0; i < this.state[name].length; i++) {
//       if (event.id == this.state[name][i].id) {
//         list.splice(i, 1);
//       }
//     }
//     this.setState({
//       [name]: list
//     });
//   }
//   addMultiSelectHandles(event, name) {
//     let list = this.state[name];
//     list.push(event);
//     this.setState({
//       [name]: list
//     });

//   }


//   handleExpandSearchPanel() {
//     this.setState({
//       open: !this.state.open
//     })
//   }

//   handlePartyChange(value) {
//     console.log(value)
//     this.setState({ customer: value.value });
// }

//   search() {
//     $("#orders-daily-list").data("kendoGrid").dataSource.read(this);
//   }

//   getOrderList() {
//     let self = this;

//     $("#orders-daily-list").kendoGrid({
//       dataSource: {
//         transport: {
//           read: function (option) {
//             if (option.data.state) {
//               self = option.data
//             }
//             var command = {
//               reportFilter: {
//                 partyId:self.state.customer.id,
//                 isins:self.state.isins.length>0?self.state.isins.map(i=>i.isin):[],
//                 orderState:self.state.orderState.length>0?self.state.orderState.map(order=>order.code):[],
//                 orderType:self.state.simpleSecurityExchange.code,
//                 fromSerialNumber:self.state.fromSerialNumber!=='' ?Number(self.state.fromSerialNumber):0,
//                 toSerialNumber:self.state.toSerialNumber!=='' ?Number(self.state.toSerialNumber):0,
//                 dateFilter: {
//                   startDate: self.state.startDate,
//                   endDate: self.state.endDate
//                 },

//               },
//               OptionalFilter: {
//                 page: option.data.page ? option.data.page : 1,
//                 take: option.data.take ? option.data.take : 50,
//                 sort: option.data.sort ? option.data.sort :
//                   [{
//                     field: "date",
//                     dir: "asc"
//                   }]
//               }
//             }
//             GetDailyOrdersService.getAllOrdersList(command, function (response) {
//               option.success(response)
//             })
//           }
//         },

//         pageSize: 50,
//         sort: {
//           field: "date",
//           dir: "asc"
//         },
//         serverPaging: true,
//         serverSorting: true,
//         schema: {
//           data: "result",
//           total: "totalRecords"

//         },
//         aggregate: [
//           { field: "amount", aggregate: "sum" },
//           { field: "volume", aggregate: "sum" },
//           { field: "price", aggregate: "sum" },
//           { field: "remainingAmount", aggregate: "sum" },
//           { field: "remainingVolume", aggregate: "sum" },

//         ]
//       },

//       autoBind: true,
//       sortable: {
//         allowUnsort: false
//       },
//       resizable: true,
//       reorderable: true,
//       navigatable: false,
//       columnMenu: {
//         messages: {
//           sortAscending: "صعودی",
//           sortDescending: "نزولی",
//           columns: "ستون ها"
//         }
//       },
//       pageable: {
//         pageSizes: [50, 150, 200],
//         buttonCount: 5,
//         messages: {
//           itemsPerPage: "تعداد سطر در هر صفحه",
//           display: "{0} - {1} از {2} مورد",
//           empty: ""
//         }
//       },
//       allowCopy: true,
//       noRecords: {
//         template: ' <p class="orange-page font-size-2 no-data">رکوردی جهت نمایش وجود ندارد.</p>'
//       },
//       dataBound: function (e) {
//         if (this.dataSource.data().length > 0) {
//           let grid = $("#orders-daily-list").data("kendoGrid");
//           let items = grid.dataSource.view();
//           items.map((item, index) => {
//             let id = items[index].uid;
//             let currentRow = grid.table.find("tr[data-uid='" + id + "']");
//             if (index === this.dataSource.data().length - 1 && this.dataSource.data().length>1) {
//               // console.log("index1111",index,this.dataSource.data().length - 1)
//               // currentRow.css({ display: 'none', visibility: 'hidden' });

//               $("#orders-daily-list .k-grid-footer .k-grid-footer-wrap " +
//                 "tbody tr td div.total-amount-sum").text(kendo.toString(item.totalAmountSum, 'n0'));

//               $("#orders-daily-list .k-grid-footer .k-grid-footer-wrap " +
//                 "tbody tr td div.total-volume-sum").text(kendo.toString(item.totalVolumeSum, 'n0'));

//               $("#orders-daily-list .k-grid-footer .k-grid-footer-wrap " +
//                 "tbody tr td div.total-price-sum").text(kendo.toString(item.totalPriceeSum, 'n0'));

//               $("#orders-daily-list .k-grid-footer .k-grid-footer-wrap " +
//                 "tbody tr td div.total-remainingAmount-sum").text(kendo.toString(item.totalRemainingAmountSum, 'n0'));

//               $("#orders-daily-list .k-grid-footer .k-grid-footer-wrap " +
//                 "tbody tr td div.total-remainingVolume-sum").text(kendo.toString(item.totalRemainingVolumeSum, 'n0'));
//                 $("#orders-daily-list tbody tr td span.edit").on("click", function (item) {
//                   var grid = $("#orders-daily-list").data("kendoGrid");
//                   var row = $(item.target).closest("tr");
//                   var dataItem = grid.dataItem(row);

//                   self.props.history.push(
//                       {
//                           pathname: '/main/accounting/report/addVouchers',
//                           state: {
//                               sateParams:{

//                               }
//                           }

//                       })
//               });

//               $("#orders-daily-list tbody tr td span.delete").on("click", function (item) {
//                   var grid = $("#orders-daily-list").data("kendoGrid");
//                   var row = $(item.target).closest("tr");
//                   var dataItem = grid.dataItem(row);

//                   self.setState({
//                       modalStatus: true,
//                       idForDelete: dataItem.id
//                   })

//               });

//             }
//              else {
//               currentRow.find(".account-code").css({ color: '#039be5', cursor: 'pointer' });
//             }

//           });
//         };




//       },
//       columns: Columns()
//     });

//   };


//   reRenderGrid = () => {
//     GetDailyOrdersService.deleteOrder({entity: this.state.idForDelete}, (res) => {
//         this.getTradeList();
//         this.setState({
//             modalStatus: false
//         })
//     })
// };
//   //close modal
//   handleClose = () => {
//     this.setState({ modalStatus: false });
// };



//   render() {

//     return (
//       <React.Fragment>
//         <Header {...this.props} />
//         <Paper className={"main-paper-container orders-daily-list"}>
//           <Filter search={this.search}
//             handleExpandSearchPanel={this.handleExpandSearchPanel} {...this.state}>

//             <div classPage={"height-search"}>
//               <Grid container spacing={8} className="no-margin">

//                 <Grid item md={12}>
//                 <AutoCompleteComponent {...this.state.customerList}
//                                         handleChange={(value) => this.handlePartyChange(value)}
//                                         value={this.state.customer.fullName}
//                                         service={GetPartiesService.getAllPartyForAutocomplete} />
//                   <MultiSelectAutoCompleteComponent
//                     {...this.state.isinsList}
//                     handleChange={(value) => this.addMultiSelectHandles(value, "isins")}
//                     handleRemoveItem={(value) => this.removeMultiSelectHandles(value, 'isins')}
//                     service={GetAllProductsPaging.getAllProductsPagingMethod}
//                     defaultValue={this.state.isins.map((c) => { return { symbol: c.symbol, id: c.id } })} 
//                   /> 
//                 </Grid>

//                 <Grid item md={2}>
//                   <PersianDatePicker selectedDate={this.state.startDate} label="از تاریخ " handleOnChange={(e) => this.handleChangeDate(e, "startDate")} />
//                 </Grid>

//                 <Grid item md={2}>
//                   <PersianDatePicker selectedDate={this.state.endDate} label="تا تاریخ" handleOnChange={(e) => this.handleChangeDate(e, "endDate")} />
//                 </Grid>







//                 <Grid item md={2}>
//                   <div className="k-rtl">
//                     <ComboBoxComponent isFilterable {...this.state.simpleSecurityExchangeList}
//                       handleChange={(value, name) => this.handleChange(value, name)}
//                       value={this.state.simpleSecurityExchange} />
//                   </div>
//                 </Grid>
//                 <Grid item md={2}>
//                   <Input label="از شماره سریال " type="number" handleChange={(e) => this.handleChange(e, 'fromSerialNumber')} value={this.state.fromSerialNumber} />
//                 </Grid>
//                 <Grid item md={2}>
//                   <Input label="تا سند سریال " type="number" handleChange={(e) => this.handleChange(e, 'toSerialNumber')} value={this.state.toSerialNumber} />
//                 </Grid>
//              <Grid item md={12}>
//                   <div className="k-rtl">
//                     <MultiSelectComponent isFilterable {...this.state.orderStateList}
//                       handleChange={(value, name) => this.handleChange(value, name)}
//                       value={this.state.orderState} />
//                   </div>
//                 </Grid>

//                 {/* <Grid item md={7}>
//                   <div className="k-rtl">
//                     <MultiSelectComponent isFilterable {...this.state.branchList}
//                       handleChange={(value, name) => this.handleChange(value, name)}
//                       value={this.state.branch} />
//                   </div>
//                 </Grid> */}








//               </Grid>
//             </div>

//           </Filter>
//           <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid")}>
//             <div id="orders-daily-list" className="height-page"></div>
//           </div>
//         </Paper>
//         <Modal
//                     aria-labelledby="simple-modal-title"
//                     aria-describedby="simple-modal-description"
//                     open={this.state.modalStatus}
//                     onClose={this.handleClose}
//                 >
//                     <Paper style={{
//                         width: '600px',
//                         padding: '1rem .5rem ',
//                         height: 'auto',
//                         outline: 'none',
//                         position: 'absolute',
//                         boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
//                         backgroundColor: '#fff',
//                         top: '50%',
//                         left: '45%',
//                         marginLeft: '-300px',
//                         marginTop: '-150px',
//                     }}>
//                         <h3>
//                             <FaIcon color="gray" name="fa fa-trash" size={20}/>
//                             <span style={{marginRight: '5px'}}>حذف</span>
//                             {/*<b>*/}
//                             {/*حذف {this.props.deleteHeader}*/}
//                             {/*</b>*/}
//                         </h3>
//                         <hr />
//                         {/*<h6> آیا از حذف <b> {!this.props.sateParams.fullName ?'dsdsdsd': this.props.sateParams.fullName}</b> اطمینان دارید؟ </h6>*/}
//                         <h3>آیا از حذف خود مطمئن می باشید.</h3>
//                         <br />
//                         <Button variant="contained" color="secondary"  style={{ backgroundColor: 'red', color: '#FFF' }} onClick={this.reRenderGrid}>
//                             حذف
//                         </Button>
//                         <Button variant="contained" color="secondary"  style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={this.handleClose}>
//                             انصراف
//                         </Button>
//                     </Paper>
//                 </Modal>
//       </React.Fragment>

//     )
//   }
// }

// export default GetDailyOrders;
