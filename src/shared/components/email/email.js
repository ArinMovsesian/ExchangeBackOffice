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
class EmailComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            correct:true,
            requiredError: false && this.props.required
        }

        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleEnterPress = this.handleEnterPress.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props)
            this.setState({
                value: this.props.value,
                maxError: false && this.props.max,
                minError: false && this.props.min,
                requiredError: false && this.props.required
            })
    }

     validateEmail(email) {
        
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase()) || email.length===0 ||email===undefined;
    }

    handleChangeInput(event) {
        
       
      
        this.setState({ value: event.target.value });

       
        // this.props.handleChange({ value: event.target.value, error: this.state.error });

    }
    handleBlur(event){
        let requiredError = this.props.required && !event.target.value.length;
        let correct=this.validateEmail(event.target.value)
        if (requiredError) {
           
            this.setState({ requiredError: true,error:true });
        }
        else {
            this.setState({ requiredError: false,correct:correct,error:!correct });

        }
      
      
        this.props.handleChange({ value: event.target.value, error: this.state.error });
     
    }
    handleEnterPress(event) {
        // if (event.key === 'Enter') {
        //     event.preventDefault();
        //     this.props.action();
        // }
    }

    render() {

        const { classes } = this.props;
        return (
            <FormControl className={classes.formControl} xs={8} variant="outlined" error={this.state.error} fullWidth>
                <InputLabel
                    ref={ref => {
                        this.labelRef = ReactDOM.findDOMNode(ref);
                    }}
                    className={!this.state.error ? classes.inputLabelOutLine : classes.inputLabelOutLineError}

                    htmlFor={this.props.id}
                >
                    {this.props.label}
                </InputLabel>
                <OutlinedInput
                    id="label"
                    className={classes.OutlineInput + (this.props.isLeftStartText ? ' direction-ltr' : '') }
                    style={{direction:'ltr'}}
                    value={this.state.value}
                    type="email"
                    onChange={this.handleChangeInput}
                    onBlur={this.handleBlur}
                    onKeyPress={this.handleEnterPress}
                    labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                    multiline={this.props.isMultiLine}
                    rows={3}
                    rowsMax={6}
                    disabled={this.props.disabled}
                />
                {
                    this.state.requiredError ?

                        <i className="error-validation">{this.props.label} نباید خالی باشد </i>
                        : ''


                }
               {
                    !this.state.correct ?

                        <i className="error-validation">{this.props.label} اشتباه است </i>
                        : ''


                }
            </FormControl>
        );


    }
}
EmailComponent.defaultProps = {
    require:false,
    label:'پست الکترونیک',
    disabled: false,
    
}
const Email = withStyles(styles)(EmailComponent)

export default Email;