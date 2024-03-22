import React from 'react';
import TextField from "@material-ui/core/TextField";
import {IntlProvider} from "@progress/kendo-react-intl";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import ReactDOM from "react-dom";
class TimePicker extends React.Component{
    render() {
        return(
            
            <TextField
                // id="time",
                label={this.props.required ? <React.Fragment><span style={{color: 'red'}}>*</span>{this.props.label}</React.Fragment>: this.props.label}
                type="time"
                value={this.props.value}
                inputProps={{
                    step: 300, // 5 min
                }}
                variant="outlined"
                autoFocus={false}
                fullWidth={true}
                margin="dense"
                onChange={this.props.changeHandle}
                error={this.props.error}
                disabled={this.props.disabled}
            />
        )
    }
}
TimePicker.defaultProps = {
    disabled: false
};
export default TimePicker;
