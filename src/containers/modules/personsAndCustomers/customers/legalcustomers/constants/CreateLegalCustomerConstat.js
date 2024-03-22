import moment from "moment";
import { customerTemplateForRepresentativeAutoComplete, customerHeaderTemplateForRepresentativeAutoComplete } from 'constants/autoCompleteTemplate'
export const initialState = {
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
    registerDate: moment(new Date()),
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
        list: [],
    },
    bank: {
        name: "selectedBank",
        feild: "title",
        label: "نام بانک",
        list: [],
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


    // bankAccountUsages: {
    //     name:"partyBankAccountUsages",
    //     field:'title',
    //     list:[],
    //     label:"مورد استفاده بانک"
    // },
    // partyBankAccountUsages: {},

    phone: '',
    prePhone: '',
    address: '',

    partyAddressType: {
        name: "selectedPartyAddressType",
        feild: "title",
        label: "نوع نشانی",
        list: []
    },
    selectedPartyAddressType: {},



    addressLabelValue: 'نشانی',
    phoneLabelValue: 'تلفن',


    representative: {
        name: "selectedRepresentative",
        field: "fullName",
        placeholder: "جتسجوی معرف بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر و شماره تفضیل",
        list: [],
        template: customerTemplateForRepresentativeAutoComplete,
        headerTemplate: customerHeaderTemplateForRepresentativeAutoComplete,
    },
    selectedRepresentative: { fullName: '', id: 0 },

};
