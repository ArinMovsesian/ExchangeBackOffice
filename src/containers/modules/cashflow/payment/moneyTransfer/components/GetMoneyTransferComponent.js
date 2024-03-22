import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import './GetMoneyTransferComponent.css';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import GetPartyBankAccountsByPartyIdService
    from "../../../payment/paymentList/services/GetPartyBankAccountsByPartyIdService";
import kendo from "@progress/kendo-ui";
import Columns from "../constants/GetMoneyTransferContants";
import Grid from "@material-ui/core/Grid";
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import FaIcon from 'shared/components/Icon/Icon';
import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete';
import GetChequeBookServices from "../../../chequeManagement/chequeBook/services/GetChequeBookServices";
import moment from 'moment';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import ComboBoxServerSideBest from "shared/components/dropDown/comboBox/serverSideComboBox";
import GetEnum from 'services/getEnum';
import GetMainMarket from "../../../../../../services/GetMainMarkets";
import GetMoneyTransferServices from "../services/GetMoneyTransferServices";
import DropDownComponent from 'shared/components/dropDown/dropDown';
import GetPartiesService from "../../../../personsAndCustomers/customers/customersList/services/GetPartiesService";
import finalConfirmationReceiveService from "../../../Receivce/receiveList/services/finalConfirmationReceiveService";
import confirmationReceiveService from "../../../Receivce/receiveList/services/confirmationReceiveService";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import finalConfirmationTransferService from "../services/finalConfirmationTransferService";
import DeletePaymentService from "../../paymentList/services/DeletePaymentService";
import { excelAndPdfToolbar } from 'constants/excelPdfToolbar';
import toastr from 'toastr';
let  selectedIds = [];
const $ = require("jquery");
class GetMoneyTransferComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fromDate: moment(new Date()),
            toDate: moment(new Date().setDate(new Date().getDate() + 7)),
            fromPrice: null,
            toPrice: null,

            mainMarket: {
                name:"mainMarketSelected",
                field:'title',
                list:[],
                label:"بازار"
            },
            mainMarketSelected: [],








            columns: Columns(),
            open: false,



            transferType: {
                name: "selectedTransferType",
                feild: "title",
                label: "نوع انتقال",
                list: []
            },
            selectedTransferType: {code: 0, title: ''},









            partyTransmitter: {
                // name: "selectedPartyTransmitter",
                field: "fullName",
                placeholder: "جتسجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
            },
            selectedPartyTransmitter: {fullName : '', id: 0},


            partyReceiver: {
                // name: "selectedPartyReceiver",
                field: "fullName",
                placeholder: "جتسجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
            },
            selectedPartyReceiver: {fullName : '', id: 0},




            searchBankDepositTransmitter: {
                name: "selectedSearchBankDepositTransmitter",
                // field: "accountNumber",
                placeholder: "حساب بانکی انتقال دهنده",
                textField: 'fullAccountNumber',
                keyField: 'id',
                // pro1: 'id',
                // prop2: 'accountTypeTitle'
                // list: [],
                // title: 'accountTypeTitle',
                // id: 'id'
            },
            selectedSearchBankDepositTransmitter: {id: 0},

            searchBankDepositReceiver: {
                name: "selectedSearchBankDepositReceiver",
                // field: "accountNumber",
                placeholder: "حساب بانکی انتقال گیرنده",
                textField: 'fullAccountNumber',
                keyField: 'id',
                // pro1: 'id',
                // prop2: 'accountTypeTitle'
                // list: [],
                // title: 'accountTypeTitle',
                // id: 'id'
            },
            selectedSearchBankDepositReceiver: {id: 0},
            transmitterId: 0,
            receiverId: 0,




            finalConfirmationModal: false,

            transmitterFullName: '',
            idForDelete: 0,
            modalStatus: false,
            getAmount: '',
        }
    }
    //close modal
    handleClose = () => {
        this.setState({ modalStatus: false });
    };
    finalConfirmationModalCloseH = () => {
        this.setState({finalConfirmationModal: false})
    };
    //close modal


    reRenderGrid = () => {
        DeletePaymentService.deletecashflowmasterbyidMethod({entity: this.state.idForDelete}, (res) => {
            if(res.isError === false){
                this.setState({
                    modalStatus: false
                }, () => {
                    toastr.success(res.message);
                    this.getTradeList();
                    // $('#confirmation').attr('disabled', 'disabled');
                    $('#finalConfirmation').attr('disabled', 'disabled');
                    // $('#issuingCheque').attr('disabled', 'disabled');
                    // $('#chequeDelete').attr('disabled', 'disabled');
                })
            }else{
               
                this.setState({
                    modalStatus: false
                }, () => {
                    this.getTradeList();
                    // $('#confirmation').attr('disabled', 'disabled');
                    $('#finalConfirmation').attr('disabled', 'disabled');
                    // $('#issuingCheque').attr('disabled', 'disabled');
                    // $('#chequeDelete').attr('disabled', 'disabled');
                })
            }
            
        })
    };


    componentDidMount() {
        GetMainMarket( (response)=>  DropDownListDataProvider(this,"mainMarket",response));
        GetEnum("transfertype", (response)=>  {DropDownListDataProvider(this,"transferType",response)});
        this.getTradeList();
    }

    handleChange = (value, name) => {
        let item = value.value;
        this.setState({
            [name]: item
        })
    };
    handleDate = (value, name) =>{
        this.setState({
            [name]: value
        })
    };
    removeMultiSelectHandles = (event, name) => {
        let list = this.state[name];

        for(let i = 0; i < this.state[name].length; i++){
            if(event.id == this.state[name][i].id){
                list.splice(i,1);
            }
        }
        this.setState({
            [name]: list
        });
        console.log('remove in parent', event);
    };
    addMultiSelectHandles = (event, name) => {
        let list = this.state[name];
        list.push(event);
        this.setState({
            [name]: list
        });
        console.log('add in parent', event);
    };


    handleExpandSearchPanel = () => {
        this.setState({
            open: !this.state.open
        })
    };
    search = () => {
        console.log('this',this);
        $("#moneyTransferList").data("kendoGrid").dataSource.read(this);
        // this.getTradeList();
    };
 
    getTradeList = () => {
        let self = this;
        $("#moneyTransferList").kendoGrid({
            dataSource: {
                transport: {
                    read: function (option) {
                        if (option.data.state) {
                            self = option.data
                        }
                        var command = {
                            reportFilter: {
                                id: 0,
                                startAmount: self.state.fromPrice? parseInt(self.state.fromPrice.replace(/,/g, '')) : '',
                                endAmount: self.state.toPrice? parseInt(self.state.toPrice.replace(/,/g, '')) : '',
                                // states: self.state.cashFlowStateSelected.length> 0 ? self.state.cashFlowStateSelected.map(s=>{return s.code}) : [],
                                mainMarkets: self.state.mainMarketSelected.length> 0 ? self.state.mainMarketSelected.map(s=>{return s.id}) : [],
                                startDate: self.state.fromDate,
                                endDate: self.state.toDate,
                                transmitterId: self.state.transmitterId,
                                receiverId: self.state.receiverId,
                                transferType: self.state.selectedTransferType.code === 0? null: self.state.selectedTransferType.code
                            },
                            OptionalFilter: {
                                page: option.data.page ? option.data.page : 1,
                                take: option.data.take ? option.data.take : 50,
                                sort: option.data.sort ? option.data.sort :
                                    [{
                                        field: "dueDate",
                                        dir: "asc"
                                    }]
                            }
                        };
                        GetMoneyTransferServices.getflattransferMethod(command, function (response) {
                            option.success(response);
                            $("#moneyTransferList .k-grid-footer .k-grid-footer-wrap " +
                                "tbody tr td div.total-amount-sum").text(kendo.toString(response.totalAmountSum, 'n0'));
                        })
                    }
                },

                pageSize: 50,
                sort: {
                    field: "dueDate",
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
                ]
            },

            autoBind: true,
            sortable: {
                allowUnsort: false
            },
            resizable: true,
            // reorderable: true,
            // navigatable: false,
            // selectable: "multiple",
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
            toolbar: `<button id="finalConfirmation" disabled="true">
                    تایید نهایی</button>
                    ${excelAndPdfToolbar}
                    `,
            dataBound: function (e) {
                var scrollOffset = {
                    left:10000 ,
                };
                  var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
                  container.scrollLeft(scrollOffset.left);
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
                    let grid = $("#moneyTransferList").data("kendoGrid");
                    let items = grid.dataSource.view();
                    items.map((item, index) => {
                        let id = items[index].uid;
                        let currentRow = grid.table.find("tr[data-uid='" + id + "']");
                        // if (index === this.dataSource.data().length - 1) {
                        if (index === this.dataSource.data().length) {
                            currentRow.css({ display: 'none', visibility: 'hidden' });

                        } else {
                            currentRow.find(".account-code").css({ color: '#039be5', cursor: 'pointer' });
                        }
                    });
                }
                $("#moneyTransferList tbody tr td span.edit").on("click", function (item) {
                    var grid = $("#moneyTransferList").data("kendoGrid");
                    var row = $(item.target).closest("tr");
                    var dataItem = grid.dataItem(row);
                    console.log('self', self);
                    self.props.history.push(
                        {
                            pathname: '/main/cashFlow/payment/editMoneyTransfer',
                            state: {
                                sateParams:{
                                    partyId:  dataItem.partyId,
                                    id: dataItem.id,
                                    fullName: dataItem.fullName,
                                    nationalId: dataItem.nationalId
                                }
                            }

                        })
                });
                $("#moneyTransferList tbody tr td span.delete").on("click", function (item) {
                    var grid = $("#moneyTransferList").data("kendoGrid");
                    var row = $(item.target).closest("tr");
                    var dataItem = grid.dataItem(row);
                    // alert(dataItem.id);

                    self.setState({
                        modalStatus: true,
                        idForDelete: dataItem.id,
                        transmitterFullName: dataItem.transmitterFullName,
                        getAmount: dataItem.amount,
                    })
                    // console.log('self', self);
                    // self.props.history.push(
                    //     {
                    //         pathname: '/main/cashFlow/receive/editReceive',
                    //         state: {
                    //             sateParams:{
                    //                 partyId:  dataItem.partyId,
                    //                 id: dataItem.id,
                    //                 fullName: dataItem.fullName,
                    //                 nationalId: dataItem.nationalId
                    //             }
                    //         }
                    //
                    //     })
                });
               

           console.log('self', self);
            },
            columns: self.state.columns,
            change: self.checkBoxSelectHandles,
        });
        $("#finalConfirmation").on("click", function () {
            self.setState({
                finalConfirmationModal: true
            })
        });
        $("#moneyTransferList .excel-report").on("click", function (item) {
            self.getExcelReport();
        });
        $("#moneyTransferList .pdf-report").on("click", function (item) {
            self.getPdfReport();
        });


    };


    getCommand = () => {
        var grid = $("#moneyTransferList").data("kendoGrid");
        var dataSource = grid.dataSource;
    
        var command = {
          reportFilter: {
            id: 0,
            startAmount: this.state.fromPrice? parseInt(this.state.fromPrice.replace(/,/g, '')) : '',
            endAmount: this.state.toPrice? parseInt(this.state.toPrice.replace(/,/g, '')) : '',
            // states: self.state.cashFlowStateSelected.length> 0 ? self.state.cashFlowStateSelected.map(s=>{return s.code}) : [],
            mainMarkets: this.state.mainMarketSelected.length> 0 ? this.state.mainMarketSelected.map(s=>{return s.id}) : [],
            startDate: this.state.fromDate,
            endDate: this.state.toDate,
            transmitterId: this.state.transmitterId,
            receiverId: this.state.receiverId,
            transferType: this.state.selectedTransferType.code === 0? null: this.state.selectedTransferType.code
            
          },
          OptionalFilter: {
            page: dataSource ? dataSource.page() : 1,
            take: dataSource ? dataSource.pageSize() : 50,
            // take: option.data.take ? option.data.take : 50,
            sort: dataSource ? dataSource.sort() :
              [{
                field: "dueDate",
                dir: "asc"
              }]
          }
        }
        return command;
      }
     getExcelReport = () => {
        var command = this.getCommand();
        
       
        GetMoneyTransferServices.getExcelExport(command, 'انتقال وجه');
    
      }

    
      getPdfReport = () => {
        var command = this.getCommand();
        
       
        GetMoneyTransferServices.getPdfExport(command, "انتقال وجه");
    
      }











    checkBoxSelectHandles = (arg) => {
        let temp = Object.keys(arg.sender._selectedIds);
        let convertedTemp  = temp.map((value) => {
            return parseInt(value, 10);
        });
        if(convertedTemp.length === 0){
            $('#finalConfirmation').attr('disabled', 'disabled');
        }else{
            $('#finalConfirmation').removeAttr('disabled');
        }
        selectedIds = convertedTemp;
    };
    handleChangeTrans = (value) => {
        console.log('handleChangeTrans',value.value.code);
        if(value.value.code === '1' || value.value.code === 1){
            this.setState({
                selectedTransferType: value.value,
                selectedPartyTransmitter: {fullName : '', id: 0},
                selectedPartyReceiver:  {fullName : '', id: 0},
                selectedSearchBankDepositReceiver: {id: 0},
                selectedSearchBankDepositTransmitter: {id: 0}
            })
        }else if(value.value.code === '2' || value.value.code === 2) {
            this.setState({
                selectedTransferType: value.value,
                selectedPartyTransmitter: {fullName : '', id: 0},
                selectedPartyReceiver:  {fullName : '', id: 0},
                selectedSearchBankDepositReceiver: {id: 0},
                selectedSearchBankDepositTransmitter: {id: 0}
            })
        }
        console.log(value);


    };
    handlePartyChangeTransmitter = (item) => {
        console.log('party',item.value);
        if(item.value === ''){
            this.setState({
                selectedPartyTransmitter: item.value,
                transmitterId: 0
            })
        }else{
            this.setState({
                selectedPartyTransmitter: item.value,
                transmitterId: item.value.id,
            })
        }

    };
    handlePartyChangeReceiver = (item) => {
        if(item.value === ''){
            this.setState({
                selectedPartyReceiver: item.value,
                receiverId: 0,
            })
        }else {
            this.setState({
                selectedPartyReceiver: item.value,
                receiverId: item.value.id,
            })
        }

    };
    ComboBoxServerSideHandlerTransmitter = (event) => {
        console.log('ComboBoxServerSideHandler',event);
        if(event === null) {
            this.setState({
                selectedSearchBankDepositTransmitter: {},
                transmitterId: 0

            })
        }else {
            this.setState({
                selectedSearchBankDepositTransmitter: event,
                transmitterId: event.id
            })
        }
    };
    ComboBoxServerSideHandlerReceiver = (event) => {
        console.log('ComboBoxServerSideHandler',event);
        if(event === null) {
            this.setState({
                selectedSearchBankDepositReceiver: {},
                receiverId: 0

            })
        }else {
            this.setState({
                selectedSearchBankDepositReceiver: event,
                receiverId: event.id
            })
        }
    };



    finalConfirmationModalH = () => {
        finalConfirmationTransferService.finalconfirmationtransferMethod({entity: {cashFlowMasterIds: selectedIds} },(res) => {
            selectedIds = [];
            if(res.isError === false){
                this.setState({
                    finalConfirmationModal: false
                }, () => {
                    toastr.success(res.message);
                    this.getTradeList();
                    $('#finalConfirmation').attr('disabled', 'disabled');
                })
            }
        })
    };
    render() {

        let outPut = null;
        if( this.state.selectedTransferType.code === 1) {
            outPut =
                <React.Fragment>
                    <Grid item md={4}>
                        <AutoCompleteComponent {...this.state.partyTransmitter}
                                               handleChange={(value) => this.handlePartyChangeTransmitter(value)}
                                               value={this.state.selectedPartyTransmitter.fullName}
                                               service={GetPartiesService.getAllPartyForAutocomplete}
                                               label="انتقال دهنده"
                                               required
                        />
                    </Grid>
                    <Grid item md={4}>
                        <AutoCompleteComponent {...this.state.partyReceiver}
                                               handleChange={(value) => this.handlePartyChangeReceiver(value)}
                                               value={this.state.selectedPartyReceiver.fullName}
                                               service={GetPartiesService.getAllPartyForAutocomplete}
                                               label="انتقال گیرنده"
                                               required
                        />
                    </Grid>
                </React.Fragment>
        }else if(this.state.selectedTransferType.code === 2){
            outPut =
                <React.Fragment>
                <Grid item md={4}>
                    <div className="k-rtl">
                        <ComboBoxServerSideBest
                            {...this.state.searchBankDepositTransmitter}
                            handleChange={(value) => this.ComboBoxServerSideHandlerTransmitter(value)}
                            service={GetChequeBookServices.searchBankDepositMethod}
                            defaultVal={this.state.selectedSearchBankDepositTransmitter}
                            validity={false}
                        />
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div className="k-rtl">
                        <ComboBoxServerSideBest
                            {...this.state.searchBankDepositReceiver}
                            handleChange={(value) => this.ComboBoxServerSideHandlerReceiver(value)}
                            service={GetChequeBookServices.searchBankDepositMethod}
                            defaultVal={this.state.selectedSearchBankDepositReceiver}
                            validity={false}
                        />
                    </div>
                </Grid>
                </React.Fragment>
        }


        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container moneyTransferList"}>
                    <Filter
                        search={this.search}
                        handleExpandSearchPanel={this.handleExpandSearchPanel}
                        {...this.state}
                    >
                        <div classPage={"height-search"}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={1}>
                                    <div className="k-rtl">
                                        <DropDownComponent {...this.state.transferType}
                                                           handleChange={(value) => this.handleChangeTrans(value)} isFilterable={false}
                                                           value={this.state.selectedTransferType} required/>
                                    </div>
                                </Grid>
                                {
                                    outPut
                                }
                            </Grid>


                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={2}>
                                    <PersianDatePicker selectedDate={this.state.fromDate} label="از تاریخ" handleOnChange={(value) => this.handleDate(value, 'fromDate')} />
                                </Grid>
                                <Grid item md={2}>
                                    <PersianDatePicker selectedDate={this.state.toDate} label="تا تاریخ" handleOnChange={(value) => this.handleDate(value, 'toDate')} />
                                </Grid>
                                <Grid item md={3}>
                                    <NumberFormatComponent id="" label="از مبلغ"
                                                           value={this.state.fromPrice}
                                                           handleChange={(value) => this.handleChange(value, 'fromPrice')} type="number" isSeparator={true} />
                                </Grid>
                                <Grid item md={3}>
                                    <NumberFormatComponent id="" label="تا مبلغ"
                                                           value={this.state.toPrice}
                                                           handleChange={(value) => this.handleChange(value, 'toPrice')} type="number" isSeparator={true} />
                                </Grid>

                            </Grid>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={5}>
                                    <div className="k-rtl">
                                        <MultiSelectComponent
                                            {...this.state.mainMarket}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            isFilterable={true}
                                            value={this.state.mainMarketSelected} />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Filter>
                    <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid")}>
                        <div id="moneyTransferList" className="height-page"></div>
                    </div>
                </Paper>

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.modalStatus}
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
                            <FaIcon color="gray" name="fa fa-trash" size={20}/>
                            <span style={{marginRight: '5px'}}>حذف</span>
                            {/*<b>*/}
                            {/*حذف {this.props.deleteHeader}*/}
                            {/*</b>*/}
                        </h3>
                        <hr />
                        {/*<h6> آیا از حذف <b> {!this.props.sateParams.fullName ?'dsdsdsd': this.props.sateParams.fullName}</b> اطمینان دارید؟ </h6>*/}
                        <h3> آیا از حذف انتقال وجه مشتری <strong>{this.state.transmitterFullName}</strong> به مبلغ <strong>{this.state.getAmount.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</strong> مطمئن می باشید. </h3>
                        <br />
                        <Button variant="contained" color="secondary"  style={{ backgroundColor: 'red', color: '#FFF' }} onClick={this.reRenderGrid}>
                            حذف
                        </Button>
                        <Button variant="contained" color="secondary"  style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={this.handleClose}>
                            انصراف
                        </Button>
                    </Paper>
                </Modal>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.finalConfirmationModal}
                    onClose={this.finalConfirmationModalCloseH}
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
                            <span style={{marginRight: '5px'}}>تایید نهایی</span>
                        </h3>
                        <hr />

                        <h3> آیا از <strong>تایید نهایی</strong> خود مطمئن می باشید. </h3>
                        <br />
                        <Button variant="contained" color="primary" onClick={this.finalConfirmationModalH}>
                            تایید نهایی
                        </Button>
                        <Button variant="contained" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={this.finalConfirmationModalCloseH}>
                            انصراف
                        </Button>
                    </Paper>
                </Modal>
            </React.Fragment>

        )
    }
}

export default GetMoneyTransferComponent;
