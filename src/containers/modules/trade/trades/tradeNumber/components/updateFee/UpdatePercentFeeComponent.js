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
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import UpdateTradeNumberService from '../../services/UpdateTradeNumberService';
class UpdatePercentFee extends React.Component {

  constructor(props) {
    super(props)
    console.log(this.props)

    this.state = {
      /* #region filter state */
      date: new Date(),
      openModal: false,
      feeEditType:{code:0,title:''},
      detail:{
        brokerFeePercentage:this.props.detail.brokerFeePercentage ? this.props.detail.brokerFeePercentage :0,
        csdFeePercentage:this.props.detail.csdFeePercentage ? this.props.detail.csdFeePercentage :0,
        rayanBourseFeePercentage:this.props.detail.rayanBourseFeePercentage ? this.props.detail.rayanBourseFeePercentage :0,
        seoFeePercentage:this.props.detail.seoFeePercentage ? this.props.detail.seoFeePercentage :0,
        rightToAccessFeePercentage:this.props.detail.rightToAccessFeePercentage ? this.props.detail.rightToAccessFeePercentage :0,
        taxPercentage:this.props.detail.taxPercentage ? this.props.detail.taxPercentage :0,
        securityTransactionId:this.props.detail.securityTransactionId ? this.props.detail.securityTransactionId :0,
        tseTmcFeePercentage:this.props.detail.tseTmcFeePercentage ? this.props.detail.tseTmcFeePercentage :0,
        tseFeePercentage:this.props.detail.tseFeePercentage ? this.props.detail.tseFeePercentage :0,
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
                feePercent: Number(this.state.detail.brokerFeePercentage),
                changed: this.state.detail.brokerFeePercentage != this.props.detail.brokerFeePercentage
              },
              csdFee: {
                feePercent: Number(this.state.detail.csdFeePercentage),
                changed: this.state.detail.csdFeePercentage != this.props.detail.csdFeePercentage
              },
              rayanBourseFee: {
                feePercent: Number(this.state.detail.rayanBourseFeePercentage),
                changed: this.state.detail.rayanBourseFeePercentage != this.props.detail.rayanBourseFeePercentage
              },
              tseFee: {
                feePercent: this.state.detail.tseFeePercentage,
                changed: this.state.detail.tseFeePercentage != this.props.detail.tseFeePercentage,
              },
              tseTmcFee: {
                feePercent: Number(this.state.detail.tseTmcFeePercentage),
                changed: this.state.detail.tseTmcFeePercentage != this.props.detail.tseTmcFeePercentage,
              },
              seoFee: {
                feePercent: Number(this.state.detail.seoFeePercentage),
                changed: this.state.detail.seoFeePercentage != this.props.detail.seoFeePercentage,
              },
              rightToAccessFee: {
                feePercent: Number(this.state.detail.rightToAccessFeePercentage),
                changed: this.state.detail.rightToAccessFeePercentage != this.props.detail.rightToAccessFeePercentage,
              },
              tax: {
                feePercent: Number(this.state.detail.taxPercentage),
                changed: this.state.detail.taxPercentage != this.props.detail.taxPercentage,
              },
              securityTransactionId: this.props.detail.id,
              feeType: 1,
              feeEditType: this.state.feeEditType.code
            }}

        >
          <Grid container spacing={8} className="no-margin">

            <Grid item md={4}>
              <Input   type="number"  label="بورس اوراق" handleChange={(e) => this.handleChange(e, 'tseFeePercentage')} value={this.state.detail.tseFeePercentage}  />
            </Grid>
            <Grid item md={4}>
              <Input type="number" label="کارگزاری" handleChange={(e) => this.handleChange(e, 'brokerFeePercentage')} value={this.state.detail.brokerFeePercentage} />
            </Grid>
            <Grid item md={4}>
              <Input type="number" label="سپرده گذاری" handleChange={(e) => this.handleChange(e, 'csdFeePercentage')} value={this.state.detail.csdFeePercentage}  />
            </Grid>
            <Grid item md={4}>
              <Input type="number" label="رایان بورس" handleChange={(e) => this.handleChange(e, 'rayanBourseFeePercentage')} value={this.state.detail.rayanBourseFeePercentage}  />
            </Grid>
            <Grid item md={4}>
              <Input type="number" label="حق نظارت سازمان" handleChange={(e) => this.handleChange(e, 'seoFeePercentage')} value={this.state.detail.seoFeePercentage}  />
            </Grid>
            <Grid item md={4}>
              <Input type="number" label="مدیریت فناوری" handleChange={(e) => this.handleChange(e, 'tseTmcFeePercentage')} value={this.state.detail.tseTmcFeePercentage}  />
            </Grid>
            <Grid item md={4}>
              <Input  label="خدمات دسترسی" handleChange={(e) => this.handleChange(e, 'rightToAccessFeePercentage')} value={this.state.detail.rightToAccessFeePercentage}  />
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

export default withStyles(styles)(UpdatePercentFee);
