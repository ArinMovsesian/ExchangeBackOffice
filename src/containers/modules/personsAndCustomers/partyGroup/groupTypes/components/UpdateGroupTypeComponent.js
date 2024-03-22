import React from 'react';

import Header from 'shared/components/stateHeader/stateHeader';
import Form from 'shared/components/form/form';
import Grid from '@material-ui/core/Grid';
import UpdateGroupTypeService from '../services/UpdateGroupTypeService';
import Input from 'shared/components/formInput/inputForm';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class UpdateGroupType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            canDuplicate: false,
            id: 0
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCheck = this.handleChangeCheck.bind(this);
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
            canDuplicate: data.canDuplicate,
            id: data.id
        });
    }

    handleChange(value, name) {
        let item = value.value
        this.setState({
            [name]: item
        })
    }
    handleChangeCheck(value, name) {
        this.setState({
            [name]: value.target.checked
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
                        id: this.state.id,
                        title: this.state.title,
                        canDuplicate: this.state.canDuplicate
                    }}
                    service={UpdateGroupTypeService.updateGroupType}
                    SubmitTitle={'ذخیره'}
                    isSave
                >
                    <Grid container spacing={8} >
                        <Grid item md={12}>
                            <Grid item md={5} >
                                <Input label="عنوان" required handleChange={(value) => this.handleChange(value, 'title')} id="title" value={this.state.title} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} >
                        <Grid item md={2}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.canDuplicate}
                                        onChange={(value) => this.handleChangeCheck(value, 'canDuplicate')}
                                        value="canDuplicate"
                                        color="primary"
                                    />
                                }
                                label="تکراری"
                            />
                        </Grid>
                    </Grid>

                </Form>
            </React.Fragment >
        )
    }
}

export default UpdateGroupType;