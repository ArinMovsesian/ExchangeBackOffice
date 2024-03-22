import React from 'react'
import styles from '../../../../../layout/panel/theme';
import Header from '../../../../../../shared/components/stateHeader/stateHeader';
import Form from '../../../../../../shared/components/form/form';
import { Grid, withStyles } from '@material-ui/core';
// import GetPartiesService from "../../customersList/services/GetPartiesService";
// import GetAllContactBy from "../services/managedCustomersContactServices";
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import GetMainMarket from 'services/GetMainMarkets';
// import AddCustomersRelation from "../../customersRelation/services/CreateCustomersRelationService";
import Input from 'shared/components/formInput/inputForm';
import Checkbox from '@material-ui/core/Checkbox';
import AutoCompleteComplete from 'shared/components/dropDown/autocomplete';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Fieldset from 'shared/components/fieldset/fieldset';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import Email from 'shared/components/email/email';
// import GetManagedCustomerContactServices from "../services/getManagedCustomerContactService";
// import UpdateManagedCustomerContactServices from "../services/updateManagedCustomerContactService";
import GetAllRegion from "../../../../../../services/getRegion";
import GetManagedCustomerContactServices from '../../managedCustomerContact/services/getManagedCustomerContactService';
import GetPartiesService from '../../customersList/services/GetPartiesService';
import UpdateManagedCustomerContactServices from '../../managedCustomerContact/services/updateManagedCustomerContactService';
// import GetManagedCustomerContactServices from '../../managedCustomerContact/services/getManagedCustomerContactService';
// import GetPartiesService from '../../customersList/services/GetPartiesService';
// import UpdateManagedCustomerContactServices from '../../managedCustomerContact/services/updateManagedCustomerContactService';
class EditLegalCsutomerContactComponentTab extends React.Component{
    constructor(props){
        super(props);
        // console.log('aaa', this.props.location.state.partyId);
        this.state = {
            // party: {
            //     name: "selectedParty",
            //     field: "fullName",
            //     placeholder: "جتسجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
            //     list: []
            // },
            // selectedParty: {  fullName : ''},
            province: {
                name: "selectedProvince",
                feild: "title",
                label: "استان",
                list: []
            },
            selectedProvince: {},
            region: {
                name: "selectedRegion",
                feild: "title",
                label: "شهر",
                list: []
            },
            selectedRegion: {},
            partyAddressType: {
                name: "selectedPartyAddressType",
                feild: "title",
                label: "نوع نشانی",
                list: []
            },
            selectedPartyAddressType: {},

            phoneCode:'',
            mobile: '',
            fax: '',
            postalCode: '',
            webPage: '',
            email1: '',
            email2: '',
            email3: '',
            isDefault: false,
            description: '',
            upRegionId: '',
            regionId: '',
            AddressTypeId: '',
            partyId: '',


            addressLabelValue: 'نشانی',
            phoneLabelValue: 'تلفن',


            homeAddress: '',
            businessAddress: '',
            address: '',

            homePhone: '',
            preHomePhone: '',
            phone: '',
            prePhone: '',
            businessPhone: '',
            preBusinessPhone: '',

            checkPartyType: '',
            fromPartyFullName: '',


            // stateBack :
            // this.props.location.state && this.props.location.state.backPath ? 
            // {
            //     title : 'بازگشت به تب اطلاعات تماس',
            //     path : this.props.location.state.backPath,
            //     customeBackInfo : true,
            //     partyId : this.props.location.state.partyId,
            //     tabId: 3,
            // } : {},



        }

    }
    // handlePartyChange = (item) => {
    //     this.setState({
    //         selectedParty : item.value,
    //     })
    // };
    handleChangeCheck = name => (event) => {
        this.setState({
            [name]: event.target.checked,
        })
    };
    handleChange = (event, name) => {
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
    };
    getAllRegistry() {
        // var command = {
        //     optionalFilter: {
        //         take: 500,
        //         page: 1
        //     }
        // };
        GetAllRegion(null, (response) => {
            DropDownListDataProvider(this,"province", response);
            DropDownListDataProvider(this,"region", response);
        });
    };
    getPartyType() {
        GetEnum('partyaddresstype', (response) => { DropDownListDataProvider(this,"partyAddressType", response);});
    }
    componentDidMount() {
        this.getAllRegistry();
        this.getPartyType();

        let command = {
            entity: this.props.location.state.id,
        };
        GetManagedCustomerContactServices.getContactByIdMethod(command, (res) => {
            console.log('resId', res.result);
            this.setState({
                mobile: res.result.mobile,
                fax: res.result.fax,
                // businessAddress: res.result.businessAddress,
                postalCode: res.result.postalCode,
                webPage: res.result.webPage,
                email1: res.result.email1,
                email2: res.result.email2,
                email3: res.result.email3,
                upRegionId: res.result.upRegionId,
                regionId: res.result.regionId,
                AddressTypeId: res.result.addressType,
                isDefault: res.result.isDefault,
                description: res.result.description,
                partyId: res.result.partyId,



                checkPartyType: res.result.partyType,


                homeAddress: res.result.homeAddress,
                businessAddress: res.result.businessAddress,
                address: res.result.address,

                homePhone: res.result.homePhone,
                preHomePhone: res.result.preHomePhone,
                phone: res.result.phone,
                prePhone: res.result.prePhone,
                businessPhone: res.result.businessPhone,
                preBusinessPhone: res.result.preBusinessPhone,

            }, () => {
                GetPartiesService.getpartybyid({entity: this.state.partyId},(response) => {
                    this.setState({
                        fromPartyFullName: response.result.fullName,
                    })
                });
                GetAllRegion(null, (response) => {
                    for(let i = 0; i < response.result.length ; i++){
                        if(response.result[i].id === this.state.upRegionId) {
                            this.setState({
                                selectedProvince: response.result[i]
                            })
                        }
                        if(response.result[i].id === this.state.regionId) {
                            this.setState({
                                selectedRegion: response.result[i]
                            })
                        }
                    }
                });
                GetEnum('partyaddresstype', (response) => {
                    console.log('pp', response.result);
                    console.log('aaaaa', this.state.AddressTypeId);
                    for(let i = 0; i < response.result.length; i++) {
                        if(response.result[i].code == this.state.AddressTypeId) {
                            this.setState({
                                selectedPartyAddressType: response.result[i]
                            })
                        }
                    }
                });

            })
        });
    }

    render(){
        console.log('checkPartyType', this.state.checkPartyType);
        let formOutPut = null;
        if(this.state.checkPartyType == 1){
            formOutPut =    <Fieldset legend={'اطلاعات تماس حقیقی'}>
                <Grid container spacing={8} className="no-margin">
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
                <Grid container spacing={8} className="no-margin">

                    <Grid item md={5}>
                        <Input label="نشانی منزل" handleChange={(e) => this.handleChange(e, 'homeAddress')}  />
                    </Grid>
                    <Grid item md={3}>
                        <NumberFormatComponent id="postalCode" label="کد پستی"
                                               value={this.state.postalCode}
                                               handleChange={(value, error) => this.handleChange(value, 'postalCode')} type="number" format={'##########'} />
                    </Grid>
                </Grid>
                <Grid container spacing={8} className="no-margin">
                    <Grid item md={2}>
                        <NumberFormatComponent id="homePhone" label="تلفن منزل"
                                               value={this.state.homePhone}
                                               handleChange={(value, error) => this.handleChange(value, 'homePhone')} type="number" format={'########'} />
                    </Grid>
                    <span className="margin-top-25 margin-right-5"> ـ </span>
                    <Grid item md={1}>
                        <NumberFormatComponent id="phoneCode" label="پیش شماره" required
                                               value={this.state.preHomePhone}
                                               handleChange={(value, error) => this.handleChange(value, 'preHomePhone')} type="number" />
                    </Grid>
                    <Grid item md={3}>
                        <NumberFormatComponent id="mobile" label="شماره همراه" required
                                               value={this.state.mobile}
                                               handleChange={(value, error) => this.handleChange(value, 'mobile')} type="number" format={'09## #######'} />
                    </Grid>

                </Grid>
                <Grid container spacing={8} className="no-margin">
                    <Grid item md={5}>
                        <Input label="نشانی محل کار" handleChange={(e) => this.handleChange(e, 'businessAddress')}  />
                    </Grid>
                    <Grid item md={2}>
                        <NumberFormatComponent id="homePhone" label="تلفن محل کار"
                                               value={this.state.businessPhone}
                                               handleChange={(value, error) => this.handleChange(value, 'businessPhone')} type="number" format={'########'} />
                    </Grid>
                    <span className="margin-top-25 margin-right-5"> ـ </span>
                    <Grid item md={1}>
                        <NumberFormatComponent id="phoneCode" label="پیش شماره" required
                                               value={this.state.preBusinessPhone}
                                               handleChange={(value, error) => this.handleChange(value, 'preBusinessPhone')} type="number" />
                    </Grid>
                </Grid>
                <Grid container spacing={8} className="no-margin">
                    <Grid item md={2}>
                        <Input label="فکس" handleChange={(e) => this.handleChange(e, 'fax')} />
                    </Grid>
                    <Grid item md={2}>
                        <Email label="ایمیل" handleChange={(e) => this.handleChange(e, 'email1')} value={this.state.email1} isLeftStartText={true} />
                    </Grid>
                    <Grid item md={2}>
                        <Email label="ایمیل دوم" handleChange={(e) => this.handleChange(e, 'email2')} value={this.state.email2} isLeftStartText={true} />
                    </Grid>
                    <Grid item md={2}>
                        <Email label="ایمیل سوم" handleChange={(e) => this.handleChange(e, 'email3')} value={this.state.email3} isLeftStartText={true} />
                    </Grid>
                    <Grid item md={2}>
                        <Input label="وب سایت" handleChange={(e) => this.handleChange(e, 'webPage')} />
                    </Grid>
                </Grid>
                <Grid container spacing={8} className="no-margin">



                    {/*<FormControlLabel*/}
                    {/*control={*/}
                    {/*<Checkbox*/}
                    {/*checked={this.state.isDefault}*/}
                    {/*onChange={this.handleChangeCheck('isDefault')}*/}
                    {/*value="isDefault"*/}
                    {/*color="primary"*/}
                    {/*/>*/}
                    {/*}*/}
                    {/*label="اطلاعات پیش فرض"*/}
                    {/*/>*/}
                    <Grid container spacing={8} className="no-margin">
                        <Grid item md={5}>
                            <Input label="توضیحات" handleChange={(e) => this.handleChange(e, 'description')} />
                        </Grid>
                    </Grid>
                </Grid>
            </Fieldset>
        }else if(this.state.checkPartyType == 2){
            formOutPut =    <Fieldset legend={'اطلاعات تماس حقوقی'}>
                <Grid container spacing={8} className="no-margin">
                    <Grid item md={3}>
                        <div className="k-rtl">
                            <DropDownComponent {...this.state.partyAddressType}
                                               handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false}
                                               value={this.state.selectedPartyAddressType} required/>
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={8} className="no-margin">
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
                <Grid container spacing={8} className="no-margin">

                    <Grid item md={8}>
                        <Input label={this.state.addressLabelValue} handleChange={(e) => this.handleChange(e, 'address')}  />
                    </Grid>
                </Grid>

                <Grid container spacing={8} className="no-margin">
                    <Grid item md={4}>
                        <NumberFormatComponent id="postalCode" label="کد پستی"
                                               value={this.state.postalCode}
                                               handleChange={(value, error) => this.handleChange(value, 'postalCode')} type="number" format={'##########'} />
                        {/*<Input label="کد پستی" handleChange={(e) => this.handleChange(e, 'postalCode')}  />*/}
                    </Grid>
                </Grid>
                <Grid container spacing={8} className="no-margin">
                    {/*<Grid item md={4}>*/}
                    {/*<Input label={this.state.phoneLabelValue} handleChange={(e) => this.handleChange(e, 'homePhone')}  />*/}
                    {/*</Grid>*/}
                    <Grid item md={2}>
                        <NumberFormatComponent id="homePhone" label={this.state.phoneLabelValue}
                                               value={this.state.phoneLabelValue}
                                               handleChange={(value, error) => this.handleChange(value, 'phone')} type="number" format={'########'} />
                    </Grid>
                    <span className="margin-top-25">ـ</span>
                    <Grid item md={2}>
                        <NumberFormatComponent id="phoneCode" label="پیش شماره تلفن" required
                                               value={this.state.prePhone}
                                               handleChange={(value, error) => this.handleChange(value, 'prePhone')} type="number" />
                    </Grid>
                    <Grid item md={2}>
                        <NumberFormatComponent id="mobile" label="شماره همراه" required
                                               value={this.state.mobile}
                                               handleChange={(value, error) => this.handleChange(value, 'mobile')} type="number" format={'09## #######'} />
                    </Grid>
                    <Grid item md={2}>
                        <Input label="فکس" handleChange={(e) => this.handleChange(e, 'fax')} />
                    </Grid>
                </Grid>

                <Grid container spacing={8} className="no-margin">
                    <Grid item md={2}>
                        <Email label="ایمیل" handleChange={(e) => this.handleChange(e, 'email1')} value={this.state.email1} isLeftStartText={true} />
                    </Grid>
                    <Grid item md={2}>
                        <Email label="ایمیل دوم" handleChange={(e) => this.handleChange(e, 'email2')} value={this.state.email2} isLeftStartText={true} />
                    </Grid>
                    <Grid item md={2}>
                        <Email label="ایمیل سوم" handleChange={(e) => this.handleChange(e, 'email3')} value={this.state.email3} isLeftStartText={true} />
                    </Grid>
                    <Grid item md={2}>
                        <Input label="وب سایت" handleChange={(e) => this.handleChange(e, 'webPage')} />
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
                        label="اطلاعات پیش فرض"
                    />
                    <Grid container spacing={8} className="no-margin">
                        <Grid item md={5}>
                            <Input label="توضیحات" handleChange={(e) => this.handleChange(e, 'description')} />
                        </Grid>
                    </Grid>
                </Grid>
            </Fieldset>
        }
        return(
            <React.Fragment>
                <Header {...this.props} backParams={
                    this.props.location.state === undefined ? undefined : {
                        // title : 'بازگشت به تب اطلاعات تماس',
                        path : this.props.location.state.backPath,
                        customeBackInfo : true,
                        partyId : this.props.location.state.partyId,
                        tabId: 3,

                    }
                }/>
                <Form
                    className="form-height"
                    {...this.state}
                    {...this.props}
                    service={UpdateManagedCustomerContactServices.updateContactMethod}
                    entity={
                        {
                            id: this.props.location.state.id,
                            partyId: this.props.location.state.partyId,
                            // businessPhone: this.state.businessPhone,
                            mobile: this.state.mobile,
                            fax: this.state.fax,
                            // businessAddress: this.state.businessAddress,
                            postalCode: this.state.postalCode,
                            webPage: this.state.webPage,
                            imAddress: 'blabla',
                            email1: this.state.email1,
                            email2: this.state.email2,
                            email3: this.state.email3,
                            upRegionId: this.state.selectedProvince.id,
                            regionId: this.state.selectedRegion.id,
                            isDefault: this.state.isDefault,
                            description: this.state.description,
                            addressType:  this.state.selectedPartyAddressType.code,
                            // "created": "2019-02-26T08:33:29.965Z",
                            // "modified": "2019-02-26T08:33:29.965Z",
                            // "createdBy": 0,
                            // "modifiedBy": 0,
                            // "nationalId": "string",
                            // "fullName": "string",
                            // "createdJalali": "string",
                            // "modifiedJalali": "string"



                            homeAddress: this.state.homeAddress,
                            businessAddress: this.state.businessAddress,
                            address: this.state.address,

                            homePhone: this.state.homePhone,
                            preHomePhone:this.state.preHomePhone,
                            phone: this.state.phone,
                            prePhone: this.state.prePhone,
                            businessPhone: this.state.businessPhone,
                            preBusinessPhone:this.state.preBusinessPhone,
                        }
                    }
                    cancelModal={() => {}}
                    afterSubmit={
                        () => {
                      
                           this.props.history.push(
                            {
                              pathname: "/main/persons/customers/completeRegisterLegal",
                              state: {
                                // title : this.props.location.state.title,
                                // path : this.props.location.state.backPath,
                                customeBackInfo : true,
                                partyId : this.props.location.state.partyId,
                                tabId: 3,
                              }
                            }
                        );
                        }
                    }
                >
                    <Fieldset legend={'اطلاعات مشتری'}>
                        <Grid container spacing={8} className="margin-bottom-30">
                            {/* <Grid item md={12}>
                                <AutoCompleteComplete
                                    {...this.state.party}
                                    handleChange={(value) => this.handlePartyChange(value)}
                                    value={this.state.selectedParty.fullName}
                                    service={GetPartiesService.getAllPartyForAutocomplete} />
                            </Grid> */}
                            <Grid item md={12}>
                              
                           
                               
                              <Input label="نام و نام خانوادگی" value={this.state.fromPartyFullName} disabled />
                             

                       
                             
                           
                         </Grid>
                        </Grid>
                    </Fieldset>
                    <br/>
                   {formOutPut}
                </Form>
            </React.Fragment>

        )
    }
}
export default withStyles(styles)(EditLegalCsutomerContactComponentTab)