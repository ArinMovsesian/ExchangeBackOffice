import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import classNames from 'classnames';
import FaIcon from 'shared/components/Icon/Icon';
import Input from 'shared/components/formInput/inputForm'
import Header from 'shared/components/stateHeader/stateHeader'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes, { func } from 'prop-types';
import Autocomplete from 'shared/components/autocomplete/autocomplete';
import AddCostCenterService from '../services/CreateCostCenterService';
import GetCostCentersService from '../services/GetCostCentersService';
import Submit from 'shared/components/submitAction/actionSubmit';
import styles from '../../../../../layout/panel/theme'
import DropDownComponent from 'shared/components/dropDown/dropDown';
import toastr from 'toastr';
import Form from 'shared/components/form/form';

class AddCostCenter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCostCenter: {},
            costCenter: {},
            title: '',
            isLastLevel: false,
            
        }

        this.successGetParentCostCenters = this.successGetParentCostCenters.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCheck = this.handleChangeCheck.bind(this);
        this.handleCostCenter = this.handleCostCenter.bind(this);
        this.preSubmit = this.preSubmit.bind(this);

    }

    componentDidMount() {
        AddCostCenterService.getParentCostCenters(null, this.successGetParentCostCenters);
    }

    successGetParentCostCenters(response) {
            if(response.success){
                if (response.result && response.result.length > 0) {
                    this.setState({
                        costCenter: {
                            name: "selectedCostCenter",
                            feild: "title",
                            label: "عنوان مرکز هزینه",
                            type: "client",
                            list: response.result
                        }
                    })
                
            } 
            }
          
    }

    handleCostCenter(selectedItem) {
        this.setState({ parentId: selectedItem.id });

    };

    handleChange(value, name) {
        let item = value.value
        this.setState({
            [name]: item
        })
    };

    handleChangeCheck = name => (event) => {
        this.setState({
            [name]: event.target.checked
        })

    };

    preSubmit() {
        return {
            title: this.state.title,
            parentId: this.state.selectedCostCenter.id,
            isLastLevel: this.state.isLastLevel
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
                   
                    service={AddCostCenterService.saveCostCenter}
                    preSubmit={this.preSubmit}
                    className="form-height"
                   
                >
                    <Grid item md={12} justify="center">

                        <Grid item md={5} justify="center">
                            <Input label="عنوان" required handleChange={(e) => this.handleChange(e, 'title')} id="title" value={this.state.title} />
                        </Grid>


                        <Grid item md={4} justify="center">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.isLastLevel}
                                        onChange={this.handleChangeCheck('isLastLevel')}
                                        value="isLastLevel"
                                        color="primary"
                                    />
                                }
                                label="مرکز سطح آخر"
                            />
                        </Grid>
                        {
                            this.state.isLastLevel ?
                                <Grid item md={5}>
                                    <div className="k-rtl cost-center">
                                        <DropDownComponent {...this.state.costCenter}
                                            handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                                            value={this.state.selectedCostCenter} />
                                    </div>
                                </Grid>
                                : ''
                        }
                        {/* <br />

                            <Submit
                                {...this.props}
                                {...this.state}
                                entity={{
                                    title: this.state.title,
                                    parentId: this.state.selectedCostCenter.id,
                                    isLastLevel: this.state.isLastLevel
                                }}
                                service={AddCostCenterService.saveCostCenter}
                                 />
                            <br /> */}

                    </Grid>
                </Form>
            </React.Fragment>
        )
    }
}
AddCostCenter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddCostCenter);