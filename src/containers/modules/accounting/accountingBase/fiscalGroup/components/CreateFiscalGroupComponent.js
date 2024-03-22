/* #region imports */
import React from 'react';
import toastr from 'toastr';
import classNames from 'classnames';
import FaIcon from '../../../../../../shared/components/Icon/Icon';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import styles from 'containers/layout/panel/theme';
import { withStyles } from '@material-ui/core/styles';
import AddFiscalGroupService from '../services/CreateFiscalGroupService';
import Button from '@material-ui/core/Button';
import Input from 'shared/components/formInput/inputForm';
import BackTo from 'shared/components/backButton/backButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Submit from 'shared/components/submitAction/actionSubmit'; 
import Header from 'shared/components/stateHeader/stateHeader';
import Form from 'shared/components/form/form';
/* #endregion */

   
class AddFiscalGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            error: true,
            reRender : false,
           
        };
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.preSubmit = this.preSubmit.bind(this);
        
    }
    componentDidMount() {
    }

    handleChangeTitle(event) {
        this.setState({ 
            title: event.value 
        });
    }

    preSubmit() {
        return {
            title: this.state.title
        }
    };

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <WrapperPaper />

                <Header {...this.props} />
                <Form
                    {...this.props}
                    {...this.state}
                    service={AddFiscalGroupService.saveFiscalGroup}
                    preSubmit={this.preSubmit}
                    className="form-height"
                    heightForm={'22%'}
                >
                <Grid item xs={3}>
                        {/* <form className={classes.form}> */}
                            <Input label="عنوان گروه مالی" required  handleChange={this.handleChangeTitle} id="title" value={this.state.title} />
                            {/* <br />
                           
                                     <Submit 
                                     {...this.props} 
                                     {...this.state}
                                     entity={{title: this.state.title}}
                                     service={AddFiscalGroupService.saveFiscalGroup}
                                     isSave />
                        </form>
                        <br /> */}

                    </Grid>
                </Form>
              

                {/* <Paper className="main-paper-container">
                  
                    
                </Paper> */}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AddFiscalGroup);
