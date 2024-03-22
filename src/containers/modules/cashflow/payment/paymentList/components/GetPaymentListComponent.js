import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
// import Columns from '../constants/GetReceiveListColumn';
import Grid from '@material-ui/core/Grid';
import './GetPaymentListComponent.css';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete';
import Input from 'shared/components/formInput/inputForm';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
// import {chequeBookTitleWidoutHeaderTemplate} from "../../../../../../constants/chequeBookTitleWidoutHeaderTemplate";
import moment from 'moment';
import GetMainMarket from "../../../../../../services/GetMainMarkets";
import GetChequeBookServices from "../../../chequeManagement/chequeBook/services/GetChequeBookServices";
import Columns from "../constants/GetPaymentListColumn";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import GetPartyBankAccountsByPartyIdService from "../services/GetPartyBankAccountsByPartyIdService";
import { Typography, CircularProgress } from '@material-ui/core';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import GetAllCashFlowCategoryService from "../../../Receivce/receiveList/services/GetAllCashFlowCategoryService";
import kendo from "@progress/kendo-ui";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Icon from '@material-ui/core/Icon';
import FaIcon from 'shared/components/Icon/Icon';
import DeleteReceiveService from "../../../Receivce/receiveList/services/DeleteReceiveService";
import DeletePaymentService from "../services/DeletePaymentService";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ComboBoxServerSideBest from "shared/components/dropDown/comboBox/serverSideComboBox";
import Radio from '@material-ui/core/Radio';
import finalConfirmationReceiveService from "../../../Receivce/receiveList/services/finalConfirmationReceiveService";
import confirmationReceiveService from "../../../Receivce/receiveList/services/confirmationReceiveService";
import finalConfirmationPaymentService from "../services/finalConfirmationPaymentService";
import confirmationPaymentService from "../services/confirmationPaymentService";
import RadioButtons from "../../../../../../shared/components/radioButtons/radioButtons";
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import GetPaymentForIssuingChequeService from "../services/GetPaymentForIssuingChequeService";
import suggestChequeSerialByBankDepositIdService from "../services/suggestChequeSerialByBankDepositIdService";
import getCashFlowChequeMasterByBankDepositIdService from "../services/getCashFlowChequeMasterByBankDepositIdService";
import suggestChequeSerialByCashFlowChequeMasterIdService from "../services/suggestChequeSerialByCashFlowChequeMasterIdService";
import saveOrUpdateChequePaymentService from '../services/saveOrUpdateChequePaymentService';
import toastr from 'toastr';
import deleteIssuingChequeServices from '../services/deleteIssuingChequeServices';
import deleteIssuingChequeGroupServices from '../services/deleteIssuingChequeGroupServices';
import downloadChequePreviewPdfService from '../services/downloadChequePreviewPdfService';
import GetAllBankNames from '../../../../../../services/getBanks';
import { excelAndPdfToolbar } from 'constants/excelPdfToolbar';
import DownloadExportsService from '../services/DownloadExportsService';
import chequePaymentCommandService from '../services/chequePaymentCommandService';

const $ = require("jquery");
let  selectedIds = [];
let getflatpayment = [];
class GetPaymentListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fromDate: moment(new Date()),
            toDate:  moment(new Date().setDate(new Date().getDate() + 7)),
            fromPrice: null,
            toPrice: null,
            cashFlowState: {
                name:"cashFlowStateSelected",
                field:'title',
                list:[],
                label:"وضعیت پرداخت"
            },
            cashFlowStateSelected: [],
            mainMarket: {
                name:"mainMarketSelected",
                field:'title',
                list:[],
                label:"بازار"
            },
            mainMarketSelected: [],
            bankDeposit: {
                name: "bankDepositSelected",
                // field: "fullName",
                // list: [],
                // value:'',
                placeholder: 'بانک پرداختی',
                dataTextField: 'fullAccountNumber',
                dataValueField: 'id',
                fieldSearch: 'phrase',
                template: null,
                headerTemplate: null
            },
            bankDepositSelected: [],
            columns: Columns(),
            open: false,
            deleteCashFlowMasterByIdModal: false,
            idForDelete: 0,
            finalConfirmationModal: false,
            confirmationModal: false,
            issuingChequeModal: false,
            issuingChequePrintModal: false,
            toPartyFullName: '',
            selectedIds: [],
            chequeDate:  moment(new Date()),
            chequeBook: {
                name: "selectedChequeBook",
                // feild: "fullAccountTitle",
                label: "عنوان دسته چک",
                list: []
            },
            selectedChequeBook: {id: 0},
            customerAccountNumber:{
                name: "selectedCustomerAccountNumber",
                // feild: 'id',
                // dataItemKey: 'id',
                label: "شماره حساب مشتری",
                list: []
            },
            selectedCustomerAccountNumber: {id: 0},
            bankBalance: undefined,
           
            chequeAmount: 0,
            chequeDetailType: {
                defaultValue: 0,
                list: [],
            },
            description: '',
            chequeHashur: false,
            chequeDateLetter: false,
            id: undefined,
            chequeBookIDForOnChange: 0,
            toPartyId: 0,



            chequeDeleteModal: false,



            chequeSerialNumber: '___',
            bankTitle: '___',
            accountNumber: '___',
            issuingChequeModalLoader: true,


            amountText: '',
            getAmount: 0,
            dueDateJalali:'',
            dueDateJalaliText: '',
            chequeAmountPrintFormat: 0,
            bank: {
                name: "selectedBank",
                feild: "title",
                label: "نام بانک",
                list: []
            },
            selectedBank: {},

        };

    }
    bankChange = (value) => {
        
        let item = value.value;
        console.log('QQQQ', item);
        this.setState({
            selectedBank: item
        })
    };
    componentDidMount() {
        GetMainMarket( (response)=>  DropDownListDataProvider(this,"mainMarket",response));
        // GetEnum("cashflowstate", (response)=>  {DropDownListDataProvider(this,"cashFlowState",response)});
        GetAllBankNames((response)=>  DropDownListDataProvider(this,"bank",response));
        GetEnum("CashFlowStateExceptDeleted", (response)=>  {DropDownListDataProvider(this,"cashFlowState",response)});
        GetEnum("chequedetailtype", (response)=>  {
            console.log('CC', response.result);
            this.setState({
                chequeDetailType: {
                    ...this.state.chequeDetailType,
                    list: response.result,
                }
            });
            console.log('chequedetailtype', response);
        });
        this.getTradeList();



    }

    //******** Delete CashFlow *******//
    deleteCashFlowMasterByIdModalCloseH = () => {
        this.setState({ deleteCashFlowMasterByIdModal: false });
    };
    deleteCashFlowMasterByIdH = () => {
        DeletePaymentService.deletecashflowmasterbyidMethod({entity: this.state.idForDelete}, (res) => {
            if(res.isError === false){
                this.setState({
                    deleteCashFlowMasterByIdModal: false
                }, () => {
                    toastr.success(res.message);
                    this.getTradeList();
                    $('#confirmation').attr('disabled', 'disabled');
                    $('#finalConfirmation').attr('disabled', 'disabled');
                    $('#issuingCheque').attr('disabled', 'disabled');
                    $('#chequeDelete').attr('disabled', 'disabled');
                })
            }else{
               
                this.setState({
                    deleteCashFlowMasterByIdModal: false
                }, () => {
                    this.getTradeList();
                    $('#confirmation').attr('disabled', 'disabled');
                    $('#finalConfirmation').attr('disabled', 'disabled');
                    $('#issuingCheque').attr('disabled', 'disabled');
                    $('#chequeDelete').attr('disabled', 'disabled');
                })
            }
        })
    };
    //******** Delete CashFlow *******//

    //******** Confirmation CashFlow *******//
    confirmationModalCloseH = () => {
        this.setState({confirmationModal: false})
    };
    confirmationModalH = () => {
        confirmationPaymentService.confirmationpaymentMethod({entity: {ids: selectedIds}}, (res) => {
            // selectedIds = [];
            if(res.isError === false){
                this.setState({
                    confirmationModal: false
                }, () => {
                    toastr.success(res.message);
                    this.getTradeList();
                    $('#confirmation').attr('disabled', 'disabled');
                    $('#finalConfirmation').attr('disabled', 'disabled');
                    $('#issuingCheque').attr('disabled', 'disabled');
                    $('#chequeDelete').attr('disabled', 'disabled');
                })
            }
        })
    };
    //******** Confirmation CashFlow *******//


    //******** FinalConfirmation CashFlow *******//
    finalConfirmationModalCloseH = () => {
        this.setState({finalConfirmationModal: false});
    };

    finalConfirmationModalH = () => {
        finalConfirmationPaymentService.finalconfirmationpaymentMethod({entity: {cashFlowMasterIds: selectedIds}},(res) => {
            if(res.isError === false){
                this.setState({
                    finalConfirmationModal: false
                }, () => {
                        toastr.success(res.message);
                        this.getTradeList();
                        $('#confirmation').attr('disabled', 'disabled');
                        $('#finalConfirmation').attr('disabled', 'disabled');
                        $('#issuingCheque').attr('disabled', 'disabled');
                        $('#chequeDelete').attr('disabled', 'disabled');
                })
            }
        })
    };
    //******** FinalConfirmation CashFlow *******//

    //******** IssuingCheque CashFlow *******//

    issuingChequeModalCloseH = () => {
        this.setState(
            {
                issuingChequeModal: false,
                customerAccountNumber:{
                    feild: "fullAccountTitle",
                    name: "selectedCustomerAccountNumber",
                    label: "شماره حساب مشتری",
                    list: [],
                },
                selectedCustomerAccountNumber: {id: 0},
                chequeDate: moment(new Date()),
                chequeAmount: 0,
  
                chequeBook:{
                    name: "selectedChequeBook",
                    feild: "fullName",
                    label: "عنوان دسته چک",
                    list: [],
                },
                selectedChequeBook: {id: 0},
                chequeHashur: false,
                chequeDateLetter: false,
                description: '',
                chequeDetailType: {
                    defaultValue: 0,
                    list: [],

                },
                chequeSerialNumber: '___',
                bankTitle: '___',
                accountNumber: '___',

                issuingChequeModalLoader: 'none',
              
            }
            );
    
    };

    issuingChequeModalSaveH = () => {
        let getpaymentforissuingcheque = [];
        for(let i = 0; i < selectedIds.length; i++){
            getpaymentforissuingcheque.push(
                {
                    "cashFlowMasterIds": selectedIds[i]
                }
            )
        }
        saveOrUpdateChequePaymentService.saveorupdatechequepaymentMethod({
        
            entity: {
                items: getpaymentforissuingcheque,
                cashFlowChequeMasterId: this.state.selectedChequeBook.id,
                chequeNumber: parseInt(this.state.chequeSerialNumber, 10),
                toPartyBankAccountId: this.state.selectedCustomerAccountNumber.id,
                chequeHashur: this.state.chequeHashur,
                chequeDateLetter: this.state.chequeDateLetter,
                chequeDescription: this.state.description,
                chequeDetailType:parseInt(this.state.chequeDetailType.defaultValue, 10),
                toPartyId: this.state.toPartyId
            }
        }, (res) => {
            if(res.isError === false){
                toastr.success(res.message);
                this.getTradeList();
                this.issuingChequeModalCloseH();
            }
        })
    };
    //******** IssuingCheque CashFlow *******//



    //******** IssuingChequePrint CashFlow *******//
    issuingChequePrintModalCloseH = () => {
        this.setState({issuingChequePrintModal: false})
    };
    issuingChequeModalPrint = () => {
        for(let i = 0 ; i < this.state.bank.list.length; i++){
            if(this.state.bank.list[i].codeId == this.state.selectedChequeBook.bankId){
                
                this.setState({
                    selectedBank: this.state.bank.list[i]
                })
            }
           
        }
        this.setState({
            issuingChequePrintModal: true
        })
    };
     //******** IssuingChequePrint CashFlow *******//




    //******** DeleteCheque CashFlow *******//
    chequeDeleteModalCloseH = () => {
        this.setState({chequeDeleteModal: false});
    }
    openChequeDeleteModal = () => {
        this.setState({chequeDeleteModal: true,})
    }
    deleteIssuingChequeH = () => {
        console.log(selectedIds);
        deleteIssuingChequeServices.deleteIssuingChequeMethod({entity: {ids: selectedIds}}, (res) => {
            if(res.isError === false){
                
                this.setState({
                    chequeDeleteModal: false,
                }, () => {
                    toastr.success(res.message);
                    this.getTradeList();
                    $('#confirmation').attr('disabled', 'disabled');
                    $('#finalConfirmation').attr('disabled', 'disabled');
                    $('#issuingCheque').attr('disabled', 'disabled');
                    $('#chequeDelete').attr('disabled', 'disabled');
                })
            }
            
        });
    };
    deleteIssuingChequeGroupH = () => {
        deleteIssuingChequeGroupServices.deleteIssuingChequegroupMethod({entity: {ids: selectedIds}}, (res) => {
            if(res.isError === false){
                this.setState({
                    chequeDeleteModal: false,
                }, () => {
                    toastr.success(res.message);
                    this.getTradeList();
                    $('#confirmation').attr('disabled', 'disabled');
                    $('#finalConfirmation').attr('disabled', 'disabled');
                    $('#issuingCheque').attr('disabled', 'disabled');
                    $('#chequeDelete').attr('disabled', 'disabled');

                })
            }
        });
    }
   //******** DeleteCheque CashFlow *******//


    handleChange = (value, name) => {
        let item = value.value;
        this.setState({
            [name]: item
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
      
    };
    addMultiSelectHandles = (event, name) => {
        let list = this.state[name];
        list.push(event);
        this.setState({
            [name]: list
        });
      
    };
    handleExpandSearchPanel = () => {
        this.setState({
            open: !this.state.open
        })
    };
    search = () => {
        $("#paymentList").data("kendoGrid").dataSource.read(this);
        // this.getTradeList();
    };

    getCommand = () => {
        var grid = $("#paymentList").data("kendoGrid");
        var dataSource = grid.dataSource;
    
        var command = {
          reportFilter: {
            id: 0,
            startAmount: this.state.fromPrice ? parseInt(this.state.fromPrice.replace(/,/g, '')) : '',
            endAmount: this.state.toPrice ? parseInt(this.state.toPrice.replace(/,/g, '')) : '',
            states: this.state.cashFlowStateSelected.length> 0 ? this.state.cashFlowStateSelected.map(s=>{return s.code}) : [],
            mainMarkets: this.state.mainMarketSelected.length> 0 ? this.state.mainMarketSelected.map(s=>{return s.id}) : [],
            bankDeposits: this.state.bankDepositSelected.length > 0 ?  this.state.bankDepositSelected.map((v) => v.id):[],
            startDate: this.state.fromDate,
            endDate: this.state.toDate,
            
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
        
       
        DownloadExportsService.getExcelExport(command, 'پرداخت');
    
      }

    
      getPdfReport = () => {
        var command = this.getCommand();
        
       
        DownloadExportsService.getPdfExport(command, "پرداخت");
    
      }




    getTradeList = () => {
        let self = this;
        $("#paymentList").kendoGrid({
            dataSource: {
                transport: {
                    read: function (option) {
                        if (option.data.state) {
                            self = option.data
                        }
                        var command = {
                            reportFilter: {
                                id: 0,
                                startAmount: self.state.fromPrice ? parseInt(self.state.fromPrice.replace(/,/g, '')) : '',
                                endAmount: self.state.toPrice ? parseInt(self.state.toPrice.replace(/,/g, '')) : '',
                                states: self.state.cashFlowStateSelected.length> 0 ? self.state.cashFlowStateSelected.map(s=>{return s.code}) : [],
                                mainMarkets: self.state.mainMarketSelected.length> 0 ? self.state.mainMarketSelected.map(s=>{return s.id}) : [],
                                bankDeposits: self.state.bankDepositSelected.length > 0 ?  self.state.bankDepositSelected.map((v) => v.id):[],
                                startDate: self.state.fromDate,
                                endDate: self.state.toDate,
                                
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
                        GetPartyBankAccountsByPartyIdService.getflatpaymentMethod(command, function (response) {
                            getflatpayment = response.result;
                            option.success(response);
                            $("#paymentList .k-grid-footer .k-grid-footer-wrap " +
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
                        id: 'id',
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
            // reordable: true,
            // navigatable: false,
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
            toolbar: `<button id="confirmation" disabled="true">
                        تایید
                      </button>
                    <button id="finalConfirmation" disabled="true">
                    تایید نهایی</button>
                    <button id="issuingCheque" disabled="true">صدور چک</button>
                    <button id="chequeDelete" disabled="true">حذف چک</button>
                    <button id="chequePaymentCommand" disabled="true">دستور پرداخت چک</button>
                    ${excelAndPdfToolbar}
                    `,
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
                    let grid = $("#paymentList").data("kendoGrid");
                    let items = grid.dataSource.view();
                    items.map((item, index) => {
                        let id = items[index].uid;
                        let currentRow = grid.table.find("tr[data-uid='" + id + "']");
                        // if (index === this.dataSource.data().length - 1) {
                        if (index === this.dataSource.data().length){
                            currentRow.css({ display: 'none', visibility: 'hidden' });

                        } else {
                            currentRow.find(".account-code").css({ color: '#039be5', cursor: 'pointer' });
                        }
                    });
                };
                $("#paymentList tbody tr td span.edit").on("click", function (item) {
                    var grid = $("#paymentList").data("kendoGrid");
                    var row = $(item.target).closest("tr");
                    var dataItem = grid.dataItem(row);
                    console.log('self', self);
                    self.props.history.push(
                        {
                            pathname: '/main/cashFlow/payment/editPayment',
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
                $("#paymentList tbody tr td span.delete").on("click", function (item) {
                    // alert('delete');
                    var grid = $("#paymentList").data("kendoGrid");
                    var row = $(item.target).closest("tr");
                    console.log('row',row);
                    var dataItem = grid.dataItem(row);
                    self.setState({
                        deleteCashFlowMasterByIdModal: true,
                        idForDelete: dataItem.id,
                        toPartyFullName: dataItem.toPartyFullName,
                        getAmount: dataItem.amount
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
            },
            columns: self.state.columns,
            change: self.checkBoxSelectHandles,
            
        });
        $("#confirmation").on("click", function () {
            // alert(11);
            self.setState({
                confirmationModal: true,
            })
        });
        $("#finalConfirmation").on("click", function () {
            self.setState({
                finalConfirmationModal: true
            })
        });
        $("#issuingCheque").on("click", function () {
            self.readIssuingChequeApis();
        });
        $("#chequeDelete").on("click", function() {
            self.openChequeDeleteModal();
        });

        $("#paymentList .excel-report").on("click", function (item) {
            self.getExcelReport();
        });
        $("#paymentList .pdf-report").on("click", function (item) {
            self.getPdfReport();
        });
        $("#chequePaymentCommand").on("click", function (item) {
            self.getChequePaymentCommandPdfReport();
        });

    };
    getChequePaymentCommandPdfReport = () => {
        let tempList = [];
        for(let i = 0; i < selectedIds.length; i++){
            for(let j = 0; j < getflatpayment.length; j++){
                if(selectedIds[i] == getflatpayment[j].id){
                    tempList.push(getflatpayment[j]);
                }
            }
        };

        chequePaymentCommandService.ChequePaymentCommandPdfDownloadMethod({entity:tempList
}, 'دستور پرداخت چک', '');

       console.log(getflatpayment);
       console.log(selectedIds);
       console.log(tempList);
    };
    checkBoxSelectHandles = (arg) => {
        console.log(arg);
        let temp = Object.keys(arg.sender._selectedIds);
        // console.log(arg.sender);
        // arg.sender._data.map((value) => {
        //     if(value.id == temp[0]){
        //            console.log(value);
        //     }
        // })
        let convertedTemp  = temp.map((value) => {
            return parseInt(value, 10);
        });
        console.log(convertedTemp);
        if(convertedTemp.length === 0){
            $('#confirmation').attr('disabled', 'disabled');
            $('#finalConfirmation').attr('disabled', 'disabled');
            $('#issuingCheque').attr('disabled', 'disabled');
            $('#chequeDelete').attr('disabled', 'disabled');
            $('#chequePaymentCommand').attr('disabled', 'disabled');

        }else{
            $('#confirmation').removeAttr('disabled');
            $('#finalConfirmation').removeAttr('disabled');
            $('#issuingCheque').removeAttr('disabled');
            $('#chequeDelete').removeAttr('disabled');
            $('#chequePaymentCommand').removeAttr('disabled');
        }
        selectedIds = convertedTemp;

        // selectedIds = convertedTemp;
    };
    handleDate = (value) => {
        this.setState({
            chequeDate: value
        })
    };
    handleChange = (value, name) => {
        console.log([name],value.value);
        let item = value.value;
        this.setState({
            [name]: item,
        })
    };
    
    ComboBoxServerSideHandler = (event) => {
        console.log('event',event);

        if(event === null) {
            this.setState({
                selectedChequeBook: {}
            })
        }else {

            // let {a a, b =} = event;
            // console.log('FF',{id, accountTypeTitle});
            this.setState({
                selectedChequeBook: event
            })
        }

    };
    handleChange(value, name) {
        console.log([name],value.value);
        let item = value.value;
        this.setState({
            [name]: item,
        })
    }
    radioChange = event => {
        console.log(event.target.value);
        this.setState({
            chequeDetailType: {
                ...this.state.chequeDetailType,
                defaultValue: event.target.value
            }
        });
    };
    handleChangeCheck = name => (event) => {
        this.setState({
            [name]: event.target.checked,
        })
    };
    handleDate = (value, name) =>{
        this.setState({
            [name]: value
        })
    };
   







    CustomerAccountNumberH = (value) =>{
        console.log('selectedCustomerAccountNumber', value.value);
        let defaultDes = '';
        if(selectedIds.length === 1){
            defaultDes = `دریافت وجه طی چک به شماره ${this.state.chequeSerialNumber === null || this.state.chequeSerialNumber === ''  || this.state.chequeSerialNumber === undefined? '___' : this.state.chequeSerialNumber}  ${this.state.bankTitle === null || this.state.bankTitle === '' || this.state.bankTitle === undefined ? '___' : this.state.bankTitle} جهت واریز به حساب ${value.value.accountNumber === null || value.value.accountNumber === '' || value.value.accountNumber === undefined? '___' : value.value.accountNumber} `;
        }else {
            defaultDes = `دریافت وجه طی چک به شماره ${this.state.chequeSerialNumber === null || this.state.chequeSerialNumber === '' || this.state.chequeSerialNumber === undefined ? '___' : this.state.chequeSerialNumber}  ${this.state.bankTitle === null || this.state.bankTitle === '' ? '___' : this.state.bankTitle} جهت واریز ظبق لیست پیوست ${value.value.accountNumber === null || value.value.accountNumber === '' || value.value.accountNumber === undefined? '___' : value.value.accountNumber} `;
        }
        this.setState({
            selectedCustomerAccountNumber: value.value,
            accountNumber: value.value.accountNumber,
            description: defaultDes
        })
    };
    readIssuingChequeApis = () => {
    
        let getpaymentforissuingcheque = [];
        for(let i = 0; i < selectedIds.length; i++){
            getpaymentforissuingcheque.push(
                {
                    "cashFlowMasterIds": selectedIds[i]
                }
            )
        };
        GetPaymentForIssuingChequeService.getpaymentforissuingchequeMethod({reportFilter: {items: getpaymentforissuingcheque}},(response) => {
           
            if(response.isError === false) {
                console.log('getpaymentforissuingchequeMethod',response);
                const {toPartyId, dueDate, amount, fromBankDepositId, amountText, dueDateJalali, dueDateJalaliText} = response.result;
                this.setState({
                    issuingChequeModal: true,
                    amountText: amountText,
                    dueDateJalali,
                    dueDateJalaliText
                }, () => {
                    GetPartyBankAccountsByPartyIdService.getpartybankaccountsbypartyidMethod({entity: toPartyId}, (getpartybankaccountsbypartyidRes) => {
                        // alert(1);
                        this.setState({
                            chequeDate: dueDate,
                            chequeAmount: amount.toString(),
                            chequeAmountPrintFormat: amount.toLocaleString(navigator.language, { minimumFractionDigits: 0 }),
                            customerAccountNumber:{
                                feild: "fullAccountTitle",
                                name: "selectedCustomerAccountNumber",
                                label: "شماره حساب مشتری",
                                list: getpartybankaccountsbypartyidRes.result,
                             
                            },
                            toPartyId: toPartyId,
                            
                        }, () => {
                            getCashFlowChequeMasterByBankDepositIdService.getcashflowchequemasterbybankdepositidMethod({entity: fromBankDepositId}, (getcashflowchequemasterbybankdepositidRes) => {
                                console.log('[]', getcashflowchequemasterbybankdepositidRes.result);
                                // if(getcashflowchequemasterbybankdepositidRes.result.length ==0){
                                //     this.setState({});
                                // }
                                // alert(2);
                                this.setState({
                                    chequeBook:{
                                        name: "selectedChequeBook",
                                        feild: "fullName",
                                        label: "عنوان دسته چک",
                                        list: getcashflowchequemasterbybankdepositidRes.result,

                                    },
                                    issuingChequeModalLoader: false
                                }, () => {
                                    for(let i = 0 ; i < this.state.chequeBook.list.length; i++){
                                        if( this.state.chequeBook.list[i].isDefault === true){
                                            this.setState({
                                                bankTitle: this.state.chequeBook.list[i].bankTitle,
                                                selectedChequeBook: this.state.chequeBook.list[i],
                                            }, () => {
                                                suggestChequeSerialByBankDepositIdService.suggestchequeserialbybankdepositidMethod({entity: fromBankDepositId}, (suggestchequeserialbybankdepositidRes) => {
                                                    // alert(3);
                                                     let defaultDes = '';
                                                     let selectedCustomerAccountNumberDropDownStatus = undefined;
                                                     if(selectedIds.length === 1){
                                                         defaultDes = `دریافت وجه طی چک به شماره ${
                                                              suggestchequeserialbybankdepositidRes.result === null ||
                                                              suggestchequeserialbybankdepositidRes.result === '' ||
                                                              suggestchequeserialbybankdepositidRes.result === undefined
                                                              ? '___' : suggestchequeserialbybankdepositidRes.result
                                                             }  ${
                                                                 this.state.bankTitle === null ||
                                                                 this.state.bankTitle === '' ||
                                                                 this.state.bankTitle === undefined
                                                                 ? '___' : this.state.bankTitle} جهت واریز به حساب ${this.state.accountNumber} `;
                                                                 selectedCustomerAccountNumberDropDownStatus = false;

                                                     }else {
                                                         defaultDes = `دریافت وجه طی چک به شماره ${
                                                             suggestchequeserialbybankdepositidRes.result === null ||
                                                             suggestchequeserialbybankdepositidRes.result === '' ||
                                                             suggestchequeserialbybankdepositidRes.result === undefined
                                                             ? '___' : suggestchequeserialbybankdepositidRes.result}  ${
                                                                 this.state.bankTitle === null ||
                                                                 this.state.bankTitle === '' ||
                                                                 this.state.bankTitle === undefined? '___' : this.state.bankTitle} جهت واریز طبق لیست پیوست `;
                                                                 selectedCustomerAccountNumberDropDownStatus = true;
                                                     }
                                                     this.setState({
                                                         selectedCustomerAccountNumberDropDownStatus: selectedCustomerAccountNumberDropDownStatus,
                                                         description: defaultDes,
                                                         chequeSerialNumber: suggestchequeserialbybankdepositidRes.result,
                                                         issuingChequeModalLoader: false,
                                                     })
                                                 })
                                            });
                                         break;   
                                        }
                                    }
                                })
                            });
                        })
                    });
                   
                    
                }) 
              
                
            }

           
        });
      
    };
    handleChangeForChequeBookTitle = (value) => {
        console.log(value.value);
        suggestChequeSerialByCashFlowChequeMasterIdService.suggestchequeserialbycashflowchequemasteridMethod({entity: value.value.id},(res) => {
            


            let defaultDes = '';
            if(selectedIds.length === 1){
                defaultDes = `دریافت وجه طی چک به شماره ${
                    res.result === null ||
                    res.result === '' ||
                    res.result === undefined
                    ? '___' : res.result}  ${
                        value.value.bankTitle === null ||
                        value.value.bankTitle === '' || 
                        value.value.bankTitle === undefined 
                        ? '___' : value.value.bankTitle} جهت واریز به حساب ${this.state.accountNumber} `;
            }else {
                defaultDes = `دریافت وجه طی چک به شماره ${res.result === null || res.result === '' || res.result === undefined ? '___' : res.result}  ${value.value.bankTitle === null || value.value.bankTitle === '' || value.value.bankTitle === undefined ? '___' : value.value.bankTitle} جهت واریز ظبق لیست پیوست `;
            }


            this.setState({
                selectedChequeBook:value.value,
                chequeSerialNumber: res.result === null ? '':res.result,
                bankTitle: value.value.bankTitle,
                description: defaultDes,
            })
        })
    }

    chequeSerialNumberH = (value) => {
        console.log(value);
        let defaultDes = '';
        if(selectedIds.length === 1){
            defaultDes = `دریافت وجه طی چک به شماره ${value.value}  ${this.state.bankTitle === null || this.state.bankTitle === '' || this.state.bankTitle === undefined ? '___' : this.state.bankTitle} جهت واریز به حساب ${this.state.accountNumber} `;
        }else {
            defaultDes = `دریافت وجه طی چک به شماره ${value.value}  ${this.state.bankTitle === null || this.state.bankTitle === '' || this.state.bankTitle === undefined ? '___' : this.state.bankTitle} جهت واریز طبق لیست پیوست ${this.state.accountNumber} `;
        }
        this.setState({
            chequeSerialNumber: value.value,
            description: defaultDes
        })
    }
    printCheque = () => {
      
    //    var newWindow = window.open();
    //    newWindow.document.write(document.getElementById("printable").innerHTML);
    //    newWindow.print();
    //    newWindow.close();

       var prtContent = document.getElementById("printable");
var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
WinPrint.document.write(prtContent.innerHTML);
WinPrint.document.close();
WinPrint.focus();
WinPrint.print();
WinPrint.close();
      
    }
    downloadChequePdf = () => {
        console.log("selectedBank: ",this.state.selectedBank.codeId);
       
        switch(this.state.selectedBank.codeId){
            case 115:  //(Saman)
                        downloadChequePreviewPdfService.CashFlowChequePreviewPdfDownloadMethod({
                        entity:  {
                         dueDateJalali: this.state.dueDateJalali,
                         dueDateJalaliText: this.state.dueDateJalaliText,
                         amount: this.state.chequeAmountPrintFormat,
                         amountText:  this.state.amountText,
                         chequeDesc: this.state.description,
                         chequeHashur: this.state.chequeHashur,
                         bankId: this.state.selectedBank.codeId
                        }}, 'SamanChequePreviewPdf');
                        break;
            case 128: //(Melat)
                    downloadChequePreviewPdfService.CashFlowChequePreviewPdfDownloadMethod({
                    entity:  {
                        dueDateJalali: this.state.dueDateJalali,
                        dueDateJalaliText: this.state.dueDateJalaliText,
                        amount: this.state.chequeAmountPrintFormat,
                        amountText:  this.state.amountText,
                        chequeDesc: this.state.description,
                        chequeHashur: this.state.chequeHashur,
                        bankId: this.state.selectedBank.codeId
                    }}, 'MelatChequePreviewPdf');
                    break;
            default:
                toastr.error('بانک فعلی موجود نیست.')      
                break;  
        

        }   
        
    }
    printChequePdf = () => {
        switch(this.state.selectedBank.codeId){
            case 115:  //(Saman)
                        downloadChequePreviewPdfService.CashFlowChequePreviewPdfDownloadMethod({
                        entity:  {
                         dueDateJalali: this.state.dueDateJalali,
                         dueDateJalaliText: this.state.dueDateJalaliText,
                         amount: this.state.chequeAmountPrintFormat,
                         amountText:  this.state.amountText,
                         chequeDesc: this.state.description,
                         chequeHashur: this.state.chequeHashur,
                         bankId: this.state.selectedBank.codeId
                        }}, 'SamanChequePreviewPdf', '_blank');
                        break;
            case 128: //(Melat)
                    downloadChequePreviewPdfService.CashFlowChequePreviewPdfDownloadMethod({
                    entity:  {
                        dueDateJalali: this.state.dueDateJalali,
                        dueDateJalaliText: this.state.dueDateJalaliText,
                        amount: this.state.chequeAmountPrintFormat,
                        amountText:  this.state.amountText,
                        chequeDesc: this.state.description,
                        chequeHashur: this.state.chequeHashur,
                        bankId: this.state.selectedBank.codeId,
                    }}, 'MelatChequePreviewPdf', '_blank');
                    break;
            default:
                toastr.error('بانک فعلی موجود نیست.')      
                break;  
        

        }   
    }
   
    render() {
       console.log('dateeeeee',this.state.chequeDate);
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container paymentList"}>
                    <Filter
                        search={this.search}
                        handleExpandSearchPanel={this.handleExpandSearchPanel}
                        {...this.state}
                    >
                        <div classPage={"height-search"}>
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
                                            {...this.state.cashFlowState}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            isFilterable={true}
                                            value={this.state.cashFlowStateSelected} />
                                    </div>
                                </Grid>
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
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={10}>
                                    <MultiSelectAutoCompleteComponent
                                        {...this.state.bankDeposit}
                                        handleChange={(value) => this.addMultiSelectHandles(value, 'bankDepositSelected')}
                                        handleRemoveItem={(value) => this.removeMultiSelectHandles(value, 'bankDepositSelected')}
                                        service={GetChequeBookServices.searchBankDepositMethod}
                                        defaultValue={this.state.bankDepositSelected.map((c) =>  {return {fullAccountNumber: c.fullAccountNumber, id: c.id}})}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </Filter>
                    <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid")}>
                        <div id="paymentList" className="height-page"></div>
                    </div>
                </Paper>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.deleteCashFlowMasterByIdModal}
                    onClose={this.deleteCashFlowMasterByIdModalCloseH}
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
                        <h3> آیا از حذف پرداخت مشتری <strong>{this.state.toPartyFullName}</strong> به مبلغ <strong>{this.state.getAmount.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</strong> مطمئن می باشید. </h3>
                        <br />
                        <Button variant="contained" color="secondary"  style={{ backgroundColor: 'red', color: '#FFF' }} onClick={this.deleteCashFlowMasterByIdH}>
                            حذف
                        </Button>
                        <Button variant="contained" color="secondary"  style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={this.deleteCashFlowMasterByIdModalCloseH}>
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

                        <h3> آیا از <strong>تایید نهایی</strong>  خود مطمئن می باشید. </h3>
                        <br />
                        <Button variant="contained" color="primary"  onClick={this.finalConfirmationModalH}>
                            تایید نهایی
                        </Button>
                        <Button variant="contained" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={this.finalConfirmationModalCloseH}>
                            انصراف
                        </Button>
                    </Paper>
                </Modal>
                <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.confirmationModal}
                onClose={this.confirmationModalCloseH}
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
                        <span style={{marginRight: '5px'}}> تایید</span>
                    </h3>
                    <hr />

                    <h3> آیا از <strong>تایید</strong>  خود مطمئن می باشید. </h3>
                    <br />
                    <Button variant="contained" color="primary" onClick={this.confirmationModalH}>
                        تایید
                    </Button>
                    <Button variant="contained"  style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={this.confirmationModalCloseH}>
                        انصراف
                    </Button>
                </Paper>
            </Modal>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.issuingChequeModal}
                    onClose={this.issuingChequeModalCloseH}
                    keepMounted={true}
                    disableBackdropClick={true}
                >
                    <Paper style={{
                        width: '600px',
                        padding: '1rem .5rem ',
                        height: 'auto',
                        outline: 'none',
                        position: 'absolute',
                        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
                        backgroundColor: '#fff',
                        top: '35%',
                        left: '45%',
                        marginLeft: '-300px',
                        marginTop: '-150px',
                    }}>
                        
                        <div style={{position: 'relative'}}>
                            {
                                this.state.issuingChequeModalLoader
                                ?
                                <div style={{backgroundColor: '#ffffffad', position: 'absolute', top: 0, left: 0, width: '580px', height: '100%', zIndex: 9999}} id="issuingChequeModalLoader">
                                    <div  className="flex flex-1 flex-col items-center justify-center height-page">
                                        <CircularProgress/>
                                    </div>
                                </div>
                                :
                                null
                            }
                           
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={11}>
                                    <PersianDatePicker selectedDate={this.state.chequeDate} label="تاریخ چک" handleOnChange={(value) => this.handleDate(value, 'chequeDate')} disabled/>
                                </Grid>
                            </Grid>

                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={11}>
                                        <div className="k-rtl">
                                            <DropDownComponent {...this.state.chequeBook}
                                                               handleChange={(value) => this.handleChangeForChequeBookTitle(value)} isFilterable={false}
                                                               value={this.state.selectedChequeBook} required/>
                                        </div>
                                </Grid>
                            </Grid>
                        
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={11}>
                                    <Input label="شماره سریال چک" type="text" handleChange={(value) => this.chequeSerialNumberH(value)}
                                           value={this.state.chequeSerialNumber} required />
                                </Grid>
                            </Grid>


                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={11}>
                                    <NumberFormatComponent
                                        id="" label="مبلغ چک"
                                        value={this.state.chequeAmount}
                                        handleChange={(value) => this.handleChange(value, 'chequeAmount')}
                                        type="number"
                                        isSeparator={true}
                                        disabled
                                        
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={11}>
                                    <div className="k-rtl">
                                        <DropDownComponent {...this.state.customerAccountNumber}
                                                           handleChange={(value) => this.CustomerAccountNumberH(value)} isFilterable={false}
                                                           value={this.state.selectedCustomerAccountNumber} required isDisabled={this.state.selectedCustomerAccountNumberDropDownStatus}/>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={11}>
                                    <RadioButtons {...this.state.chequeDetailType} radioH={this.radioChange}/>
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={11}>
                                    <Input label="شرح چک" handleChange={(e) => this.handleChange(e, 'description')} value={this.state.description} isMultiLine={true} />
                                </Grid>
                            </Grid>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.chequeHashur}
                                        onChange={this.handleChangeCheck('chequeHashur')}
                                        value="chequeHashur"
                                        color="primary"
                                    />
                                }
                                label="هاشور حواله"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.chequeDateLetter}
                                        onChange={this.handleChangeCheck('chequeDateLetter')}
                                        value="chequeDateLetter"
                                        color="primary"
                                    />
                                }
                                label="تاریخ به حروف"
                            />
                            <br/>
                            <Button variant="contained" color="primary" style={{marginRight: '5px'}} onClick={this.issuingChequeModalPrint}>
                                {/*<FaIcon color="#FFF" name="fa fa-print" margin={'5px'} size={17}/>*/}
                                <span style={{margin: '0 5px'}}>
                                پیش نمایش
                                </span>
                            </Button>
                            <Button variant="contained" color="primary" style={{marginRight: '5px'}} onClick={this.issuingChequeModalSaveH}>
                                <span style={{margin: '0 5px'}}>
                                ذخیره
                                </span>
                            </Button>
                            <Button variant="contained" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={this.issuingChequeModalCloseH}>
                                <FaIcon color="#FFF" name="fa fa-ban" margin={'5px'} size={17}/>
                                <span style={{margin: '0 5px'}}>
                                انصراف
                                </span>
                            </Button>
                        </div>
                        
                    </Paper>
                </Modal>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.issuingChequePrintModal}
                    // open={true}
                    onClose={this.issuingChequePrintModalCloseH}
                >
                    <Paper style={{
                        width: '1000px',
                        padding: '1rem .5rem ',
                        height: 'auto',
                        outline: 'none',
                        position: 'absolute',
                        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
                        backgroundColor: '#fff',
                        top: '50%',
                        left: '45%',
                        marginLeft: '-500px',
                        marginTop: '-150px',
                    }}>
                        <div id="printable">
                            <Card>
                                <CardContent >
                                   
                                    <div style={{textAlign: 'right'}}>
                                       <ul style={{listStyleType: 'none', padding: '0'}}>
                                           <li>تاریخ:
                                               <span style={{margin: '5px'}}>{this.state.dueDateJalali}</span>
                                           </li>
                                           <li style={{fontSize: '14px'}}>به حروف:
                                               <span style={{margin: '5px'}}>{this.state.chequeDateLetter ? this.state.dueDateJalaliText: '---'}</span>
                                           </li>
                                       </ul>
                                    </div>
                                    <div style={{textAlign: 'left'}}>
                                        <span style={{margin: '5px'}}>{this.state.chequeAmountPrintFormat}</span>
                                        <span>ریال</span>
                                    </div>
                                    <div style={{textAlign: 'right'}}>
                                        <p>به موجب این چک مبلغ <span>{this.state.amountText}</span>ریال</p>
                                    </div>
                                    <div style={{textAlign: 'right'}}>
                                    <p> در وجه <span>{this.state.description}</span><span style={this.state.chequeHashur? {textDecoration: 'line-through'} : {textDecoration: 'none'}}> یا به حواله کرد  </span> بپردارید </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={3}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.bank}
                                                        handleChange={(value) => this.bankChange(value, 'selectedBank')} isFilterable={true} value={this.state.selectedBank} required/>
                                </div>
                            </Grid>
                            {/* <Grid item md={2}>
                                <Button variant="contained" color="primary" style={{marginRight: '5px', marginTop: '10px'}} onClick={this.printCheque}>
                                <FaIcon color="#FFF" name="fa fa-print" margin={'5px'} size={17}/>
                                <span style={{margin: '0 5px'}}>
                                چاپ
                                </span>
                                </Button>
                            </Grid> */}
                               </Grid>
                               <Grid container spacing={8} className="no-margin">
                            <Grid item md={6}>
                                <Button variant="contained" color="primary" className="successButton" style={{marginRight: '5px', marginTop: '10px'}} onClick={this.downloadChequePdf}>
                                <FaIcon color="#FFF" name="fa fa-download" margin={'5px'} size={17}/>
                                <span style={{margin: '0 5px'}}>
                                دانلود pdf
                                </span>
                                </Button>
                                <Button variant="contained" color="primary" className="printBtn" style={{marginRight: '5px', marginTop: '10px'}} onClick={this.printChequePdf}>
                                <FaIcon color="#FFF" name="fas fa-file-pdf" margin={'5px'} size={17}/>
                                <span style={{margin: '0 5px'}}>
                                چاپ pdf
                                </span>
                                </Button>
                           
                                <Button variant="contained" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF', marginTop: '10px' }} onClick={this.issuingChequePrintModalCloseH}>
                                <FaIcon color="#FFF" name="fa fa-ban" margin={'5px'} size={17}/>
                                <span style={{margin: '0 5px'}}>
                                انصراف
                                </span>
                                </Button>
                            </Grid>
                        </Grid>
                        
                       
                       
                      
                    </Paper>
                </Modal>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.chequeDeleteModal}
                    onClose={this.chequeDeleteModalCloseH}
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
                            <span style={{marginRight: '5px'}}>حذف چک</span>
                        </h3>
                        <hr />

                        <h3> آیا از <strong>حذف</strong>  خود مطمئن می باشید. </h3>
                        <br />
                        <Button variant="contained" color="primary" style={{marginRight: '5px', backgroundColor: 'red', color: '#FFF'}} onClick={this.deleteIssuingChequeH}>
                               <span style={{margin: '0 5px'}}>
                            حذف چک های انتخاب شده
                               </span>
                        </Button>
                        <Button variant="contained" color="primary" style={{marginRight: '5px', backgroundColor: 'red', color: '#FFF'}} onClick={this.deleteIssuingChequeGroupH}>
                               <span style={{margin: '0 5px'}}>
                            حذف کل
                               </span>
                        </Button>
                        <Button variant="contained" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={this.chequeDeleteModalCloseH}>
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

export default GetPaymentListComponent;
