import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import classNames from 'classnames';
import Input from 'shared/components/formInput/inputForm'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import Fieldset from 'shared/components/fieldset/fieldset';
import toastr from 'toastr';
import Header from 'shared/components/stateHeader/stateHeader';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import AutoCompleteComplete from 'shared/components/dropDown/autocomplete';
import IBAN from 'shared/components/iban/textMask';
import styles from 'containers/layout/panel/theme';
import Button from '@material-ui/core/Button';
import Submit from 'shared/components/submitAction/actionSubmit';

import { Typography, CircularProgress } from '@material-ui/core';





import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';





import Form from 'shared/components/form/form';
import GetEnum from 'services/getEnum';
import GetAllBankNames from 'services/getBanks';
import GetAllRegion from 'services/getRegion';
import GetMainMarket from 'services/GetMainMarkets';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownListDataProvider from "../../../../../../core/dropDownListDataProvider";
import getSimpleMainMarkets from 'services/getSimpleMainMarkets';
import AddRealCustomerService from "../../../../personsAndCustomers/customers/realCustomers/services/CrateRealCustomerService";
import GetPartiesService from "../../../../personsAndCustomers/customers/customersList/services/GetPartiesService";
import moment from 'moment';
import ComboBoxServerSideBest from "shared/components/dropDown/comboBox/serverSideComboBox";
import GetChequeBookServices from "../../../chequeManagement/chequeBook/services/GetChequeBookServices";
import GetPartyBankAccountsByPartyIdService from "../../../payment/paymentList/services/GetPartyBankAccountsByPartyIdService";
import GetAllCashFlowCategoryService from "../../../Receivce/receiveList/services/GetAllCashFlowCategoryService";
// import SavePaymentService from "../services/SavePaymentService";
import GetMoneyReceiveService from "../services/GetMoneyReceiveService";
import GetTradingBookByPartyIdService from '../services/GetTradingBookByPartyIdService';

import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

import { get } from 'http';
import NoDataDatePicker from 'shared/components/persianDatePicker/noDataDatePicker';
// import GetAllCashFlowCategoryService from "../services/GetAllCashFlowCategoryService";
// import SaveReceiveService from "../services/SaveReceiveService";
class CreateMoneyReceiveComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
           


            // searchBankDeposit: {
            //     name: "selectedSearchBankDeposit",
            //     // field: "accountNumber",
            //     placeholder: "شماره حساب بانکی",
            //     textField: 'fullAccountNumber',
            //     keyField: 'id',
            //     // pro1: 'id',
            //     // prop2: 'accountTypeTitle'
            //     // list: [],
            //     // title: 'accountTypeTitle',
            //     // id: 'id'
            // },
            // selectedSearchBankDeposit: {id: 0},


            bankDocumentNumber: '',
            amountOfTheDocument: null,
            necessaryPhone: '',

            getAllCashFlowCategory: {
                name: "selectedGetAllCashFlowCategory",
                feild: "title",
                label: "نحوه انتقال وجه",
                list: []
            },
            selectedGetAllCashFlowCategory:{codeId: 0},





            customerAccountNumber:{
                name: "selectedCustomerAccountNumber",
                feild: "fullAccountTitle",
                label: "شماره حساب مشتری",
                list: []
            },
            selectedCustomerAccountNumber: {id: 0},



            comment: '',
            date: new Date(),
            minDate: new Date(),

            makeDisable: true,

            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جتسجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
            },
            selectedParty: {fullName : '', id: 0},


            market: {
                name: "selectedMarket",
                feild: "title",
                label: "بازار",
                list: []
            },
            selectedMarket: {id: 0},




            engtype: {
                name: "selectedEngtype",
                feild: "title",
                label: "نوع انرژی",
                list: []
            },
            selectedEngtype: {code: 0},




            energyDropDownShow: false,

            t0DateJalali: 'تعریف نشده',
            t1DateJalali: 'تعریف نشده',
            t2DateJalali: 'تعریف نشده',
            t0Date: undefined,
            t1Date: undefined,
            t2Date: undefined,
            tseRemainT0: 0,
            tseRemainT1: 0,
            tseRemainT2: 0,


            selectedValue: undefined,

            tableShowState: false,
            tableDisabled: true,


            tseCreditAmount: undefined,
            blockRemain: undefined
        };
        this.handleDate = this.handleDate.bind(this);
        this.handlePartyChange = this.handlePartyChange.bind(this);


    }

    componentDidMount() {
        // this.setState({
        //     date: moment(new Date()),
        // });
        GetAllCashFlowCategoryService.getAllCashFlowCategoryMethod(null, (response) => DropDownListDataProvider(this,"getAllCashFlowCategory",response));
        // GetMainMarket((response) => DropDownListDataProvider(this,"market",response));
        getSimpleMainMarkets((response) => DropDownListDataProvider(this,"market",response));
        GetEnum("engtype", (response)=>  {DropDownListDataProvider(this,"engtype",response)});

    }
    handlePartyChange(item) {
        console.log('party', item.value);
        if(item.value === ''){
            // alert('empty');
            this.setState({
                selectedParty: {fullName : '', id: 0},
                makeDisable: true,
                customerAccountNumber:{
                    name: "selectedCustomerAccountNumber",
                    feild: "fullAccountTitle",
                    label: "شماره حساب مشتری",
                    list: []
                },
                selectedCustomerAccountNumber: {id: 0},
                date: new Date(),
                minDate: new Date(),
                amountOfTheDocument: null,

                t0DateJalali: 'تعریف نشده',
                t1DateJalali: 'تعریف نشده',
                t2DateJalali: 'تعریف نشده',
                t0Date: undefined,
                t1Date: undefined,
                t2Date: undefined,
                tseRemainT0: 0,
                tseRemainT1: 0,
                tseRemainT2: 0,


                tableShowState: false,
                tableDisabled: true,

                tseCreditAmount: undefined,
                blockRemain: undefined
            })
        }else {
            // alert('not empty');
            this.setState({
                selectedParty: item.value,
                makeDisable: false,
                customerAccountNumber:{
                    name: "selectedCustomerAccountNumber",
                    feild: "fullAccountTitle",
                    label: "شماره حساب مشتری",
                    list: []
                },
                selectedCustomerAccountNumber: {id: 0},
            }, () => {
                this.fetchGetPartyBankAccountsByPartyIdService(item.value.id);
                if(this.state.selectedParty.id !== 0 && this.state.selectedMarket.id !== 0){
                    this.setState({
                        tableShowState: true,
                        tableDisabled: false,
                        
                    }, () => {
                        this.fetchGetTradingBookByPartyId();
                    })
                       
                }
                
                
                console.log('party: ',this.state.selectedParty);
            })
        }

    }
    fetchGetTradingBookByPartyId = () => {
        GetTradingBookByPartyIdService.GetTradingBookByPartyIdMethod({entity: {partyId: this.state.selectedParty.id, mainMarketId: this.state.selectedMarket.id, engType: this.state.selectedEngtype.code}}, (res) => {
               
                if(res.isError == false){
                    const {t0DateJalali,t1DateJalali,t2DateJalali,adjustedT0,adjustedT1,adjustedT2,t0Date,t1Date,t2Date,tseCreditAmount,blockRemain} = res.result;
                    this.setState({
                        t0DateJalali,
                        t1DateJalali,
                        t2DateJalali,
                        
                        tseRemainT0: adjustedT0,
                        tseRemainT1: adjustedT1,
                        tseRemainT2: adjustedT2,
                        t0Date,
                        t1Date,
                        t2Date,
                        tableShowState: false,
                        tableDisabled: false,
                        tseCreditAmount,
                        blockRemain

                    
                    });
                }else {
                     
                        this.setState({
                            tableShowState: false,
                            tableDisabled: true,
                        })
                }
                // if(res.isError === true){
                //     this.setState({
                //         tableShowState: false,
                //         tableDisabled: false,
                //         })
                // }
                console.log('GetTradingBookByPartyIdService: ',res);
        })
    }
    handleDate(value) {
        console.log('Create: ',value);
        this.setState({
            date: value
        })
    }

    fetchGetPartyBankAccountsByPartyIdService = (getId) => {
        // GetPartyBankAccountsByPartyIdService.getpartybankaccountsbypartyidMethod({entity: getId}, (response) => DropDownListDataProvider(this,"customerAccountNumber",response));
        GetPartyBankAccountsByPartyIdService.getpartybankaccountsbypartyidMethod({entity: getId}, (response) => {
            // console.log('AAAA',response);
            if(response.result.length === 1){
                  this.setState({
                    selectedCustomerAccountNumber: response.result[0],
                  })    
            };
            if(response.result.length === 0){
                this.setState({
                    makeDisable: true,
                }, () => {
                    toastr.error('شماره حساب مشتری خالی می باشد.');
                });
            }else {
                DropDownListDataProvider(this,"customerAccountNumber",response);
            }
           
        });
    };
    // ComboBoxServerSideHandler = (event) => {
    //     console.log('event',event);
    //
    //     if(event === null) {
    //         this.setState({
    //             selectedSearchBankDeposit: {}
    //         })
    //     }else {
    //
    //         // let {a a, b =} = event;
    //         // console.log('FF',{id, accountTypeTitle});
    //         this.setState({
    //             selectedSearchBankDeposit: event
    //         })
    //     }
    //
    // };

    handleChange(value, name) {
        console.log([name],value.value);
        let item = value.value;
        this.setState({
            [name]: item
        })
    }


    handleChangeMarket = (value) => {
        if(value.value.code === 3) {
            this.setState({
                selectedMarket: value.value,
                energyDropDownShow: true,
            }, () => {
                console.log('market handle:', this.state.selectedMarket);
            })
        }else{
            this.setState({
                selectedMarket: value.value,
                energyDropDownShow: false,
                selectedEngtype: {code: 0},
              
            }, () => {
                if(this.state.selectedParty.id !== 0 && this.state.selectedMarket.id !== 0 && this.state.selectedEngtype.code === 0){
                    this.setState({
                        tableShowState: true,
                        tableDisabled: false,
                    }, () => {
                        this.fetchGetTradingBookByPartyId();
                    })
                       
                }
                // this.fetchGetTradingBookByPartyId(this.state.selectedMarket.code, 0);
                console.log('market handle:', this.state.selectedMarket);
            })
        }
    };
    handleChangeEngtype = (value) => {
        this.setState({
            selectedEngtype: value.value,
        }, () => {
            if(this.state.selectedParty.id !== 0 && this.state.selectedMarket.id !== 0 && this.state.selectedEngtype.code !== 0){
                this.setState({
                    tableShowState: true,
                    tableDisabled: false,
                }, () => {
                    this.fetchGetTradingBookByPartyId();
                })
                   
            }
            // this.fetchGetTradingBookByPartyId(this.state.selectedMarket.code, this.state.selectedEngtype.code);
         
        })
    };
    TableRowH = (name) => {
        this.setState({
            minDate: this.state.t0Date
        })
        console.log("this.state.tseRemainT0",this.state.tseRemainT0);
        switch(name){
            case 't0Date':
                // alert('t0Date');
                this.setState({
                    date: this.state.t0Date,
                    amountOfTheDocument: this.state.tseRemainT0.toString(),
                    selectedValue: 'tseRemainT0'
                })
                break;
            case 't1Date':
                // alert('t1Date');
                this.setState({
                    date: this.state.t1Date,
                    amountOfTheDocument: this.state.tseRemainT1.toString(),
                    selectedValue: 'tseRemainT1'
                })
                break;
            case 't2Date':
                // alert('t2Date');
                this.setState({
                    date: this.state.t2Date,
                    amountOfTheDocument: this.state.tseRemainT2.toString(),
                    selectedValue: 'tseRemainT2'
                })
                break;
            default:

        }
    };
    handleChangeTableR = (event) => {
        this.setState({
            selectedValue: event.target.value
        })
    }
    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Header {...this.props} />
                <Form
                    {...this.props}
                    {...this.state}
                    service={GetMoneyReceiveService.saverequestmoneyMethod}
                    entity={
                        {
                            toPartyId: this.state.selectedParty.id,
                            toPartyBankAccountId: this.state.selectedCustomerAccountNumber.id,
                            dueDate: this.state.date,
                            // fromBankDepositId: this.state.selectedSearchBankDeposit.id,
                            trakingNumber: this.state.bankDocumentNumber === ''? null: parseInt(this.state.bankDocumentNumber,10),
                            amount: this.state.amountOfTheDocument ? parseInt(this.state.amountOfTheDocument.replace(/,/g, '')) : 0,
                            category: this.state.selectedGetAllCashFlowCategory.codeId == 0? null: this.state.selectedGetAllCashFlowCategory.codeId,
                            description: this.state.comment,
                            mainMarketId: this.state.selectedMarket.id,
                            engType: this.state.selectedEngtype.code,
                            necessaryPhone: this.state.necessaryPhone === ''? 0: parseInt(this.state.necessaryPhone,10)
                        }
                    }
                    // redirect={"/main/persons/customers/completeRegister"}
                    // SubmitTitle={'ذخیره و تکمیل اطلاعات'}
                    // otherAction={[
                    //     {
                    //         color: "#43a047",
                    //         title: 'ذخیره و ثبت مشتری جدید',
                    //         action: {
                    //             isSubmit: true,
                    //             method: this.refresh
                    //         }
                    //     }
                    // ]}
                    className="form-height"
                >
                    <br/>
                    <Fieldset legend={'اطلاعات فردی'}>
                    <Grid container spacing={8} className="no-margin">
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.market}
                                                       handleChange={(value) => this.handleChangeMarket(value)} isFilterable={false}
                                                       value={this.state.selectedMarket} required/>
                                </div>
                            </Grid>
                            <Grid item md={2}>
                                {
                                    this.state.energyDropDownShow === true
                                        ?
                                        <div className="k-rtl">
                                            <DropDownComponent {...this.state.engtype}
                                                               handleChange={(value) => this.handleChangeEngtype(value)} isFilterable={false}
                                                               value={this.state.selectedEngtype} required/>
                                        </div>
                                        :
                                        null
                                }
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={8}>
                                <AutoCompleteComponent {...this.state.party}
                                                       handleChange={(value) => this.handlePartyChange(value)}
                                                       value={this.state.selectedParty.fullName}
                                                       service={GetPartiesService.getAllPartyForAutocomplete}
                                />
                            </Grid>
                        </Grid>
                        
                        
                        <br/>
                        <Grid container spacing={8} className="no-margin">
                             <Grid item md={6}>
                                <h3 style={{margin:'10px 0'}}>مانده تعدیل شده (بااحتساب اعتبار و بلوکه)</h3>
                                <Table style={{position: 'relative'}}>
                                    {
                                        this.state.tableShowState
                                        ?
                                        <div className="disable-background">
                                            <div  className="flex flex-1 flex-col items-center justify-center height-page">
                                                <CircularProgress/>
                                            </div>
                                        </div>
                                        :
                                        null
                                    }
                                    {
                                        this.state.tableDisabled
                                        ?
                                        <div className="enable-table">
                                        </div>
                                        :
                                        null
                                    }
                                   
                                <TableHead className="background-gray-sell table-header">
                                    <TableRow >
                                        <TableCell>#</TableCell>
                                        <TableCell>تاریخ</TableCell>
                                        <TableCell>مبلغ</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody className="table-row" >
                                    <TableRow hover={true} onClick={() => this.TableRowH('t0Date')} style={{cursor: 'pointer'}}>
                                    <TableCell>
                                        <Radio
                                            checked={this.state.selectedValue === 'tseRemainT0'}
                                            onChange={this.handleChangeTableR}
                                            value="tseRemainT0"
                                            color="default"
                                            icon={<RadioButtonUncheckedIcon fontSize="small" />}
                                            checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
                                        />
                                    </TableCell>
                                        <TableCell>{this.state.t0DateJalali}</TableCell>
                                        <TableCell align="right">{this.state.tseRemainT0.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</TableCell>
                                    </TableRow>
                                    <TableRow hover={true} onClick={() => this.TableRowH('t1Date')} style={{cursor: 'pointer'}}>
                                        <TableCell>
                                            <Radio
                                                checked={this.state.selectedValue === 'tseRemainT1'}
                                                onChange={this.handleChangeTableR}
                                                value="tseRemainT1"
                                                color="default"
                                                icon={<RadioButtonUncheckedIcon fontSize="small" />}
                                                checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
                                            />
                                        </TableCell>
                                        <TableCell>{this.state.t1DateJalali}</TableCell>
                                        <TableCell align="right">{this.state.tseRemainT1.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</TableCell>
                                    </TableRow>
                                    <TableRow hover={true} onClick={() => this.TableRowH('t2Date')} style={{cursor: 'pointer'}}>
                                    <TableCell>
                                        <Radio
                                            checked={this.state.selectedValue === 'tseRemainT2'}
                                            onChange={this.handleChangeTableR}
                                            value="tseRemainT2"
                                            color="default"
                                            icon={<RadioButtonUncheckedIcon fontSize="small" />}
                                            checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
                                        />
                                    </TableCell>
                                        <TableCell>{this.state.t2DateJalali}</TableCell>
                                        <TableCell align="right">{this.state.tseRemainT2.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{textAlign: 'right !important'}}>اعتبار: </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell style={{textAlign: 'left'}}>{this.state.tseCreditAmount}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{textAlign: 'right !important'}}>مانده بلوکه: </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell style={{textAlign: 'left'}}>{this.state.blockRemain}</TableCell>
                                   
                                    </TableRow>
                                </TableBody>
                            </Table>


                     
                                  
                            </Grid>
                        </Grid>
                        <br/>

                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={3}>
                                <NoDataDatePicker min={this.state.minDate} isNull={false} selectedDate={this.state.date} label="تاریخ درخواستی" handleOnChange={this.handleDate}/>
                            </Grid>
                            <Grid item md={3}>
                                <NumberFormatComponent id="" label="مبلغ سند"
                                                       value={this.state.amountOfTheDocument}
                                                       handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')} type="number" isSeparator={true} required/>
                                
                            </Grid>
                        </Grid>

                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={3}>
                                <NumberFormatComponent id="" label="شماره سند بانکی"
                                                       value={this.state.bankDocumentNumber}
                                                       handleChange={(value, error) => this.handleChange(value, 'bankDocumentNumber')} type="number" format={'#################'}/>
                            </Grid>
                            <Grid item md={3}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.customerAccountNumber}
                                                       handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false}
                                                       value={this.state.selectedCustomerAccountNumber} required isDisabled={this.state.makeDisable}/>
                                </div>
                            </Grid>
                        </Grid>


                        <Grid  container spacing={8} className="no-margin">
                            <Grid item md={3}>
                            <NumberFormatComponent id="" label="تلفن ضروری"
                                                       value={this.state.necessaryPhone}
                                                       handleChange={(value, error) => this.handleChange(value, 'necessaryPhone')} type="number" format={'#################'}/>
                            </Grid>
                            <Grid item md={3}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.getAllCashFlowCategory}
                                                       handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false}
                                                       value={this.state.selectedGetAllCashFlowCategory} />
                                </div>
                            </Grid>
                            
                        </Grid>
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={6}>
                                <Input label="توضیحات" handleChange={(e) => this.handleChange(e, 'comment')} value={this.state.comment} isMultiLine={true}/>
                            </Grid>

                        </Grid>

                   
                    </Fieldset>
                </Form>
            </React.Fragment>
        )
    }
}
export default CreateMoneyReceiveComponent;