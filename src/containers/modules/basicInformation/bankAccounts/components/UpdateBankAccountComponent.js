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
import EditBankAccountService from '../services/UpdateBankAccountService';
import AddBankAccountService from '../services/CreateBankAccountService';
import toastr from 'toastr';
import Header from 'shared/components/stateHeader/stateHeader';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import IBAN from 'shared/components/iban/textMask';
import styles from 'containers/layout/panel/theme';
import Button from '@material-ui/core/Button';
import Form from 'shared/components/form/form';
import GetEnum from 'services/getEnum';
import GetAllBankNames from 'services/getBanks';
import GetAllRegion from 'services/getRegion';
import GetMainMarket from 'services/GetMainMarkets';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';

class EditBankAccount extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bankAccount: {},
            listEnum: {},
            selectedBank: {},
            selectedRegion: {},
            selectedAccount: {},
            selectedMainMarkets: [],
            bank: {},
            region: {},
            account: {},
            mainMarket: {},
            branchCode: '',
            branchName: '',
            accountNumber: '',
            iban: '',
            comment: '',
            maxDepositValue: null,
            maxLoanPayment: null,
            forCustomerDeposit: false,
            forLoanUse: false
        };
        this.successGetBankDepositByAccountNumber = this.successGetBankDepositByAccountNumber.bind(this);
        this.successGetAllBankNames = this.successGetAllBankNames.bind(this);
        this.successGetAllRegionsByFilter = this.successGetAllRegionsByFilter.bind(this);
        this.successBankAccountType = this.successBankAccountType.bind(this);
        this.getBankDepositByAccountNumber = this.getBankDepositByAccountNumber.bind(this);
        this.successGetMainMarkets = this.successGetMainMarkets.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getAllRegions = this.getAllRegions.bind(this);
        this.getAllEnums = this.getAllEnums.bind(this);
        this.preSubmit = this.preSubmit.bind(this);
    }

    componentDidMount() {
        this.getBankDepositByAccountNumber();
      
    }


    getAllEnums(){
        GetAllBankNames( this.successGetAllBankNames);

    }
    getAllRegions(){
        var command = {
            optionalFilter: {
                take: 500,
                page: 1
            }
    }
    GetAllRegion(command,this.successGetAllRegionsByFilter)
       
    }
  

    getBankDepositByAccountNumber(){
        var params = {
            accountNumber: this.props.location.state.accountNumber
        };
        EditBankAccountService.getBankDepositByAccountNumber(params, this.successGetBankDepositByAccountNumber);
    }

    successGetBankDepositByAccountNumber(response) {
        if (response.success) {
            var res = response.result;

            this.setState({
                bankAccount: res,
                branchCode: res.branchCode,
                branchName: res.branchName,
                accountNumber: res.accountNumber,
                iban: res.iban,
                comment: res.comment,
                maxDepositValue: res.maxDepositValue,
                forCustomerDeposit: res.forCustomerDeposit,
                forLoanUse: res.forLoanUse
            },
            function(){
                this.getAllEnums();
                this.getAllRegions();
                this.getAllEnumtypes();
            });

        } 

    }
    successGetAllBankNames(response) {
        if (response.success) {
            response.result.map(item => {
                if (item.codeId === this.state.bankAccount.bankId) {
                    this.setState({
                        selectedBank: item,
                        bank: {
                            name: "selectedBank",
                            feild: "title",
                            label: "نام بانک",
                            list: response.result,
                        }
                    })
                }
            })
        }

    }

    successGetAllRegionsByFilter(response) {

        if (response.success) {
            response.result.map(item => {
                if (item.id === this.state.bankAccount.regionId) {
                    
                    this.setState({
                        selectedRegion: item,
                        region: {
                            name: "selectedRegion",
                            feild: "title",
                            label: "نام شهر",
                            list: response.result
                        }
                    })
                }
            })
  

        } 
    }

    getAllEnumtypes() {
        GetEnum("BankAccountType", this.successBankAccountType)
        GetMainMarket( this.successGetMainMarkets);
    }

    successBankAccountType(response) {
        if (response.success) {
            response.result.map(item => {
                if (item.code === this.state.bankAccount.accountType) {
                    this.setState({
                        selectedAccount: item,
                        account: {
                            name: "selectedAccount",
                            feild: "title",
                            label: "نوع حساب",
                            list: response.result
                        }
                    })
                }
            })
        }
    }
    successGetMainMarkets(response) {
    
       
        if (response.success) {
            console.log(response)
            var arrayMainMarkets = [];

            if (this.state.bankAccount.mainMarketIds.length > 0) {

                this.state.bankAccount.mainMarketIds.map(item => {
                    var mainMarket = response.result.find(main => {
                        return main.id == item
                    })
                    arrayMainMarkets.push(mainMarket)
                })

            }
            this.setState({
                selectedMainMarkets : arrayMainMarkets,
                mainMarket: {
                    name: "selectedMainMarkets",
                    feild: "title",
                    label: "بازار",
                    list: response.result
                }
            })
        } 
    }
    handleChange(value, name) {
        let item = value.value
        this.setState({
            [name]: item
        })
    }

    handleChangeCheck = (event, name) => {
        this.setState({
            [name]: event.target.checked
        })

    };

    proccessBeforAction() {


    }
    preSubmit() {
        // var mainMarketIds = [];
        // this.state.selectedMainMarkets.map(item => {
        //     mainMarketIds.push(item.id);
        // })
        // return {
        //         id : this.state.bankAccount.id,
        //         bankId: this.state.selectedBank.codeId,
        //         regionId: this.state.selectedRegion.id,
        //         branchCode: this.state.branchCode,
        //         branchName: this.state.branchName,
        //         accountType: this.state.selectedAccount.code,
        //         accountNumber: this.state.accountNumber,
        //         iban: this.state.iban.replace(/[{()}]/g, '').replace(/ /g, ''),
        //         comment: this.state.comment,
        //         maxDepositValue:this.state.maxDepositValue ? parseInt(this.state.maxDepositValue.toString().replace(/,/g, '')) : '',
        //         mainMarketIds: mainMarketIds,
        //         forCustomerDeposit: this.state.forCustomerDeposit,
        //         forLoanUse: this.state.forLoanUse
        //     }
        //
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Header {...this.props} />
                <Form
                    {...this.props}
                    {...this.state}
                    service={EditBankAccountService.updateBankDeposit}
                    entity={
                        {
                            id : this.state.bankAccount.id,
                            bankId: this.state.selectedBank.codeId,
                            regionId: this.state.selectedRegion.id,
                            branchCode: this.state.branchCode,
                            branchName: this.state.branchName,
                            accountType: this.state.selectedAccount.code,
                            accountNumber: this.state.accountNumber,
                            iban: this.state.iban.replace(/[{()}]/g, '').replace(/ /g, ''),
                            comment: this.state.comment,
                            maxDepositValue:this.state.maxDepositValue ? parseInt(this.state.maxDepositValue.toString().replace(/,/g, '')) : '',
                            mainMarketIds: this.state.selectedMainMarkets.length> 0 ? this.state.selectedMainMarkets.map(s=>{return s.id}) : [],
                            forCustomerDeposit: this.state.forCustomerDeposit,
                            forLoanUse: this.state.forLoanUse
                        }
                    }
                    // preSubmit={this.preSubmit}
                    className="form-height"
                    SubmitTitle={'ذخیره'}
                >
               
                        <Grid container spacing={8}>
                            <Grid item md={12}>
                                <Grid item md={5}>
                                    <div className="k-rtl list-account-bank">
                                        <DropDownComponent {...this.state.bank}
                                            handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true} value={this.state.selectedBank}/>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid item md={5}>
                                    <div className="k-rtl list-account-bank">
                                        <DropDownComponent {...this.state.region}
                                            handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true} value={this.state.selectedRegion}/>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid item md={5}>
                                    <NumberFormatComponent id="branchCode" label="کد شعبه" required
                                        value={this.state.branchCode}
                                        handleChange={(value) => this.handleChange(value, 'branchCode')} type="number" />
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid item md={5}>
                                    <Input label="نام شعبه" required handleChange={(e) => this.handleChange(e, 'branchName')} value={this.state.branchName} />
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid item md={5}>
                                    <div className="k-rtl list-account-bank">
                                        <DropDownComponent {...this.state.account}
                                            handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false} value={this.state.selectedAccount}/>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid item md={5}>
                                    <NumberFormatComponent id="accountNumber" label="شماره حساب" required value={this.state.accountNumber}
                                        handleChange={(value) => this.handleChange(value, 'accountNumber')} type="number" />
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid item md={5}>
                                    <IBAN handleChange={(value) => this.handleChange(value, 'iban')} value={this.state.iban}/>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid item md={5}>
                                    <Input label="توضیحات" handleChange={(e) => this.handleChange(e, 'comment')} value={this.state.comment} isMultiLine={true} />
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid item md={5}>
                                    <NumberFormatComponent id="maxDepositValue" label="حداکثر مبلغ قابل ثبت برای واریز وجه از پنل مشتری" required
                                        value={this.state.maxDepositValue}
                                        handleChange={(value, error) => this.handleChange(value, 'maxDepositValue')} type="number" isSeparator={true} />
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid item md={5}>
                                    <div className="k-rtl list-account-bank">
                                        <MultiSelectComponent {...this.state.mainMarket}
                                            handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false} value={this.state.selectedMainMarkets}/>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.forCustomerDeposit}
                                            onChange={(e) => this.handleChangeCheck(e, 'forCustomerDeposit')}
                                            value="forCustomerDeposit"
                                            color="primary"
                                        />
                                    }
                                    label="جهت واریز مشتری"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.forLoanUse}
                                            onChange={(e) => this.handleChangeCheck(e, 'forLoanUse')}
                                            value="forLoanUse"
                                            color="primary"
                                        />
                                    }
                                    label="جهت تسهیل کارگزاری"
                                />
                            </Grid>
                            <Grid item md={12}>
                            </Grid>

                         
                        </Grid>
                        {/* {
                            (this.state.forLoanUse) ?
                                <div>
                                    <Grid item md={12}>
                                        <Grid item md={6}>
                                            <FormControl className={classes.formControl} xs={6} variant="outlined" fullWidth>
                                                <TextField
                                                    variant="outlined"
                                                    className={classes.OutlineInput}
                                                    label="َسقف تسهیلات دریافتی"
                                                    value={this.state.maxLoanPayment}
                                                    onChange={(e) => this.handleChange(e.target.value, 'maxLoanPayment')}
                                                    labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                                                    InputProps={{
                                                        inputComponent: NumberFormatComponent,

                                                    }}
                                                />
                                            </FormControl>

                                        </Grid>
                                    </Grid>
                                    <Grid item md={12}>

                                    </Grid>
                                </div>
                                : ''

                        } */}

                    </Form>
            </React.Fragment>
        )
    }
}
EditBankAccount.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditBankAccount);