import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import styles from 'containers/layout/panel/theme'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
function ThousandSeperator(props){
    const { inputRef, onChange, ...other } = props;
    return (
        <NumberFormat displayType={'text'} thousandSeparator={true} />
    )
}

class NumberFormatComponent extends React.Component {
 

    render() {
        const { classes } = this.props;
        
       return (
        <FormControl className={classes.formControl}>
        <InputLabel htmlFor="formatted-text-mask-input">{this.props.label}</InputLabel>
        <OutlinedInput
        value={this.state.value}

        style={{direction:"ltr"}}
        onChange={this.handleChange}
        disabled={this.props.disabled}
        inputComponent={ThousandSeperator}
      />
      </FormControl>
       )
       
    }
};

NumberFormatComponent.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(NumberFormatComponent);