import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import classNames from 'classnames';
import Input from 'shared/components/formInput/inputForm'
import Email from 'shared/components/email/email'
import Header from 'shared/components/stateHeader/stateHeader'
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes, { func } from 'prop-types';
import styles from '../../../../../layout/panel/theme'
import DropDownComponent from 'shared/components/dropDown/dropDown';
import toastr from 'toastr';
import Form from 'shared/components/form/pureForm';
import AddRealCustomerService from '../services/CrateRealCustomerService';
import IBAN from 'shared/components/iban/textMask';
import Typography from '@material-ui/core/Typography';
import NationalCode from 'shared/components/nationalCode/nationalCode';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import serials from 'constants/serial';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import Fieldset from 'shared/components/fieldset/fieldset';

const initialState = {
    nationalCode: '',
    firstName: '',
    lastName: '',
    fatherName: '',
    postalCode: '',
    phoneCode: '',
    homePhone: '',
    homeAddress: '',
    mobile: '',
    email1: '',
    branchCode: '',
    branchName: '',
    accountNumber: '',
    iban: '',
    bankAccountOwnerName: '',
    birthDate: null,
    selectedSerialLetter: {},
    purchaseFromBank: false,
    serialLetter: {
        name: "selectedSerialLetter",
        feild: "text",
        label: "حروف سری شناسنامه",
        type: "client",
        list: serials
    },
    identityCard: '',
    identitySerialLongNumber: '',
    identitySerialShortNumber: '',
    identityPlace: {},
    birthDatePlace: {},
    mainMarket: {},
    bank: {},
    gender: {},
    maritalStatus: {},
    province: {},
    region: {},
    account: {},
    branch: {},
    selectedBirthDatePlace: {},
    selectedIdentityPlace: {},
    selectedGender: {},
    selectedMaritalStatus: {},
    selectedAccount: {},
    selectedProvince: {},
    selectedRegion: {},
    selectedBank: {},
    selectedBranch: {},
    selectedMainMarkets: {},
};

class ServicesOfRealCustomer extends React.Component {
    constructor(props) {
        super(props);

        this.state = initialState;
        this.successGetAllRegionsByFilter = this.successGetAllRegionsByFilter.bind(this);
        this.successGetAllEnumType = this.successGetAllEnumType.bind(this);
        this.successGetAllBankNames = this.successGetAllBankNames.bind(this);
        this.successGetBranchesByFilter = this.successGetBranchesByFilter.bind(this);
        this.successGetMainMarkets = this.successGetMainMarkets.bind(this);
        this.refresh = this.refresh.bind(this);
        this.preSubmit = this.preSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBirthDate = this.handleBirthDate.bind(this);
        this.getAllRegistry = this.getAllRegistry.bind(this);
    }

   async componentDidMount() {
    this.getAllRegistry();
     this.setState(this.getInitialState());
    }

    getInitialState() {
        let initState = JSON.parse(JSON.stringify(initialState));
        return initState;
    }

    getAllRegistry(){
        var command = {
            optionalFilter: {
                take: 500,
                page: 1
            }
        }
        AddRealCustomerService.getAllRegionsByFilter(command, this.successGetAllRegionsByFilter);
    }
    successGetAllRegionsByFilter(response) {
        if (response.bRuleCode === 1000) {
            this.setState({
                birthDatePlace: {
                    name: "selectedBirthDatePlace",
                    feild: "title",
                    label: "محل تولد",
                    type: "client",
                    list: response.result
                },
                identityPlace: {
                    name: "selectedIdentityPlace",
                    feild: "title",
                    label: "محل صدور شناسنامه",
                    type: "client",
                    list: response.result
                },
                province: {
                    name: "selectedProvince",
                    feild: "title",
                    label: "استان",
                    type: "client",
                    list: response.result
                },
                region: {
                    name: "selectedRegion",
                    feild: "title",
                    label: "شهر",
                    type: "client",
                    list: response.result
                }
            })
            AddRealCustomerService.getAllEnumType(null, this.successGetAllEnumType);
        } else {
            toastr.error(response.message);
        }
    }
    successGetAllEnumType(response) {
        if (response.bRuleCode === 1000) {
            var list = [];

            response.result.Gender.map(item => {
                if (item.Key !== 0)
                    list.push(item);
            })

            this.setState({
                selectedGender: list[0],
                selectedMaritalStatus: response.result.MaritalStatus[0],
                gender: {
                    name: "selectedGender",
                    feild: "Title",
                    label: "جنسیت",
                    type: "client",
                    list: list
                },
                maritalStatus: {
                    name: "selectedMaritalStatus",
                    feild: "Title",
                    label: "وضعیت تاهل",
                    type: "client",
                    list: response.result.MaritalStatus
                },
                account: {
                    name: "selectedAccount",
                    feild: "Title",
                    label: "نوع حساب",
                    type: "client",
                    list: response.result.BankAccountType
                },


            })
            AddRealCustomerService.getAllBankNames(null, this.successGetAllBankNames);
        } else {
            toastr.error(response.message);
        }
    }

