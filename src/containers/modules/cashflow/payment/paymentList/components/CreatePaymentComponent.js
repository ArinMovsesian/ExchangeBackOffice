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
import getSimpleMainMarkets from 'services/getSimpleMainMarkets';
import AddRealCustomerService from "../../../../personsAndCustomers/customers/realCustomers/services/CrateRealCustomerService";
import GetPartiesService from "../../../../personsAndCustomers/customers/customersList/services/GetPartiesService";
import moment from 'moment';
import ComboBoxServerSideBest from "shared/components/dropDown/comboBox/serverSideComboBox";
import GetChequeBookServices from "../../../chequeManagement/chequeBook/services/GetChequeBookServices";
import GetPartyBankAccountsByPartyIdService from "../services/GetPartyBankAccountsByPartyIdService";
import GetAllCashFlowCategoryService from "../../../Receivce/receiveList/services/GetAllCashFlowCategoryService";
import SavePaymentService from "../services/SavePaymentService";
// import GetAllCashFlowCategoryService from "../services/GetAllCashFlowCategoryService";
// import SaveReceiveService from "../services/SaveReceiveService";
class CreatePaymentComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جتسجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
            },
            selectedParty: {fullName : '', id: 0},


            searchBankDeposit: {
                name: "selectedSearchBankDeposit",
                placeholder: "شماره حساب بانکی",
                textField: 'fullAccountNumber',
                keyField: 'id',
                
            },
            selectedSearchBankDeposit: {id: 0},


            bankDocumentNumber: '',
            amountOfTheDocument: null,

          

            comment: '',
            date: undefined,
            makeDisable: true,




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

            getAllCashFlowCategory: {
                name: "selectedGetAllCashFlowCategory",
                feild: "title",
                label: "نحوه انتقال وجه",
                list: [],
               dataItemKey:'codeId',

            },
            selectedGetAllCashFlowCategory:{codeId:1},











            customerAccountNumber:{
                name: "selectedCustomerAccountNumber",
                feild: "fullAccountTitle",
                label: "شماره حساب مشتری",
                list: []
            },
            selectedCustomerAccountNumber: {id: 0},



            energyDropDownShow: false

        };
        this.handleDate = this.handleDate.bind(this);
        this.handlePartyChange = this.handlePartyChange.bind(this);


    }

    componentDidMount() {
        this.setState({
            date: moment(new Date()),
        });
        GetAllCashFlowCategoryService.getAllCashFlowCategoryMethod(null, (response) => {
            this.setState({
                getAllCashFlowCategory: {
                    name: "selectedGetAllCashFlowCategory",
                    feild: "title",
                    label: "نحوه انتقال وجه",
                    list: response.result
                },
            })
        });
        // GetMainMarket((response) => DropDownListDataProvider(this,"market",response));
        getSimpleMainMarkets((response) => DropDownListDataProvider(this,"market",response));
        GetEnum("engtype", (response)=>  DropDownListDataProvider(this,"engtype",response));

    }
    handlePartyChange(item) {
        console.log('party', item.value);
        if(item.value === ''){
            // alert('empty');
            this.setState({
                selectedParty: item.value,
                makeDisable: true,
                customerAccountNumber:{
                    name: "selectedCustomerAccountNumber",
                    feild: "fullAccountTitle",
                    label: "شماره حساب مشتری",
                    list: []
                },
                selectedCustomerAccountNumber: {id: 0},
            });
        }else {
            // alert('not empty');
            this.setState({
                selectedParty: item.value,
                makeDisable: false,
            }, () => {
                this.fetchGetPartyBankAccountsByPartyIdService(item.value.id);
            })
        }

    }
    handleDate(value) {
        this.setState({
            date: value
        })
    }
    fetchGetPartyBankAccountsByPartyIdService = (getId) => {

        // 
        GetPartyBankAccountsByPartyIdService.getpartybankaccountsbypartyidMethod({entity: getId}, (response) => {
            if(response.result.length === 0 ){
                this.setState({
                    makeDisable: true,
                })
            }
            if(response.result.length === 1){
                this.setState({
                    selectedCustomerAccountNumber: response.result[0]
                })
            }else {
               DropDownListDataProvider(this,"customerAccountNumber",response);
            }
            
        });
    };
    ComboBoxServerSideHandler = (event) => {
        console.log('event',event);

        if(event === null) {
            this.setState({
                selectedSearchBankDeposit: {}
            })
        }else {

            // let {a a, b =} = event;
            // console.log('FF',{id, accountTypeTitle});
            this.setState({
                selectedSearchBankDeposit: event
            })
        }

    };

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
            })
        }else{
            this.setState({
                selectedMarket: value.value,
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
        console.log("this.state.selectedGetAllCashFlowCategory",this.state.selectedGetAllCashFlowCategory,this.state.getAllCashFlowCategory)
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Header {...this.props} />
                <Form
                    {...this.props}
                    {...this.state}
                    service={SavePaymentService.savepaymentMethod}
                    entity={
                        {
                            toPartyId: this.state.selectedParty.id,
                            toPartyBankAccountId: this.state.selectedCustomerAccountNumber.id,
                            dueDate: this.state.date,
                            fromBankDepositId: this.state.selectedSearchBankDeposit.id,
                            trakingNumber: this.state.bankDocumentNumber === ''? null: parseInt(this.state.bankDocumentNumber,10),
                            amount:  this.state.amountOfTheDocument ? parseInt(this.state.amountOfTheDocument.replace(/,/g, '')) : 0,
                            category: this.state.selectedGetAllCashFlowCategory.codeId,
                            description: this.state.comment,
                            mainMarketId: this.state.selectedMarket.id,
                            engType: this.state.selectedEngtype.code
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
                            <Grid item md={6}>
                                <AutoCompleteComponent {...this.state.party}
                                                       handleChange={(value) => this.handlePartyChange(value)}
                                                       value={this.state.selectedParty.fullName}
                                                       service={GetPartiesService.getAllPartyForAutocomplete}
                                />
                            </Grid>
                            <Grid item md={3}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.customerAccountNumber}
                                                       handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false}
                                                       value={this.state.selectedCustomerAccountNumber} required isDisabled={this.state.makeDisable}/>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={3}>
                                <PersianDatePicker selectedDate={this.state.date} label="تاریخ فیش" handleOnChange={this.handleDate}/>
                            </Grid>
                            <Grid item md={3}>
                                <div className="k-rtl">
                                    <ComboBoxServerSideBest
                                        {...this.state.searchBankDeposit}
                                        handleChange={(value) => this.ComboBoxServerSideHandler(value)}
                                        service={GetChequeBookServices.searchBankDepositMethod}
                                        defaultVal={this.state.selectedSearchBankDeposit}
                                        validityIcon={false}
                                        validity={false}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={3}>
                                <NumberFormatComponent id="" label="شماره سند بانکی"
                                                       value={this.state.bankDocumentNumber}
                                                       handleChange={(value, error) => this.handleChange(value, 'bankDocumentNumber')} type="number" format={'#################'} required/>
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="" label="مبلغ سند"
                                                       value={this.state.amountOfTheDocument}
                                                       handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')} type="number" isSeparator={true} required/>
                            </Grid>
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.getAllCashFlowCategory}
                                                       handleChange={(value) => this.handleChange(value, 'selectedGetAllCashFlowCategory')} isFilterable={false} 
                                                       value={this.state.selectedGetAllCashFlowCategory}
                                                       required />
                                </div>
                            </Grid>
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
export default CreatePaymentComponent;