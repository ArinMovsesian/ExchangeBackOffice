import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from 'shared/components/formInput/inputForm'
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import Header from 'shared/components/stateHeader/stateHeader';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import IBAN from 'shared/components/iban/textMask';
import styles from 'containers/layout/panel/theme';
import Form from 'shared/components/form/form';
import Email from 'shared/components/email/email'
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import AddUserService from '../services/CreateUserService';
import GetUsersService from '../services/GetUsersService';
class AddUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: '',
            userName: '',
            email: '',
            phoneNumber: '',
            userRole: [],
            password: '',
            confirmedPassword: '',
            userRoles: {
                list: [],
                name: "userRole",
                feild: "name",
                label: "نقش کاربر",

            },
            branches: {
                name: "branch",
                field: "title",
                label: "شعبه",
                list: []
            },
            branch: { code: 0, title: '' }

        }
        this.successGetBranch = this.successGetBranch.bind(this);
        this.successGetRoles = this.successGetRoles.bind(this);

    }

    componentDidMount() {
        this.getBranches();
        this.getUserRoles();

    }


    getBranches() {
        var command = {
            optionalFilter: {
                take: 500,
                page: 1
            }
        }
        GetBranchService.getBranchesByFilter(command, this.successGetBranch);
    }

    successGetBranch(response) {
        if (response.result) {
            this.setState({
                branches: {
                    name: "branch",
                    field: "title",
                    label: "شعبه",
                    list: response.result
                }
            })
        }
    }

    getUserRoles() {
        var command = {
            optionalFilter: {
                take: 500,
                page: 1,

            },
            reportFilter:''
        }
        GetUsersService.getAllUserRoles(command, this.successGetRoles);
    }

    successGetRoles(response) {
      
        if (response.result) {
            this.setState({
                userRoles: {
                    name: "userRole",
                    feild: "name",
                    label: "نقش کاربر",
                    list: response.result
                }
            })
        }
    }

    handleChange(value, name) {
        console.log(value)
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





    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Header {...this.props} />
                <Form
                    {...this.props}
                    {...this.state}
                    service={AddUserService.saveUser}
                    entity={
                        {
                            // bankId: this.state.selectedBank.codeId,
                            // regionId: this.state.selectedRegion.id,
                            // branchCode: this.state.branchCode,
                            // branchName: this.state.branchName,
                            // accountType: this.state.selectedAccount.code,
                            // accountNumber: this.state.accountNumber,
                            // iban: this.state.iban.replace(/[{()}]/g, '').replace(/ /g, ''),
                            // comment: this.state.comment,
                            // maxDepositValue: this.state.maxDepositValue ? parseInt(this.state.maxDepositValue.replace(/,/g, '')) : '',
                            // mainMarketIds: this.state.selectedMainMarkets.length > 0 ? this.state.selectedMainMarkets.map(s => { return s.id }) : [],
                            // forCustomerDeposit: this.state.forCustomerDeposit,
                            // forLoanUse: this.state.forLoanUse
                        }
                    }
                    // preSubmit={this.preSubmit}
                    className="form-height"
                >
                    <Grid container spacing={8}>
                        <Grid item md={12}>

                            <Grid item md={11}>
                                <Input label="نام و نام خانوادگی" required handleChange={(e) => this.handleChange(e, 'fullName')} value={this.state.fullName} />
                            </Grid>

                        </Grid>
                        <Grid item md={12}>
                            <Grid item md={11}>
                                <Input label="نام کاربری" required handleChange={(e) => this.handleChange(e, 'userName')} value={this.state.userName} />
                            </Grid>
                        </Grid>
                        <Grid item md={12}>
                            <Grid item md={11}>
                                <Email handleChange={(e) => this.handleChange(e, 'email1')} value={this.state.email1} isLeftStartText={true} />
                            </Grid>
                        </Grid>
                        <Grid item md={12}>
                            <Grid item md={11}>
                                <NumberFormatComponent id="phone" label="تلفن"
                                    value={this.state.phone}
                                    handleChange={(value, error) => this.handleChange(value, 'phone')} type="number" format={'########'} required />
                            </Grid>
                        </Grid>
                        <Grid item md={12}>

                            <Grid item md={11}>
                                <Input label="رمز عبور" type="password" required 
                                externalError={this.state.confirmedPassword!='' && this.state.password!==this.state.confirmedPassword}
                                externalErrorDescription="رمز عبور با تکرارش مطابقت ندارد"
                                handleChange={(e) => this.handleChange(e, 'password')} value={this.state.password} />
                            </Grid>

                        </Grid>
                        <Grid item md={12}>
                            <Grid item md={11}>
                                <Input label="تایید رمز عبور"
                                 externalError={this.state.confirmedPassword!='' && this.state.password!==this.state.confirmedPassword}
                                externalErrorDescription="رمز عبور با تکرارش مطابقت ندارد"

                                type="password" required handleChange={(e) => this.handleChange(e, 'confirmedPassword')} value={this.state.confirmedPassword} />
                            </Grid>
                        </Grid>
                        
                     
                        <Grid item md={12}>
                        <Grid item md={11}>
                  <ComboBoxComponent required  {...this.state.branches}
                    handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                    value={this.state.branch} />
                    </Grid>
                </Grid>
                <Grid item md={12}>
                <Grid item md={11}>
                            <div className="k-rtl">
                                <MultiSelectComponent isFilterable {...this.state.userRoles}
                                    handleChange={(value, name) => this.handleChange(value , name)}
                                    value={this.state.userRole} />
                            </div>
                        </Grid>    
                        </Grid>    
                        {/* 
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
                                        handleChange={(value, name) => this.handleChange(value, name)} nameFeild="account" isFilterable={false} value={this.state.selectedAccount} />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item md={12}>
                            <Grid item md={5}>
                                <NumberFormatComponent id="accountNumber" label="شماره حساب" required value={this.state.accountNumber}
                                    handleChange={(value, error) => this.handleChange(value, 'accountNumber')} type="number" />
                            </Grid>
                        </Grid>
                        <Grid item md={12}>
                            <Grid item md={5}>
                                <IBAN handleChange={(value) => this.handleChange(value, 'iban')} value={this.state.iban} />
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
                        </Grid> */}
                        {/* <Grid item md={12}>
                            <Grid item md={5}>
                                <div className="k-rtl list-account-bank">
                                    <MultiSelectComponent {...this.state.mainMarket}
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false} value={this.state.selectedMainMarkets} />
                                </div>
                            </Grid>
                        </Grid> */}
                        {/* <Grid item md={12}>
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
                        </Grid> */}
                    </Grid>
                </Form>
            </React.Fragment>
        )
    }
}
AddUser.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddUser);