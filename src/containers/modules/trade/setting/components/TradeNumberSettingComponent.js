import React from 'react';
import Header from "../../../../../shared/components/stateHeader/stateHeader";
import Form from "../../../../../shared/components/form/form";
import TimePicker from "../../../../../shared/components/timePicker/timePicker";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from 'shared/components/formInput/inputForm'
import DropDownComponent from 'shared/components/dropDown/dropDown';
import GetEnum from 'services/getEnum';
import DropDownListDataProvider from "../../../../../core/dropDownListDataProvider";
import SaveTradeNumberSettingService from '../services/TradeNumberSettingService';

class TradeNumberSettingComponent extends React.Component{
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






        };
    }
    TimeChangeHandle = (value) => {
        let errorStatus = null;
        if(value.target.value == ''){
            errorStatus = true;
        }else {
            errorStatus = false;
        }
        this.setState({
            time: {
                value: value.target.value,
                error: errorStatus
            }
        });
      console.log(value.target.value);
    };
    handleChangeCheck = (event, name) => {
        this.setState({
            [name]: event.target.checked,
        })
    };
    handleChange(value, name) {
        console.log([name],value.value);
        let item = value.value;
        this.setState({
            [name]: item,
        })
    }


    handleChangeMarket = (value, name) => {

            this.setState({
                [name]: value.value,
            })
    };
    A = (value, index, array, name, getValue) => {

    };
    componentWillMount() {

    }
    fetchcashFlowService = () => {
        SaveTradeNumberSettingService.getTradeNumberSettingMethod(null,(response) => {
            console.log('getcurrentcashflowsettingMethod', response.result);
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
                defaultStatusTransfer} = response.result;
            this.setState({
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
        });
    };
    componentDidMount() {
        GetEnum("defaultstatusmoneyrequest", (response)=>  {DropDownListDataProvider(this,"defaultStatusMoneyRequest",response)});
        GetEnum("defaultstatussettlemoney", (response)=>  {DropDownListDataProvider(this,"defaultStatusSettleMoney",response)});
        GetEnum("defaultstatusreceive", (response)=>  {DropDownListDataProvider(this,"defaultStatusReceive",response)});
        GetEnum("defaultstatuspayment", (response)=>  {DropDownListDataProvider(this,"defaultStatusPayment",response)});
        GetEnum("defaultstatustransfer", (response)=>  {DropDownListDataProvider(this,"defaultStatusTransfer",response)});

        setTimeout(() => {
            this.fetchcashFlowService();
        },1000);
    }

    render() {
        return(
            <React.Fragment>
                <Header {...this.props}/>
                <Form
                    service={SaveTradeNumberSettingService.saveTradeNumberSettingMethod}
                    {...this.props}
                    {...this.state}
                    redirect={"/main/dashboard"}
                    entity={
                        {
                            maximumMoneyRequestTime:this.state.time.value,
                            moneyRequestCurrentDay: this.state.moneyRequestCurrentDay,
                            checkIBAN: this.state.checkIBAN,
                            checkRemainingMoney: this.state.checkRemainingMoney,
                            descriptionParty: this.state.descriptionParty,
                            descriptionBankDeposit: this.state.descriptionBankDeposit,
                            checkTrakingNumber: this.state.checkTrakingNumber,
                            defaultStatusMoneyRequest: this.state.selectedDefaultStatusMoneyRequest.code,
                            defaultStatusSettleMoney: this.state.selectedDefaultStatusSettleMoney.code,
                            defaultStatusReceive: this.state.selectedDefaultStatusReceive.code,
                            defaultStatusPayment: this.state.selectedDefaultStatusPayment.code,
                            defaultStatusTransfer: this.state.selectedDefaultStatusTransfer.code,
                            dateFilter: {
                                startDate: "2019-04-24T12:15:28.406Z",
                                endDate: null
                            }

                        }
                    }
                    className="form-height"
                >
                    <Grid container spacing={16} className="no-margin">
                        <Grid item md={5}>
                                 <TimePicker changeHandle={(value) => this.TimeChangeHandle(value)} value={this.state.time.value} label={'حداکثر زمان تقاضای وجه در روز'} required error={this.state.time.error}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={16} className="no-margin">
                    <Grid item md={4}>
                        <FormControlLabel
                            label="تقاضای وجه برای روز جاری"
                            control={
                                <Checkbox
                                    checked={this.state.moneyRequestCurrentDay}
                                    onChange={(value) => this.handleChangeCheck(value,'moneyRequestCurrentDay')}
                                    value=""
                                    color="primary"
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
                                    onChange={(value) => this.handleChangeCheck(value,'checkIBAN')}
                                    value=""
                                    color="primary"
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
                                        onChange={(value) => this.handleChangeCheck(value,'checkRemainingMoney')}
                                        value=""
                                        color="primary"
                                    />
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={16} className="no-margin">
                        <Grid item md={4}>
                            <Input label="شرح ردیف سند بانک در تقاضا و واریز وجه" handleChange={(e) => this.handleChange(e, 'descriptionBankDeposit')} value={this.state.descriptionBankDeposit} isMultiLine={false} />
                        </Grid>
                        <Grid item md={4}>
                            <Input label="شرح ردیف سند مشتری در تقاضا و واریز وجه" handleChange={(e) => this.handleChange(e, 'descriptionParty')} value={this.state.descriptionParty} isMultiLine={false} />
                        </Grid>
                        <Grid item md={4}>
                            <FormControlLabel
                                label="ثبت شماره سند بانکی تکراری"
                                control={
                                    <Checkbox
                                        checked={this.state.checkTrakingNumber}
                                        onChange={(value) => this.handleChangeCheck(value,'checkTrakingNumber')}
                                        value=""
                                        color="primary"
                                    />
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={16} className="no-margin">
                        <Grid item md={4}>
                            <div className="k-rtl">
                                <DropDownComponent {...this.state.defaultStatusMoneyRequest}
                                                   handleChange={(value) => this.handleChangeMarket(value, 'selectedDefaultStatusMoneyRequest')} isFilterable={false}
                                                   value={this.state.selectedDefaultStatusMoneyRequest} required/>
                            </div>
                        </Grid>
                        <Grid item md={4}>
                            <div className="k-rtl">
                                <DropDownComponent {...this.state.defaultStatusSettleMoney}
                                                   handleChange={(value) => this.handleChangeMarket(value, 'selectedDefaultStatusSettleMoney')} isFilterable={false}
                                                   value={this.state.selectedDefaultStatusSettleMoney} required/>
                            </div>
                        </Grid>
                    </Grid>



                    <Grid container spacing={16} className="no-margin">
                        <Grid item md={4}>
                            <div className="k-rtl">
                                <DropDownComponent {...this.state.defaultStatusReceive}
                                                   handleChange={(value) => this.handleChangeMarket(value, 'selectedDefaultStatusReceive')} isFilterable={false}
                                                   value={this.state.selectedDefaultStatusReceive} required/>
                            </div>
                        </Grid>
                        <Grid item md={4}>
                            <div className="k-rtl">
                                <DropDownComponent {...this.state.defaultStatusPayment}
                                                   handleChange={(value) => this.handleChangeMarket(value, 'selectedDefaultStatusPayment')} isFilterable={false}
                                                   value={this.state.selectedDefaultStatusPayment} required/>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container spacing={16} className="no-margin">
                        <Grid item md={4}>
                            <div className="k-rtl">
                                <DropDownComponent {...this.state.defaultStatusTransfer}
                                                   handleChange={(value) => this.handleChangeMarket(value, 'selectedDefaultStatusTransfer')} isFilterable={false}
                                                   value={this.state.selectedDefaultStatusTransfer} required/>
                            </div>
                        </Grid>
                    </Grid>
                </Form>
            </React.Fragment>
        )
    }

}
export default TradeNumberSettingComponent;