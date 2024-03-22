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
import ProfileChangePasswordService from '../services/ProfileChangePasswordService';
class ProfileChangePassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            confirmedPassword: '',
            prevoiusPassword:''
          

        }

    }

    componentDidMount() {
      

    }



    handleChange(value, name) {
        console.log(value)
        let item = value.value
        this.setState({
            [name]: item
        })
    }







    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Header {...this.props} />
                <Form
                    {...this.props}
                    {...this.state}
                    back={{path:"main/dashboard"}}
                    service={ProfileChangePasswordService.changePass}
                    entity={
                        {
                             
                        }
                    }
                    // preSubmit={this.preSubmit}
                    className="form-height"
                >

                    <Grid item md={12}>

                        <Grid item md={11}>
                            <Input label="رمز قبلی" type="password" required
                             
                                externalErrorDescription="رمز عبور با تکرارش مطابقت ندارد"
                                handleChange={(e) => this.handleChange(e, 'previousPassword')} value={this.state.previousPassword} />
                        </Grid>

                    </Grid>
                    <Grid item md={12}>

                        <Grid item md={11}>
                            <Input label=" رمز عبور جدید" type="password" required
                                externalError={this.state.confirmedPassword != '' && this.state.password !== this.state.confirmedPassword}
                                externalErrorDescription="رمز عبور با تکرارش مطابقت ندارد"
                                handleChange={(e) => this.handleChange(e, 'password')} value={this.state.password} />
                        </Grid>

                    </Grid>
                    <Grid item md={12}>
                        <Grid item md={11}>
                            <Input label="تایید رمز عبور جدید"
                                externalError={this.state.confirmedPassword != '' && this.state.password !== this.state.confirmedPassword}
                                externalErrorDescription="رمز عبور با تکرارش مطابقت ندارد"

                                type="password" required handleChange={(e) => this.handleChange(e, 'confirmedPassword')} value={this.state.confirmedPassword} />
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
                    {/* </Grid> */}
                </Form>
            </React.Fragment >
        )
    }
}

ProfileChangePassword.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileChangePassword);