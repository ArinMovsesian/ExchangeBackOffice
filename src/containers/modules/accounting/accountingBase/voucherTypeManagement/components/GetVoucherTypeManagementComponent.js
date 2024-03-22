import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer, GridClient } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetVoucherTypeManagementcolumn';
import Grid from '@material-ui/core/Grid';
import "./GetVoucherTypeManagementComponent.css";
import DropDownComponent from 'shared/components/dropDown/dropDown';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete';
import Input from 'shared/components/formInput/inputForm';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import toastr from 'toastr';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import GetVoucherTypeManagamentService from '../services/GetVoucherTypeManagamentService';
import ChangeVoucherTypeManagementPriorityService from '../services/ChangeVoucherTypeManagementPriorityService';
import FaIcon from 'shared/components/Icon/Icon';
import DeleteVoucherTypeManagementService from '../services/DeleteVoucherTypeManagementService';
const $ = require("jquery");
// import GetChequePaperServices from "../services/GetChequePaperServices";
// import GetChequeBookServices from "../../chequeBook/services/GetChequeBookServices";
// import {chequeBookTitleWidoutHeaderTemplate} from "../../../../../../constants/chequeBookTitleWidoutHeaderTemplate";


class GetVoucherTypeManagementComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // sort: [
            //     {
            //         field: "code",
            //         dir: "asc"
            //     }
            // ],
            ChangePriorityModal: false,
            voucherTypeDeleteModal: false,

            priority: 0,
            code: 0,




            columns: Columns(),
           

        };
    }

    getTradeList = () => {
        let self = this;

        $("#voucherTypeManagement").kendoGrid({
           
            dataSource: {
                transport: {
                    read: function (option) {
                        if (option.data.state) {
                            self = option.data
                        }
                        GetVoucherTypeManagamentService.getallvouchercategoriesMethod({},(response) => {
                            option.success(response);
                            console.log('option.data.sort',option.data.sort);
                        })
                    }
                },

                pageSize: 50,
                // sort: {
                //     field: "title",
                //     dir: "desc"
                // },
                serverPaging: false,
                serverSorting: false,
                schema: {
                    data: "result",
                    total: "totalRecords"
                },
                // aggregate: [
                //     { field: "remainValue", aggregate: "sum" },
                //     { field: "amount", aggregate: "sum" },
                //     { field: "requestedAmount", aggregate: "sum" },
                // ]
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
            // toolbar: excelAndPdfToolbar,
            noRecords: {
                template: '<p class="orange-page font-size-2 no-data">رکوردی جهت نمایش وجود ندارد.</p>'
            },
            dataBound: function (e) {
                var scrollOffset = {
                    left:10000 ,
                   
                };
                  var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
                  container.scrollLeft(scrollOffset.left);
           
                if (this.dataSource.data().length > 0) {
                    let grid = $("#voucherTypeManagement").data("kendoGrid");
                    let items = grid.dataSource.view();
                    items.map((item, index) => {
                        let id = items[index].uid;
                        let currentRow = grid.table.find("tr[data-uid='" + id + "']");
                        // if (index === this.dataSource.data().length - 1) {
                        if (index === this.dataSource.data().length ) {
                            currentRow.css({ display: 'none', visibility: 'hidden' });
                        } else {
                            currentRow.find(".account-code").css({ color: '#039be5', cursor: 'pointer' });
                        }
                    });
                };
                //   $("#voucherTypeManagement .excel-report").on("click", function (item) {
                //     self.getExcelReport();
                //   });
                //   $("#voucherTypeManagement .pdf-report").on("click", function (item) {
                //     self.getPdfReport();
                //   });
                $("#voucherTypeManagement tbody tr td span.edit").on("click", function (item) {
                    var grid = $("#voucherTypeManagement").data("kendoGrid");
                    var row = $(item.target).closest("tr");
                    var dataItem = grid.dataItem(row);
                   
                    self.props.history.push(
                        {
                            pathname: '/main/accounting/base/editVoucherTypeManagement',
                            state: {
                                sateParams:{
                                    code:  dataItem.code,
                                }
                            }
                        })
                });
                $("#voucherTypeManagement tbody tr td span.delete").on("click", function (item) {
                    var grid = $("#voucherTypeManagement").data("kendoGrid");
                    var row = $(item.target).closest("tr");
                    var dataItem = grid.dataItem(row);
                  

                   self.setState({
                    voucherTypeDeleteModal: true,
                    code: dataItem.code
                   })
                   
                });

                $("#voucherTypeManagement tbody tr td span.editPriority").on("click", function (item) {
                    var grid = $("#voucherTypeManagement").data("kendoGrid");
                    var row = $(item.target).closest("tr");
                    var dataItem = grid.dataItem(row);
                  

                    self.setState({
                        ChangePriorityModal: true,
                        code: dataItem.code
                    })
              
                   
                });


            },
            columns: self.state.columns
        });
    };

    excelReportHandler = () => {
        // alert('excel')
        var command = {
            reportFilter: {
                
                title:  this.state.chequeBookTitleSelected.length > 0 ?  this.state.chequeBookTitleSelected.map((val) => val.title):[],
                chequeState: this.state.selectedChequeStatus.code,
                fromSerial: this.state.fromSerial,
                toSerial: this.state.toSerial,
                chequeType: this.state.selectedChequeType.code,
            
            },
            sort: [
                {
                    field: "",
                    dir: ""
                }
            ]
        };
        // GetChequePaperServices.getExcelExport(command, 'chequePaper');

    }
    pdfReportHandler = () => {
        // alert('pdf')
        var command = {
            reportFilter: {
                
                title:  this.state.chequeBookTitleSelected.length > 0 ?  this.state.chequeBookTitleSelected.map((val) => val.title):[],
                chequeState: this.state.selectedChequeStatus.code,
                fromSerial: this.state.fromSerial,
                toSerial: this.state.toSerial,
                chequeType: this.state.selectedChequeType.code,
                
            },
            sort: [
                {
                    field: "",
                    dir: ""
                }
            ]
        };
        // GetChequePaperServices.getPdfExport(command, 'chequePaper');
    }
    
       
    ChangePriorityModalCloseMethod = () => {
        this.setState({
            ChangePriorityModal: false,
        })
    }
    ChangePriorityModalConfirmMethod = () => {
        ChangeVoucherTypeManagementPriorityService.updatevouchercategorypriorityMethod({entity: {code: this.state.code, priority:parseInt(this.state.priority, 10)}}, (res) => {
            if(res.isError === false){
                this.setState({
                    ChangePriorityModal: false,
                }, () => {
                    toastr.success(res.message);
                    this.getTradeList();
                })
            }
        });
    }
  
    handleChange = (value, name) => {
        console.log([name],value.value);
        let item = value.value;
        this.setState({
            [name]: item
        })
    };
    componentDidMount(){
        this.getTradeList();
    }
    voucherTypeDeleteModalCloseMethod = () => {
        this.setState({
            voucherTypeDeleteModal: false,
        })
    }
    voucherTypeDeleteModalMethod = () => {
        DeleteVoucherTypeManagementService.deletevouchercategoryMethod({entity: this.state.code}, () => {
            this.setState({
                voucherTypeDeleteModal: false,
            }, () => {
                this.getTradeList();
            })
        })
    }
    render() {
      
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container voucherTypeManagement"}>
                
                    <div className={"k-rtl height-content-grid"}>
                        <div id="voucherTypeManagement" className="height-page"></div>
                   </div>
                </Paper>
                
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.ChangePriorityModal}
                    onClose={this.ChangePriorityModalCloseMethod}
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
                            <span style={{marginRight: '5px'}}> تغییر اولویت</span>
                        </h3>
                        <hr />
                        <Grid container spacing={8} className="no-margin">
                        <Grid item md={10}>
                                    <NumberFormatComponent id="" label="مقدار اولویت"
                                                           value={this.state.fromCredit}
                                                           handleChange={(value) => this.handleChange(value, 'priority')} type="number" isSeparator={false} />
                                </Grid>
                         
                        </Grid>
                        <br />
                        <Button variant="contained" color="primary" onClick={this.ChangePriorityModalConfirmMethod}>
                            تایید
                        </Button>
                        <Button variant="contained" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={this.ChangePriorityModalCloseMethod}>
                            انصراف
                        </Button>
                    </Paper>
                </Modal>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.voucherTypeDeleteModal}
                    onClose={this.voucherTypeDeleteModalCloseMethod}
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
                            <FaIcon color="gray" name="fa fa-trash" size={20}/>
                            <span style={{marginRight: '5px'}}>حذف</span>
                            {/*<b>*/}
                            {/*حذف {this.props.deleteHeader}*/}
                            {/*</b>*/}
                        </h3>
                        <hr />
                        {/*<h6> آیا از حذف <b> {!this.props.sateParams.fullName ?'dsdsdsd': this.props.sateParams.fullName}</b> اطمینان دارید؟ </h6>*/}
                        {/* <h3> آیا از حذف تقاضا وجه مشتری <strong>{this.state.fromPartyFullName}</strong> به مبلغ <strong>{this.state.getAmount.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</strong> مطمئن می باشید. </h3> */}
                        <h3>آیا از حذف خود مطمئن می باشید.</h3>
                        <br />
                        <Button variant="contained" color="secondary"  style={{ backgroundColor: 'red', color: '#FFF' }} onClick={this.voucherTypeDeleteModalMethod}>
                            حذف
                        </Button>
                        <Button variant="contained" color="secondary"  style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={this.voucherTypeDeleteModalCloseMethod}>
                            انصراف
                        </Button>
                    </Paper>
                </Modal>
            </React.Fragment>

        )
    }
}

export default GetVoucherTypeManagementComponent;
