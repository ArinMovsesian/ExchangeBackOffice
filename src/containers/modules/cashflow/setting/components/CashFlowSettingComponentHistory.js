import React from 'react';
import Header from "../../../../../shared/components/stateHeader/stateHeader";
import Form from "../../../../../shared/components/form/pureForm";
import TimePicker from "../../../../../shared/components/timePicker/timePicker";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from 'shared/components/formInput/inputForm'
import DropDownComponent from 'shared/components/dropDown/dropDown';
import GetEnum from 'services/getEnum';
import DropDownListDataProvider from "../../../../../core/dropDownListDataProvider";
import SaveCashFlowSettingService from "../services/SaveCashFlowSettingService";
import GetCashFlowSettingService from "../services/GetCashFlowSettingService";
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import moment from 'moment';
import GetSettingInDateAccountingSettingService from "../services/GetSettingInDateAccountingSettingService";
class CashFlowSettingComponentHistory extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            time: {
                value: '00:00',
                error: false
            },
            moneyRequestCurrentDay: false,
            checkIBAN: false,
            checkRemainingMoney: false,
            descriptionBankDeposit: '',
            descriptionParty: '',
            checkTrakingNumber: false,
            abilityToPayCustomerMoreThanBalance: false,
            defaultStatusMoneyRequest: {
                name: "selectedDefaultStatusMoneyRequest",
                feild: "title",
                label: "وضعیت پیش فرض تقاضای وجه",
                list: []
            },
            selectedDefaultStatusMoneyRequest: {code: 0, title: ''},
            defaultStatusSettleMoney: {
                name: "selectedDefaultStatusSettleMoney",
                feild: "title",
                label: "وضعیت پیش فرض واریز وجه",
                list: []
            },
            selectedDefaultStatusSettleMoney: {code: 0, title: ''},
            defaultStatusReceive: {
                name: "selectedDefaultStatusReceive",
                feild: "title",
                label: "وضعیت پیش فرض سند دریافت",
                list: []
            },
            selectedDefaultStatusReceive: {code: 0, title: ''},
            defaultStatusPayment: {
                name: "selectedDefaultStatusPayment",
                feild: "title",
                label: "وضعیت پیش فرض سند پرداخت",
                list: []
            },
            selectedDefaultStatusPayment: {code: 0, title: ''},
            defaultStatusTransfer: {
                name: "selectedDefaultStatusTransfer",
                feild: "title",
                label: "وضعیت پیش فرض سند انتقال",
                list: []
            },
            selectedDefaultStatusTransfer: {code: 0, title: ''},

            instantDeposit: {
                name: "selectedInstantDeposit",
                feild: "title",
                label: "وضعیت پیش فرض واریز آنی در پنل آنلاین",
                list: []
            },
            selectedInstantDeposit: {code: 0, title: ''},



            date: moment(new Date()),

            showForm: false,


            isReceiveT1: false,
        };
    }

    fetchcashFlowService = () => {
        // GetSettingInDateAccountingSettingService.getsettingindateaccountingsettingMethod(null,(response) => {
        //   console.log()
        // })
        //     console.log('getcurrentcashflowsettingMethod', response.result);
        //     const {
        //         maximumMoneyRequestTime,
        //         moneyRequestCurrentDay,
        //         checkIBAN,
        //         checkRemainingMoney,
        //         descriptionBankDeposit,
        //         descriptionParty,
        //         checkTrakingNumber,
        //         defaultStatusMoneyRequest,
        //         defaultStatusSettleMoney,
        //         defaultStatusPayment,
        //         defaultStatusReceive,
        //         defaultStatusTransfer} = response.result;
        //     this.setState({
        //         time: {
        //             value:  maximumMoneyRequestTime,
        //             error: false
        //         },
        //         moneyRequestCurrentDay: moneyRequestCurrentDay,
        //         checkIBAN: checkIBAN,
        //         checkRemainingMoney: checkRemainingMoney,
        //         descriptionBankDeposit: descriptionBankDeposit,
        //         descriptionParty: descriptionParty,
        //         checkTrakingNumber: checkTrakingNumber,
        //     });
        //     console.log('1',this.state.defaultStatusMoneyRequest.list);
        //     console.log('2',this.state.defaultStatusSettleMoney.list);
        //     console.log('3',this.state.defaultStatusReceive.list);
        //     console.log('4',this.state.defaultStatusPayment.list);
        //     console.log('5',this.state.defaultStatusTransfer.list);
        //     this.state.defaultStatusMoneyRequest.list.forEach((value, index) => {
        //         if(value.code == defaultStatusMoneyRequest) {
        //             this.setState({
        //                 selectedDefaultStatusMoneyRequest: value
        //             })
        //         }
        //     });
        //     this.state.defaultStatusSettleMoney.list.forEach((value, index) => {
        //         if(value.code == defaultStatusSettleMoney) {
        //             this.setState({
        //                 selectedDefaultStatusSettleMoney: value
        //             })
        //         }
        //     });
        //     this.state.defaultStatusReceive.list.forEach((value, index) => {
        //         if(value.code == defaultStatusReceive) {
        //             this.setState({
        //                 selectedDefaultStatusReceive: value
        //             })
        //         }
        //     });
        //     this.state.defaultStatusPayment.list.forEach((value, index) => {
        //         if(value.code == defaultStatusPayment) {
        //             this.setState({
        //                 selectedDefaultStatusPayment: value
        //             })
        //         }
        //     });
        //     this.state.defaultStatusTransfer.list.forEach((value, index) => {
        //         if(value.code == defaultStatusTransfer) {
        //             this.setState({
        //                 selectedDefaultStatusTransfer: value
        //             })
        //         }
        //     });
        // });
    };
    componentDidMount() {
        GetEnum("defaultstatusmoneyrequest", (response)=>  {DropDownListDataProvider(this,"defaultStatusMoneyRequest",response)});
        GetEnum("defaultstatussettlemoney", (response)=>  {DropDownListDataProvider(this,"defaultStatusSettleMoney",response)});
        GetEnum("defaultstatusreceive", (response)=>  {DropDownListDataProvider(this,"defaultStatusReceive",response)});
        GetEnum("defaultstatuspayment", (response)=>  {DropDownListDataProvider(this,"defaultStatusPayment",response)});
        GetEnum("defaultstatustransfer", (response)=>  {DropDownListDataProvider(this,"defaultStatusTransfer",response)});
        GetEnum("defaultstatustransfer", (response)=>  {DropDownListDataProvider(this,"instantDeposit",response)})
        setTimeout(() => {
            this.fetchcashFlowService();
        },1000);
    }
    handleDate = (value) => {
        GetSettingInDateAccountingSettingService.getsettingindatecashflowsettingMethod({entity: {dateFilter: {startDate: value}}}, (res) => {
                console.log(res);
                const {
                    maximumMoneyRequestTime,
                    moneyRequestCurrentDay,
                    checkIBAN,
                    checkRemainingMoney,
                    descriptionBankDeposit,
                    descriptionParty,
                    checkTrakingNumber,
                    defaultStatusMoneyRequest,
                    defaultStatusSettleMoney,
                    defaultStatusPayment,
                    defaultStatusReceive,
                    isReceiveT1,
                    instantDeposit,
                    abilityToPayCustomerMoreThanBalance,
                    defaultStatusTransfer} = res.result;
                this.setState({
                    date: value,
                    showForm: true,
                    time: {
                        value:  maximumMoneyRequestTime,
                        error: false
                    },
                    moneyRequestCurrentDay: moneyRequestCurrentDay,
                    checkIBAN: checkIBAN,
                    checkRemainingMoney: checkRemainingMoney,
                    descriptionBankDeposit: descriptionBankDeposit,
                    descriptionParty: descriptionParty,
                    checkTrakingNumber: checkTrakingNumber,
                    isReceiveT1,
                    abilityToPayCustomerMoreThanBalance: abilityToPayCustomerMoreThanBalance
                });
                console.log('1',this.state.defaultStatusMoneyRequest.list);
                console.log('2',this.state.defaultStatusSettleMoney.list);
                console.log('3',this.state.defaultStatusReceive.list);
                console.log('4',this.state.defaultStatusPayment.list);
                console.log('5',this.state.defaultStatusTransfer.list);
                this.state.defaultStatusMoneyRequest.list.forEach((value, index) => {
                    if(value.code == defaultStatusMoneyRequest) {
                        this.setState({
                            selectedDefaultStatusMoneyRequest: value
                        })
                    }
                });
                this.state.defaultStatusSettleMoney.list.forEach((value, index) => {
                    if(value.code == defaultStatusSettleMoney) {
                        this.setState({
                            selectedDefaultStatusSettleMoney: value
                        })
                    }
                });
                this.state.defaultStatusReceive.list.forEach((value, index) => {
                    if(value.code == defaultStatusReceive) {
                        this.setState({
                            selectedDefaultStatusReceive: value
                        })
                    }
                });
                this.state.defaultStatusPayment.list.forEach((value, index) => {
                    if(value.code == defaultStatusPayment) {
                        this.setState({
                            selectedDefaultStatusPayment: value
                        })
                    }
                });
                this.state.defaultStatusTransfer.list.forEach((value, index) => {
                    if(value.code == defaultStatusTransfer) {
                        this.setState({
                            selectedDefaultStatusTransfer: value
                        })
                    }
                });
                this.state.instantDeposit.list.forEach((value, index) => {
                    if(value.code == instantDeposit) {
                        this.setState({
                            selectedInstantDeposit: value
                        })
                    }
                });
        });
    };
    render() {
        return(
            <React.Fragment>
                {/*<Header {...this.props}/>*/}
                <Grid container spacing={8} className="no-margin">
                    <Grid item md={3}>
                        <PersianDatePicker selectedDate={this.state.date} label="تاریخ فیش" handleOnChange={this.handleDate}/>
                    </Grid>
                </Grid>
                {
                    this.state.showForm === true
                    ?
                        <React.Fragment>
                            <Grid container spacing={16} className="no-margin">
                                <Grid item md={5}>
                                    <TimePicker disabled={true} value={this.state.time.value} label={'حداکثر زمان تقاضای وجه در روز'} required error={this.state.time.error}/>
                                </Grid>
                            </Grid>
                            <Grid container spacing={16} className="no-margin">
                                <Grid item md={4}>
                                    <FormControlLabel
                                        label="تقاضای وجه برای روز جاری"
                                        control={
                                            <Checkbox
                                                checked={this.state.moneyRequestCurrentDay}
                                                value=""
                                                color="primary"
                                                disabled={true}
                                            />
                                        }
                                    />
                                </Grid>

                                <Grid item md={4}>
                                    <FormControlLabel
                                        label="کنترل اجباری بودن شماره شبا برای تقاضای وجه"
                                        control={
                                            <Checkbox
                                                checked={this.state.checkIBAN}
                                                value=""
                                                color="primary"
                                                disabled={true}
                                            />
                                        }
                                    />
                                </Grid>


                                <Grid item md={4}>
                                    <FormControlLabel
                                        label="کنترل مانده حساب بانک در هنگام ثبت سند پرداخت"
                                        control={
                                            <Checkbox
                                                checked={this.state.checkRemainingMoney}
                                                value=""
                                                color="primary"
                                                disabled={true}
                                            />
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={16} className="no-margin">
                                <Grid item md={4}>
                                    <Input label="شرح ردیف سند بانک در تقاضا و واریز وجه" value={this.state.descriptionBankDeposit} isMultiLine={false} disabled={true} />
                                </Grid>
                                <Grid item md={4}>
                                    <Input label="شرح ردیف سند مشتری در تقاضا و واریز وجه" value={this.state.descriptionParty} isMultiLine={false} disabled={true} />
                                </Grid>
                                <Grid item md={4}>
                                    <FormControlLabel
                                        label="ثبت شماره سند بانکی تکراری"
                                        control={
                                            <Checkbox
                                                checked={this.state.checkTrakingNumber}
                                                value=""
                                                color="primary"
                                                disabled={true}
                                            />
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={16} className="no-margin">
                                <Grid item md={4}>
                                    <div className="k-rtl">
                                        <DropDownComponent {...this.state.defaultStatusMoneyRequest}
                                                           isFilterable={false}
                                                           value={this.state.selectedDefaultStatusMoneyRequest} required isDisabled={true}/>
                                    </div>
                                </Grid>
                                <Grid item md={4}>
                                    <div className="k-rtl">
                                        <DropDownComponent {...this.state.defaultStatusSettleMoney}
                                                           isFilterable={false}
                                                           value={this.state.selectedDefaultStatusSettleMoney} required isDisabled={true}/>
                                    </div>
                                </Grid>
                                <Grid item md={4}>
                            <FormControlLabel
                                  label="امکان ثبت دریافت برای روز آینده"
                                  control={
                                    <Checkbox
                                        checked={this.state.isReceiveT1}
                                        onChange={(value) => this.handleChangeCheck(value,'isReceiveT1')}
                                        value=""
                                        color="primary"
                                        disabled={true}
                                    />
                                }
                            />
                        </Grid>
                            </Grid>
                            <Grid container spacing={16} className="no-margin">
                                <Grid item md={4}>
                                    <div className="k-rtl">
                                        <DropDownComponent {...this.state.defaultStatusReceive}
                                                           isFilterable={false}
                                                           value={this.state.selectedDefaultStatusReceive} required isDisabled={true}/>
                                    </div>
                                </Grid>
                                <Grid item md={4}>
                                    <div className="k-rtl">
                                        <DropDownComponent {...this.state.defaultStatusPayment}
                                                           isFilterable={false}
                                                           value={this.state.selectedDefaultStatusPayment} required isDisabled={true}/>
                                    </div>
                                </Grid>
                                <Grid item md={4}>
                                    <FormControlLabel
                                        label="امکان پرداخت مشتری بیش تر از مانده"
                                        control={
                                            <Checkbox
                                                checked={this.state.abilityToPayCustomerMoreThanBalance}
                                                onChange={(value) => this.handleChangeCheck(value,'abilityToPayCustomerMoreThanBalance')}
                                                value=""
                                                color="primary"
                                                disabled={true}
                                            />
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={16} className="no-margin">
                                <Grid item md={4}>
                                    <div className="k-rtl">
                                        <DropDownComponent {...this.state.defaultStatusTransfer}
                                                           isFilterable={false}
                                                           value={this.state.selectedDefaultStatusTransfer} required isDisabled={true}/>
                                    </div>
                                </Grid>
                                <Grid item md={4}>
                                    <div className="k-rtl">
                                        <DropDownComponent {...this.state.instantDeposit}
                                                        handleChange={(value) => this.handleChangeMarket(value, 'selectedInstantDeposit')} isFilterable={false}
                                                        value={this.state.selectedInstantDeposit}  required isDisabled={true}/>
                                    </div>
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    :
                        null
                }

            </React.Fragment>
        )
    }

}
export default CashFlowSettingComponentHistory;