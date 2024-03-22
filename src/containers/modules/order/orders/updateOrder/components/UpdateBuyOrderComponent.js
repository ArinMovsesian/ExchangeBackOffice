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
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import BidAndAskComponent from '../../createOrder/components/BidAndAskComponent';
import SymbolDetailComponent from '../../createOrder/components/SymbolDetailComponent';
import GetEnum from 'services/getEnum'
import DropDownListDataProvider from '../../../../../../core/dropDownListDataProvider';

class UpdateBuyComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            serialNumber: this.props.location.state.stateParams.serialNumber,
            volume: this.props.location.state.stateParams.volume ? this.props.location.state.stateParams.volume.toString() : '',
            maxPrice: this.props.location.state.stateParams.maxPrice ? this.props.location.state.stateParams.maxPrice.toString() : null,
            dateCondition: this.props.location.state.stateParams.dateCondition,
            toDate: this.props.location.state.stateParams.toDate && this.props.location.state.stateParams.toDate !== '0001-01-01T00:00:00' && this.props.location.state.stateParams.toDate !== new Date('0001-01-01T00:00:00Z') ? this.props.location.state.stateParams.toDate : null,
            description: this.props.location.state.stateParams.description,
            amount: this.props.location.state.stateParams.amount ? this.props.location.state.stateParams.amount.toString() : '',
            priceCondition: this.props.location.state.stateParams.priceCondition,
           
            priceConditionDropDowm: {
                name: "priceCondition",
                feild: "title",
                label: "قیمت",
                list: []
            },

        }
        console.log("this.props.location.state.stateParams.priceCondition",this.props.location.state.stateParams.priceCondition)

        this.handleChangeCheck = this.handleChangeCheck.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.reloadOrder = this.reloadOrder.bind(this);

        console.log("this.props.location.state.stateParams.toDate", this.props.location.state.stateParams.dateCondition, this.props.location.state.stateParams.toDate, this.props.location.state.stateParams.toDate !== new Date('0001-01-01T00:00:00'), this.props.location.state.stateParams.toDate === '0001-01-01T00:00:00')



    }

    componentDidMount() {


        this.setState({ toDate: this.props.location.state.stateParams.toDate && this.props.location.state.stateParams.toDate !== '0001-01-01T00:00:00' && this.props.location.state.stateParams.toDate !== new Date('0001-01-01T00:00:00Z') ? this.props.location.state.stateParams.toDate : null })
        this.getPriceCondition();
    }

    getPriceCondition() {
        GetEnum("GetPriceCondition", (response) => DropDownListDataProvider(this, "priceConditionDropDowm", response))

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

    reloadOrder() {
        this.setState({
            serialNumber: '',
            volume: '',
            maxPrice: '',
            dateCondition: false,
            toDate: this.props.location.state.stateParams.toDate
                && this.props.location.state.stateParams.toDate !== '0001-01-01T00:00:00' && this.props.location.state.stateParams.toDate !== new Date('0001-01-01T00:00:00Z') ? this.props.location.state.stateParams.toDate : null,
            description: '',
            amount: ''
        });
        this.props.reloadOrder();
    }
    render() {
        console.log("max-price11",
            // !this.props.branchId || !this.props.partyId || !this.props.productId || !this.state.serialNumber || this.state.serialNumber === '',   ((this.state.amount === '' || !this.state.amount) && (!this.state.volume)),
            //    (this.state.priceCondition && this.state.priceCondition.code === 2) && (!this.state.maxPrice || this.state.maxPrice === ''),
            (this.state.priceCondition && this.state.priceCondition.code === 0) || this.state.priceCondition === undefined,
            this.state.dateCondition && this.state.toDate === null,
            this.props.buyingPower !== undefined && this.props.buyingPower <= 0,
            this.state.volume

        )
        return (
            <Form
                {...this.props}
                {...this.state}
                disabled={
                    !this.props.branchId || !this.props.partyId || !this.props.productId || !this.state.serialNumber || this.state.serialNumber === ''
                    || ((this.state.amount === '' || !this.state.amount) && (!this.state.volume))
                    || (this.state.priceCondition && this.state.priceCondition.code === 2) && (!this.state.maxPrice || this.state.maxPrice === '' || this.state.maxPrice <= 0)
                    || (this.state.priceCondition && this.state.priceCondition.code === 0) || this.state.priceCondition === undefined
                    || this.state.dateCondition && this.state.toDate === null
                    || this.props.buyingPower !== undefined && this.props.buyingPower <= 0
                    || this.state.toDate && new Date(this.state.toDate) < new Date()



                }
                service={UpdateOrdersService.editBuyOrder}
                entity={
                    {
                        // branchId: this.props.branchId,
                        branchId: this.props.branchId,
                        partyId: this.props.partyId,
                        productId: this.props.productId,
                        serialNumber: this.state.serialNumber !== '' ? this.state.serialNumber : '',
                        amount: this.state.amount !== '' ? parseInt(this.state.amount.replace(/,/g, '')) : 0,
                        // maxPrice: 0,
                        maxPrice: this.state.priceCondition && this.state.priceCondition.code === 2 && this.state.maxPrice !== null && this.state.maxPrice !== '' ? parseInt(this.state.maxPrice.replace(/,/g, '')) : 0,
                        volume: this.state.volume !== '' ? parseInt(this.state.volume.replace(/,/g, '')) : 0,
                        // dateCondition: this.state.dateCondition,

                        dateCondition: false,
                        toDate: this.state.toDate,
                        description: this.state.description,
                        id: this.props.location.state.stateParams.id

                    }
                }
                redirect={"/main/order/orders/getOrders"}
                SubmitTitle={'ویرایش سفارش خرید و انتقال به فهرست سفارش ها'}

            >
                <React.Fragment>
                    <br />
                    <Grid container spacing={8} style={{ paddingLeft: 10, paddingRight: 10 }} className="no-margin">
                        <Grid item md={8} style={{ backgroundColor: 'rgba(46, 130, 255, 0.11)' }}>
                            <Grid container spacing={8} >
                                <Grid item md={3}>
                                    <Input label="سریال" handleChange={(e) => this.handleChange(e, 'serialNumber')}
                                        value={this.state.serialNumber} required />
                                </Grid>
                                <Grid item md={3}>

                                    <NumberFormatComponent id="amount" label="مبلغ" type="number"
                                        disabled={(this.state.volume !== '' || this.state.volume) && this.state.volume!=0}
                                        handleChange={(e) => this.handleChange(e, 'amount')}
                                        value={this.state.amount}

                                        required={this.state.volume === ''} isSeparator={true} />
                                </Grid>
                                <Grid item md={3}>
                                    <NumberFormatComponent id="amount"
                                        disabled={(this.state.amount !== '' || this.state.amount) && this.state.amount!=0 }
                                        label="تعداد" type="number" handleChange={(e) => this.handleChange(e, 'volume')}
                                        value={this.state.volume} required={this.state.amount === ''} isSeparator={true} />
                                    {/* <Input label="تعداد" type="number" handleChange={(e) => this.handleChange(e, 'volume')}
                                value={this.state.volume} required={this.state.amount===''} /> */}
                                </Grid>

                            </Grid>


                            <Grid container spacing={8} >
                                <Grid item md={3}>


                                    <DropDownComponent {...this.state.priceConditionDropDowm}
                                        isRequired
                                        dataItemKey="code"
                                        handleChange={(value, name) => this.handleChange(value, name)}
                                        value={this.state.priceCondition} />

                                </Grid>
                                {this.state.priceCondition && this.state.priceCondition.code === 2 ?
                                    <Grid item md={3}>

                                        {/* <Input label="حداقل قیمت" type="number" handleChange={(e) => this.handleChange(e, 'maxPrice')}
value={this.state.maxPrice} required /> */}
                                        <NumberFormatComponent id="amount" label="حداکثر قیمت" type="number" handleChange={(e) => this.handleChange(e, 'maxPrice')}
                                            value={this.state.maxPrice} required isSeparator={true} />
                                    </Grid> : null}
                                <Grid item md={3}>

                                    <FormControlLabel
                                        style={{ marginTop: 5 }}
                                        control={
                                            <Checkbox
                                                checked={this.state.dateCondition}
                                                onChange={(e) => this.handleChangeCheck(e, 'dateCondition')}
                                                value="dateCondition"
                                                color="primary"
                                            />
                                        }
                                        label="شرط تاریخ"
                                    />
                                </Grid>
                                {this.state.priceCondition && this.state.priceCondition.code === 2 ?
                                    <Grid item md={3}>

                                    </Grid> : null}
                                <Grid item md={3}>
                                    <PersianDatePicker disabled={!this.state.dateCondition} selectedDate={this.state.toDate} min={new Date()} label="تاریخ تا" handleOnChange={this.handleChangeDate} />

                                </Grid>
                                {this.state.priceCondition && this.state.priceCondition.code === 2 ?
                                    <Grid item md={3}>

                                    </Grid> : null}
                                <Grid item md={9}>
                                    <Input isMultiLine label="توضیحات مشتری" textArea handleChange={(e) => this.handleChange(e, 'description')}
                                        value={this.state.description} required />
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
        )
    }
}
export default withStyles(styles)(UpdateBuyComponent);
