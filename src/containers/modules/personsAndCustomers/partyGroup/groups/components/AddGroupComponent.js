import React from 'react';

import Header from 'shared/components/stateHeader/stateHeader';
import Form from 'shared/components/form/form';
import Grid from '@material-ui/core/Grid';
import AddGroupService from '../services/AddGroupSetvice';
import GetGroupTypesService from '../../groupTypes/services/GetGroupTypesService';
import Input from 'shared/components/formInput/inputForm';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class AddGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            typeGroup: {
                name: "selectedTypeGroup",
                feild: "title",
                label: "نوع گروه",
                list: []
            },
            isActive : false,
            selectedTypeGroup :{}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCheck = this.handleChangeCheck.bind(this);
        this.getGroupTypes = this.getGroupTypes.bind(this);
    }

    componentDidMount(){
        this.getGroupTypes();
    }

    getGroupTypes(){
        GetGroupTypesService.getGroupTypes(null , (response) => {
            if(response.result){
                this.setState({
                    typeGroup: {
                        name: "selectedTypeGroup",
                        feild: "title",
                        label: "نوع گروه",
                        list: response.result
                    }
                });
            }
        })
    };

    handleChange(value, name) {
        let item = value.value
        this.setState({
            [name]: item
        })
    }
    handleChangeCheck(event){
        this.setState({
            isActive: event.target.checked
        });
    };

    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Form
                    {...this.props}
                    {...this.state}
                    entity={{
                        title: this.state.title,
                        status : this.state.isActive ? 1 : 2,
                        type : this.state.selectedTypeGroup.id
                    }}
                    service={AddGroupService.saveGroup}
                    isSave
                >
                    <Grid container spacing={8} >
                        <Grid item md={12}>
                            <Grid item md={5} >
                                <Input label="عنوان" required handleChange={(value) => this.handleChange(value, 'title')} id="title" value={this.state.title} />
                            </Grid>
                        </Grid>
                        <Grid item md={12}>
                            <Grid item md={5}>
                                <div className="k-rtl list-account-bank">
                                    <DropDownComponent {...this.state.typeGroup}
                                        handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                                        value={this.state.selectedTypeGroup} />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item md={4} justify="center">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.isLastLevel}
                                        onChange={this.handleChangeCheck}
                                        value="isLastLevel"
                                        color="primary"
                                    />
                                }
                                label="فعال"
                            />
                        </Grid>
                    </Grid>

                </Form>
            </React.Fragment>
        )
    }
}

export default AddGroup;