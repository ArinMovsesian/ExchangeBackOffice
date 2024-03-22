import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum'
import moment from 'moment';
// import './GetTradeNumberComponent.css';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
// import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete'
// import GetPartiesService from '../../../../personsAndCustomers/customers/customersList/services/GetPartiesService';
// import GetTradeNumberService from '../services/GetTradeNumberService';
// import Columns from '../constants/GetTradeNumberColumn';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import FaIcon from 'shared/components/Icon/Icon';
import classNames from 'classnames';
import styles from 'containers/layout/panel/theme';
import { th } from 'date-fns/esm/locale';
import TabList from 'shared/components/tab/tab';
import Form from 'shared/components/form/pureForm'
import UpdateTradeNumberService from '../../services/UpdateTradeNumberService';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';

class UpdateValueFee extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      /* #region filter state */
      date: new Date(),
      openModal: false,
      feeEditType:{code:0,title:''},
      detail:{
        brokerFee:this.props.detail.brokerFee ? this.props.detail.brokerFee :0,
        csdFee:this.props.detail.csdFee ? this.props.detail.csdFee :0,
        rayanBourseFee:this.props.detail.rayanBourseFee ? this.props.detail.rayanBourseFee :0,
        seoFee:this.props.detail.seoFee ? this.props.detail.seoFee :0,
        rightToAccessFee:this.props.detail.rightToAccessFee ? this.props.detail.rightToAccessFee :0,
        tax:this.props.detail.tax ? this.props.detail.tax :0,
        securityTransactionId:this.props.detail.securityTransactionId ? this.props.detail.securityTransactionId :0,
        tseTmcFee:this.props.detail.tseTmcFee ? this.props.detail.tseTmcFee :0,
        tseFee:this.props.detail.tseFee ? this.props.detail.tseFee :0,
      }
      /* #region list state */



      /* #endregion */

      /* #endregion */
    }
    /* #region bind */
    this.handleChange = this.handleChange.bind(this);

    /* #endregion */



  }

  componentDidUpdate(prevProps,prevState){
    if(prevProps.detail !== this.props.detail){
      this.setState({detail:JSON.parse(JSON.stringify(this.props.detail))});
 

  
    }
  }

  componentDidMount() {

    this.getDropDownData();

  }
  /* #region get drop-Downs */

  getDropDownData() {


  }


  openEditModal() {

    this.setState({ openModal: true })
  }


  /* #endregion */


  /* #region handle change filters */

  handleChange(value, name,isFromDetail=true) {
    let item = value.value;
    if(isFromDetail){
      let detail=this.state.detail;
      detail[name]=item;
      this.setState({
        detail:detail
      })
    }
    else{
      this.setState({[name]:item});
    }
 
    


  }

  /* #endregion */

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>

        <Form
          service={UpdateTradeNumberService.update}
          {...this.props}
          {...this.state}
          cancelModal
          afterSubmit={()=>this.props.afterSubmit(this.state.detail)}
          entity={
            {
              brokerFee: {
                feeValue: Number(this.state.detail.brokerFee),
                changed: this.state.detail.brokerFee != this.props.detail.brokerFee
              },
              csdFee: {
                feeValue: Number(this.state.detail.csdFee),
                changed: this.state.detail.csdFee != this.props.detail.csdFee
              },
              rayanBourseFee: {
                feeValue: Number(this.state.detail.rayanBourseFee),
                changed: this.state.detail.rayanBourseFee != this.props.detail.rayanBourseFee
              },
              tseFee: {
                feeValue: Number(this.state.detail.tseFee),
                changed: this.state.detail.tseFee != this.props.detail.tseFee,
              },
              tseTmcFee: {
                feeValue: Number(this.state.detail.tseTmcFee),
                changed: this.state.detail.tseTmcFee != this.props.detail.tseTmcFee,
              },
              seoFee: {
                feeValue: Number(this.state.detail.seoFee),
                changed: this.state.detail.seoFee != this.props.detail.seoFee,
              },
              rightToAccessFee: {
                feeValue: Number(this.state.detail.rightToAccessFee),
                changed: this.state.detail.rightToAccessFee != this.props.detail.rightToAccessFee,
              },
              tax: {
                feeValue: Number(this.state.detail.tax),
                changed: this.state.detail.tax != this.props.detail.tax,
              },
              securityTransactionId: this.props.detail.id,
              feeType: 2,
              feeEditType: this.state.feeEditType.code
            }}

        >
          <Grid container spacing={8} className="no-margin">

            <Grid item md={4}>
              <Input type="number"  label="بورس اوراق" handleChange={(e) => this.handleChange(e, 'tseFee')} value={this.state.detail.tseFee}  />
            </Grid>
            <Grid item md={4}>
              <Input type="number" label="کارگزاری" handleChange={(e) => this.handleChange(e, 'brokerFee')} value={this.state.detail.brokerFee} />
            </Grid>
            <Grid item md={4}>
              <Input type="number" label="سپرده گذاری" handleChange={(e) => this.handleChange(e, 'csdFee')} value={this.state.detail.csdFee}  />
            </Grid>
            <Grid item md={4}>
              <Input type="number" label="رایان بورس" handleChange={(e) => this.handleChange(e, 'rayanBourseFee')} value={this.state.detail.rayanBourseFee}  />
            </Grid>
            <Grid item md={4}>
              <Input type="number" label="حق نظارت سازمان" handleChange={(e) => this.handleChange(e, 'seoFee')} value={this.state.detail.seoFee}  />
            </Grid>
            <Grid item md={4}>
              <Input type="number" label="مدیریت فناوری" handleChange={(e) => this.handleChange(e, 'tseTmcFee')} value={this.state.detail.tseTmcFee}  />
            </Grid>
            <Grid item md={4}>
              <Input  label="خدمات دسترسی" handleChange={(e) => this.handleChange(e, 'rightToAccessFee')} value={this.state.detail.rightToAccessFee}  />
            </Grid>
            <Grid item md={2}>
                  <div className="k-rtl">
                    <DropDownComponent isFilterable {...this.props.feeEditTypeList}
                      handleChange={(value, name) => this.handleChange(value, name,false)}
                      value={this.state.feeEditType} />

                  </div>
                </Grid>
          </Grid>
        </Form>



      </React.Fragment>

    )
  }
}

export default  withStyles(styles)(UpdateValueFee);;
