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
import Form from 'shared/components/form/form';
import EditRealCustomerService from '../services/UpdateRealCustomerService';
import IBAN from 'shared/components/iban/textMask';
import NationalCode from 'shared/components/nationalCode/nationalCode';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import serials from 'constants/serial';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import Fieldset from 'shared/components/fieldset/fieldset';
import GetEnum from 'services/getEnum'
import GetAllBankNames from '../../../../../../services/getBanks';
import GetAllRegion from '../../../../../../services/getRegion';
import GetMainMarket from '../../../../../../services/GetMainMarkets';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import { th } from 'date-fns/esm/locale';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import { customerTemplateForRepresentativeAutoComplete, customerHeaderTemplateForRepresentativeAutoComplete } from 'constants/autoCompleteTemplate'
import GetAllRepresentativeForAutoComplete from '../services/GetAllRepresentativeForAutoComplete';
const initialState = {
    nationalCode: '',
    firstName: '',
    lastName: '',
    fatherName: '',
    // postalCode: '',
    phone: '',
    address: '',
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
        list: serials
    },
    identityCard: '',
    identitySerialLongNumber: '',
    identitySerialShortNumber: '',

    birthDatePlace: {
        name: "selectedBirthDatePlace",
        feild: "title",
        label: "محل تولد",
        list: []
    },
    identityPlace: {
        name: "selectedIdentityPlace",
        feild: "title",
        label: "محل صدور شناسنامه",
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
    mainMarket: {},

    gender: {
        name: "selectedGender",
        feild: "title",
        label: "جنسیت",
        list: []
    },
    maritalStatus: {
        name: "selectedMaritalStatus",
        feild: "title",
        label: "وضعیت تاهل",
        list: []
    },

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
    branch: {
        name: "selectedBranch",
        feild: "title",
        label: "عنوان شعبه کارگزاری",
        list: []
    },
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
    partyInfo: null,



    homeAddress: '',
    postalCode: '',
    homePhone: '',
    preHomePhone: '',
    mobile: '',
    businessAddress: '',
    businessPhone: '',
    preBusinessPhone: '',
    email1: '',

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

class EditRealCustomer extends React.Component {
    constructor(props) {
        super(props);

        this.state = initialState;
        this.successGetCustomerById = this.successGetCustomerById.bind(this);
        this.successGetAllRegionsByFilter = this.successGetAllRegionsByFilter.bind(this);
        this.getAllEnumtypes = this.getAllEnumtypes.bind(this);
        this.successGetAllBankNames = this.successGetAllBankNames.bind(this);
        this.successGetBranchesByFilter = this.successGetBranchesByFilter.bind(this);
        this.refresh = this.refresh.bind(this);
        this.preSubmit = this.preSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBirthDate = this.handleBirthDate.bind(this);
        this.getAllRegistry = this.getAllRegistry.bind(this);
        this.successGetGender = this.successGetGender.bind(this);
        this.successMaritalStatus = this.successMaritalStatus.bind(this);
        this.successBankAccountType = this.successBankAccountType.bind(this);
        this.getBranchByFilter = this.getBranchByFilter.bind(this);
        this.setSerialLetter = this.setSerialLetter.bind(this);
    }

    async componentDidMount() {
        this.getCustomerById();
        this.setState(this.getInitialState());
    }
    getInitialState() {
        let initState = JSON.parse(JSON.stringify(initialState));
        return initState;
    }

    getCustomerById() {
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
            console.log('res update:', res);
            this.setState({
                partyInfo: res,
                nationalCode: res.party.nationalId,
                firstName: res.party.firstName,
                lastName: res.party.lastName,
                fatherName: res.party.fatherName,
                birthDate: res.party.birthDate,
                identityCard: res.party.identityCard,
                identitySerialShortNumber: res.party.identitySerialShortNumber,
                identitySerialLongNumber: res.party.identitySerialLongNumber,

                // homePhone: res.contact.homePhone,
                phone: res.contact.phone,


                // homeAddress: res.contact.homeAddress,
                address: res.contact.address,
                branchCode: res.partyBankAccount.branchCode,
                branchName: res.partyBankAccount.branchName,
                accountNumber: res.partyBankAccount.accountNumber,
                bankAccountOwnerName: res.partyBankAccount.bankAccountOwnerName,
                purchaseFromBank: res.partyBankAccount.purchaseFromBank,
                iban: res.partyBankAccount.iban,

                homeAddress: res.contact.homeAddress,
                postalCode: res.contact.postalCode,
                homePhone: res.contact.homePhone,
                preHomePhone: res.contact.preHomePhone,
                mobile: res.contact.mobile.slice(2),
                businessAddress: res.contact.businessAddress,
                businessPhone: res.contact.businessPhone,
                preBusinessPhone: res.contact.preBusinessPhone,
                email1: res.contact.email1,
                selectedRepresentative: {
                    fullName: res.party.representativeName,
                    id: res.party.representativeId
                },
                // representativeId: res.party.representativeId,
                // representativeName: res.party.representativeName,
            }, function () {
                this.setSerialLetter();
                this.getAllRegistry();
                this.getAllEnumtypes();
                this.getBranchByFilter();
              

            });
        };
    }

    setSerialLetter() {
        serials.map(item => {
            if (item.text === this.state.partyInfo.party.identitySerialLetter) {
                this.setState({
                    selectedSerialLetter: item,
                })
            }
        })
        this.setState({
            serialLetter: {
                name: "selectedSerialLetter",
                feild: "text",
                label: "حروف سری شناسنامه",
                list: serials
            },
        })

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
            console.log('update: ',response.result);
        if (response.success) {
            response.result.map(item => {
                if (item.id === this.state.partyInfo.party.birthPlaceId) {
                    this.setState({
                        selectedBirthDatePlace: item,
                    })
                }
                if (item.id === this.state.partyInfo.party.issuePlaceId) {
                    this.setState({
                        selectedIdentityPlace: item,
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
                birthDatePlace: {
                    name: "selectedBirthDatePlace",
                    feild: "title",
                    label: "محل تولد",
                    type: "client",
                    list: response.result
                }
            })
            this.setState({
                identityPlace: {
                    name: "selectedIdentityPlace",
                    feild: "title",
                    label: "محل صدور شناسنامه",
                    type: "client",
                    list: response.result
                }
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
        GetEnum("Gender", this.successGetGender);
        GetEnum("MaritalStatus", this.successMaritalStatus)
        GetEnum("BankAccountType", this.successBankAccountType)
        GetAllBankNames(this.successGetAllBankNames);
    }
    successBankAccountType(response) {
        if (response.success) {
            response.result.map(item => {
                if (item.code === this.state.partyInfo.partyBankAccount.accountType)
                    this.setState({
                        selectedAccount: item,
                    })
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
    successGetGender(response) {
        if (response.success) {
            var list = []
            response.result.map(item => {
                if (item.code !== 0) {
                    list.push(item);
                }
                if (item.code === this.state.partyInfo.party.gender) {
                    this.setState({
                        selectedGender: item,
                    })
                }
            })
            this.setState({
                gender: {
                    name: "selectedGender",
                    feild: "title",
                    label: "جنسیت",
                    list: list
                }
            })
        }
    }
    successMaritalStatus(response) {
        if (response.success) {
            response.result.map(item => {
                if (item.code === this.state.partyInfo.party.maritalStatus)
                    this.setState({
                        selectedMaritalStatus: item,
                    })
            })
            this.setState({
                maritalStatus: {
                    name: "selectedMaritalStatus",
                    feild: "title",
                    label: "وضعیت تاهل",
                    list: response.result
                }
            })
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
            })
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
        // console.log(this.state.homePhone);

        return {

            party: {
                id: this.state.partyInfo.party.id,
                //nationalId : this.state.nationalCode,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                fatherName: this.state.fatherName,
                birthDate: this.state.birthDate,
                identityCard: this.state.identityCard,
                identitySerialLetter: this.state.selectedSerialLetter.text,
                identitySerialShortNumber: this.state.identitySerialShortNumber,
                identitySerialLongNumber: this.state.identitySerialLongNumber,
                birthPlaceId: this.state.selectedBirthDatePlace.id,
                issuePlaceId: this.state.selectedIdentityPlace.id,
                gender: this.state.selectedGender.code,
                maritalStatus: this.state.selectedMaritalStatus.code,
                branchId: this.state.selectedBranch.id,
                partyType: 1,
                representativeId: this.state.selectedRepresentative.id,

            },
            contact: {
                id: this.state.partyInfo.contact.id,
                partyId: this.state.partyInfo.party.id,
                upRegionId: this.state.selectedProvince.id,
                regionId: this.state.selectedRegion.id,
                phone: this.state.phone,


                address: this.state.address,
                // addressType: 2000,
                homeAddress: this.state.homeAddress,
                postalCode: this.state.postalCode ? this.state.postalCode.replace(/-/g, '') : null,
                originalHomePhone: this.state.homePhone,
                preHomePhone: this.state.preHomePhone,
                mobile: this.state.mobile ? this.state.mobile.replace(/ /g, '') : null,
                businessAddress: this.state.businessAddress,
                originalBusinessPhone: this.state.businessPhone,
                preBusinessPhone: this.state.preBusinessPhone,
                email1: this.state.email1,
            },
            partyBankAccount: {
                id: this.state.partyInfo.partyBankAccount.id,
                partyId: this.state.partyInfo.party.id,
                bankId: this.state.selectedBank.codeId,
                branchCode: this.state.branchCode,
                branchName: this.state.branchName,
                accountType: this.state.selectedAccount.code,
                accountNumber: this.state.accountNumber,
                iban: this.state.iban,
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
        console.log('home',this.state.home);
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Form
                    {...this.props}
                    {...this.state}
                    service={EditRealCustomerService.updateRealCustomer}
                    preSubmit={this.preSubmit}
                    SubmitTitle={'ذخیره'}
                    className="form-height">
                    <Fieldset legend={'اطلاعات فردی'}>

                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={2}>
                                <NationalCode id="nationalCode" label="کد ملی" required
                                    isDisabled={true}
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
                                <PersianDatePicker label="تاریخ تولد" handleOnChange={this.handleBirthDate} selectedDate={this.state.birthDate} />
                            </Grid>
                            <Grid item md={3}>
                                <Grid container spacing={16}>
                                    <Grid item md={7}>

                                        <div className="k-rtl">
                                            <DropDownComponent {...this.state.serialLetter}
                                                handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false}
                                                value={this.state.selectedSerialLetter} />
                                        </div>
                                    </Grid>
                                    <Grid item md={5}>
                                        <NumberFormatComponent id="identitySerialShortNumber" label="سری شناسنامه"
                                            value={this.state.identitySerialShortNumber}
                                            handleChange={(value, error) => this.handleChange(value, 'identitySerialShortNumber')} type="number" format={'##'} mask={'_'} />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item md={2}>
                                <NumberFormatComponent id="identitySerialLongNumber" label="سریال شناسنامه"
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
                            <Grid item md={2}>
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
                                                       handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                                                       value={this.state.selectedProvince} />
                                </div>
                            </Grid>
                            <Grid item md={2}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.region}
                                                       handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                                                       value={this.state.selectedRegion} />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={5}>
                                <Input label="نشانی منزل" handleChange={(e) => this.handleChange(e, 'homeAddress')} value={this.state.homeAddress} required/>
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="postalCode" label="کد پستی"
                                                       value={this.state.postalCode}
                                                       handleChange={(value, error) => this.handleChange(value, 'postalCode')} type="number" format={'#####-#####'} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={2}>
                                <NumberFormatComponent id="homePhone" label="تلفن منزل"
                                                       value={this.state.homePhone}
                                                       handleChange={(value, error) => this.handleChange(value, 'homePhone')} type="number" format={'########'} required/>
                            </Grid>
                            <span className="margin-top-25">ـ</span>
                            <Grid item md={1}>
                                <NumberFormatComponent id="phoneCode" label="پیش شماره"
                                                       value={this.state.preHomePhone}
                                                       handleChange={(value, error) => this.handleChange(value, 'preHomePhone')} type="number" format={'###'} required/>
                            </Grid>

                            <Grid item md={3}>
                                <NumberFormatComponent id="mobile" label="شماره همراه"
                                                       value={this.state.mobile}
                                                       handleChange={(value, error) => this.handleChange(value, 'mobile')} type="number" format={'09## #######'} required/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={5}>
                                <Input label="نشانی محل کار" handleChange={(e) => this.handleChange(e, 'businessAddress')} value={this.state.businessAddress} />
                            </Grid>
                            <Grid item md={2}>
                                <NumberFormatComponent id="homePhone" label="تلفن محل کار"
                                                       value={this.state.businessPhone}
                                                       handleChange={(value, error) => this.handleChange(value, 'businessPhone')} type="number" format={'########'} />
                            </Grid>
                            <span className="margin-top-25">ـ</span>
                            <Grid item md={1}>
                                <NumberFormatComponent id="phoneCode" label="پیش شماره"
                                                       value={this.state.preBusinessPhone}
                                                       handleChange={(value, error) => this.handleChange(value, 'preBusinessPhone')} type="number" />
                            </Grid>

                        </Grid>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={3}>
                                <Email handleChange={(e) => this.handleChange(e, 'email1')} value={this.state.email1} isLeftStartText={true} />
                            </Grid>
                        </Grid>
                    </Fieldset>
                    <br />
                    <Fieldset legend={'اطلاعات بانکی'}>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={3}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.bank}
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true} value={this.state.selectedBank} required/>
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
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false} value={this.state.selectedAccount} required/>
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
                                    handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true} required
                                    value={this.state.selectedBranch} />
                            </div>
                        </Grid>
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

EditRealCustomer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditRealCustomer);