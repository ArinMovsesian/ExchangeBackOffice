import React from 'react';
import ReactDOM from 'react-dom';
import InputLabel from '@material-ui/core/InputLabel';
import styles from 'containers/layout/panel/theme';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { DateInput, Calendar, DatePicker as KendoDatePicker, TimePicker, MultiViewCalendar, DateRangePicker } from '@progress/kendo-react-dateinputs';
import likelySubtags from 'cldr-core/supplemental/likelySubtags.json';
import currencyData from 'cldr-core/supplemental/currencyData.json';
import weekData from 'cldr-core/supplemental/weekData.json';
import faMessages from 'constants/fa.json';
import numbers from 'cldr-numbers-full/main/fa/numbers.json';
import caGregorian from 'cldr-dates-full/main/fa/ca-gregorian.json';
import dateFields from 'cldr-dates-full/main/fa/dateFields.json';
import timeZoneNames from 'cldr-dates-full/main/fa/timeZoneNames.json';
import persian from 'cldr-core/supplemental/calendarData'
import { IntlProvider, load, loadMessages, LocalizationProvider } from '@progress/kendo-react-intl';
load(
    likelySubtags,
    currencyData,
    weekData, numbers,
    caGregorian,
    dateFields,
    timeZoneNames,
    persian
);


loadMessages(faMessages, 'fa-FA');
// eslint-disable-next-line react/require-render-return
class DatePickerComponent extends React.Component{
   constructor(props){
       super(props);
       this.state={
       
        locale:'fa-FA',
        value:new Date()

       }


   }

  

   

   render(){
    const {classes}=this.props;
      return (
        <LocalizationProvider language={this.state.locale}>
      <IntlProvider locale={this.state.locale}>
                    <div className="example-wrapper row">
                       
                          
                        <div className="col-xs-12 col-md-6 example-col">
                            <p>DatePicker</p>
                            <KendoDatePicker />
                            <p>TimePicker</p>
                            
                        </div>
                    </div>
                </IntlProvider>
                </LocalizationProvider>
      );
      
       
   }
}
DatePickerComponent.defaultProps={
    type:"text"
}
const DatePicker=withStyles(styles)(DatePickerComponent)

export default DatePicker;