import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Form from '../../../../../../shared/components/form/form';
import AddVouchersService from '../services/AddVouchersService';
import { Grid } from '@material-ui/core';
class UpdateVoucher extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      
    }
  }
  render() {
    return (
      <React.Fragment>
        <Header {...this.props} />
        <Form
        service={AddVouchersService}
        >
       <Grid>
           
       </Grid>
        </Form>
        
      </React.Fragment>

    )
  }
}
export default UpdateVoucher;
