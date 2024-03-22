import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import CancelIcon from '@material-ui/icons/Cancel';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/styles';
import Control from './dependency/controlComponent';
import Menue from './dependency/menueComponent';
import MultiValue from './dependency/multiValueComponent';
import NoOptionsMessage from './dependency/noOptionMessageComponent';
import Option from './dependency/optionComponent';
import Placeholder from './dependency/placeholderComponent';
import SingleValue from './dependency/singleValueComponent';
import ValueContainer from './dependency/valueContainerComponent'
import styles from './dependency/styles';
import Select from 'react-select';
const components = {
  Control,
  Menue,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};
class MuiMultiSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listData: this.props.data,
      suggestions: [],
      value: '',
      title: this.props.title,
      selected: ''

    }

    this.handleChangeSingle = this.handleChangeSingle.bind(this);

  }
  componentDidMount() {
  }
  componentDidUpdate() {

  };


  handleChangeSingle(value) {
    
    this.setState({selected:value})
  }


  render() {
   
    const { classes } = this.props;
    // const theme = useTheme();
    // const [multi, setMulti] = React.useState(null);



    return (

      <Select
        classes={classes}
        variant="outlined"
        options={this.props.data}
        components={components}
        value={this.state.selected}
        onChange={this.handleChangeSingle}
        placeholder={this.props.placeholder} 
         getOptionLabel ={(option)=>option[this.props.label]}
        getOptionValue ={(option)=>option[this.props.value]}      />
        

    )
  }

}

MuiMultiSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(MuiMultiSelect);