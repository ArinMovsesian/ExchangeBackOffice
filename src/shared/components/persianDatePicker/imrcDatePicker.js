import React, { Component } from 'react';
import ReactDOM from "react-dom";
import moment from 'moment-jalaali'; // Notice here !
import "imrc-datetime-picker/dist/imrc-datetime-picker.css";
import jMoment from 'moment-jalaali';
import { DatetimePickerTrigger } from 'imrc-datetime-picker';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import styles from 'containers/layout/panel/theme';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import EventIcon from '@material-ui/icons/Event';
import MaskedInput from 'react-text-mask';
// import digit from 'thirdParty/digit'
import './persianDatePicker.css'
import { th } from 'date-fns/esm/locale';
moment.loadPersian({
    dialect: "persian-modern",
    usePersianDigits: false,

});



const DatePickerRegex = /^[1-4]\d{3}\/((0[1-6]\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\/(30|([1-2][0-9])|(0[1-9]))))$/


class PersianDatePickerComponent extends Component {
    constructor(props) {
        super(props);

        this.dateRef = React.createRef();
        this.triggerButton = React.createRef();

        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleChangeInput = this.handleChangeInput.bind(this)
        this.state = {
            selectedDate: this.props.selectedDate !== undefined
                ? this.props.selectedDate !== null
                    ?this.props.selectedDate===new Date('0001-01-01T00:00:00') 
                    ? new moment(new Date()) : 
                    moment(this.props.selectedDate) : new moment(new Date()) : new moment('1600/01/01'),
            selectedDateText: this.props.selectedDate !== undefined ? this.props.selectedDate != null ? moment(this.props.selectedDate).locale('en').format('jYYYY/jMM/jDD') : '' : moment(new moment('1600/01/01')).locale('en').format('jYYYY/jMM/jDD'),
            minerror: false,
            maxError: false,

            requiredError: false,
            syntaxError: false,
            error: false
        };
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.max !== prevProps.max && this.state.selectedDate.isBefore(this.props.max) && this.state.maxError) {

            this.setState({ maxError: false, error: this.state.minError || this.state.requiredError });

        }


        else if (this.props.min !== prevProps.min && this.state.selectedDate.isAfter(this.props.min) && this.state.minError)
            this.setState({ minError: false, error: this.state.maxError || this.state.requiredError });

        if ((this.state.selectedDate === null || this.state.selectedDate === moment(new Date())) && prevProps.selectedDate === null) {

            this.setState({
                selectedDate: moment(this.props.selectedDate),
                selectedDateText: moment(this.props.selectedDate).locale('en').format('jYYYY/jMM/jDD'),
            })
        }

        else if (this.props.selectedDate !== null && this.state.selectedDate !== null &&
            this.state.selectedDate.diff(new moment('1600/01/01')) === 0 && prevState.selectedDate !== null && prevState.selectedDate.diff(this.state.selectedDate) === 0) {
            this.setState({
                selectedDate: moment(this.props.selectedDate),
                selectedDateText: moment(this.props.selectedDate).locale('en').format('jYYYY/jMM/jDD'),
            })
        }


        else if (this.state.selectedDate !== null && this.state.selectedDate.diff(prevState.selectedDate) !== 0 && this.props != prevProps) {
            if (this.state.selectedDate.isAfter(this.props.max))
                this.setState({ maxError: true, minError: false, error: true });
            else if (this.state.selectedDate !== null && this.state.selectedDate.isBefore(this.props.min))
                this.setState({ maxError: false, minError: true, error: true });
            else {


                this.setState((state) => { return { error: state.syntaxError || state.requiredError, minError: false, maxError: false } });
            }
        } else if (this.props.selectedDate !== null && prevProps !== this.props) {
            this.setState({
                selectedDate: moment(this.props.selectedDate),
                selectedDateText: moment(this.props.selectedDate).locale('en').format('jYYYY/jMM/jDD'),
            })
        }


    }
    handleChangeDate = date => {
 
        this.dateRef.current.state.isOpen = false;
        this.setState({ selectedDate: date, selectedDateText: moment(date).locale('en').format('jYYYY/jMM/jDD'), requiredError: false, syntaxError: false });
        this.props.handleOnChange(moment(date._d).locale('en').format('YYYY/MM/DD'));

    };



    handleChangeInput(e) {

        this.setState({ selectedDateText: e.target.value })
        if (e.target.value.length > 0 || this.state.selectedDate !== null) {
            this.setState({ requiredError: false })

            if (!DatePickerRegex.test(e.target.value) && e.target.value !== '')
                this.setState({ error: true, requiredError: false, syntaxError: true, minError: false, maxError: false })
            else if (e.target.value === '') {
                this.setState({ error: true, requiredError: true, syntaxError: false, minError: false, maxError: false, selectedDateText: '' })
                this.props.handleOnChange(null);

            }
            else {
                let _date = moment(e.target.value, 'jYYYY/jMM/jDD');
                let date = moment(_date);

                this.setState({ syntaxError: false })
                this.dateRef.current.handleChange(date);
            }
        }
        else {
            this.setState({ error: true, requiredError: true, minError: false, maxError: false, syntaxError: false });
        }

    }


    render() {

        const { selectedDate } = this.state;
        const minDateFormat = this.props.min !== null ? jMoment(this.props.min._d).format('jYYYY/jMM/jDD') : null;
        const maxDateFormat = this.props.max !== null ? jMoment(this.props.max._d).format('jYYYY/jMM/jDD') : null;
        const minDateMessage = "مقدار ورودی تاریخ باید بیشتر از " + minDateFormat + " باشد"
        const maxDateMessage = "مقدار ورودی تاریخ باید کمتر از " + maxDateFormat + " باشد"
        const dateFormat = "jYYYY/jMM/jDD";
        const { classes } = this.props;
        const shortcuts = {
            'تاریخ امروز': moment(),

        };

        return (
            <div >
                <DatetimePickerTrigger
                    shortcuts={shortcuts}
                    moment={this.state.selectedDate}
                    onChange={this.handleChangeDate}
                    style={{ right: this.props.right }}
                    showTimePicker={false}
                    isSolar={true}
                    disabled={this.props.disabled}
                    lang={"fa"}
                    ref={this.dateRef}
                >
                    <div
                    >
                        <FormControl className={classes.formControl} xs={8} variant="outlined" error={this.state.error} fullWidth>
                            <InputLabel
                                ref={ref => {
                                    this.labelRef = ReactDOM.findDOMNode(ref);
                                }}
                                className={!this.state.error ? classes.inputLabelOutLine : classes.inputLabelOutLineError}

                                htmlFor={this.props.id}
                            >
                                {this.props.required ?
                                    <span class="required-star" >*</span> : ''
                                }
                                {this.props.label}
                            </InputLabel>
                            <OutlinedInput

                                id="label"
                                className={classes.OutlineInput}
                                pattern="[0-9]*"
                                type="text"
                                value={this.state.selectedDateText}
                                minDate={this.props.min}
                                maxDate={this.props.max}
                                onChange={this.handleChangeInput}
                                labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                                disabled={this.props.disabled}
                                autoComplete={'off'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton onClick={this.triggerPicker} >
                                            < EventIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />

                            {
                                this.state.requiredError && this.props.required ?

                                    <i className="error-validation">{this.props.label} نباید خالی باشد </i>
                                    : ''


                            }
                            {
                                this.state.maxError ?

                                    <p className="error-validation"> {maxDateMessage} </p>
                                    : ''


                            }
                            {
                                this.state.minError ?

                                    <p className="error-validation"> {minDateMessage}</p>
                                    : ''


                            }
                            {
                                this.state.syntaxError ?

                                    <p className="error-validation">  فرمت {this.props.label} باید تاریخ جلالی باشد </p>
                                    : ''


                            }


                        </FormControl>

                    </div>

                </DatetimePickerTrigger>



            </div>


        );
    }
}
PersianDatePickerComponent.defaultProps = {
    min: moment("1919/01/01"),
    max: moment("2119/01/01"),
    label: "تاریخ",
    right: "1rem",
    selectedDate: new moment(),
    required: false

}

const PersianDatePicker = withStyles(styles)(PersianDatePickerComponent)

export default PersianDatePicker;