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

const $ = require("jquery");
let date = new Date();
let selectedIds = [];

class AddMatchOrders extends React.Component {

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

      requestCancel:false,
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
      description:'',
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
    this.getMatchableTradeList();
  }




  handleModal() {

    this.setState({ deleteDescription: '', orderRejectionReason: { code: 0, id: '' }, deleteModal: false });

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
   
    $("#matchable-trade-list").data("kendoGrid").dataSource.read(this);
  }


  checkBoxSelectHandles = (arg) => {

    let temp = Object.keys(arg.sender._selectedIds);
    let convertedTemp = temp.map((value) => {
      return parseInt(value, 10);
    });
    
    if (convertedTemp.length === 0) {
      $('#confirmation').attr('disabled', 'disabled');
    } else {
      $('#confirmation').removeAttr('disabled');
    }
    selectedIds = convertedTemp;
  };


  getMatchableTradeList() {
    let self = this;

    $("#matchable-trade-list").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              self = option.data
            }
            var command = {
              reportFilter: self.props.location.state.stateParams.id,

              
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

            
            GetMatchOrdersService.getAllMatchableTradeList(command, function (response) {
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
      <button id="confirmation"  disabled="true">تایید</button>
      ${excelAndPdfToolbar}`,
      change: self.checkBoxSelectHandles,
      dataBound: function (e) {
        var scrollOffset = {
          left:10000 ,
      };
        var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
        container.scrollLeft(scrollOffset.left);
        if (this.dataSource.data().length > 0) {
          let grid = $("#matchable-trade-list").data("kendoGrid");
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
          $("#matchable-trade-list #confirmation").on("click", function (item) {

            var grid = $("#matchable-trade-list").data("kendoGrid");
            var row = $(item.target).closest("tr");
            var dataItem = grid.dataItem(row);
            var command={
              entity:{
                securityTransactionIds: self.state.selectedId ? [self.state.selectedId] : selectedIds,
                orderId: self.props.location.state.stateParams.id
              }
            }
            GetMatchOrdersService.matchSecurityTransaction(command,(res) => {
              if (res.success) {
                toastr.success(res.message);
                self.search();
          }});
        });
          $("#matchable-trade-list tbody tr td span.delete").on("click", function (item) {
            var grid = $("#matchable-trade-list").data("kendoGrid");
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
            
           
              $("#matchable-trade-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-amount-sum").text(kendo.toString(item.totalAmountSum, 'n0'));

              $("#matchable-trade-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-volume-sum").text(kendo.toString(item.totalVolumeSum, 'n0'));

              $("#matchable-trade-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-price-sum").text(kendo.toString(item.totalPriceeSum, 'n0'));

              $("#matchable-trade-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-remainingAmount-sum").text(kendo.toString(item.totalRemainingAmountSum, 'n0'));

              $("#matchable-trade-list .k-grid-footer .k-grid-footer-wrap " +
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
    $("#matchable-trade-list .excel-report").on("click", function (item) {
      self.getExcelReport();
    
    });
    $("#matchable-trade-list .pdf-report").on("click", function (item) {
        self.getPdfReport();
       
    });
  };




  getCommand = () => {
    var grid = $("#matchable-trade-list").data("kendoGrid");
    var dataSource = grid.dataSource;

    var command = {
    reportFilter: {
        requestCancel:this.state.requestCancel,
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




  reRenderGrid  () {
    
    var command = {
      entity: {
        orderIds: this.state.selectedId ? [this.state.selectedId] : selectedIds,
        OrderRejectionReason: this.state.orderRejectionReason.code,
        description:this.state.orderRejectionReason.code===9 ? this.state.description : null
      }
    };
    var self = this;
    GetMatchOrdersService.deleteOrder(command, (res) => {

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
      else{
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
    console.log("add",this.props.location.state.stateParams)

    return (
      <React.Fragment>
        <Header {...this.props}
        backParams={
          this.props.location.state === undefined ? undefined :
           {
             stateParams:{
              id: this.props.location.state.stateParams.id,
              serialNumber: this.props.location.state.stateParams.serialNumber,
              dateJalali: this.props.location.state.stateParams.dateJalali
             }
           }
        }
        />
        <Paper className={"main-paper-container matchable-trade-list fade-in"}>
       
          <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid")}>
            <div id="matchable-trade-list" className="height-page"></div>
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
                  this.state.orderRejectionReason.code===9 ?
                  <Grid item md={11}>
                  <Input isMultiLine label=" توضیحات مشتری" textArea handleChange={(e) => this.handleChange(e, 'description')}
                      value={this.state.description} />
                  </Grid>
                   :''
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

export default AddMatchOrders;

