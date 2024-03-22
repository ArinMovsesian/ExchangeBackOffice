import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class RadioButtons extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
                <React.Fragment>
                    {
                        this.props.list.map(
                            (value) => {
                                console.log('AAAA', typeof this.props.defaultValue,  value.code);
                                return(
                                    <React.Fragment>
                                    <span style={{marginRight: '10px'}}>{value.title}</span>
                                    <Radio
                                        checked={this.props.defaultValue == value.code}
                                        onChange={this.props.radioH}
                                        value={value.code}
                                        color="default"
                                    />
                                    </React.Fragment>
                                )
                            }
                        )
                    }
                </React.Fragment>
        );
    }
}
RadioButtons.defaultProps = {

}
export default RadioButtons;