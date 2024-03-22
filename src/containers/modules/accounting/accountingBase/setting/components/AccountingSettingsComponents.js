import React from 'react';
import moment from 'moment';
import styles from '../../../../../layout/panel/theme';
import Header from '../../../../../../shared/components/stateHeader/stateHeader';
import Form from '../../../../../../shared/components/form/pureForm';
import { Grid, withStyles } from '@material-ui/core';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import AutoCompleteComponent from '../../../../../../shared/components/dropDown/autocomplete';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import GetPartiesService from "../../../../personsAndCustomers/customers/customersList/services/GetPartiesService";
import Fieldset from 'shared/components/fieldset/fieldset';
import Paper from "@material-ui/core/Paper";
import SaveAccountSettingServices from "../services/SaveAccountSettingServices";

class AccountingSettingsComponents extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            groupLength: '',
            generalLedgerCodeLength: '',
            subsidiaryLedgerCodeLength: '',
            detailLedgerCodeLength: '',


            RelationBetweenSubsidiaryAndDetailGroupIsRequired: false,
            VoucherMasterDescriptionIsRequired: false,
            VoucherDetailDescriptionIsRequired: false,



            documentRegulator: {
                name: "documentRegulatorSelected",
                feild: "title",
                label: "نوع تایید کنده سند",
                list: []
            },
            documentRegulatorSelected: {code: 0, title: ''},


            accountCodeSelectionType: {
                name: "accountCodeSelectionTypeSelected",
                feild: "title",
                label: "نحوه انتخاب کد حساب در ثبت سند حسابداری",
                list: [],
            },
            accountCodeSelectionTypeSelected: {code: 0, title: ''},





            DefaultVoucherLockerUserName: {
                name: "DefaultVoucherLockerUserNameSelected",
                field: "fullName",
                placeholder: "جتسجوی مشتری اصلی بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
                list: [],
                label: 'نام کاربری قفل گذار خودکار اسناد'
            },
            DefaultVoucherLockerUserNameSelected: {  fullName : '', userName: ''},


            DefaultVoucherCreatorUserName: {
                name: "DefaultVoucherCreatorUserNameSelected",
                field: "fullName",
                placeholder: "جتسجوی مشتری اصلی بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
                list: [],
                label: 'جتسجوی نام تنظیم کننده سند'
            },
            DefaultVoucherCreatorUserNameSelected: {  fullName : '', userName: ''},


            DefaultDocumentRegulatorUserName: {
                name: "DefaultDocumentRegulatorUserNameSelected",
                field: "fullName",
                placeholder: "جتسجوی مشتری اصلی بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
                list: [],
                label: 'جتسجوی تایید کننده سند'
            },
            DefaultDocumentRegulatorUserNameSelected: {  fullName : '', userName: ''},


            FinancialManagerUserName: {
                name: "FinancialManagerUserNameSelected",
                field: "fullName",
                placeholder: "جتسجوی مشتری اصلی بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
                list: [],
                label: 'جتسجوی نام مدیر مالی'
            },
            FinancialManagerUserNameSelected: {  fullName : '', userName: ''},





            DefaultDocumentRegulatorUserNameShow: true,
            startDate: moment(new Date()),
            endDate: moment(new Date())

        };



    }
    componentDidMount() {
        GetEnum("documentregulator", (response) => DropDownListDataProvider(this, "documentRegulator", response));
        GetEnum("accountcodeselectiontype", (response) => DropDownListDataProvider(this, "accountCodeSelectionType", response));
    }
    handleChange = (value, name) => {
        console.log([name], value);
        let item = value.value;
        if(name === 'documentRegulatorSelected') {
            if(item.code == 1){
                this.setState({
                    DefaultDocumentRegulatorUserNameShow: false,
                })
            }else{
                this.setState({
                    DefaultDocumentRegulatorUserNameShow: true,
                })
            }
        }
        this.setState({
            [name]: item
        });
    };
    handleChangeCheck = (event, name) => {
        this.setState({
            [name]: event.target.checked,
        })
    };
    handleDate(value, name) {
        this.setState({
            [name]: value
        })
    }
    render(){
        return(
            <React.Fragment>
                <Header {...this.props}/>
                <Form
                    service={SaveAccountSettingServices.saveAccountSettingMethod}
                    {...this.props}
                    {...this.state}
                    entity={
                        {
                            dateFilter: {
                                startDate: this.state.startDate,
                                endDate: this.state.endDate
                            },
                            accountTypeSetting: {
                                groupLength: parseInt(this.state.groupLength, 10),
                                generalLedgerCodeLength: parseInt(this.state.generalLedgerCodeLength, 10),
                                subsidiaryLedgerCodeLength: parseInt(this.state.subsidiaryLedgerCodeLength, 10),
                                detailLedgerCodeLength: parseInt(this.state.detailLedgerCodeLength, 10),
                            },
                            relationBetweenSubsidiaryAndDetailGroupIsRequired: this.state.RelationBetweenSubsidiaryAndDetailGroupIsRequired,
                            voucherMasterDescriptionIsRequired: this.state.VoucherMasterDescriptionIsRequired,
                            voucherDetailDescriptionIsRequired: this.state.VoucherDetailDescriptionIsRequired,
                            accountCodeSelectionType: this.state.accountCodeSelectionTypeSelected.code,
                            defaultVoucherLockerUserName: this.state.DefaultVoucherCreatorUserNameSelected.userName,
                            defaultVoucherCreatorUserName: this.state.DefaultVoucherCreatorUserNameSelected.userName,
                            documentRegulator: this.state.documentRegulatorSelected.code,
                            defaultDocumentRegulatorUserName: this.state.DefaultDocumentRegulatorUserNameSelected.userName,
                            financialManagerUserName: this.state.FinancialManagerUserNameSelected.userName,
                        }
                    }
                    className="form-height"
                >
                    <Fieldset legend={'تنظیمات طول کد حسابداری'}>
                    <Grid container spacing={8} className="no-margin">
                        <Grid item md={2}>
                            <NumberFormatComponent id="groupLength" label="طول کد گروه"
                                                   value={this.state.groupLength}
                                                   handleChange={(value, error) => this.handleChange(value, 'groupLength')} type="number" format={'##'} />
                        </Grid>
                        <Grid item md={2}>
                            <NumberFormatComponent id="generalLedgerCodeLength" label="طول کد کل"
                                                   value={this.state.generalLedgerCodeLength}
                                                   handleChange={(value, error) => this.handleChange(value, 'generalLedgerCodeLength')} type="number" format={'##'} />
                        </Grid>
                        <Grid item md={2}>
                            <NumberFormatComponent id="subsidiaryLedgerCodeLength" label="طول کد معین"
                                                   value={this.state.subsidiaryLedgerCodeLength}
                                                   handleChange={(value, error) => this.handleChange(value, 'subsidiaryLedgerCodeLength')} type="number" format={'##'} />
                        </Grid>
                        <Grid item md={2}>
                            <NumberFormatComponent id="detailLedgerCodeLength" label="طول کد تفضیل"
                                                   value={this.state.detailLedgerCodeLength}
                                                   handleChange={(value, error) => this.handleChange(value, 'detailLedgerCodeLength')} type="number" format={'##'} />
                        </Grid>
                    </Grid>
                    </Fieldset>
                    <Grid container spacing={8} className="no-margin">
                        <Grid item md={4}>
                            <FormControlLabel
                                label="اجباری بودن ارتباط معین با طبقه تفصیلی"
                                control={
                                    <Checkbox
                                        checked={this.state.RelationBetweenSubsidiaryAndDetailGroupIsRequired}
                                        onChange={(value) => this.handleChangeCheck(value,'RelationBetweenSubsidiaryAndDetailGroupIsRequired')}
                                        value=""
                                        color="primary"
                                    />
                                }

                            />
                        </Grid>
                        <Grid item md={4}>
                            <FormControlLabel
                                label="اجباری بودن شرح سند"
                                control={
                                    <Checkbox
                                        checked={this.state.VoucherMasterDescriptionIsRequired}
                                        onChange={(value) => this.handleChangeCheck(value,'VoucherMasterDescriptionIsRequired')}
                                        value=""
                                        color="primary"
                                    />
                                }

                            />
                        </Grid>
                        <Grid item md={4}>
                            <FormControlLabel
                                label="اجباری بودن شرح ردیف سند"
                                control={
                                    <Checkbox
                                        checked={this.state.VoucherDetailDescriptionIsRequired}
                                        onChange={(value) => this.handleChangeCheck(value,'VoucherDetailDescriptionIsRequired')}
                                        value=""
                                        color="primary"
                                    />
                                }

                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="no-margin">
                        <Grid item md={3}>
                            <PersianDatePicker selectedDate={this.state.startDate} label="از تاریخ" handleOnChange={(value) => this.handleDate(value, 'startDate')}/>
                        </Grid>
                        <Grid item md={3}>
                            <PersianDatePicker selectedDate={this.state.endDate} label="تا تاریخ" handleOnChange={(value) => this.handleDate(value, 'endDate')}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="no-margin">


                        <Grid item md={4}>
                            <div className="k-rtl">
                                <DropDownComponent
                                    {...this.state.accountCodeSelectionType}
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.accountCodeSelectionTypeSelected}
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="no-margin">

                        <Grid item md={8}>
                            <AutoCompleteComponent
                                {...this.state.DefaultVoucherLockerUserName}
                                handleChange={(value) => this.handleChange(value, 'DefaultVoucherLockerUserNameSelected')}
                                value={this.state.DefaultVoucherLockerUserNameSelected.fullName}
                                service={GetPartiesService.getAllPartyForAutocomplete} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="no-margin">

                        <Grid item md={8}>
                            <AutoCompleteComponent
                                {...this.state.DefaultVoucherCreatorUserName}
                                handleChange={(value) => this.handleChange(value, 'DefaultVoucherCreatorUserNameSelected')}
                                value={this.state.DefaultVoucherCreatorUserNameSelected.fullName}
                                service={GetPartiesService.getAllPartyForAutocomplete} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="no-margin">
                    <Grid item md={2}>
                        <div className="k-rtl">
                            <DropDownComponent
                                {...this.state.documentRegulator}
                                handleChange={(value, name) => this.handleChange(value, name)}
                                value={this.state.documentRegulatorSelected}
                            />
                        </div>
                    </Grid>
                    </Grid>
                    {
                        this.state.DefaultDocumentRegulatorUserNameShow
                        ?
                            <Grid container spacing={8} className="no-margin">

                                <Grid item md={8}>
                                    <AutoCompleteComponent
                                        {...this.state.DefaultDocumentRegulatorUserName}
                                        handleChange={(value) => this.handleChange(value, 'DefaultDocumentRegulatorUserNameSelected')}
                                        value={this.state.DefaultDocumentRegulatorUserNameSelected.fullName}
                                        service={GetPartiesService.getAllPartyForAutocomplete} />
                                </Grid>
                            </Grid>
                        :
                            null
                    }

                    <Grid container spacing={8} className="no-margin">

                        <Grid item md={8}>
                            <AutoCompleteComponent
                                {...this.state.FinancialManagerUserName}
                                handleChange={(value) => this.handleChange(value, 'FinancialManagerUserNameSelected')}
                                value={this.state.FinancialManagerUserNameSelected.fullName}
                                service={GetPartiesService.getAllPartyForAutocomplete} />
                        </Grid>
                    </Grid>

                </Form>
            </React.Fragment>

        )
    }
}
export default withStyles(styles)(AccountingSettingsComponents)