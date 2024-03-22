import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import classNames from 'classnames';
import Input from 'shared/components/formInput/inputForm';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import Fieldset from 'shared/components/fieldset/fieldset';
import toastr from 'toastr';
import Header from 'shared/components/stateHeader/stateHeader';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import AutoCompleteComplete from 'shared/components/dropDown/autocomplete';
import IBAN from 'shared/components/iban/textMask';
import styles from 'containers/layout/panel/theme';
import Button from '@material-ui/core/Button';
import Submit from 'shared/components/submitAction/actionSubmit';
import Form from 'shared/components/form/form';
import GetEnum from 'services/getEnum';
import AddServicesService from '../services/AddServicesService';
class AddServicesComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            comment: ''
        }

    }

   
    componentDidMount() {
      
    }
    handleChange = (value, name) => {
        console.log([name],value.value);
        let item = value.value;
        this.setState({
            [name]: item,
        })
    }
    render() {
        // const { classes } = this.props;
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Form
                    {...this.props}
                    {...this.state}
                    entity={
                        {
                           title: this.state.title,
                           description: this.state.comment,
                        }
                    }
                    service={AddServicesService.saveserviceMethod}
                    className="form-height"
                    // SubmitTitle={'ذخیره و تکمیل اطلاعات'}
                    // otherAction={[
                    //     {
                    //         color: "#43a047",
                    //         title: 'ذخیره و ثبت مشتری جدید',
                    //         action: {
                    //             isSubmit: true,
                    //             method: this.refresh
                    //         }
                    //     }
                    // ]}
                >
                    <Fieldset legend={'اطلاعات'}>

                        <Grid container spacing={8}>
                            <Grid item md={6}>
                                <Input label="عنوان" handleChange={(e) => this.handleChange(e, 'title')} value={this.state.title}  required/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={6}>
                                <Input label="توضیحات" handleChange={(e) => this.handleChange(e, 'comment')} value={this.state.comment} isMultiLine={true} />
                            </Grid>
                        </Grid>
                    </Fieldset>
                </Form>
            </React.Fragment>
        )
    }
}
AddServicesComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddServicesComponent);