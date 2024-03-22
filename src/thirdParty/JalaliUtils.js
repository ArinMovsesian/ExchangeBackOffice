import JalaliUtils from 'material-ui-pickers-jalali-utils';
import jMoment from 'moment-jalaali';
import moment from 'moment';

JalaliUtils.prototype.startOfMonth = function (date) {
    return date.clone().startOf("Jmonth");
  };
  function parse(value, format) {
    
    return jMoment(value, format).locale('fa');
  }
  JalaliUtils.prototype.parse=parse;
  JalaliUtils.prototype.isNull = function isNull(date) {
   
  //  if(date)
    return date.parsingFlags().nullInput;
    // else return false;
  };
  JalaliUtils.prototype.isAfter = function isAfter(date, value) {

    // if(date)
    return date.isAfter(value);
    // return false;
  };
  
  JalaliUtils.prototype.isBefore = function isBefore(date, value) {

    if(date)
    return date.isBefore(value);
    return false;
  };
  
  JalaliUtils.prototype.isValid = function isValid(date) {
    if(date)
    return date.isValid();
     return false
  };
  JalaliUtils.prototype.parse = (value, format) => {
    if (value.includes('_')) {
      return jMoment.invalid();
    }
}

export default JalaliUtils;