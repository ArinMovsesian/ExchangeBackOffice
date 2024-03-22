import React from 'react';

import Header from 'shared/components/stateHeader/stateHeader';
import Form from 'shared/components/form/form';
import Grid from '@material-ui/core/Grid';
import AddGroupTypeSetvice from '../services/AddGroupTypeSetvice';
import Input from 'shared/components/formInput/inputForm';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class AddGroupType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            canDuplicate: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCheck = this.handleChangeCheck.bind(this);
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
                        title: this.state.title,
                        canDuplicate: this.state.canDuplicate
                    }}
                    service={AddGroupTypeSetvice.saveGroupType}
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

export default AddGroupType;