import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import GetVouchersMasterService from '../services/GetVouchersMasterService';
import Columns from '../constants/GetVouchersMasterColumn';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetFiscalYearsService from '../../../../../modules/accounting/accountingBase/fiscalYear/services/GetFiscalYearsService'
import GetVoucherTypeService from '../../../accountingBase/voucherType/services/GetVoucherTypeService';
import GetEnum from 'services/getEnum';
import kendo from '@progress/kendo-ui';
import FaIcon from 'shared/components/Icon/Icon';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import toastr from 'toastr';

import '../components/GetVoucherMasterComponent.css'
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import { excelAndPdfToolbar } from '../../../../../../constants/excelPdfToolbar';
const $ = require("jquery");
let selectedIds=[];
class GetVouchersMaster extends React.Component {
  constructor(props) {

    super(props)

    this.state = {
      fromVoucherNumber: 0,
      toVoucherNumber: 0,
      columns: Columns(),
      voucherMasterId: 0,
      renderCount: 0,
      voucherType: { code: 0 },
      reRender: false,
      submitType: '',
      open: false,
      toDate: '2000-01-01',
      fromDate: "2000-01-01",
      selectedBranch: { code: 0 },
      selectedSubmitType: { code: 0 },
      selectedYear: { code: 0 },
      deleteModal:false,
      selectedVoucher:{},

      branchList: {
        name: "selectedBranch",
        feild: "title",
        label: "شعبه",
        list: []
      },

      submitTypeList: {
        name: "selectedSubmitType",
        feild: "title",
        label: "نوع ثبت",
        list: []
      },
      fiscalYearList: {
        name: "selectedYear",
        feild: "title",
        label: "سال مالی",
        list: []
      },
      voucherTypeList: {
        name: "voucherType",
        feild: "title",
        label: "نوع سند",
        list: []
      },

      confirmDocumentationModal: false,


    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeFiscalYear = this.handleChangeFiscalYear.bind(this);
    this.increaseCount = this.increaseCount.bind(this);
    this.handleExpandSearchPanel = this.handleExpandSearchPanel.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.handleCloseDeleteModal = this.handleCloseDeleteModal.bind(this);
    this.remove = this.remove.bind(this);
    this.successRemove = this.successRemove.bind(this);

  }

  componentDidMount() {

    this.getDropDownData();

  }

  increaseCount() {
    this.setState((state) => ({ increaseCount: state.increaseCount + 1 }));
  }

  getDropDownData() {

    GetFiscalYearsService.getFiscalYears(null, (response) => DropDownListDataProvider(this, "fiscalYearList", response, this.handleChangeFiscalYear({ value: response.result[0] })));
    GetBranchService.getBranchesByFilter(null, (response) => DropDownListDataProvider(this, "branchList", response));
    GetVoucherTypeService(null, (response) => DropDownListDataProvider(this, "voucherTypeList", response));
    GetEnum("VoucherInsertMode", (response) => DropDownListDataProvider(this, "submitTypeList", response));
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
    }, this.getVoucherMasterList)

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
    $("#voucher-master-list").data("kendoGrid").dataSource.read(this);
  }


  getVoucherMasterList() {
    let self = this;

    $("#voucher-master-list").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              self = option.data
            }
            var command = {
              reportFilter:
              {
                voucherMasterId: self.state.voucherMasterId,
                fromVoucherNumber: self.state.fromVoucherNumber,
                toVoucherNumber: self.state.toVoucherNumber,
                branchId: self.state.selectedBranch.id,
                fiscalYearId: self.state.selectedYear.id,
                detailLegderCode: "",
                subsidiaryLedgerCode: "",
                generalLedgerCode: "",
                voucherInsertMode: 0,
                voucherCategoryId: 0,
                voucherMasterState: 0,
                description: "",
                amount: 0,
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
                    field: "voucherNumber",
                    dir: "desc"
                  }]
              }
            }
            GetVouchersMasterService.getFlatVoucherMasters(command, function (response) {
              option.success(response)
            })
          }
        },

        pageSize: 50,
        sort: {
          field: "voucherNumber",
          dir: "desc"
        },
        serverPaging: true,
        serverSorting: true,
        schema: {
          model: {
            id: 'id',
          },
          data: "result",
          total: "totalRecords"

        },
        aggregate: [
          { field: "amount", aggregate: "sum" },
        ]
      },
      // sortable: true,
      // filterable: true,
      // columnMenu: true,

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
      toolbar: `<button id="confirmDocumentation" disabled="true">قطعی کردن اسناد</button>${excelAndPdfToolbar}`,
      dataBound: function (e) {
        var scrollOffset = {
          left:10000 ,
      };
        var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
        container.scrollLeft(scrollOffset.left);
         //Select Checkbox Rows by Clicking Anywhere on the Row
         let grid = e.sender;
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
         //Select Checkbox Rows by Clicking Anywhere on the Row
        if (this.dataSource.data().length > 0) {
          let grid = $("#voucher-master-list").data("kendoGrid");
          let items = grid.dataSource.view();
          items.map((item, index) => {
            let id = items[index].uid;
            let currentRow = grid.table.find("tr[data-uid='" + id + "']");
          //   if(!item.isEditable){
          //     $("#voucher-master-list tbody tr td div span.edit").addClass(function(){
                  
          //       return 'disabled'
          //    })
          //   }
          //   if(!item.isDeletable){
          //   $("#voucher-master-list tbody tr td div span.delete").addClass(function(){
          //     if(id===item.uid)
          //     return 'disabled'
          //   })
          // }
            currentRow.find(".id").css({ color: '#039be5', cursor: 'pointer' });
            $("#voucher-master-list .k-grid-footer .k-grid-footer-wrap " +
              "tbody tr td div.total-amount-sum").text(kendo.toString(item.totalAmountsum, 'n0'));
          })


        }
       
        

        $("#voucher-master-list tbody tr td div.id").on("click", function (item) {
          var grid = $("#voucher-master-list").data("kendoGrid");
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
        $("#voucher-master-list tbody tr td div span.edit").on("click", function (item) {
          var grid = $("#voucher-master-list").data("kendoGrid");
          var row = $(item.target).closest("tr");
          var dataItem = grid.dataItem(row);
          if(dataItem.isEditable){
            self.props.history.push(
              {
                pathname: self.props.edit.path,
                state: {
                  id: dataItem.id
                }
              })
          }
         
        });

        $("#voucher-master-list tbody tr td div span.delete").on("click", function (item) {
          var grid = $("#voucher-master-list").data("kendoGrid");
          var row = $(item.target).closest("tr");
          var dataItem = grid.dataItem(row);
          
          if(dataItem.isDeletable){

             self.openDeleteModal(dataItem);
          }
        });
        $("#confirmDocumentation").on("click", function() {
          self.setState({
            confirmDocumentationModal: true,
          })
        });
        $("#voucher-master-list .excel-report").on("click", function (item) {
          self.getExcelReport();
          // alert('exel')
        });
        $("#voucher-master-list .pdf-report").on("click", function (item) {
          // self.getPdfReport();
          alert('pdf')
        });
      },
      columns: self.state.columns,
      change: self.checkBoxSelectHandles,
    });

  };
  
  getCommand = () => {
    var grid = $("#voucher-master-list").data("kendoGrid");
    var dataSource = grid.dataSource;

    var command = {
      reportFilter:
      {
        voucherMasterId: this.state.voucherMasterId,
        fromVoucherNumber: this.state.fromVoucherNumber,
        toVoucherNumber: this.state.toVoucherNumber,
        branchId: this.state.selectedBranch.id,
        fiscalYearId: this.state.selectedYear.id,
        detailLegderCode: "",
        subsidiaryLedgerCode: "",
        generalLedgerCode: "",
        voucherInsertMode: 0,
        voucherCategoryId: 0,
        voucherMasterState: 0,
        description: "",
        amount: 0,
        dateFilter: {
          startDate: this.state.fromDate,
          endDate: this.state.toDate
        }
      },

      OptionalFilter: {
        page: dataSource ? dataSource.page() : 1,
        take: dataSource ? dataSource.pageSize() : 50,
        // take: option.data.take ? option.data.take : 50,
        sort: dataSource ? dataSource.sort() :
          [{
            field: "voucherNumber",
            dir: "asc"
          }]
      }
    }
    return command;
  }
  getExcelReport = () => {
    var command = this.getCommand();
    GetVouchersMasterService.getExcelExport(command, 'voucher-master-list');

  }
  getPdfReport() {
    // var command = this.getCommand();
    // GetVouchersMasterService.getPdfExport(command, function (response) {
    // });

  }
  openDeleteModal(dataItem){
    console.log("openDeleteModal",dataItem)
    this.setState({selectedVoucher:dataItem,deleteModal:true});
  }
  handleCloseDeleteModal(){
    this.setState({deleteModal:false});

  }

  remove(){
    var command={
      entity:this.state.selectedVoucher.id
    }
    GetVouchersMasterService.deleteVoucherMaster(command,this.successRemove)
  }
  
  successRemove(response){
    this.setState({deleteModal:false});
  
    if(response.success){
      this.getVoucherMasterList();
      toastr.success("سند با موفقیت حذف شد")

    }
   
  }
  checkBoxSelectHandles = (arg) => {
    let temp = Object.keys(arg.sender._selectedIds);
    // arg.sender._data.map((value) => {
    //     if(value.id == temp[0]){
    //     }
    // })
    let convertedTemp  = temp.map((value) => {
        return parseInt(value, 10);
    });
    if(convertedTemp.length === 0){
        $('#confirmDocumentation').attr('disabled', 'disabled');
    }else{
        $('#confirmDocumentation').removeAttr('disabled');
    }
    selectedIds = convertedTemp;
};
confirmDocumentationModalCloseH = () => {
  this.setState({
    confirmDocumentationModal: false
  })
}
  render() {
  

    return (
      <React.Fragment>
        <Header {...this.props} />
        <Paper className={"main-paper-container voucher-master"}>

          <Filter search={this.search}
            handleExpandSearchPanel={this.handleExpandSearchPanel} {...this.state}>

            <div classPage={"height-search"}>

              <Grid container spacing={8} className="no-margin">
                <Grid item md={2}>
                  <PersianDatePicker selectedDate={this.state.fromDate} label="تاریخ سند از " handleOnChange={(e) => this.handleChangeDate(e, "fromDate")} />
                </Grid>
                <Grid item md={2}>
                  <PersianDatePicker selectedDate={this.state.toDate} label="تاریخ سند تا" handleOnChange={(e) => this.handleChangeDate(e, "toDate")} />
                </Grid>
                <Grid item md={2}>
                  <Input label="از سند شماره " type="number" handleChange={(e) => this.handleChange(e, 'fromVoucherNumber')} value={this.state.fromVoucherNumber} />
                </Grid>
                <Grid item md={2}>
                  <Input label="تا سند شماره " type="number" handleChange={(e) => this.handleChange(e, 'toVoucherNumber')} value={this.state.toVoucherNumber} />
                </Grid>

                <Grid item md={2}>
                  <div className="k-rtl">
                    <DropDownComponent isFilterable {...this.state.branchList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.selectedBranch} />
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
                  <div className="k-rtl">
                    <DropDownComponent isFilterable {...this.state.submitTypeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.selectedSubmitType} />
                  </div>
                </Grid>
                <Grid item md={3}>
                  <div className="k-rtl">
                    <DropDownComponent isFilterable {...this.state.voucherTypeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.voucherType} />
                  </div>
                </Grid>


              </Grid>

            </div>
          </Filter>

          <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid")}>
            <div id="voucher-master-list" className="height-page"></div>
          </div>
        </Paper>
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.deleteModal}
            onClose={(e) => this.handleCloseDeleteModal(e)}
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
              <h3 >
                <FaIcon color="orange" name="fas fa-exclamation-triangle" size={20} />
                <span style={{ marginRight: '5px' }}>حذف سند</span>
                {/*<b>*/}
                {/*حذف {this.props.deleteHeader}*/}
                {/*</b>*/}
              </h3>
              <hr />
              {/*<h6> آیا از حذف <b> {!this.props.sateParams.fullName ?'dsdsdsd': this.props.sateParams.fullName}</b> اطمینان دارید؟ </h6>*/}
              <h3>آیا از حذف سند با شماره  <b>{this.state.selectedVoucher.voucherNumber}</b> و شرح <b>{this.state.selectedVoucher.description}</b> مطمئن می باشید؟</h3>
              <br />
              <Button variant="contained" color="secondary" style={{ backgroundColor: 'red', color: '#FFF' }} onClick={this.remove}>
                حذف
                        </Button>
              <Button variant="contained" color="secondary" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={(e) => this.handleCloseDeleteModal(e)}>
                انصراف
                        </Button>
            </Paper>
          </Modal>
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.confirmDocumentationModal}
            onClose={this.confirmDocumentationModalCloseH}
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
                      <h1>قطعی کردن اسناد</h1>
                      <Button variant="contained" color="primary" style={{marginRight: '5px'}}>
                            <FaIcon color="#FFF" name="fa fa-print" margin={'5px'} size={17}/>
                               <span style={{margin: '0 5px'}}>
                            ثبت
                               </span>
                        </Button>
                        <Button variant="contained" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={this.confirmDocumentationModalCloseH}>
                            <FaIcon color="#FFF" name="fa fa-ban" margin={'5px'} size={17}/>
                            <span style={{margin: '0 5px'}}>
                            انصراف
                            </span>
                        </Button>
                    </Paper>
        </Modal>
      </React.Fragment>

    )
  }
}
export default GetVouchersMaster;
