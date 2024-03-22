import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import Input from 'shared/components/formInput/inputForm'
import Header from 'shared/components/stateHeader/stateHeader'
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes, { func } from 'prop-types';
import styles from '../../../../../layout/panel/theme'
import DropDownComponent from 'shared/components/dropDown/dropDown';
import Form from 'shared/components/form/form';
import EditRealCustomerService from '../../realCustomers/services/UpdateRealCustomerService';
import IBAN from 'shared/components/iban/textMask';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import Fieldset from 'shared/components/fieldset/fieldset';
import Email from 'shared/components/email/email';
import GetEnum from 'services/getEnum';
import GetAllBankNames from 'services/getBanks';
import GetAllRegion from 'services/getRegion';
import GetMainMarket from 'services/GetMainMarkets';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import DropDownListDataProvider from "../../../../../../core/dropDownListDataProvider";
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import { customerTemplateForRepresentativeAutoComplete, customerHeaderTemplateForRepresentativeAutoComplete } from 'constants/autoCompleteTemplate'
import GetAllRepresentativeForAutoComplete from '../../realCustomers/services/GetAllRepresentativeForAutoComplete';
import UpdateUncompletedPartyService from '../../realCustomers/services/UpdateUncompletedPartyService';
const initialState = {
    registerNumber: '',
    nationalId: '',
    ecomomicCode: '',
    name: '',
    postalCode: null,
    phoneCode: '',
    businessPhone: '',
    businessAddress: '',
    mobile: null,
    email1: null,
    webPage: null,
    branchCode: '',
    branchName: '',
    accountNumber: '',
    iban: null,
    bankAccountOwnerName: '',
    registerDate: null,
    purchaseFromBank: false,
    registerPlace: {
        name: "selectedRegisterPlace",
        feild: "title",
        label: "محل ثبت",
        list: []
    },
    mainMarket: {
        name: "selectedMainMarkets",
        feild: "title",
        label: "بازار",
        list: []
    },
    bank: {
        name: "selectedBank",
        feild: "title",
        label: "نام بانک",
        list: []
    },
    province: {
        name: "selectedProvince",
        feild: "title",
        label: "استان",
        list: []
    },
    region: {
        name: "selectedRegion",
        feild: "title",
        label: "شهر",
        list: []
    },
    account: {
        name: "selectedAccount",
        feild: "title",
        label: "نوع حساب",
        list: []
    },
    branch: {
        name: "selectedBranch",
        feild: "title",
        label: "عنوان شعبه کارگزاری",
        list: []
    },
    selectedRegisterPlace: {},
    selectedAccount: {},
    selectedProvince: {},
    selectedRegion: {},
    selectedBank: {},
    selectedBranch: {},
    selectedMainMarkets: {},

    partyAddressType: {
        name: "selectedPartyAddressType",
        feild: "title",
        label: "نوع نشانی",
        list: []
    },
    selectedPartyAddressType: {},
    AddressTypeId: '',

    partyInfo: {
        party: {
            id: '',
        },
        contact: {
            id: '',
        },
        partyBankAccount: {
            id: '',
        }
    },

    phone: '',
    prePhone: '',
    address: '',

    addressLabelValue: 'نشانی',
    phoneLabelValue: 'تلفن',



    representative: {
        name: "selectedRepresentative",
        field: "fullName",
        placeholder: "جتسجوی معرف بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر و شماره تفضیل",
        list: [],
        template: customerTemplateForRepresentativeAutoComplete,
        headerTemplate: customerHeaderTemplateForRepresentativeAutoComplete,
        label: 'جستجوی معرف'
       
    },
    selectedRepresentative: { fullName: '', id: 0 },

};

class UpdateLegalUncompletedCustomerComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = initialState;
        this.successGetAllRegionsByFilter = this.successGetAllRegionsByFilter.bind(this);
        this.successGetCustomerById = this.successGetCustomerById.bind(this);
        this.successBankAccountType = this.successBankAccountType.bind(this);
        this.successGetAllBankNames = this.successGetAllBankNames.bind(this);
        this.successGetBranchesByFilter = this.successGetBranchesByFilter.bind(this);
        this.refresh = this.refresh.bind(this);
        this.preSubmit = this.preSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRegisterDate = this.handleRegisterDate.bind(this);
        this.getAllRegistry = this.getAllRegistry.bind(this);
        this.getBranchByFilter = this.getBranchByFilter.bind(this);
    }

    async componentDidMount() {
        
        this.getCustomerById();
        this.setState(this.getInitialState());
        GetEnum('partyaddresstype', (response) => { DropDownListDataProvider(this,"partyAddressType", response);});
    }

    getInitialState() {
        let initState = JSON.parse(JSON.stringify(initialState));
        return initState;
    }

    getCustomerById = () => {
       
        if (this.props.location.state && this.props.location.state.partyId) {
            var command = {
                entity: this.props.location.state.partyId
            }
            EditRealCustomerService.getCustomerById(command, this.successGetCustomerById);
        } else {
            this.props.history.push(this.props.back.path);
        }
    }

    successGetCustomerById(response) {
        if (response.success) {
            var res = response.result;
            console.log('res: ',res);
            this.setState({
                partyInfo: res,
                nationalId: res.party.nationalId,
                name: res.party.name,
                ecomomicCode: res.party.ecomomicCode,
                registerNumber: res.party.registerNumber,
                registerDate: res.party.registerDate,
                postalCode: res.contact.postalCode,
                businessPhone: res.contact.businessPhone,
                mobile: res.contact.mobile.slice(2),
                email1: res.contact.email1,
                webPage: res.contact.webPage,
                businessAddress: res.contact.businessAddress,
                branchCode: res.partyBankAccount.branchCode,
                branchName: res.partyBankAccount.branchName,
                accountNumber: res.partyBankAccount.accountNumber,
                bankAccountOwnerName: res.partyBankAccount.bankAccountOwnerName,
                purchaseFromBank: res.partyBankAccount.purchaseFromBank,
                iban: res.partyBankAccount.iban,
                AddressTypeId: res.contact.addressType,
                phone: res.contact.originalPhone,
                prePhone: res.contact.prePhone,
                address: res.contact.address,
                selectedRepresentative: {
                    fullName: res.party.representativeName,
                    id: res.party.representativeId
                },
            }, function () {
                this.getAllRegistry();
                this.getAllEnumtypes();
                this.getBranchByFilter();
                GetEnum('partyaddresstype', (response) => {
               
                    for(let i = 0; i < response.result.length; i++) {
                        if(response.result[i].code == this.state.AddressTypeId) {
                            this.setState({
                                selectedPartyAddressType: response.result[i]
                            })
                        }
                    }
                });

            });
        };
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
            response.result.map(item => {
                if (item.id === this.state.partyInfo.party.registerPlaceId) {
                    this.setState({
                        selectedRegisterPlace: item,
                    })
                }
                if (item.id === this.state.partyInfo.contact.regionId) {
                    this.setState({
                        selectedRegion: item,
                    })
                }
                if (item.id == this.state.partyInfo.contact.upRegionId) {
                    this.setState({
                        selectedProvince: item,
                    })
                }
            })
            this.setState({
                registerPlace: {
                    name: "selectedRegisterPlace",
                    feild: "title",
                    label: "محل ثبت",
                    list: response.result
                },
            })
            this.setState({
                region: {
                    name: "selectedRegion",
                    feild: "title",
                    label: "شهر",
                    type: "client",
                    list: response.result
                }
            })
            this.setState({
                province: {
                    name: "selectedProvince",
                    feild: "title",
                    label: "استان",
                    type: "client",
                    list: response.result
                }
            })

        }
    }
    getAllEnumtypes() {
        GetEnum("BankAccountType", this.successBankAccountType);
        GetAllBankNames(this.successGetAllBankNames);
    }

    successBankAccountType(response) {
        if (response.success) {
            response.result.map(item => {
                if (item.code === this.state.partyInfo.partyBankAccount.accountType) {
                    this.setState({
                        selectedAccount: item,
                    })
                }
            })
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
            response.result.map(item => {
                if (item.codeId === this.state.partyInfo.partyBankAccount.bankId) {
                    this.setState({
                        selectedBank: item,
                    });
                }
            })

            this.setState({
                bank: {
                    name: "selectedBank",
                    feild: "title",
                    label: "نام بانک",
                    type: "client",
                    list: response.result
                }
            });

        }
    }

    getBranchByFilter() {
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
            response.result.map(item => {
                if (item.id === this.state.partyInfo.party.branchId) {
                    this.setState({
                        selectedBranch: item,
                    });
                }
            });
            this.setState({
                branch: {
                    name: "selectedBranch",
                    feild: "title",
                    label: "عنوان شعبه کارگزاری",
                    type: "client",
                    list: response.result
                }
            });


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
        return {
            party: {
                id: this.state.partyInfo.party.id,
                nationalId: this.state.nationalId,
                name: this.state.name,
                registerNumber: this.state.registerNumber,
                registerDate: this.state.registerDate,
                ecomomicCode: this.state.ecomomicCode,
                registerPlaceId: this.state.selectedRegisterPlace.id,
                branchId: this.state.selectedBranch.id,
                partyType: 2

            },
            contact: {
                id: this.state.partyInfo.contact.id,
                partyId: this.state.partyInfo.party.id,
                upRegionId: this.state.selectedProvince.id,
                regionId: this.state.selectedRegion.id,
                postalCode: this.state.postalCode ? this.state.postalCode.replace(/-/g, '') : null,
                businessPhone: this.state.phoneCode + this.state.businessPhone,
                mobile: this.state.mobile ? this.state.mobile.replace(/ /g, '') : null,
                email1: this.state.email1,
                webPage: this.state.webPage,
                businessAddress: this.state.businessAddress,
                addressType: this.state.selectedPartyAddressType.code,
                phone:this.state.phone,
                prePhone:this.state.prePhone,
                address: this.state.address,
            },
            partyBankAccount: {
                id: this.state.partyInfo.partyBankAccount.id,
                partyId: this.state.partyInfo.party.id,
                bankId: this.state.selectedBank.codeId,
                branchCode: this.state.branchCode,
                branchName: this.state.branchName,
                accountType: this.state.selectedAccount.code,
                accountNumber: this.state.accountNumber,
                iban: this.state.iban === "IR________________________" ? null : this.state.iban,
                bankAccountOwnerName: this.state.bankAccountOwnerName,
                purchaseFromBank: this.state.purchaseFromBank
            }
        }
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
        console.log('partyInfo', this.state.partyInfo.party.id);
        return (
            <React.Fragment>
                <WrapperPaper />
                <Header {...this.props} />
                <Form
                    {...this.props}
                    {...this.state}
                    service={UpdateUncompletedPartyService.updatepartyforuncompletedpartyMethod}
                    // preSubmit={this.preSubmit}
                    entity={
                        {
                            party: {
                                id: this.state.partyInfo.party.id,
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
                                id: this.state.partyInfo.contact.id,
                                partyId: this.state.partyInfo.party.id,
                                upRegionId: this.state.selectedProvince.id,
                                regionId: this.state.selectedRegion.id,
                                postalCode: this.state.postalCode ? this.state.postalCode.replace(/-/g, '') : null,
                                businessPhone: this.state.phoneCode + this.state.businessPhone,
                                mobile: this.state.mobile ? this.state.mobile.replace(/ /g, '') : null,
                                email1: this.state.email1,
                                webPage: this.state.webPage,
                                businessAddress: this.state.businessAddress,
                                addressType: this.state.selectedPartyAddressType.code,
                                originalPhone:this.state.phone,
                                prePhone:this.state.prePhone,
                                address: this.state.address,
                            },
                            partyBankAccount: {
                                id: this.state.partyInfo.partyBankAccount.id,
                                partyId: this.state.partyInfo.party.id,
                                bankId: this.state.selectedBank.codeId,
                                branchCode: this.state.branchCode,
                                branchName: this.state.branchName,
                                accountType: this.state.selectedAccount.code,
                                accountNumber: this.state.accountNumber,
                                iban: this.state.iban === "IR________________________" ? null : this.state.iban,
                                bankAccountOwnerName: this.state.bankAccountOwnerName,
                                purchaseFromBank: this.state.purchaseFromBank
                            }
                        }
                    }
                    SubmitTitle={'ذخیره'}
                    className="form-height">
                    <Fieldset legend={'اطلاعات مشتری'}>

                        <Grid container spacing={16} className="no-margin">

                            <Grid item md={5}>
                                <Input label="نام شرکت" handleChange={(e) => this.handleChange(e, 'name')} value={this.state.name} required />
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="nationalId" label="شناسه ملی" required={this.state.ecomomicCode !== ''? false: true}
                                    value={this.state.nationalId}
                                    handleChange={(value, error) => this.handleChange(value, 'nationalId')} type="number" format={'###########'} />
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="ecomomicCode" label="شماره اقتصادی" required={this.state.nationalId !== ''? false: true}
                                    value={this.state.ecomomicCode}
                                    handleChange={(value, error) => this.handleChange(value, 'ecomomicCode')} type="number" format={'##############'} />
                            </Grid>

                        </Grid>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={2}>
                                <NumberFormatComponent id="registerNumber" label="شماره ثبت"
                                    value={this.state.registerNumber}
                                    handleChange={(value, error) => this.handleChange(value, 'registerNumber')} type="number" format={'###########'} mask={'_'} />
                            </Grid>
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.registerPlace}
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                                        value={this.state.selectedRegisterPlace} />
                                </div>
                            </Grid>
                            <Grid item md={2}>
                                <PersianDatePicker label="تاریخ ثبت" handleOnChange={this.handleRegisterDate} />
                                
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
                            <Grid item md={2}>
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
                                                       handleChange={(value, error) => this.handleChange(value, 'prePhone')} type="number" format={'###'}  required/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={3}>
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
                            <Grid item md={3}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.bank}
                                        handleChange={(value, name) => this.handleChange(value, name)} nameFeild="bank" isFilterable={true} value={this.state.selectedBank} required/>
                                </div>
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="branchCode" label="کد شعبه"
                                    value={this.state.branchCode}
                                    handleChange={(value) => this.handleChange(value, 'branchCode')} type="number" />
                            </Grid>
                            <Grid item md={3}>
                                <Input label="نام شعبه" handleChange={(e) => this.handleChange(e, 'branchName')} value={this.state.branchName} />
                            </Grid>
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.account}
                                        handleChange={(value, name) => this.handleChange(value, name)} nameFeild="account" isFilterable={false} value={this.state.selectedAccount} required/>
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
                                    value={this.state.selectedBranch} required/>
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

UpdateLegalUncompletedCustomerComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateLegalUncompletedCustomerComponent);