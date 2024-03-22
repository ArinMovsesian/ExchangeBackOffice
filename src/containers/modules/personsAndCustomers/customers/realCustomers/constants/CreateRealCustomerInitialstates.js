import serials from 'constants/serial';
import moment from 'moment';
import { customerTemplateForRepresentativeAutoComplete, customerHeaderTemplateForRepresentativeAutoComplete } from 'constants/autoCompleteTemplate'
export const  initialState = {
    nationalCode: '',
    firstName: '',
    lastName: '',
    fatherName: '',
    postalCode: '',
    phoneCode: '',
    mobile: '',
    email1: '',
    branchCode: '',
    branchName: '',
    accountNumber: '',
    iban: '',
    bankAccountOwnerName: '',
    birthDate: moment(new Date()),
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
    // bankAccountUsages: {
    //     name:"partyBankAccountUsages",
    //     field:'title',
    //     list:[],
    //     label:"مورد استفاده بانک"
    // },
    // partyBankAccountUsages: {},
    mainMarket: {
        name:"selectedMainMarkets",
        field:'title',
        list:[],
        label:"بازار"
    },
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
    selectedMainMarkets: [],

    homePhone: '',
    preHomePhone: '',
    businessPhone: '',
    preBusinessPhone: '',

    homeAddress: '',
    businessAddress: '',

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