    successGetAllBankNames(response) {
        if (response.bRuleCode === 1000) {

            this.setState({
                bank: {
                    name: "selectedBank",
                    feild: "title",
                    label: "نام بانک",
                    type: "client",
                    list: response.result
                }
            });
            var command = {
                optionalFilter: {
                    take: 500,
                    page: 1

                }
            };
            GetBranchService.getBranchesByFilter(command, this.successGetBranchesByFilter)
        } else {
            toastr.error(response.message);
        }
    }

    successGetBranchesByFilter(response) {
        if (response.bRuleCode === 1000) {

            this.setState({
                branch: {
                    name: "selectedBranch",
                    feild: "title",
                    label: "عنوان شعبه کارگزاری",
                    type: "client",
                    list: response.result
                }
            });
            AddRealCustomerService.getMainMarkets(null, this.successGetMainMarkets)
        } else {
            toastr.error(response.message);
        }
    }
    successGetMainMarkets(response) {
        if (response.bRuleCode === 1000) {

            this.setState({
                mainMarket: {
                    name: "selectedMainMarkets",
                    feild: "title",
                    label: "بازار",
                    type: "multi-select-client",
                    list: response.result
                }
            })
        } else {
            toastr.error(response.message);
        }
    }
    handleChangeCheck = name => (event) => {
        this.setState({
            [name]: event.target.checked,
        })

    };

    handleChange(value, name) {
        let item = value.value;
        this.setState({
            [name]: item
        })
    }
    handleBirthDate(value) {
        this.setState({
            birthDate: value
        })
    }
    preSubmit() {

        var mainMarketIds = [];
        this.state.selectedMainMarkets.map(item => {
            mainMarketIds.push(item.id);
        })
        return {
            party: {
                nationalId: this.state.nationalCode,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                fatherName: this.state.fatherName,
                birthDate: this.state.birthDate,
                identityCard:this.state.identityCard,
                identitySerialLetter: this.state.selectedSerialLetter.text,
                identitySerialShortNumber: this.state.identitySerialShortNumber,
                identitySerialLongNumber: this.state.identitySerialLongNumber,
                birthPlaceId: this.state.selectedBirthDatePlace.id,
                birthPlaceId: this.state.selectedIdentityPlace.id,
                gender: this.state.selectedGender.Key,
                maritalStatus: this.state.selectedMaritalStatus.Key,
                branchId: this.state.selectedBranch.id,
                partyType: 1

            },
            contact: {
                upRegionId: this.state.selectedProvince.id,
                regionId: this.state.selectedRegion.id,
                postalCode: this.state.postalCode.replace(/-/g, ''),
                homePhone: this.state.phoneCode + this.state.homePhone,
                mobile: this.state.mobile.replace(/ /g, ''),
                email1: this.state.email1,
                homeAddress: this.state.homeAddress,
                addressType: 2000
            },
            partyBankAccount: {
                bankId: this.state.selectedBank.codeId,
                branchCode: this.state.branchCode,
                branchName: this.state.branchName,
                accountType: this.state.selectedAccount.Key,
                accountNumber: this.state.accountNumber,
                iban: this.state.iban,
                bankAccountOwnerName: this.state.bankAccountOwnerName,
                purchaseFromBank: this.state.purchaseFromBank
            },
            mainMarket: mainMarketIds
        }
    };

    refresh() {
        this.setState(this.getInitialState());
        this.getAllRegistry();

    }

