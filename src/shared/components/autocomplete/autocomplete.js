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
import deburr from 'lodash/deburr';

const styles = theme => ({
    container: {
        position: 'relative',
    },
    formControl: {
        margin: 8,
        fontFamily:'isw',

      },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: '5px',
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
    fontFamilyLabel: {
        '& label , & input': {
            fontFamily: 'isw !important'
        }
    }
});
class Autocomplete extends React.Component {
    constructor(props) {
        super(props);
   
        this.state = {
            listData :this.props.data,
            suggestions: [],
            value : '',
            title: this.props.title,
            selected:''
        }
       
        this.handleChange = this.handleChange.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.renderInputComponent = this.renderInputComponent.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind(this);
        this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind(this);

    }
    componentDidMount(){
    }
    componentDidUpdate(){
       
    };

    handleChange = name => (event, { newValue }) => {
      
        this.setState({
            [name]: newValue
        });
    };

    getSuggestions(value) {
        const inputValue = deburr(value.trim()).toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;
        
        return inputLength === 0
            ? []
            : this.props.data.filter(suggestion => {
              
                const keep =
                    count < 5 && suggestion[this.state.title].slice(0, inputLength).toLowerCase() === inputValue;
                    
                if (keep) {
                    count += 1;
                }

               
                return keep;
            });
    }

    handleSuggestionsFetchRequested = ({ value }) => {
       
        this.setState({ suggestions: this.getSuggestions(value)});
        
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    getSuggestionValue(suggestion) {
       this.props.handleChange(this.state.suggestions[0]);
        return suggestion[this.state.title];
        
    };

    renderSuggestion(suggestion, { query, isHighlighted }) {
        const matches = match(suggestion[this.state.title], query);
        const parts = parse(suggestion[this.state.title], matches);

        return (
            <MenuItem selected={isHighlighted} component="div">
                <div>
                    {parts.map((part, index) =>
                        part.highlight ? (
                            <span key={String(index)} style={{ fontWeight: 500, color: "#2196f3" }}>
                                {part.text}
                            </span>
                        ) : (
                                <strong key={String(index)} style={{ fontWeight: 300 }}>
                                    {part.text}
                                </strong>
                            ),
                    )}
                </div>
            </MenuItem>
        );
    }

    renderInputComponent(inputProps) {
        const { classes, inputRef = () => { }, ref, ...other } = inputProps;
        return (
         
          
            <TextField
                label={""}
                fullWidth
                variant="outlined"
                className={classNames(classes.fontFamilyLabel , 'transform-label')}
                InputProps={{
                    inputRef: node => {
                        ref(node);
                        inputRef(node);
                    },
                    classes: {
                        input: classes.input,
                    },
                }}
                {...other}
            />
        
        );
        
    }

    render() {
        const { classes } = this.props;
        
        const autosuggestProps = {
            renderInputComponent: this.renderInputComponent,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue: this.getSuggestionValue,
            renderSuggestion: this.renderSuggestion,
        };

        return (
            <div className={classes.formcontrol}>
            <Autosuggest
                {...autosuggestProps}
                inputProps={{
                    classes,
                    placeholder:this.props.placeHolder,
                    value: this.state.value,
                    onChange: this.handleChange('value'),
                }}

                theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                    
                }}
                renderSuggestionsContainer={options => (
                    <Paper {...options.containerProps} square>
                        {options.children}
                    </Paper>
                )}
            />
            </div>

        )
    }
}

Autocomplete.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Autocomplete);