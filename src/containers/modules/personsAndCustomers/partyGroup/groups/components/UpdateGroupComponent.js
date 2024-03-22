import React from 'react';

import Header from 'shared/components/stateHeader/stateHeader';
import Form from 'shared/components/form/form';
import Grid from '@material-ui/core/Grid';
import UpdateGroupService from '../services/UpdateGroupService';
import GetGroupTypesService from '../../groupTypes/services/GetGroupTypesService';
import Input from 'shared/components/formInput/inputForm';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class UpdateGroup extends React.Component {
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
            groupTypeId: 0,
            isActive: false,
            id:0,
            selectedTypeGroup: {}
        }

        this.initialData = this.initialData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCheck = this.handleChangeCheck.bind(this);
        this.getGroupTypes = this.getGroupTypes.bind(this);
    }

    componentDidMount() {
        if (this.props.location.state.id) {
            this.initialData(this.props.location.state);
        } else {
            this.props.history.push(this.props.back.path);
        }

    }
    initialData(data) {
        this.setState({
            title: data.title,
            isActive: data.status === 1,
            groupTypeId: data.groupTypeId,
            id : data.id
        }, () => {
            this.getGroupTypes();
        });
    }
    getGroupTypes() {
        GetGroupTypesService.getGroupTypes(null, (response) => {
            if (response.result) {
                response.result.map(item => {
                    if (item.id === this.state.groupTypeId) {
                        this.setState({
                            typeGroup: {
                                name: "selectedTypeGroup",
                                feild: "title",
                                label: "نوع گروه",
                                list: response.result
                            },
                            selectedTypeGroup : item
                        });
                    }

                })

            }
        })
    };

    handleChange(value, name) {
        let item = value.value
        this.setState({
            [name]: item
        })
    }
    handleChangeCheck(event) {
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
                        id : this.state.id,
                        title: this.state.title,
                        status: this.state.isActive ? 1 : 2,
                        type: this.state.selectedTypeGroup.id
                    }}
                    service={UpdateGroupService.updateGroup}
                    SubmitTitle={'ذخیره'}
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
                                        checked={this.state.isActive}
                                        onChange={this.handleChangeCheck}
                                        value="isActive"
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

export default UpdateGroup;