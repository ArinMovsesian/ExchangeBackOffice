import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import styles from 'containers/layout/panel/theme';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ReactDOM from 'react-dom';
import InputLabel from '@material-ui/core/InputLabel';

function NumberFormatFunction(props) {
    const { inputRef, onChange, ...other } = props;
    return (

        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            format={props.format}
            thousandSeparator={props.isSeparator}
            mask={props.mask}
            prefix={props.prefix}
            style={{ direction: "ltr" }}
            // disabled={this.props.disabled}
           
        />
    )

}

NumberFormatFunction.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};


class NumberFormatComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            requiredError: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

    }
    componentWillReceiveProps(nextProps, nextContext) {

    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            if(prevProps.value !== this.props.value)
            this.setState({
                value: this.props.value,

            })
            else{
                this.setState({
                requiredError: this.props.required && (!this.state.value===''),
                error  :this.props.required && (!this.state.value==='')
    
                })

            }
        }
    }
    handleChange(event) {
    
        let requiredError = this.props.required && !event.target.value.length;
        if (requiredError) {
            this.setState({
                error: true,
                requiredError: true,
                value: event.target.value,
            });
        }
        else {
            this.setState(
                {
                    error: false,
                    requiredError: false,
                    value: event.target.value,
                }
            );
        }
    }
    handleKeyDown(event) {
        if (this.props.keyDownPress !== undefined){
            this.props.onKeyDownPress(event);
            if(event.keyCode===13)
            this.props.handleChange({ value: event.target.value, error: this.state.error });
            
        }
        
    }
    handleBlur(event) {
        this.props.handleChange({ value: event.target.value, error: this.state.error });

    }
    render() {
        const { classes } = this.props;

        switch (this.props.type) {
            case 'number':
                return (
                    <FormControl className={classes.formControl} xs={6} variant="outlined" error={this.state.error} fullWidth>
                        <InputLabel
                            className={classes.inputLabelOutLine}
                            ref={ref => {
                                this.labelRef = ReactDOM.findDOMNode(ref);
                            }}
                            htmlFor={this.props.id}>
                            {
                                this.props.required ?
                                    <span class="required-star" >*</span> : ''
                            }
                            {this.props.label}
                        </InputLabel>
                        <OutlinedInput
                            id={this.props.id}
                            disabled={this.props.disabled}
                            className={classes.OutlineInput}
                            test={this.props.label}
                            style={{ direction: "ltr" }}
                            value={this.state.value}
                            onChange={this.handleChange}
                            onKeyDown={this.handleKeyDown}
                            onBlur={this.handleBlur}
                            labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                            inputComponent={NumberFormatFunction}
                            inputProps={{
                                isSeparator: this.props.isSeparator,
                                format: this.props.format,
                                prefix: this.props.prefix,
                                mask: this.props.mask
                            }}
                        />
                        {
                            this.state.requiredError ?

                                <i className="error-validation">{this.props.label} نباید خالی باشد </i>
                                : ''
                        }
                    </FormControl>
                )
            case '':
                break;

        }
    }
};
NumberFormatComponent.defaultProps = {
    disabled: false
}
export default withStyles(styles)(NumberFormatComponent);