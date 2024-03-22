import React from 'react';
import MaskedInput from 'react-text-mask';
import ReactDOM from 'react-dom';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import styles from 'containers/layout/panel/theme';
import OutlinedInput from '@material-ui/core/OutlinedInput';


function TextMaskCustom(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[/\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, ' ', /\d/]}
      // placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};



class NationalCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      requiredError: false,
      correct: true,
      error: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        value: this.props.value
      })
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });

  }

  nationalCodeValidation(nationalCode) {
    if (nationalCode.length === 10) {
      if (nationalCode === "1111111111" ||
        nationalCode === "0000000000" ||
        nationalCode === "2222222222" ||
        nationalCode === "3333333333" ||
        nationalCode === "4444444444" ||
        nationalCode === "5555555555" ||
        nationalCode === "6666666666" ||
        nationalCode === "7777777777" ||
        nationalCode === "8888888888" ||
        nationalCode === "9999999999") {
        return false;
      }
      let c = parseInt(nationalCode.charAt(9));
      let n = parseInt(nationalCode.charAt(0)) * 10 +
        parseInt(nationalCode.charAt(1)) * 9 +
        parseInt(nationalCode.charAt(2)) * 8 +
        parseInt(nationalCode.charAt(3)) * 7 +
        parseInt(nationalCode.charAt(4)) * 6 +
        parseInt(nationalCode.charAt(5)) * 5 +
        parseInt(nationalCode.charAt(6)) * 4 +
        parseInt(nationalCode.charAt(7)) * 3 +
        parseInt(nationalCode.charAt(8)) * 2;
      let r = n - parseInt(n / 11) * 11;
      if ((r === 0 && r === c) || (r === 1 && c === 1) || (r > 1 && c === 11 - r)) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }


  handleBlur(event) {
    let nationalcode = event.target.value.replace(/[{()}]/g, '').replace(/_/g, '').replace(/ /g, '');
    if (this.props.require && (nationalcode.length < 1 || nationalcode === undefined))
      this.setState({ requiredError: true, error: true, correct: true });
    else {
      this.setState({ correct: this.nationalCodeValidation(nationalcode), error: !this.nationalCodeValidation(nationalcode), requiredError: false })
      this.props.handleChange({ value: nationalcode });
    }
  }
  render() {
    const { classes } = this.props;
    return (

      <FormControl error={this.state.error} className={classes.formControl} variant="outlined" fullWidth>
        <InputLabel
          className={classes.inputLabelOutLine + ' rightAlign'}
          ref={ref => {
            this.labelRef = ReactDOM.findDOMNode(ref);
          }} htmlFor="formatted-text-mask-input">
          {this.props.require ?
            <span class="required-star" >*</span> : ''
          }

          {this.props.label}


        </InputLabel>
        <OutlinedInput
          value={this.state.value}
          className={classes.OutlineInput + (this.props.isLeftStartText ? ' direction-ltr' : '')}
          style={{ direction: "ltr", textAlign: 'right' }}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
          disabled={this.props.isDisabled}
          inputComponent={TextMaskCustom}
        />
        {
          this.state.requiredError ?

            <i className="error-validation">{this.props.label} نباید خالی باشد </i>
            : ''


        }
        {
          !this.state.correct ?

            <p className="error-validation"> {this.props.label} اشتباه است </p>
            : ''


        }

      </FormControl>

    )
  }

}
NationalCode.defaultProps = {
  type: "text",
  require: true,
  label: "کد ملی"
}
export default withStyles(styles)(NationalCode)
