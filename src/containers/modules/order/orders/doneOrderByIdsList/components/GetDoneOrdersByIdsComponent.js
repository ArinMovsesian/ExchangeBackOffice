import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetDoneOrdersByIdsColumn';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum'
import kendo from '@progress/kendo-ui';
import moment from 'moment';
import './GetDoneOrdersByIdsComponent.css';
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
import GetDoneOrdersService from '../services/GetDoneOrdersByIdsService';
import GetOrdersService from '../../ordersList/services/GetOrdersService';
import GetDoneOrdersByIdsService from '../services/GetDoneOrdersByIdsService';
const $ = require("jquery");
let date = new Date();
let selectedIds = [];

class GetDoneOrdersByIds extends React.Component {

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
   
      modalStatus: false,


      /* #endregion */

      /* #endregion */
    };
    /* #region bind */

    this.handleChange = this.handleChange.bind(this);

    /* #endregion */



  }

  componentDidMount() {
console.log("rrr",this.props.location)
    this.getDropDownData();

  }
  /* #region get drop-Downs */

  getDropDownData() {
  
    this.getOrderList();
  }




  




  /* #endregion */


  /* #region handle change filters */

  handleChange(value, name) {
    let item = value.value;
    this.setState({
      [name]: item
    })
  }
 

 




 

 
  getOrderList() {
    let self = this;

    $("#orders-done-by-ids-list").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              self = option.data
            }
            var command = {
              reportFilter: self.props.location.state.ids
              ,
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
            GetDoneOrdersByIdsService.getAllDoneOrdersByIdsList(command, function (response) {
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
      toolbar: 
      `
     
 
      ${excelAndPdfToolbar}`,
      change: self.checkBoxSelectHandles,
      dataBound: function (e) {
        var scrollOffset = {
          left:10000 ,
      };
        var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
        container.scrollLeft(scrollOffset.left);
        if (this.dataSource.data().length > 0) {
          let grid = $("#orders-done-by-ids-list").data("kendoGrid");
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
          $("#orders-done-by-ids-list tbody tr td span.edit").on("click", function (item) {
            var grid = $("#orders-done-by-ids-list").data("kendoGrid");
            var row = $(item.target).closest("tr");
            var dataItem = grid.dataItem(row);
        
            self.props.history.push(
              {
                pathname: '/main/order/orders/updateDoneOrder',
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
                    dateCondition: dataItem.validUntil!=='0001-01-01T00:00:00',
                    toDate: dataItem.validUntil,
                    description: dataItem.senderDescription,
                    id: dataItem.id,
                    priceCondition:(dataItem.price && dataItem.price>0) ||(dataItem.maxPrice && dataItem.maxPrice>0) || (dataItem.minPrice && dataItem.minPrice>0) ? { code: 2 ,title:"شرط قیمت"} :{ code: 1 ,title:"قیمت تابلو"},
                    orderIsDone:true,
                    ids:self.props.location.state.ids,
                    orderId:dataItem.orderId,
                    dailyOrderId:dataItem.dailyOrderId
                  }
                }

              })
          });
  
          items.map((item, index) => {
           
            let id = items[index].uid;
            let currentRow = grid.table.find("tr[data-uid='" + id + "']");
            if (index === this.dataSource.data().length - 1 && this.dataSource.data().length > 1) {
              // console.log("index1111",index,this.dataSource.data().length - 1)
              // currentRow.css({ display: 'none', visibility: 'hidden' });
           
              $("#orders-done-by-ids-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-amount-sum").text(kendo.toString(item.totalAmountSum, 'n0'));

              $("#orders-done-by-ids-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-volume-sum").text(kendo.toString(item.totalVolumeSum, 'n0'));

              $("#orders-done-by-ids-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-price-sum").text(kendo.toString(item.totalPriceeSum, 'n0'));

              $("#orders-done-by-ids-list .k-grid-footer .k-grid-footer-wrap " +
                "tbody tr td div.total-remainingAmount-sum").text(kendo.toString(item.totalRemainingAmountSum, 'n0'));

              $("#orders-done-by-ids-list .k-grid-footer .k-grid-footer-wrap " +
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
    $("#orders-done-by-ids-list .excel-report").on("click", function (item) {
      self.getExcelReport();
    
    });
    $("#orders-done-by-ids-list .pdf-report").on("click", function (item) {
        self.getPdfReport();
       
    });
  };




  getCommand = () => {
    var grid = $("#orders-done-by-ids-list").data("kendoGrid");
    var dataSource = grid.dataSource;

    var command = {
    reportFilter: 
    this.props.location.state.ids
    ,
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
 
    GetOrdersService.getExcelExport(command, 'فهرست سفارش های فعال');

}

getPdfReport = () => {
  var command = this.getCommand();
 
  GetOrdersService.getPdfExport(command, "فهرست سفارش های فعال");

}




  
 


  render() {
console.log("dddd",this.props.location)
    return (
      <React.Fragment>
        <Header {...this.props} />
        <Paper className={"main-paper-container orders-done-by-ids-list fade-in"}>
        
          <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid")}>
            <div id="orders-done-by-ids-list" className="height-page"></div>
          </div>
        </Paper>
   
 
      </React.Fragment>

    )
  }
}

export default GetDoneOrdersByIds;

