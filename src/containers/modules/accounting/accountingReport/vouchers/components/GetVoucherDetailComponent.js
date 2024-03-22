import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import GridServer from 'shared/components/kendoGrid/GridServerByDetail';
import GetVouchersMasterService from '../services/GetVouchersMasterService';
import Columns from '../constants/GetVouchersDetailColumn';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import GetVoucherType from '../../../accountingBase/voucherType/services/GetVoucherTypeService';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetFiscalYearsService from '../../../../../modules/accounting/accountingBase/fiscalYear/services/GetFiscalYearsService';
import GetVoucherTypeService from '../../../accountingBase/voucherType/services/GetVoucherTypeService';
import './GetVoucherDetailComponent.css';
import Detail from 'shared/components/kendoGrid/detailPanel/detailPanel';
import kendo from '@progress/kendo-ui';

import GetEnum from 'services/getEnum';
import moment from 'moment';
import GetVouchersDetailService from '../services/GetVoucherDetailService';
import { excelAndPdfToolbar } from '../../../../../../constants/excelPdfToolbar';
const $ = require("jquery");

//ToDo Delete
class GetVoucherDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      voucherNumber: 0,
      voucherMasterId: 0,
      voucherType: { code: 0 },
      reRender: false,
      openDetail:true,
      submitType: '',
      voucherMasterInformation: {}





    }
    this.handleChange = this.handleChange.bind(this);
    this.handleExpandDetailPanel = this.handleExpandDetailPanel.bind(this);
    this.successGetVoucherMasterInformation = this.successGetVoucherMasterInformation.bind(this);


  }

  componentDidMount() {

    this.getDropDownData();
    this.getVoucherMasterInformation();
    this.GetVouchersDetailList()
  }

  getDropDownData() {
  }


  getVoucherMasterInformation() {
    let command = {
      entity: this.props.location.state.id
    }
    GetVouchersMasterService.getVoucherMasterById(command, this.successGetVoucherMasterInformation)

  }

  successGetVoucherMasterInformation(response) {
    if (response.success)
      this.setState({ voucherMasterInformation: response.result });

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
    })

  }

  handleChangeDate(value, name) {

    this.setState({
      [name]: value
    }, function () {
    })

  }


  GetVouchersDetailList() {
    let self = this;

    $("#voucher-detail-list").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              self = option.data
            }
            var command = {

              reportFilter: {

                voucherMasterId: self.props.location.state.id,


              },


              OptionalFilter: {
                page: option.data.page ? option.data.page : 1,
                take: option.data.take ? option.data.take : 50,
                sort: option.data.sort ? option.data.sort :
                  [{
                    field: "rowNumber",
                    dir: "asc"
                  }]
              }
            }
            GetVouchersDetailService.getVoucherDetailList(command, function (response) {
              option.success(response)
            })
          }
        },

        pageSize: 50,
        sort: {
          field: "rowNumber",
          dir: "asc"
        },
        serverPaging: true,
        serverSorting: true,
        schema: {
          data: "result",
          total: "totalRecords"

        },
        aggregate: [
          { field: "credit", aggregate: "sum" },
          { field: "debit", aggregate: "sum" },
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
      toolbar: excelAndPdfToolbar,
      noRecords: {
        template: ' <p class="orange-page font-size-2 no-data">رکوردی جهت نمایش وجود ندارد.</p>'
      },
      dataBound: function (e) {
        var scrollOffset = {
          left:10000 ,
      };
        var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
        container.scrollLeft(scrollOffset.left);

        if (this.dataSource.data().length > 0) {
          let grid = $("#voucher-detail-list").data("kendoGrid");
          let items = grid.dataSource.view();
          items.map((item, index) => {
   
            $("#voucher-detail-list .k-grid-footer .k-grid-footer-wrap " +
              "tbody tr td div.total-debit-sum").text(kendo.toString(item.totalAmountsum, 'n0'));
            $("#voucher-detail-list .k-grid-footer .k-grid-footer-wrap " +
              "tbody tr td div.total-credit-sum").text(kendo.toString(item.totalAmountsum, 'n0'));
          })


        }
        $("#voucher-detail-list tbody tr td div.id").on("click", function (item) {

          var grid = $("#voucher-detail-list").data("kendoGrid");
          var row = $(item.target).closest("tr");
          var dataItem = grid.dataItem(row);
          self.props.history.push(
            {
              pathname: self.props.detail.path,
              state: {
                id: dataItem.id
              }

            })
        });
        $("#voucher-detail-list .excel-report").on("click", function (item) {
          self.getExcelReport();
          // alert('exel')
        });
        $("#voucher-detail-list .pdf-report").on("click", function (item) {
          // self.getPdfReport();
          alert('pdf')
        });



      },

      columns: Columns()
    });

  };
  getCommand = () => {
    var grid = $("#voucher-detail-list").data("kendoGrid");
    var dataSource = grid.dataSource;

    var command = {
      reportFilter: {

        voucherMasterId: this.props.location.state.id,


      },

      OptionalFilter: {
        page: dataSource ? dataSource.page() : 1,
        take: dataSource ? dataSource.pageSize() : 50,
        // take: option.data.take ? option.data.take : 50,
        sort: dataSource ? dataSource.sort() :
          [{
            field: "rowNumber",
            dir: "asc"
          }]
      }
    }
    return command;
  }

  getExcelReport = () => {
    var command = this.getCommand();
    GetVouchersDetailService.getExcelExport(command, 'voucher-detail-list');

  }
  getPdfReport() {
    // var command = this.getCommand();
    // GetVouchersMasterService.getPdfExport(command, function (response) {
    // });

  }
  handleExpandDetailPanel() {
    this.setState({
      openDetail: !this.state.openDetail
    })
  }

  render() {

    return (
      <React.Fragment>
        <Header {...this.props} />
        <Paper className={"main-paper-container voucher-detail"}>
          {/* <GridServer
            {...this.props}
            {...this.state}
            reRender
            openDetail={true}
            sort={
              [{
                dir: "asc",
                field: "rowNumber"
              }]
            }
            service={GetVouchersDetailService}  
            Columns={Columns}
            reportFilter={
              {
                voucherMasterId: this.props.location.state.id,

              }

            }

            classHeightOpenPanel={"height-open-grid"}
            heightOpenDetailPanel={"height-open-detail-grid"}
            classHeightOpenPanelFull={"height-open-full-grid"}
            heightClosePanel={"height-close-grid"}
          > */}
          <Detail
            handleExpandDetailPanel={this.handleExpandDetailPanel} {...this.state}>

            <div id="detail" classPage={"height-detail"}>

              <Grid container spacing={8} className="no-margin">

                <Grid item md={1}>
                  <h6>شرح سند</h6>
                </Grid>
                <Grid item md={11}>
                  <div className="kadr">
                    {this.state.voucherMasterInformation.description}
                  </div>
                </Grid>
                <Grid item md={1}>
                  <h6>شماره سند</h6>
                </Grid>
                <Grid item md={3}>
                  <div className="kadr">
                    {this.state.voucherMasterInformation.voucherNumber}
                  </div>
                </Grid>
                <Grid item md={1}>
                  <h6>شماره سیستمی سند</h6>
                </Grid>
                <Grid item md={3}>
                  <div className="kadr">
                    {this.state.voucherMasterInformation.id}
                  </div>
                </Grid>
                <Grid item md={1}>
                  <h6>شعبه</h6>
                </Grid>
                <Grid item md={3}>
                  <div className="kadr">
                    {this.state.voucherMasterInformation.branchName}
                  </div>
                </Grid>
                <Grid item md={1}>
                  <h6>نوع ثبت</h6>
                </Grid>
                <Grid item md={3}>
                  <div className="kadr">
                    {this.state.voucherMasterInformation.insertModeTitle}
                  </div>
                </Grid>
                <Grid item md={1}>
                  <h6>تاریخ سند</h6>
                </Grid>
                <Grid item md={3}>
                  <div className="kadr">
                    {this.state.voucherMasterInformation.voucherDateJalali}
                  </div>
                </Grid>
                <Grid item md={1}>
                  <h6>وضعیت</h6>
                </Grid>
                <Grid item md={3}>
                  <div className="kadr">
                    {this.state.voucherMasterInformation.voucherStateEnumTitle}
                  </div>
                </Grid>
                <Grid item md={1}>
                  <h6>نوع</h6>
                </Grid>
                <Grid item md={3}>
                  <div className="kadr">
                    {this.state.voucherMasterInformation.voucherCategoryTitle}
                  </div>
                </Grid>
                <Grid item md={1}>
                  <h6>مبلغ سند</h6>
                </Grid>
                <Grid item md={3}>
                  <div className="kadr">
                    {this.state.voucherMasterInformation.amount}
                  </div>
                </Grid>

              </Grid>

            </div>
          </Detail>
          <div className={"k-rtl " + (this.state.openDetail? "height-open-grid" : "height-content-grid")}>
            <div id="voucher-detail-list" className="height-page"></div>
          </div>

          {/* </GridServer> */}
        </Paper>
      </React.Fragment>

    )
  }
}
export default GetVoucherDetail;
