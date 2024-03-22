import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetTradesWithoutOrderColumn';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum'
import kendo from '@progress/kendo-ui';
import toastr from 'toastr';

import moment from 'moment';
import './GetTradesWithoutOrderComponent.css';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import { excelAndPdfToolbar } from 'constants/excelPdfToolbar';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import '@progress/kendo-ui';
import GetTradesWithoutOrderService from '../services/GetTradesWithoutOrderService';

const $ = require("jquery");
let selectedIds = [];

class GetTradesWithoutOrder extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      /* #region filter state */
      startDate: new Date(),
      response: {},
      columns: Columns(),
      endDate: new Date(),
      dailyAggregate: true,
      open: false,
      isAggregate: false,
      /* #region list state */
      startDateBeforeSearch: new Date(),
      endDateBeforeSearch: new Date(),
      transactionState: [],
      securityTransactionTypeList: {
        name: "securityTransactionType",
        field: "title",
        label: "نوع معامله ",
        list: []
      },
      securityTransactionType: { code: 0, id: '' },

      productType: { code: 0, id: '' },
      branchList: {
        name: "branch",
        field: "title",
        label: "شعبه معامله ",
        list: []
      },
      branch: [],
      customerBranchList: {
        name: "customerBranch",
        field: "title",
        label: "شعبه مشتری ",
        list: []
      },
      customerBranch: [],







      /* #endregion */

      /* #endregion */
    };
    /* #region bind */

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleExpandSearchPanel = this.handleExpandSearchPanel.bind(this);
    this.checkBoxSelectHandles = this.checkBoxSelectHandles.bind(this);
    this.sendToOrder = this.sendToOrder.bind(this);
    this.successSendToOrder = this.successSendToOrder.bind(this);
    this.search = this.search.bind(this);

    /* #endregion */



  }

  componentDidMount() {

    this.getDropDownData();

  }
  /* #region get drop-Downs */

  getDropDownData() {
    this.getSecurityTransactionTypeList();
    this.getBranchList();
    this.getTradeList();
  }



  getSecurityTransactionTypeList() {
    GetEnum('simplesecuritytransactiontype', response => DropDownListDataProvider(this, "securityTransactionTypeList", response))
  }






  getBranchList() {
    GetBranchService.getBranchesByFilter(null, response => {
      DropDownListDataProvider(this, "branchList", response)
      DropDownListDataProvider(this, "customerBranchList", response)
    })
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




  handleExpandSearchPanel() {
    this.setState({
      open: !this.state.open
    })
  }

  search() {
    this.setState({
      isAggregate: this.state.dailyAggregate,
      startDateBeforeSearch: this.state.startDate,
      endDateBeforeSearch: this.state.endDate
    });

    $("#trades-without-order-list").data("kendoGrid").dataSource.read(this);
  }


  getTradeList() {
    let self = this;

    $("#trades-without-order-list").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              self = option.data
            }
            var command = {
              reportFilter: {
                isAggregate: self.state.dailyAggregate,
                orderBranches: self.state.branch.length > 0 ? self.state.branch.map(i => i.id) : [],
                customerBranches: self.state.customerBranch.length > 0 ? self.state.customerBranch.map(i => i.id) : [],
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
            GetTradesWithoutOrderService.getAllTradesList(command, function (response) {
              if (response.success) {

                self.setState({ response: response })

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
          total: "totalRecords",
          model: {
            id: 'id'
          }
        },

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
      toolbar: `<button id="sendToOrder" disabled="true">
                ایجاد سفارش
              </button>
            <button id="sendToOrderCustomerPanel" disabled="true">
           ایجاد سفارش از پنل مشتری</button>
            ${excelAndPdfToolbar}`,
      change: self.checkBoxSelectHandles,

      dataBound: function (e) {
        var scrollOffset = {
          left:10000 ,
      };
        var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
        container.scrollLeft(scrollOffset.left);
        if (this.dataSource.data().length > 0) {

          let grid = $("#trades-without-order-list").data("kendoGrid");
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
            let id = item.uid;
            let currentRow = grid.table.find("tr[data-uid='" + id + "']");
            if (index === this.dataSource.data().length - 1) {
              // currentRow.css({ display: 'none', visibility: 'hidden' });

            } else {
              currentRow.find(".account-code").css({ color: '#039be5', cursor: 'pointer' });
            }

          });
        };


      },
      columns: self.state.columns

    });
    $("#trades-without-order-list .excel-report").on("click", function (item) {
      self.getExcelReport();
    });
    $("#trades-without-order-list .pdf-report").on("click", function (item) {
      self.getPdfReport();
    });
    $("#sendToOrder").on("click", function () {
      self.sendToOrder(true);
    });
    $("#sendToOrderCustomerPanel").on("click", function () {
      self.sendToOrder(false);
    });
  };

  sendToOrder = (adminPanel) => {
    var command = {
      entity: {
        ToAdminPanel: adminPanel,
        isAggregate: this.state.isAggregate,
        ids: this.state.selectedId ? [this.state.selectedId] : selectedIds,
        fromDate: this.state.startDateBeforeSearch,
        toDate: this.state.endDateBeforeSearch
      }
    }

    GetTradesWithoutOrderService.sendToOrder(command, (response) => this.successSendToOrder(response, adminPanel));
  }
  successSendToOrder = (response, adminPanel) => {
    if (response.success) {
      if (!adminPanel)
        toastr.success(response.message);
      else
      {
        this.props.history.push(
          {
            pathname: '/main/order/orders/getDoneOrdersByIds',
            state: {
             
              ids:response.result
             
            }

          })
      }
    }
    this.search();
  }
  checkBoxSelectHandles = (arg) => {
    let temp = Object.keys(arg.sender._selectedIds);


    let convertedTemp = temp.map((value) => {
      return parseInt(value, 10);
    });

    if (convertedTemp.length === 0) {
      $('#sendToOrder').attr('disabled', 'disabled');
      $('#sendToOrderCustomerPanel').attr('disabled', 'disabled');

    } else {
      $('#sendToOrder').removeAttr('disabled');
      $('#sendToOrderCustomerPanel').removeAttr('disabled');
    }
    selectedIds = convertedTemp;
  };

  getCommand = () => {
    var grid = $("#trades-without-order-list").data("kendoGrid");
    var dataSource = grid.dataSource;

    var command = {
      reportFilter: {
        isAggregate: this.state.dailyAggregate,
        orderBranches: this.state.branch.length > 0 ? this.state.branch.map(i => i.id) : [],
        customerBranches: this.state.customerBranch.length > 0 ? this.state.customerBranch.map(i => i.id) : [],
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
    GetTradesWithoutOrderService.getExcelExport(command, 'فهرست سفارش های انجام شده فاقد درخواست');
  }


  getPdfReport = () => {
    var command = this.getCommand();
    // alert('pdf')
    GetTradesWithoutOrderService.getPdfExport(command, "فهرست سفارش های انجام شده فاقد درخواست");

  }



  render() {

    return (
      <React.Fragment>
        <Header {...this.props} />
        <Paper className={"main-paper-container trades-without-order-list"}>
          <Filter search={this.search}
            handleExpandSearchPanel={this.handleExpandSearchPanel} {...this.state}>
            <div classPage={"height-search"}>
              <Grid container spacing={8} className="no-margin">

                <Grid item md={2}>
                  <PersianDatePicker selectedDate={this.state.startDate} label="از تاریخ " handleOnChange={(e) => this.handleChangeDate(e, "startDate")} />
                </Grid>
                <Grid item md={2}>
                  <PersianDatePicker selectedDate={this.state.endDate} label="تا تاریخ" handleOnChange={(e) => this.handleChangeDate(e, "endDate")} />
                </Grid>

                <Grid item md={2}>
                  <div className="k-rtl">
                    <DropDownComponent isFilterable {...this.state.securityTransactionTypeList}
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
                <Grid item md={6}>
                  <div className="k-rtl">
                    <MultiSelectComponent isFilterable {...this.state.customerBranchList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.customerBranch} />
                  </div>
                </Grid>
                <Grid item md={6}>

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
            <div id="trades-without-order-list" className="height-page"></div>
          </div>
        </Paper>
      </React.Fragment>

    )
  }
}

export default GetTradesWithoutOrder;
