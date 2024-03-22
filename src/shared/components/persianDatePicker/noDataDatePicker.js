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


class NoDataDatePickerComponent extends Component {
    constructor(props) {
        super(props)
        this.dateRef = React.createRef();
        this.triggerButton = React.createRef();
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);

        this.state = {
            selectedDate: this.props.selectedDate === null ? moment(new Date()): moment(this.props.selectedDate),
            selectedDateText: this.props.selectedDate === null ? '' : moment(this.props.selectedDate).locale('en').format('jYYYY/jMM/jDD'),
            minError: false,
            maxError: false,
            requiredError: false,
            syntaxError: false,
            error: false, 
        };
        console.log('constructor',moment(this.props.selectedDate));
    }

    componentDidUpdate(prevProps, prevState) {
        // this.setState({
        //             selectedDate: this.props.selectedDate === null ? moment(new Date()) : moment(this.props.selectedDate),
        //             selectedDateText: this.props.selectedDate === null ? '' : moment(this.props.selectedDate).locale('en').format('jYYYY/jMM/jDD'),
        //         })
        // if (this.props.selectedDate != null && this.state.selectedDate.diff(new moment('1600/01/01')) === 0 && prevState.selectedDate.diff(this.state.selectedDate) === 0) {
        //     this.setState({
        //         selectedDate: moment(this.props.selectedDate),
        //         selectedDateText: moment(this.props.selectedDate).locale('en').format('jYYYY/jMM/jDD'),
        //     })
        // }
        // else if (this.state.selectedDate.diff(prevState.selectedDate) !== 0 && this.props != prevProps) {
        //     if (this.state.selectedDate.isAfter(this.props.max))
        //         this.setState({ maxError: true, minError: false, error: true });
        //     else if (this.state.selectedDate.isBefore(this.props.min))
        //         this.setState({ maxError: false, minError: true, error: true });
        //     else {


        //         this.setState((state) => { return { error: state.syntaxError || state.requiredError, minError: false, maxError: false } });
        //     }
        // }else if(this.props.selectedDate != null &&  prevProps != this.props){
        //     this.setState({
        //         selectedDate: moment(this.props.selectedDate),
        //         selectedDateText: moment(this.props.selectedDate).locale('en').format('jYYYY/jMM/jDD'),
        //     })
        // }
        


    }

    componentWillReceiveProps(next){
     
        // if(new Date(next.selectedDate) < new Date(this.props.min) || new Date(next.selectedDate)  > new Date(this.props.max)){
        //     alert(1);
        // }
    
        if(this.props.selectedDate !== next.selectedDate) {
            console.log('isError: ',this.state.minError);
            this.setState({
                selectedDate: ( next.selectedDate === null  || new Date(next.selectedDate) < new Date(this.props.min) || new Date(next.selectedDate)  > new Date(this.props.max)) ? moment(new Date()):  moment(next.selectedDate),
                selectedDateText: (next.selectedDate === null || new Date(next.selectedDate) < new Date(this.props.min) || new Date(next.selectedDate)  > new Date(this.props.max))? '' :moment(next.selectedDate).locale('en').format('jYYYY/jMM/jDD'),
                
                
            });
            if(new Date(next.selectedDate).setHours(0, 0, 0, 0) >= new Date(next.min).setHours(0, 0, 0, 0)){
                // alert(true);
               this.setState({
                    minError: false,
                    error: false
               })
            }
            // if(new Date(next.selectedDate) > new Date(this.props.min)){
            //     this.setState({
            //        minError: false
            //    })
            // }
            // if(next.selectedDate.getTime() > this.props.min.getTime()){
            //     this.setState({
            //         minError: false
            //     })
            // }

           
            // console.log('min',this.props.min);
        }
        // }else{
        //     this.setState({
        //         selectedDate: this.props.selectedDate === null ? moment(new Date()) : moment(next.selectedDate),
        //         selectedDateText: this.props.selectedDate === null ? '' : moment(next.selectedDate).locale('en').format('jYYYY/jMM/jDD'),
                
        //     })
        // }
        // if (newProps.selectedDate !== this.props.selectedDate) {
        //     console.log('ggg',  this.props.selectedDate);
           
          
        // alert(123);
        // console.log('GGG',moment(this.props.selectedDate));
            
            // this.setState({
            //     selectedDateText: this.props.selectedDateText
            // });
            // alert(1111);
           
    }
    handleChangeDate = date => {
        this.dateRef.current.state.isOpen = false;
      
        if(new Date(date).setHours(0, 0, 0, 0) >= new Date(this.props.min).setHours(0, 0, 0, 0)){
            // alert(true);
           this.setState({
            minError: false,
            error: false
           })
        }else{
            // alert(false);
            this.setState({
                minError: true,
                error: true
               })
        }
        this.setState({ 
            // selectedDate: date,
            // selectedDateText: moment(date).locale('en').format('jYYYY/jMM/jDD'),
            // error: false, // قرمز شدن بردر
            requiredError: false, //نباید خالی باشد
            syntaxError: false, //باید تاریخ جلالی باشد
         }, () => {
            this.props.handleOnChange(moment(date).locale('en').format('YYYY/MM/DD'));
         });
        // console.log('data._d', data._d);
    };

    handleChangeInput(e) {
        this.setState({ selectedDateText: e.target.value });
        
            if (e.target.value.length > 0) {
                this.setState({
                    error: false, // قرمز شدن بردر
                    requiredError: false, //نباید خالی باشد
                });
                if (!DatePickerRegex.test(e.target.value))
                    this.setState({ 
                            error: true, // قرمز شدن بردر
                            syntaxError: true, //باید تاریخ جلالی باشد
                            // minError: false,
                            // maxError: false
                        })
                else {
                    let _date = moment(e.target.value, 'jYYYY/jMM/jDD');
                    // console.log('_date', _date);
                    let _date2 = moment(_date).locale('en').format('YYYY/MM/DD');
                    // console.log('_date2', _date2);
                    // let date = moment(_date);
                    this.setState({
                        error: false, // قرمز شدن بردر
                        syntaxError: false, //باید تاریخ جلالی باشد
                        });
                        this.props.handleOnChange(_date2);   
                    // this.dateRef.current.handleChange(_date);
                }
            } else {
                if(this.props.isNull === true){
                    this.setState({
                        error: false, // قرمز شدن بردر
                        requiredError: false, //نباید خالی باشد
                        syntaxError: false, //باید تاریخ جلالی باشد
                        //  minError: false, 
                        //  maxError: false, 
                    });
                    this.props.handleOnChange(null); 
                    // this.dateRef.current.handleChange(null);
                } else {
                    this.setState({
                        error: true, // قرمز شدن بردر
                        requiredError: true, //نباید خالی باشد
                        syntaxError: false, //باید تاریخ جلالی باشد
                        //  minError: false, 
                        //  maxError: false, 
                    });
                    // let _date = moment(e.target.value, 'jYYYY/jMM/jDD');
                    // // console.log('_date', _date);
                    // let _date2 = moment(new Date()).locale('en').format('YYYY/MM/DD');
                    // this.props.handleOnChange(_date2); 
                    // this.dateRef.current.handleChange(moment(new Date(), 'jYYYY/jMM/jDD'));
                }
            }
        
    }

    componentDidMount(){}
    render() {
        
        // const { selectedDate } = this.state;
        const minDateFormat = jMoment(this.props.min).format('jYYYY/jMM/jDD');
        const maxDateFormat = jMoment(this.props.max).format('jYYYY/jMM/jDD');
        const minDateMessage = "مقدار ورودی تاریخ باید بیشتر از " + minDateFormat + " باشد"
        const maxDateMessage = "مقدار ورودی تاریخ باید کمتر از " + maxDateFormat + " باشد"
        // const dateFormat = "jYYYY/jMM/jDD";
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
                             {this.props.required ? <span class="required-star" >*</span> : ''}
                             {this.props.label}
                            </InputLabel>
                            <OutlinedInput
                                id="label"
                                className={classes.OutlineInput}
                                pattern="[0-9]*"
                                type="text"
                                value={this.state.selectedDateText}
                                // minDate={this.props.min}
                                // maxDate={this.props.max}
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
                                this.state.requiredError
                                 ?
                                    <i className="error-validation">{this.props.label} نباید خالی باشد </i>
                                 : ''
                            }
                            {
                                this.state.maxError 
                                    ?
                                    <p className="error-validation"> {maxDateMessage} </p>
                                    : ''
                            }
                            {
                                     this.state.minError 
                                    ?
                                    <p className="error-validation"> {minDateMessage}</p>
                                    : ''
                            }
                            {
                                this.state.syntaxError
                                    ?
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
NoDataDatePickerComponent.defaultProps = {
    min: moment("1919/01/01"),
    max: moment("2119/01/01"),
    label: "تاریخ",
    right: "1rem",
    selectedDate: new moment(),
    isNull: false,
}

const NoDataDatePicker = withStyles(styles)(NoDataDatePickerComponent)

export default NoDataDatePicker; 