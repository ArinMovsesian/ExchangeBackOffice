import React from 'react';
import ReactDOM from 'react-dom';
import InputLabel from '@material-ui/core/InputLabel';
import styles from 'containers/layout/panel/theme';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
// eslint-disable-next-line react/require-render-return
class InputFormComponent extends React.Component {
    constructor(props) {
        super(props);
        // console.log('Input:: ',props);
        this.state = {
            value: this.props.value,
            maxError: false && this.props.max,
            minError: false && this.props.min,
            requiredError: false && this.props.required,
            externalError:this.props.externalError
        }

        this.handleChangeInput = this.handleChangeInput.bind(this);
        // this.handleEnterPress = this.handleEnterPress.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props)
        {
            
            this.setState({
                value: this.props.value,
                maxError: false && this.props.max,
                minError: false && this.props.min,
                requiredError: false && this.props.required,
                externalError:this.props.externalError
            })
        }
         
    }

    handleChangeInput(event) {
       
      
        let requiredError = this.props.required && !event.target.value.length;
        let maxError = this.props.max != null && isNaN(this.props.min) && event.target.value > this.props.max;
        let minError = this.props.min != null && isNaN(this.props.min) && event.target.value < this.props.min;

        this.setState({ value: event.target.value });

        if (requiredError) {
            this.setState({ error: true });
            this.setState({ requiredError: true });
        }
        else {
            this.setState({ requiredError: false });

        }
        if (maxError) {
            this.setState({ maxError: true });
            this.setState({ error: true });
        }
        else {
            this.setState({ maxError: false });
        }
        if (minError) {

            this.setState({ minError: true });
        }
        else {

            this.setState({ minError: false });

        }
        this.setState({ error: minError || maxError || requiredError });
        // this.props.handleChange({ value: event.target.value, error: this.state.error });

    }
    handleBlur(event) {
        this.props.handleChange({ value: event.target.value, error: this.state.error });

    }
    // handleEnterPress(event) {

    //     if (this.props.keyPress)
    //         this.props.onKeyPress(event)

    // }

    handleKeyDown(event) {
        if (this.props.keyDownPress !== undefined){
      
            this.props.onKeyDownPress(event);
            if(event.keyCode===13)
            this.props.handleChange({ value: event.target.value, error: this.state.error });
            }
    }
    render() {
        const { classes } = this.props;
        return (
            <FormControl className={classes.formControl} xs={8} variant="outlined" error={this.state.error} fullWidth>
                <InputLabel
                    ref={ref => {
                        this.labelRef = ReactDOM.findDOMNode(ref);
                    }}
                    className={!this.state.error && !this.state.externalError ? classes.inputLabelOutLine : classes.inputLabelOutLineError}

                    htmlFor={this.props.id}
                >
                    {
                        this.props.required ?
                            <span class="required-star" >*</span> : ''
                    }
                    {this.props.label}
                </InputLabel>
                {this.props.keyDownPress ?
                
                <OutlinedInput autoComplete="off"
                    id="label"
                    className={classes.OutlineInput + (this.props.isLeftStartText ? ' direction-ltr' : '')}
                    value={this.state.value}
                    type={this.props.type}
                    onChange={this.handleChangeInput}
                    onBlur={this.handleBlur}
                    onKeyUp={this.handleKeyDown}
                    // onKeyPress={this.handleEnterPress}
                    labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                    multiline={this.props.isMultiLine}
                    disabled={this.props.disabled}
                    rows={3}
                    rowsMax={6}
                />:
                <OutlinedInput autoComplete="off"
                id="label"
                className={classes.OutlineInput + (this.props.isLeftStartText ? ' direction-ltr' : '')}
                value={this.state.value}
                type={this.props.type}
                onChange={this.handleChangeInput}
                onBlur={this.handleBlur}
                labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                multiline={this.props.isMultiLine}
                disabled={this.props.disabled}
                rows={3}
                rowsMax={6}
               
            />
            }
                       {
                    this.props.externalError ?

                        <i className="error-validation">{this.props.label} {this.props.externalErrorDescription} </i>
                        : ''


                }
                {
                    this.state.requiredError ?

                        <i className="error-validation">{this.props.label} نباید خالی باشد </i>
                        : ''


                }
                {
                    this.state.maxError ?

                        <p className="error-validation"> حداکثر مقدار {this.props.label} نباید از {this.props.max} بیشتر باشد </p>
                        : ''


                }
                {
                    this.state.minError ?

                        <p className="error-validation"> حداکثر مقدار {this.props.label} نباید از {this.props.min} کمتر باشد </p>
                        : ''


                }

            </FormControl>
        );


    }
}
InputFormComponent.defaultProps = {
    type: "text",
    min: null,
    max: null,
    disabled: false,
}
const Input = withStyles(styles)(InputFormComponent)

export default Input;