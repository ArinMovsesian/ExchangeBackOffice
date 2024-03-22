import React, { Component } from 'react';
import moment from 'moment';
import jMoment from 'moment-jalaali';
import Input from 'shared/components/formInput/inputForm'

import {
  TimePicker,
  DateTimePicker,
  DatePicker,
  InlineDatePicker,

  MuiPickersUtilsProvider,
} from 'material-ui-pickers';


class PersianDatePicker extends Component {
  constructor(props) {
    super(props)

    this.handleDateChange = this.handleDateChange.bind(this)
    this.state = {
      selectedDate: new moment()
    };


  }

  componentDidUpdate() {
   
  }
  handleDateChange = date => {
      
    this.setState({ selectedDate: date });
    console.log(moment(date).format('jYYYY/jMM/jDD').toString())
    this.props.handleOnChange(date);
  };

 
  render() {
    const { selectedDate } = this.state;
    const minDate = moment(this.props.min).add(1, 'days');
    const maxDate = moment(this.props.max).add(-1, 'days');
    const minDateFormat = jMoment(this.props.min).format('jYYYY/jMM/jDD');
    const maxDateFormat = jMoment(this.props.max).format('YYYY/MM/DD');
    const minDateMessage = "مقدار ورودی تاریخ باید بیشتر از " + minDateFormat + " باشد"
    const maxDateMessage = "مقدار ورودی تاریخ باید کمتر از " + maxDateFormat + " باشد"
    
    const { classes } = this.props;
    return (


      <div className="container-x">
        
    <input  type="text" />
        <InlineDatePicker
          // onlyCalendar
          showTodayButton
          allowKeyboardControl
          keyboard
          variant="outlined"
          label={this.props.label}
          okLabel="تأیید"
          cancelLabel="انصراف"
          clearLabel="پاک کردن"
          labelFunc={date => date.format('jYYYY/jMM/jDD')}
          value={selectedDate}
          keepCharPositions={true}
          // mask={[/\d/, /\d/, '/', /\d/, /\d/,'/',/\d/, /\d/, /\d/, /\d/]}
          formatDate={(date) => jMoment(new Date(),'jMM-jDD-jYYYY')}
          onChange={this.handleDateChange}
          placeholderChar="\u2000"
          inputProps={{ onBlur: console.log("kjkj") }}
          animateYearScrolling={true}
          // format="jYYYY/jMM/jDD"
          name={this.state.name}
          minDate={minDate}
          maxDate={maxDate}
          invalidDateMessage='فرمت تاریخ غلط است'
          minDateMessage={minDateMessage}
          maxDateMessage={maxDateMessage}
   
        />
      </div>


    );
  }
}
PersianDatePicker.defaultProps = {
  min: moment("1900/01/01"),
  max: moment("2100/12/01"),
  label:"تاریخ"

}
export default PersianDatePicker;
