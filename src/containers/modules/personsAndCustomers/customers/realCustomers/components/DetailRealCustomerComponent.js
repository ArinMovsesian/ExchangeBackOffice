import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from '../../../../../layout/panel/theme';

class DetailRealCustomer extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
<div>سلام</div>

        )
    }
}

DetailRealCustomer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailRealCustomer);