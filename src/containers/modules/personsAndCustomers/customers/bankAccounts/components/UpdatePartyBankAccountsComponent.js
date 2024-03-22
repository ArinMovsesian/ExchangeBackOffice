import React  from  'react';
import Paper from '@material-ui/core/Paper';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import Header from 'shared/components/stateHeader/stateHeader'
import AutoCompleteComplete from 'shared/components/dropDown/autocomplete';
import Form from '../../../../../../shared/components/form/form';
import Fieldset from 'shared/components/fieldset/fieldset';
import Input from 'shared/components/formInput/inputForm';
import Checkbox from '@material-ui/core/Checkbox';
import { Grid } from '@material-ui/core';
import AddPartyBankAccountService from '../services/AddPartyBankAccountsService';
import GetPartiesService from '../../customersList/services/GetPartiesService';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IBAN from 'shared/components/iban/textMask';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import DropDownListDataProvider from "../../../../../../core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import GetAllBankNames from "../../../../../../services/getBanks";
import GetPartyCodeWithMainMarketsService from "../../customerTradingCodes/services/GetPartyCodeWithMainMarkets";
import GetPartyBankAccountsService from "../services/GetPartyBankAccountsService";
import UpdatePartyBankAccountService from "../services/UpdatePartyBankAccountService";
import getBankAccountUsages from "../../../../../../services/getBankAccountUsages";
import {GetMultiSelectElementMoreItem} from "../../../../../../core/getMultiSelectElement";
let test = [];
class UpdatePartyBankAccounts extends React.Component{

    constructor(props){
        super(props);
        // console.log('this.props.location.state.partyId',this.props.location.state.partyId);
        this.state = {
            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جتسجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
                list: []
            },
            selectedParty: {
                fullName : ''
            },
            sort: [{
                field: "party.created",
                dir: "desc"
            }],
            isDefault: false,
            bankTitle: '',
            branchName: '',
            branchCode: '',
            accountNumber: '',
            iban: '',
            account: {
                name: "selectedAccount",
                feild: "title",
                label: "نوع حساب",
                list: []
            },
            bank: {
                name: "selectedBank",
                feild: "title",
                label: "نام بانک",
                list: []
            },
            selectedAccount: {},
            selectedBank: {},
            bankID: null,
            accountType: null,
            bankAccountOwnerName: '',
            purchaseFromBank:  false,

            bankAccountUsages: {
                name:"partyBankAccountUsages",
                field:'title',
                list:[],
                label:"مورد استفاده بانک"
            },
            partyBankAccountUsages: [],
        }

    }

    componentDidMount(){
        GetEnum("BankAccountType", (response)=>  DropDownListDataProvider(this,"account",response));
        GetAllBankNames((response)=>  DropDownListDataProvider(this,"bank",response));

        this.getPartyBankAccountByFilter();
    }
    getPartyBankAccountByFilter = () => {

        const body = {
                entity: this.props.location.state.id,
            // mainMarketId: 1 //this is fix

        };
        GetPartyBankAccountsService.getPartyBankAccountByIdMethod(body, (response) => {
            console.log('GetParty: ', response.result);
            this.setState({
                branchName: response.result.branchName,
                branchCode: response.result.branchCode,
                accountNumber: response.result.accountNumber,
                iban: response.result.iban,
                isDefault: response.result.isDefault,
                bankID: response.result.bankId,
                accountType: response.result.accountType,
                partyId: response.result.partyId,
                id: response.result.id,
                bankAccountOwnerName: response.result.bankAccountOwnerName,
                purchaseFromBank:  response.result.purchaseFromBank,
                partyBankAccountUsages: response.result.partyBankAccountUsages
            }, () => {
                getBankAccountUsages((response) => {
                    DropDownListDataProvider(this,"bankAccountUsages", response);
                });
                let command = {
                    entity: this.state.partyId,
                };
                GetPartiesService.getpartybyid(command,(response) => {
                    console.log('selectedParty', response);
                    this.setState({
                        selectedParty: response.result
                    })
                });
                GetAllBankNames( (response) => {
                    // console.log('res',response.result);
                    for(let i = 0; i< response.result.length; i++){
                        if(response.result[i].codeId === this.state.bankID){
                            this.setState({
                                selectedBank: response.result[i]
                            })
                        }
                    }
                });
                GetEnum("BankAccountType", (response)=> {
                    // console.log('B', response.result);
                    for(let i = 0; i< response.result.length; i++){
                        if(response.result[i].code === this.state.accountType){
                            this.setState({
                                selectedAccount: response.result[i]
                            })
                        }
                    }
                });


            })
        });
    };
    handleChange = (value, name) => {
        let item = value.value;
        // console.log([name],value.value);
        if([name] == 'partyBankAccountUsages'){
            // console.log([name],value.value);
            // console.log('test', test);
            // let getResponseObjectFormat = {
            //     success: true,
            //     result: test.push(value.value),
            // }
            // getBankAccountUsages((response) => {DropDownListDataProvider(this,"bankAccountUsages", getResponseObjectFormat)});
            this.setState({
                [name]: item
            })
        }else{
            this.setState({
                [name]: item
            })
        }
        // console.log('item',item);
        // this.setState({
        //     [name]: item
        // })
    };
    handleChangeCheck = name => (event) => {
        this.setState({
            [name]: event.target.checked,
        })
    };
    handlePartyChange(item){
        // let item = value.value;
        // console.log('item',item);
        this.setState({
            selectedParty : item.value,
            // partyType : item.partyType
        })
    }
    render() {
        console.log(this.state.bankAccountUsages,this.state.partyBankAccountUsages);

        return (
            <React.Fragment>
                <WrapperPaper />
                <Header {...this.props} />
                <Form
                    {...this.props}
                    service={UpdatePartyBankAccountService}
                    entity={
                        {
                            partyId:  this.state.selectedParty ? this.state.selectedParty.id: null,
                            bankId: this.state.selectedBank.codeId,
                            branchName: this.state.branchName,
                            branchCode: this.state.branchCode,
                            accountNumber: this.state.accountNumber,
                            iban: this.state.iban,
                            accountType: this.state.selectedAccount.code,
                            isDefault: this.state.isDefault,
                            id: this.state.id,
                            bankAccountOwnerName: this.state.bankAccountOwnerName,
                            purchaseFromBank: this.state.purchaseFromBank,
                            partyBankAccountUsages: this.state.partyBankAccountUsages.length> 0 ? this.state.partyBankAccountUsages.map(s=>{return {id: s.id}}) : []
                        }
                    }
                >
                    <br/>
                    <Fieldset legend={'اطلاعات مشتری'}>
                        <Grid container spacing={8} className="margin-bottom-30">
                            <Grid item md={12}>
                                <Input label="نام و نام خانوادگی"  value={this.state.selectedParty.fullName} disabled/>
                            </Grid>
                        </Grid>
                    </Fieldset>
                    <br/>
                    <Fieldset legend={'اطلاعات بانکی'}>
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={2}>
                                <div className="k-rtl">

                                    <DropDownComponent {...this.state.bank}
                                                       handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true} value={this.state.selectedBank} required/>
                                </div>

                            </Grid>
                            <Grid item md={2}>
                                <Input label="کد شعبه" handleChange={(e) => this.handleChange(e, 'branchCode')} value={this.state.branchCode} />
                            </Grid>
                            <Grid item md={2}>
                                <Input label="نام شعبه" handleChange={(e) => this.handleChange(e, 'branchName')} value={this.state.branchName} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.account}
                                                       handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false} value={this.state.selectedAccount} required/>
                                </div>
                            </Grid>
                            <Grid item md={3}>
                                <NumberFormatComponent id="accountNumber" label="شماره حساب" required value={this.state.accountNumber}
                                                       handleChange={(value, error) => this.handleChange(value, 'accountNumber')} type="number" />
                            </Grid>
                            <Grid item md={3}>
                                <IBAN handleChange={(value) => this.handleChange(value, 'iban')} value={this.state.iban} />
                            </Grid>
                            <Grid item md={2}>
                                <Input label="نام صاحب حساب" handleChange={(e) => this.handleChange(e, 'bankAccountOwnerName')} value={this.state.bankAccountOwnerName} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={10}>
                                <div className="k-rtl">
                                    <MultiSelectComponent {...this.state.bankAccountUsages} dataItemKey="title"
                                                          handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true} value={this.state.partyBankAccountUsages}     />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} className="no-margin">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.isDefault}
                                        onChange={this.handleChangeCheck('isDefault')}
                                        value="isDefault"
                                        color="primary"
                                    />
                                }
                                label="حساب پیشفرض"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.purchaseFromBank}
                                        onChange={this.handleChangeCheck('purchaseFromBank')}
                                        value="isDefault"
                                        color="primary"
                                    />
                                }
                                label="خرید از محل بانک"
                            />
                        </Grid>

                    </Fieldset>
                </Form>
            </React.Fragment>
        )

    }

}

export default UpdatePartyBankAccounts;