    render() {
        return (
            <React.Fragment>
                <WrapperPaper />
                <Header {...this.props} />
                <Form
                    {...this.props}
                    {...this.state}
                    service={AddRealCustomerService.saveParty}
                    redirect={"/main/persons/customers/addFilesCustomer"}
                    preSubmit={this.preSubmit}
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
                    <Fieldset legend={'اطلاعات فردی'}>

                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={2}>
                                <NationalCode id="nationalCode" label="کد ملی" required
                                    value={this.state.nationalCode}
                                    handleChange={(value) => this.handleChange(value, 'nationalCode')} type="number" />
                            </Grid>
                            <Grid item md={2}>
                                <Input label="نام" handleChange={(e) => this.handleChange(e, 'firstName')} value={this.state.firstName} required />
                            </Grid>
                            <Grid item md={3} className="width-md-4">
                                <Input label="نام خانوادگی" handleChange={(e) => this.handleChange(e, 'lastName')} value={this.state.lastName} required />
                            </Grid>
                            <Grid item md={2}>
                                <Input label="نام پدر" handleChange={(e) => this.handleChange(e, 'fatherName')} value={this.state.fatherName} />
                            </Grid>


                        </Grid>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={2}>
                                <PersianDatePicker label="تاریخ تولد" handleOnChange={this.handleBirthDate} />
                            </Grid>
                            <Grid item md={3}>
                            <Grid container spacing={16}>
                            <Grid item md={7}>
                           
                           <div className="k-rtl">
                               <DropDownComponent {...this.state.serialLetter}
                                   handleChange={(value, name) => this.handleChange(value, name)} nameFeild="serialLetter" isFilterable={false}
                                   value={this.state.selectedSerialLetter} />
                           </div>
                       </Grid>
                       <Grid item  md={5}>
                           <NumberFormatComponent id="identitySerialShortNumber" label="سری شناسنامه" required
                               value={this.state.identitySerialShortNumber}
                               handleChange={(value, error) => this.handleChange(value, 'identitySerialShortNumber')} type="number" format={'##'} mask={'_'} />
                       </Grid>
                            </Grid>
                            </Grid>
                           
                            <Grid item md={2}>
                                <NumberFormatComponent id="identitySerialLongNumber" label="سریال شناسنامه" required
                                    value={this.state.identitySerialLongNumber}
                                    handleChange={(value, error) => this.handleChange(value, 'identitySerialLongNumber')} type="number" format={'######'} mask={'_'} />
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="identityCard" label="شماره شناسنامه" required
                                    value={this.state.identityCard}
                                    handleChange={(value, error) => this.handleChange(value, 'identityCard')} type="number" format={'##########'} />
                            </Grid>

                        </Grid>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.birthDatePlace}
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                                        value={this.state.selectedBirthDatePlace} />
                                </div>
                            </Grid>
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.identityPlace}
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                                        value={this.state.selectedIdentityPlace} />
                                </div>
                            </Grid>
                            <Grid item md={1}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.gender}
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false}
                                        value={this.state.selectedGender} />
                                </div>
                            </Grid>
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.maritalStatus}
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false}
                                        value={this.state.selectedMaritalStatus} />
                                </div>
                            </Grid>
                        </Grid>
                    </Fieldset>
                    <br />
                    <Fieldset legend={'اطلاعات تماس'}>
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
                                        value={this.state.selectedRegion} />
                                </div>
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="postalCode" label="کد پستی" required
                                    value={this.state.postalCode}
                                    handleChange={(value, error) => this.handleChange(value, 'postalCode')} type="number" format={'#####-#####'} />
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="homePhone" label="شماره تلفن" required
                                    value={this.state.homePhone}
                                    handleChange={(value, error) => this.handleChange(value, 'homePhone')} type="number" format={'########'} />
                            </Grid>
                            <span className="margin-top-25">ـ</span>
                            <Grid item md={2}>
                                <NumberFormatComponent id="phoneCode" label="پیش شماره تلفن" required
                                    value={this.state.phoneCode}
                                    handleChange={(value, error) => this.handleChange(value, 'phoneCode')} type="number" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={2}>
                                <NumberFormatComponent id="mobile" label="شماره همراه" required
                                    value={this.state.mobile}
                                    handleChange={(value, error) => this.handleChange(value, 'mobile')} type="number" format={'09## #######'} />
                            </Grid>
                            <Grid item md={3}>
                             
                                <Email  handleChange={(e) => this.handleChange(e, 'email1')} value={this.state.email1} isLeftStartText={true} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={11} sm={11}>
                                <Input label="آدرس محل سکونت" handleChange={(e) => this.handleChange(e, 'homeAddress')} value={this.state.homeAddress} />
                            </Grid>

                        </Grid>
                    </Fieldset>
                    <br />
                    <Fieldset legend={'اطلاعات بانکی'}>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={3}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.bank}
                                        handleChange={(value, name) => this.handleChange(value, name)} nameFeild="bank" isFilterable={true} value={this.state.selectedBank} />
                                </div>
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="branchCode" label="کد شعبه" required
                                    value={this.state.branchCode}
                                    handleChange={(value) => this.handleChange(value, 'branchCode')} type="number" />
                            </Grid>
                            <Grid item md={3}>
                                <Input label="نام شعبه" required handleChange={(e) => this.handleChange(e, 'branchName')} value={this.state.branchName} />
                            </Grid>
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.account}
                                        handleChange={(value, name) => this.handleChange(value, name)} nameFeild="account" isFilterable={false} value={this.state.selectedAccount} />
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={3}>
                                <NumberFormatComponent id="accountNumber" label="شماره حساب" required value={this.state.accountNumber}
                                    handleChange={(value, error) => this.handleChange(value, 'accountNumber')} type="number" />
                            </Grid>
                            <Grid item md={3}>
                                <IBAN handleChange={(value) => this.handleChange(value, 'iban')} value={this.state.iban} />
                            </Grid>
                            <Grid item md={3}>
                                <Input label="نام صاحب حساب" required handleChange={(e) => this.handleChange(e, 'bankAccountOwnerName')} value={this.state.bankAccountOwnerName} />
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
                                    value={this.state.selectedBranch} />
                            </div>
                        </Grid>
                        <Grid item md={5}>
                            <div className="k-rtl">
                                <DropDownComponent {...this.state.mainMarket}
                                    handleChange={(value, name) => this.handleChange(value, name)} nameFeild="mainMarket" isFilterable={false} value={this.state.selectedMainMarkets} />
                            </div>
                        </Grid>
                    </Grid>
                </Form>
            </React.Fragment >
        )
    }
}

ServicesOfRealCustomer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ServicesOfRealCustomer);