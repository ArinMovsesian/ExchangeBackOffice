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
import Form from 'shared/components/form/pureForm';

import UpdateOrdersService from '../services/UpdateOrdersService';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import BidAndAskComponent from '../../createOrder/components/BidAndAskComponent';
import SymbolDetailComponent from '../../createOrder/components/SymbolDetailComponent';

class UpdateForDoneOrderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serialNumber: this.props.location.state.stateParams.serialNumber,
            volume: this.props.location.state.stateParams.volume,
            maxPrice: this.props.location.state.stateParams.minPrice,
            dateCondition: this.props.location.state.stateParams.dateCondition,
            toDate: this.props.location.state.stateParams.toDate && this.props.location.state.stateParams.toDate !== '0001-01-01T00:00:00' && this.props.location.state.stateParams.toDate !== new Date('0001-01-01T00:00:00Z') ? this.props.location.state.stateParams.toDate : null,
            priceCondition: this.props.location.state.stateParams.priceCondition,

            description: this.props.location.state.stateParams.description
        }
        this.handleChangeCheck = this.handleChangeCheck.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.backTo = this.backTo.bind(this);




    }
    componentDidMount() {
        this.setState({ toDate: this.props.location.state.stateParams.toDate && this.props.location.state.stateParams.toDate !== '0001-01-01T00:00:00' && this.props.location.state.stateParams.toDate !== new Date('0001-01-01T00:00:00Z') ? this.props.location.state.stateParams.toDate : null })
    }
    handleChangeCheck(event, name) {
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

    handleChangeDate(value) {
        this.setState({
            toDate: value
        })
    }
    backTo() {
        this.props.history.push(
            {
                pathname: this.props.back.path,
                state: {
                    ids:this.props.location.state.stateParams.ids
            }
            });


    }
    render() {
       
        return (
            <React.Fragment>

                <Form
                    {...this.props}
                    {...this.state}
                    service={UpdateOrdersService.editDoneOrder}
                    backParams={this.props.ids}
                    dontShowPrimaryButton
                    hideCancel
                    otherAction={[
                        {
                            color: "#2196f3",
                            title: 'ثبت سفارش و انتقال به فهرست سفارش های انجام شده',
                            action: {
                                isSubmit: true,
                                method: this.backTo
                            }
                        },
                        {
                            color: "#e0e0e0",
                            fontColor: "black",
                            title: 'انصراف',
                            action: {
                                isSubmit: false,
                                method: this.backTo
                            }
                        }
                    ]}
                    entity={
                        {

                            serialNumber: this.state.serialNumber !== '' ? this.state.serialNumber : '',

                            orderId: this.props.location.state.stateParams.orderId,
                            dailyOrderId: this.props.location.state.stateParams.dailyOrderId,
                        }
                    }
                  

                >
                    <React.Fragment>
                        <br />
                        <Grid container spacing={8} style={{ paddingLeft: 10, paddingRight: 10 }} className="no-margin">
                            <Grid item md={8} >
                                <Grid container spacing={8} >
                                    <Grid item md={3}>

                                        <Input label="سریال" type="number" handleChange={(e) => this.handleChange(e, 'serialNumber')}
                                            value={this.state.serialNumber} required />
                                    </Grid>
                                    {/* <Grid item md={3}> */}

                                    {/* <Input label="مبلغ" type="number" handleChange={(e) => this.handleChange(e, 'amount')}
                                    value={this.state.amount} required /> */}
                                    {/* </Grid> */}
                                    <Grid item md={3}>
                                        {/* <Input label="تعداد" type="number" handleChange={(e) => this.handleChange(e, 'volume')}
                                    value={this.state.volume} required /> */}
                                        <NumberFormatComponent disabled id="amount" label="تعداد" type="number" handleChange={(e) => this.handleChange(e, 'volume')}
                                            value={this.state.volume} required isSeparator={true} />
                                    </Grid>
                                    <Grid item md={3}>
                                        {/* <Input label="حداکثر قیمت" type="number" handleChange={(e) => this.handleChange(e, 'maxPrice')}
                                            value={this.state.maxPrice} required /> */}
                                        <NumberFormatComponent disabled id="amount" label="حداکثر قیمت" type="number" handleChange={(e) => this.handleChange(e, 'maxPrice')}
                                            value={this.state.maxPrice} required isSeparator={true} />
                                    </Grid>

                                </Grid>


                                <Grid container spacing={8} >

                                    <Grid item md={3}>

                                        <FormControlLabel
                                            style={{ marginTop: 5 }}
                                            control={
                                                <Checkbox
                                                    checked={this.state.dateCondition}
                                                    value="dateCondition"
                                                    color="primary"
                                                />
                                            }
                                            label="شرط تاریخ"
                                        />
                                    </Grid>
                                    <Grid item md={3}>
                                        <PersianDatePicker min={new Date()} disabled={true} selectedDate={this.state.toDate} label="تاریخ تا" handleOnChange={this.handleChangeDate} />

                                    </Grid>
                                    <Grid item md={9}>
                                        <Input isMultiLine label="توضیحات مشتری" textArea handleChange={(e) => this.handleChange(e, 'description')}
                                            value={this.state.description} disabled required />
                                    </Grid>
                                </Grid>


                            </Grid>
                            <Grid item md={4}>
                                <b >
                                    جزییات نماد
                   </b>
                                <br />
                                <SymbolDetailComponent />
                                <br />

                                <b >
                                    اطلاعات صف
                                </b>

                                <BidAndAskComponent />

                            </Grid>

                        </Grid>
                    </React.Fragment>
                </Form>
            </React.Fragment>
        )
    }
}
export default withStyles(styles)(UpdateForDoneOrderComponent);
