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
      mask={['(', 'I', 'R', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/]}
      // placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};



class IBANInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
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
  handleBlur(event){
    this.props.handleChange({ value: event.target.value.replace(/[{()}]/g, '').replace(/ /g, '') });
  }
  render() {
    const { classes } = this.props;
    return (

      <FormControl className={classes.formControl} variant="outlined" fullWidth>
        <InputLabel
          className={classes.inputLabelOutLine}
          ref={ref => {
            this.labelRef = ReactDOM.findDOMNode(ref);
          }} htmlFor="formatted-text-mask-input">{this.props.label}


        </InputLabel>
        <OutlinedInput
          value={this.state.value}
          className={classes.OutlineInput}
          style={{ direction: "ltr" }}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
          inputComponent={TextMaskCustom}
          disabled={this.props.disabled}
        />
      </FormControl>

    )
  }

}
IBANInput.defaultProps = {
  type: "text",
  label: "َشماره شبا",
  disabled: false,
}
const IBAN = withStyles(styles)(IBANInput)
export default IBAN;