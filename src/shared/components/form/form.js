import React, { Component } from 'react';
import moment from 'moment';
import jMoment from 'moment-jalaali';
import Button from '@material-ui/core/Button';
import Input from 'shared/components/formInput/inputForm';
import BackTo from 'shared/components/backButton/backButton';
import toastr from 'toastr';
import styles from 'containers/layout/panel/theme';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import Submit from '../submitAction/actionSubmit'

class FromComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    
    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                <WrapperPaper />
                <Paper className="main-paper-container"  >
                    <form style={this.props.style} className={classes.form + "no-margin padding-right-20"}>
                      <div className={this.props.className} style={{paddingBottom:"2.5rem"}}>
                            {this.props.children}
                            </div>
                    </form>
                    <Submit
                                {...this.props}
                                {...this.state}
                              
                               />
                </Paper>
             
             
                      
            </React.Fragment>
        )
    }
}
FromComponent.defaultProps = {
    otherAction:[],
    SubmitTitle:"ثبت",
    style:{}
   }
const Form = withStyles(styles)(FromComponent);

export default Form;