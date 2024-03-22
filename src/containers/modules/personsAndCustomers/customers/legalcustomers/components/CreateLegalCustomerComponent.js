import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import classNames from 'classnames';
import Input from 'shared/components/formInput/inputForm';
import Header from 'shared/components/stateHeader/stateHeader';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes, { func } from 'prop-types';
import styles from '../../../../../layout/panel/theme'
import DropDownComponent from 'shared/components/dropDown/dropDown';
import Form from 'shared/components/form/form';
import AddRealCustomerService from '../../realCustomers/services/CrateRealCustomerService';
import IBAN from 'shared/components/iban/textMask';
import Typography from '@material-ui/core/Typography';
import NationalCode from 'shared/components/nationalCode/nationalCode';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import serials from 'constants/serial';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import Fieldset from 'shared/components/fieldset/fieldset';
import Email from 'shared/components/email/email';
import GetEnum from 'services/getEnum';
import GetAllBankNames from 'services/getBanks';
import GetAllRegion from 'services/getRegion';
import GetMainMarket from 'services/GetMainMarkets';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import { initialState } from '../constants/CreateLegalCustomerConstat';
import getBankAccountUsages from "../../../../../../services/getBankAccountUsages";
import DropDownListDataProvider from "../../../../../../core/dropDownListDataProvider";

import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import GetAllRepresentativeForAutoComplete from '../../realCustomers/services/GetAllRepresentativeForAutoComplete';

class AddLegalCustomer extends React.Component {
    constructor(props) {
        super(props);

        this.state = initialState;
        this.successGetAllRegionsByFilter = this.successGetAllRegionsByFilter.bind(this);
        this.successBankAccountType = this.successBankAccountType.bind(this);
        this.successGetAllBankNames = this.successGetAllBankNames.bind(this);
        this.successGetBranchesByFilter = this.successGetBranchesByFilter.bind(this);
        this.successGetMainMarkets = this.successGetMainMarkets.bind(this);
        this.refresh = this.refresh.bind(this);
        this.preSubmit = this.preSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRegisterDate = this.handleRegisterDate.bind(this);
        this.getAllRegistry = this.getAllRegistry.bind(this);
        this.getBranchByFilter = this.getBranchByFilter.bind(this);
    }

    async componentDidMount() {
        this.getAllRegistry();
        this.getAllEnumtypes();
        this.getBranchByFilter();
        this.setState(this.getInitialState());
        GetEnum('partyaddresstype', (response) => { DropDownListDataProvider(this,"partyAddressType", response);});
    }

    getInitialState() {
        let initState = JSON.parse(JSON.stringify(initialState));
        return initState;
    }

    getAllRegistry() {
        var command = {
            optionalFilter: {
                take: 500,
                page: 1
            }
        }
        GetAllRegion(command, this.successGetAllRegionsByFilter);
    }
    successGetAllRegionsByFilter(response) {
        if (response.success) {
            this.setState({
                registerPlace: {
                    name: "selectedRegisterPlace",
                    feild: "title",
                    label: "محل ثبت",
                    list: response.result
                },
                province: {
                    name: "selectedProvince",
                    feild: "title",
                    label: "استان",
                    list: response.result
                },
                region: {
                    name: "selectedRegion",
                    feild: "title",
                    label: "شهر",
                    list: response.result
                }
            });
            this.getAllEnumtypes();

           
        }
    }
    getAllEnumtypes() {
        GetEnum("BankAccountType", this.successBankAccountType);
        GetMainMarket(this.successGetMainMarkets);
        GetAllBankNames(this.successGetAllBankNames) ;
        getBankAccountUsages((response) => DropDownListDataProvider(this,"bankAccountUsages",response))

    }

    successBankAccountType(response) {
        if (response.success) {
            this.setState({
                account: {
                    name: "selectedAccount",
                    feild: "title",
                    label: "نوع حساب",
                    list: response.result
                }
            })

        }
    }

  
    successGetAllBankNames(response) {
        if (response.success) {

            this.setState({
                bank: {
                    name: "selectedBank",
                    feild: "title",
                    label: "نام بانک",
                    list: response.result
                }
            });
   
        } 
    }

    getBranchByFilter(){
        var command = {
            optionalFilter: {
                take: 500,
                page: 1

            }
        };
        GetBranchService.getBranchesByFilter(command, this.successGetBranchesByFilter)
    }
    successGetBranchesByFilter(response) {
        if (response.success) {

            this.setState({
                branch: {
                    name: "selectedBranch",
                    feild: "title",
                    label: "عنوان شعبه کارگزاری",
                    list: response.result
                }
            });
        } 
    }
    successGetMainMarkets(response) {
        if (response.success) {

            this.setState({
                mainMarket: {
                    name: "selectedMainMarkets",
                    feild: "title",
                    label: "بازار",
                    list: response.result
                }
            })
        }
    }
    handleChangeCheck = name => (event) => {
        this.setState({
            [name]: event.target.checked,
        })

    };

    handleChange(event, name) {
        console.log([name], event.value);
        if(name === 'selectedPartyAddressType') {
            let addressLabel = `  نشانی ${event.value.title} `;
            let phoneLabel = `  تلفن ${event.value.title} `;
            console.log('addressLabel', phoneLabel);
            this.setState({
                [name]: event.value,
                addressLabelValue: addressLabel,
                phoneLabelValue: phoneLabel ,
            });
        }else {
            this.setState({
                [name]: event.value,
            })
        }
    }
    handleRegisterDate(value) {
        this.setState({
            registerDate: value
        })
    }
    preSubmit() {

        // var mainMarketIds = [];
        // if (Object.keys(this.state.selectedMainMarkets).length > 0) {
        //     this.state.selectedMainMarkets.map(item => {
        //         mainMarketIds.push(item.id);
        //     })
        //     return {
        //         party: {
        //             nationalId: this.state.nationalId,
        //             name: this.state.name,
        //             registerNumber: this.state.registerNumber,
        //             registerDate: this.state.registerDate,
        //             ecomomicCode: this.state.ecomomicCode,
        //             registerPlaceId: this.state.selectedRegisterPlace.id,
        //             branchId: this.state.selectedBranch.id,
        //             partyType: 2
        //
        //         },
        //         contact: {
        //             upRegionId: this.state.selectedProvince.id,
        //             regionId: this.state.selectedRegion.id,
        //             postalCode: this.state.postalCode ? this.state.postalCode.replace(/-/g, '') : null,
        //             businessPhone: this.state.phoneCode + this.state.businessPhone,
        //             mobile: this.state.mobile ? this.state.mobile.replace(/ /g, '') : null,
        //             email1: this.state.email1,
        //             webPage: this.state.webPage,
        //             businessAddress: this.state.businessAddress,
        //             addressType: 2004
        //         },
        //         partyBankAccount: {
        //             bankId: this.state.selectedBank.codeId,
        //             branchCode: this.state.branchCode,
        //             branchName: this.state.branchName,
        //             accountType: this.state.selectedAccount.code,
        //             accountNumber: this.state.accountNumber,
        //             iban: this.state.iban === "IR________________________" ? null : this.state.iban,
        //             bankAccountOwnerName: this.state.bankAccountOwnerName,
        //             purchaseFromBank: this.state.purchaseFromBank
        //         },
        //         mainMarket: mainMarketIds
        //     }
        // }
    };

