import React , {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, CircularProgress } from '@material-ui/core';

const styles = theme => ({
    progress: {
      margin: theme.spacing.unit * 2,
    },
  });

class Loading extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const { classes } = this.props;
        return (
            <div  className="flex flex-1 flex-col items-center justify-center height-page loading-page">
                <Typography className="text-20 mb-16 text-loading-bar" >لطفا تأمل فرمایید ...</Typography>
                <CircularProgress className={classes.progress + " progress-loading-bar"} />
            </div>
        );
    
    }
    
};


Loading.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Loading);
