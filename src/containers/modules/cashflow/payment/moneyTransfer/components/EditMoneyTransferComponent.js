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
import Form from 'shared/components/form/form';
import GetEnum from 'services/getEnum';
import GetAllBankNames from 'services/getBanks';
import GetAllRegion from 'services/getRegion';
import GetMainMarket from 'services/GetMainMarkets';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownListDataProvider from "../../../../../../core/dropDownListDataProvider";
import AddRealCustomerService from "../../../../personsAndCustomers/customers/realCustomers/services/CrateRealCustomerService";
import GetPartiesService from "../../../../personsAndCustomers/customers/customersList/services/GetPartiesService";
import moment from 'moment';
import ComboBoxServerSideBest from "shared/components/dropDown/comboBox/serverSideComboBox";
import getSimpleMainMarkets from 'services/getSimpleMainMarkets';
import GetChequeBookServices from "../../../chequeManagement/chequeBook/services/GetChequeBookServices";
import GetMoneyTransferServices from "../services/GetMoneyTransferServices";
import GetAllCashFlowCategoryService from "../../../Receivce/receiveList/services/GetAllCashFlowCategoryService";
import UpdateMoneyTransferService from "../services/UpdateMoneyTransferService";
// import GetAllCashFlowCategoryService from "../services/GetAllCashFlowCategoryService";
// import SaveReceiveService from "../services/SaveReceiveService";
class EditMoneyTransferComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log('edit',this.props.location.state.sateParams.id);
        this.state = {
            transferType: {
                name: "selectedTransferType",
                feild: "title",
                label: "نوع انتقال",
                list: []
            },
            selectedTransferType: {code: 0, title: ''},

            mainMarket: {
                name: "selectedMainMarket",
                feild: "title",
                label: "بازار",
                list: []
            },
            selectedMainMarket: {id: 0, title: ''},



            engtype: {
                name: "selectedEngtype",
                feild: "title",
                label: "نوع انرژی",
                list: []
            },
            selectedEngtype: {code: 0},
            energyDropDownShow: false,


            partyTransmitter: {
                // name: "selectedPartyTransmitter",
                field: "fullName",
                placeholder: "جتسجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
            },
            selectedPartyTransmitter: {fullName : '', id: null},


            partyReceiver: {
                // name: "selectedPartyReceiver",
                field: "fullName",
                placeholder: "جتسجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
            },
            selectedPartyReceiver: {fullName : '', id: null},






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
            selectedSearchBankDepositTransmitter: {id: null},

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

            selectedSearchBankDepositReceiver: {id: null},
            getDate: moment(new Date()),
            price: null,
            documentNumber: '',
            comment: '',

            // transferTypeStatus: null,



            getAllCashFlowCategory: {
                name: "selectedGetAllCashFlowCategory",
                feild: "title",
                label: "نحوه انتقال وجه",
                list: []
            },
            selectedGetAllCashFlowCategory:{codeId: 0},

            transferTypeToken: null,
            id: null,
            transmitterFullName: '',
            receiverFullName: '',
            fromPartyId: 0,
            toPartyId: 0,
        }

    };
    fetchGetMoneyTransfer = () => {
        GetMoneyTransferServices.gettransferbyidMethod({entity: this.props.location.state.sateParams.id}, (response) => {
            console.log('gettransferbyidMethod', response);
            const {transferType, toPartyId, fromPartyId, trakingNumber, amount, description, cashFlowCategoryTitle,mainMarketId,engType, fromBankDepositId,toBankDepositId, dueDate, id, transmitterFullName, receiverFullName} = response.result;
            this.setState({
                id: id,
                transferTypeToken: transferType,
                documentNumber: trakingNumber,
                price: amount.toString(),
                comment: description,
                getDate: dueDate,
              
            }, () => {
                GetEnum("transfertype", (response)=>  {
                    response.result.forEach((value) => {
                        if(value.code == transferType){
                            this.setState({
                                selectedTransferType: value
                            })
                        }
                    })
                });

                if(transferType === 2){
                    GetChequeBookServices.searchBankDepositMethod('', (response) => {
                        console.log('sss', response);
                        for(let i = 0  ; i < response.result.length; i++){
                            if(fromBankDepositId === response.result[i].id){
                                console.log('r',response.result[i]);
                                this.setState({
                                    selectedSearchBankDepositTransmitter: response.result[i],
                                })
                            }
                        }
                    });


                    GetChequeBookServices.searchBankDepositMethod('', (response) => {
                        console.log('sss', response);
                        for(let i = 0  ; i < response.result.length; i++){
                            if(toBankDepositId === response.result[i].id){
                                console.log('r',response.result[i]);
                                this.setState({
                                    selectedSearchBankDepositReceiver: response.result[i],
                                })
                            }
                        }
                    });
                }else {
                    this.setState({
                        fromPartyId,
                        toPartyId,
                        transmitterFullName,
                        receiverFullName,
                    })
                    // let command = {
                        
                    //     entity: fromPartyId,

                    // };
                    // GetPartiesService.getpartybyid(command,(response) => {
                    //     this.setState({
                    //         selectedPartyTransmitter: response.result
                    //     })
                    // });

                    // command = {
                    //     entity: toPartyId,
                    // };
                    // GetPartiesService.getpartybyid(command,(response) => {
                    //     this.setState({
                    //         selectedPartyReceiver: response.result
                    //     })
                    // });
                }








                this.state.getAllCashFlowCategory.list.forEach((value) => {
                    if(value.title == cashFlowCategoryTitle){
                        this.setState({
                            selectedGetAllCashFlowCategory: value,
                        });
                    }
                });
                this.state.mainMarket.list.forEach((value) => {
                    if(value.id == mainMarketId){
                        if(value.id === 3){
                            this.setState({
                                energyDropDownShow: true,
                                selectedMainMarket: value,
                            }, () => {
                                this.state.engtype.list.forEach((value) => {
                                    if(value.code == engType){
                                        this.setState({
                                            selectedEngtype: value
                                        })
                                    }
                                })
                            })
                        }else {
                            this.setState({
                                selectedMainMarket: value,
                            })
                        }
                        console.log('engtype',this.state.engtype.list);
                    }
                });
                console.log('getAllCashFlowCategory', this.state.getAllCashFlowCategory.list);
            })
        });

    };
    componentDidMount() {

        // GetMainMarket((response) => DropDownListDataProvider(this,"mainMarket",response));
        getSimpleMainMarkets((response) => DropDownListDataProvider(this,"mainMarket",response));
        // GetEnum("transfertype", (response)=>  {DropDownListDataProvider(this,"transferType",response)});
        GetEnum("engtype", (response)=>  {DropDownListDataProvider(this,"engtype",response)});
        GetAllCashFlowCategoryService.getAllCashFlowCategoryMethod(null, (response) => DropDownListDataProvider(this,"getAllCashFlowCategory",response));
        setTimeout(() => {
            this.fetchGetMoneyTransfer();
        }, 1000);

    };
    handlePartyChange = (item, name) => {
        console.log(name,item.value);
        this.setState({
            [name]: item.value,
        })
    };
    handleDate = (value) => {
        this.setState({
            getDate: value
        })
    };
    // handleChangeTrans = (value) => {
    //     console.log('handleChangeTrans',value.value.code);
    //     if(value.value.code === '1' || value.value.code === 1){
    //         this.setState({
    //             selectedTransferType: value.value,
    //             // transferTypeStatus: 1,
    //             selectedPartyTransmitter: {fullName : '', id: null},
    //             selectedPartyReceiver:  {fullName : '', id: null},
    //             selectedSearchBankDepositReceiver: {id: null},
    //             selectedSearchBankDepositTransmitter: {id: null}
    //         })
    //     }else if(value.value.code === '2' || value.value.code === 2) {
    //         this.setState({
    //             selectedTransferType: value.value,
    //             // transferTypeStatus: 2,
    //             selectedPartyTransmitter: {fullName : '', id: null},
    //             selectedPartyReceiver:  {fullName : '', id: null},
    //             selectedSearchBankDepositReceiver: {id: null},
    //             selectedSearchBankDepositTransmitter: {id: null}
    //         })
    //     }
    //     console.log(value);
    // };
    ComboBoxServerSideHandler = (event, name) => {
        console.log('ComboBoxServerSideHandler',event);
        if(event === null) {
            this.setState({
                [name]: {}
            })
        }else {
            this.setState({
                [name]: event
            })
        }

    };

    handleChange = (value, name) => {
        console.log([name],value.value);
        this.setState({
            [name]: value.value
        })
    };




    handleChangeMarket = (value) => {
        if(value.value.code === 3) {
            this.setState({
                selectedMainMarket: value.value,
                energyDropDownShow: true,
            })
        }else{
            this.setState({
                selectedMainMarket: value.value,
                energyDropDownShow: false,
                selectedEngtype: {code: 0}
            })
        }
    };
    handleChangeEngtype = (value) => {
        this.setState({
            selectedEngtype: value.value,
        })
    };

    render() {
        const { classes } = this.props;
        let outPut = null;
        if( this.state.transferTypeToken === 1) {
            outPut =
                <Grid container spacing={8} className="no-margin">
                      <Grid item md={5}>
                            <Input label="ُانتقال دهنده" value={this.state.receiverFullName} disabled />
                      </Grid>
                      <Grid item md={5}>
                            <Input label="انتقال گیرنده" value={this.state.transmitterFullName} disabled />
                      </Grid>
                    {/* <Grid item md={5}>
                        <AutoCompleteComponent {...this.state.partyTransmitter}
                                               handleChange={(value) => this.handlePartyChange(value, 'selectedPartyTransmitter')}
                                               value={this.state.selectedPartyTransmitter.fullName}
                                               service={GetPartiesService.getAllPartyForAutocomplete}
                                               label="انتقال دهنده"
                                               required
                        />
                    </Grid>
                    <Grid item md={5}>
                        <AutoCompleteComponent {...this.state.partyReceiver}
                                               handleChange={(value) => this.handlePartyChange(value, 'selectedPartyReceiver')}
                                               value={this.state.selectedPartyReceiver.fullName}
                                               service={GetPartiesService.getAllPartyForAutocomplete}
                                               label="انتقال گیرنده"
                                               required
                        />
                    </Grid> */}
                </Grid>
        }else if(this.state.transferTypeToken === 2){
            outPut = <Grid container spacing={8} className="no-margin">
                <Grid item md={3}>
                    <div className="k-rtl">
                        <ComboBoxServerSideBest
                            {...this.state.searchBankDepositTransmitter}
                            handleChange={(value) => this.ComboBoxServerSideHandler(value, 'selectedSearchBankDepositTransmitter')}
                            service={GetChequeBookServices.searchBankDepositMethod}
                            defaultVal={this.state.selectedSearchBankDepositTransmitter}
                            validity={false}
                        />
                    </div>
                </Grid>
                <Grid item md={3}>
                    <div className="k-rtl">
                        <ComboBoxServerSideBest
                            {...this.state.searchBankDepositReceiver}
                            handleChange={(value) => this.ComboBoxServerSideHandler(value, 'selectedSearchBankDepositReceiver')}
                            service={GetChequeBookServices.searchBankDepositMethod}
                            defaultVal={this.state.selectedSearchBankDepositReceiver}
                            validity={false}
                        />
                    </div>
                </Grid>

            </Grid>
        }
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Form
                    {...this.props}
                    {...this.state}
                    service={UpdateMoneyTransferService.updatetransferMethod}
                    entity={
                        {
                            id: this.state.id,
                            transferType: this.state.transferTypeToken,
                            fromPartyId: this.state.fromPartyId,
                            toPartyId: this.state.toPartyId,
                            fromBankDepositId: this.state.selectedSearchBankDepositTransmitter.id,
                            toBankDepositId: this.state.selectedSearchBankDepositReceiver.id,
                            dueDate: this.state.getDate,
                            amount: this.state.price? parseInt(this.state.price.replace(/,/g, '')) : '',
                            trakingNumber: this.state.documentNumber === '' ? null : parseInt(this.state.documentNumber, 10),
                            mainMarketId: this.state.selectedMainMarket.id,
                            description: this.state.comment,
                            category: this.state.selectedGetAllCashFlowCategory.codeId,
                            engType: this.state.selectedEngtype.code,
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
                >
                    <br/>
                    <Fieldset legend={'اطلاعات فردی'}>
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.transferType}
                                                       handleChange={(value) => this.handleChangeTrans(value)} isFilterable={false}
                                                       value={this.state.selectedTransferType} required isDisabled/>
                                </div>
                            </Grid>

                        </Grid>
                        {
                            outPut
                        }



                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={2}>
                                <PersianDatePicker selectedDate={this.state.getDate} label="از تاریخ" handleOnChange={(value) => this.handleDate(value)}/>
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="" label="مبلغ"
                                                       value={this.state.price}
                                                       handleChange={(value) => this.handleChange(value, 'price')} type="number" required  isSeparator={true}/>
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="" label="شماره سند"
                                                       value={this.state.documentNumber}
                                                       handleChange={(value) => this.handleChange(value, 'documentNumber')} type="number" format={'################'} required  isSeparator={true}/>
                            </Grid>
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.mainMarket}
                                                       handleChange={(value) => this.handleChangeMarket(value)} isFilterable={false}
                                                       value={this.state.selectedMainMarket} required/>
                                </div>
                            </Grid>
                            {
                                this.state.energyDropDownShow === true
                                    ?
                                    <Grid item md={2}>
                                        <div className="k-rtl">
                                            <DropDownComponent {...this.state.engtype}
                                                               handleChange={(value) => this.handleChangeEngtype(value)} isFilterable={false}
                                                               value={this.state.selectedEngtype} required/>
                                        </div>
                                    </Grid>
                                    :
                                    null
                            }
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.getAllCashFlowCategory}
                                                       handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false}
                                                       value={this.state.selectedGetAllCashFlowCategory} required />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={10}>
                                <Input label="توضیحات" handleChange={(e) => this.handleChange(e, 'comment')} value={this.state.comment} isMultiLine={true} />
                            </Grid>

                        </Grid>
                    </Fieldset>
                </Form>
            </React.Fragment>
        )
    }
}
export default EditMoneyTransferComponent;