    refresh() {
        this.setState(this.getInitialState());
        this.getAllRegistry();

    }
    handleRepresentativeChange = (item) => {
        console.log('autoComplete: ',item.value.id);
        this.setState({
            selectedRepresentative: item.value,
        })
    };
    render() {

        return (
            <React.Fragment>
                <WrapperPaper />
                <Header {...this.props} />
                <Form
                    {...this.props}
                    {...this.state}
                    service={AddRealCustomerService.saveParty}
                    redirect={"/main/persons/customers/completeRegisterLegal"}
                    // preSubmit={this.preSubmit}
                    entity={{
                        party: {
                            nationalId: this.state.nationalId,
                            name: this.state.name,
                            registerNumber: this.state.registerNumber,
                            registerDate: this.state.registerDate,
                            ecomomicCode: this.state.ecomomicCode,
                            registerPlaceId: this.state.selectedRegisterPlace.id,
                            branchId: this.state.selectedBranch.id,
                            partyType: 2,
                            representativeId: this.state.selectedRepresentative.id,
                        },
                        contact: {
                            upRegionId: this.state.selectedProvince.id,
                            regionId: this.state.selectedRegion.id,
                            postalCode: this.state.postalCode ? this.state.postalCode.replace(/-/g, '') : null,
                            businessPhone: this.state.phoneCode + this.state.businessPhone,
                            mobile: this.state.mobile ? this.state.mobile.replace(/ /g, '') : null,
                            email1: this.state.email1,
                            webPage: this.state.webPage,
                            address: this.state.address,
                            addressType: this.state.selectedPartyAddressType.code,
                            originalPhone: this.state.phone,
                            prePhone: this.state.prePhone,
                        },
                        partyBankAccount: {
                            bankId: this.state.selectedBank.codeId,
                            branchCode: this.state.branchCode,
                            branchName: this.state.branchName,
                            accountType: this.state.selectedAccount.code,
                            accountNumber: this.state.accountNumber,
                            iban: this.state.iban === "IR________________________" ? null : this.state.iban,
                            bankAccountOwnerName: this.state.bankAccountOwnerName,
                            purchaseFromBank: this.state.purchaseFromBank,
                            // partyBankAccountUsages: this.state.partyBankAccountUsages
                        },
                        mainMarket: this.state.selectedMainMarkets.length> 0 ? this.state.selectedMainMarkets.map(s=>{return s.id}) : []
                    }
                    }
                    SubmitTitle={'ذخیره و تکمیل اطلاعات'}
                    otherAction={[
                        {
                            color: "#43a047",
                            title: 'ذخیره و ثبت مشتری جدید',
                            action: {
                                isSubmit: true,
                                method: this.refresh
                            }
                        }
                    ]}
                    className="form-height">
                    <Fieldset legend={'اطلاعات مشتری'}>

                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={5}>
                                <Input label="نام شرکت" handleChange={(e) => this.handleChange(e, 'name')} value={this.state.name} required />
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="nationalId"
                                    label="شناسه ملی"
                                    value={this.state.nationalId}
                                    handleChange={(value, error) => this.handleChange(value, 'nationalId')}
                                    type="number"
                                    format={'###########'}
                                    required={this.state.ecomomicCode !== ''? false: true} />
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="ecomomicCode" label="شماره اقتصادی"
                                    value={this.state.ecomomicCode}
                                    handleChange={(value, error) => this.handleChange(value, 'ecomomicCode')}
                                    type="number"
                                    format={'##############'}
                                    required={this.state.nationalId !== ''? false: true}/>
                            </Grid>

                        </Grid>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={2}>
                                <NumberFormatComponent id="registerNumber" label="شماره ثبت"
                                    value={this.state.registerNumber}
                                    handleChange={(value, error) => this.handleChange(value, 'registerNumber')} type="number" format={'###########'} mask={'_'}/>
                            </Grid>
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.registerPlace}
                                        handleChange={(value, name) => this.handleChange(value, name)}
                                        isFilterable={true}
                                        value={this.state.selectedRegisterPlace}/>
                                </div>
                            </Grid>
                            <Grid item md={2}>
                                <PersianDatePicker selectedData={this.state.registerDate} label="تاریخ ثبت" handleOnChange={this.handleRegisterDate} />
                            </Grid>


                        </Grid>

                    </Fieldset>
                    <br />
                    <Fieldset legend={'اطلاعات تماس'}>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={3}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.partyAddressType}
                                                       handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false}
                                                       value={this.state.selectedPartyAddressType}
                                                       required/>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.province}
                                        handleChange={(value, name) => this.handleChange(value, name)} nameFeild="province" isFilterable={true}
                                        value={this.state.selectedProvince} />
                                </div>
                            </Grid>
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.region}
                                        handleChange={(value, name) => this.handleChange(value, name)} nameFeild="region" isFilterable={true}
                                        value={this.state.selectedRegion}/>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={8}>
                                <Input label={this.state.addressLabelValue} handleChange={(e) => this.handleChange(e, 'address')} value={this.state.address} required/>
                            </Grid>

                        </Grid>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={4}>
                                <NumberFormatComponent id="postalCode" label="کد پستی"
                                                       value={this.state.postalCode}
                                                       handleChange={(value, error) => this.handleChange(value, 'postalCode')} type="number" format={'#####-#####'} />
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="prePhone" label={this.state.phoneLabelValue}
                                    value={this.state.phone}
                                    handleChange={(value, error) => this.handleChange(value, 'phone')} type="number" format={'########'} required/>
                            </Grid>
                            <span className="margin-top-25">ـ</span>
                            <Grid item md={1}>
                                <NumberFormatComponent id="phoneCode" label="پیش شماره"
                                    value={this.state.prePhone}
                                    handleChange={(value, error) => this.handleChange(value, 'prePhone')} format={'###'} type="number" required/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={2}>
                                <NumberFormatComponent id="mobile" label="شماره همراه"
                                    value={this.state.mobile}
                                    handleChange={(value, error) => this.handleChange(value, 'mobile')} type="number" format={'09## #######'} />
                            </Grid>
                            <Grid item md={3}>
                                <Email handleChange={(e) => this.handleChange(e, 'email1')} value={this.state.email1} isLeftStartText={true} />
                            </Grid>
                            <Grid item md={3}>
                                <Input label="وب سایت" handleChange={(e) => this.handleChange(e, 'webPage')} value={this.state.webPage} isLeftStartText={true} />
                            </Grid>
                        </Grid>

                    </Fieldset>
                    <br />
                    <Fieldset legend={'اطلاعات بانکی'}>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <DropDownComponent
                                        {...this.state.bank}
                                        handleChange={(value, name) => this.handleChange(value, name)}
                                        nameFeild="bank"
                                        isFilterable={true}
                                        value={this.state.selectedBank}
                                        required/>
                                </div>
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="branchCode" label="کد شعبه"
                                    value={this.state.branchCode}
                                    handleChange={(value) => this.handleChange(value, 'branchCode')} type="number" />
                            </Grid>
                            <Grid item md={2}>
                                <Input label="نام شعبه" handleChange={(e) => this.handleChange(e, 'branchName')} value={this.state.branchName} />
                            </Grid>
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.account}
                                        handleChange={(value, name) => this.handleChange(value, name)} nameFeild="account" isFilterable={false} value={this.state.selectedAccount} required/>
                                </div>
                            </Grid>

                            {/*<Grid item md={2}>*/}
                                {/*<div className="k-rtl">*/}
                                    {/*<DropDownComponent {...this.state.bankAccountUsages}*/}
                                                       {/*handleChange={(value, name) => this.handleChange(value, name)} nameFeild="account" isFilterable={false} value={this.state.partyBankAccountUsages} required={true} />*/}
                                {/*</div>*/}
                            {/*</Grid>*/}
                        </Grid>

                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={3}>
                                <NumberFormatComponent id="accountNumber" label="شماره حساب" value={this.state.accountNumber}
                                    handleChange={(value, error) => this.handleChange(value, 'accountNumber')} type="number" required/>
                            </Grid>
                            <Grid item md={3}>
                                <IBAN handleChange={(value) => this.handleChange(value, 'iban')} value={this.state.iban} />
                            </Grid>
                            <Grid item md={3}>
                                <Input label="نام صاحب حساب" handleChange={(e) => this.handleChange(e, 'bankAccountOwnerName')} value={this.state.bankAccountOwnerName} />
                            </Grid>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.purchaseFromBank}
                                        onChange={this.handleChangeCheck('purchaseFromBank')}
                                        value="purchaseFromBank"
                                        color="primary"
                                    />
                                }
                                label="خرید از محل بانک"
                            />
                        </Grid>
                    </Fieldset>
                    <Grid container spacing={16} className="no-margin">
                        <Grid item md={3}>
                            <div className="k-rtl">
                                <DropDownComponent {...this.state.branch}
                                    handleChange={(value, name) => this.handleChange(value, name)} nameFeild="branch" isFilterable={true}
                                    value={this.state.selectedBranch}
                                    required/>
                            </div>
                        </Grid>
                        <Grid item md={5}>
                            <div className="k-rtl">
                                <MultiSelectComponent {...this.state.mainMarket}
                                    handleChange={(value, name) => this.handleChange(value, name)} nameFeild="mainMarket" isFilterable={false} value={this.state.selectedMainMarkets} />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={16} className="no-margin">
                        <Grid item md={10}>
                                <AutoCompleteComponent
                                    {...this.state.representative}
                                    handleChange={(value) => this.handleRepresentativeChange(value)}
                                    service={GetAllRepresentativeForAutoComplete.GetAllRepresentativeForAutoCompleteMethod}
                                    value={this.state.selectedRepresentative.fullName}
                                />
                        </Grid>
                    </Grid>
                </Form>
            </React.Fragment >
        )
    }
}

AddLegalCustomer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddLegalCustomer);