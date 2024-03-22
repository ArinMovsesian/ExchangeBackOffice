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
import GetBranchService from '../../../../../basicInformation/branch/services/GetBranchService';
import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete'
import GetPartiesService from '../../../../../personsAndCustomers/customers/customersList/services/GetPartiesService';
import GetTradeNumberService from '../../services/GetTradeNumberService';
import Columns from '../../constants/GetTradeNumberColumn';
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
import UpdateValueFee from './UpdateValueFeeComponent';
import UpdatePercentFee from './UpdatePercentFeeComponent';
import toastr from 'toastr';
import Fieldset from 'shared/components/fieldset/fieldset';
import { connect } from "react-redux";
import MenuItem from '@material-ui/core/MenuItem';

import {setUpdateRow} from 'store/actions';

class UpdateTradeNumberComponent extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      /* #region filter state */
      date: new Date(),
      openModal:this.props.open,
      feeType: 1,
      detail: {},
     
      /* #region list state */



      /* #endregion */

      /* #endregion */
    }
    /* #region bind */
    this.handleChange = this.handleChange.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.successGetDetail = this.successGetDetail.bind(this);
    this.setCloseModal = this.setCloseModal.bind(this);
    this.getDetail = this.getDetail.bind(this);
    this.afterSubmit = this.afterSubmit.bind(this);

    /* #endregion */



  }


componentDidUpdate(prevProps,prevState){
 
   console.log(this.props.open,prevProps.open)
  if(this.props.open!==prevProps.open)
  {
    this.setState({openModal:this.props.open})
    console.log(this.props.open)

    if(this.props.open){
    this.getDetail();

    }
  }
}
  componentDidMount() {

    this.getDropDownData();

  }
  /* #region get drop-Downs */

  getDropDownData() {


  }


  openEditModal() {

    this.setState({ openModal: true },this.getDetail)
  }



  /* #endregion */


  /* #region handle change filters */

  handleChange(value, name) {
    let item = value.value;

    this.setState({

      [name]: item
    })


  }


  afterSubmit(object){
 
    this.setState({ openModal: false },function(){
      this.props.setUpdateRow(object);
      this.props.setCloseModal();
    })
  }
  setCloseModal() {

   this.props.setCloseModal();
  }

  changeFeType(feeType) {
    this.setState({ feeType })
  }

  getDetail() {
  
    var params = {
      transactionId: this.props.dataItem.id
    }
    GetTradeNumberService.gtTradeNumberById(params, this.successGetDetail)
  }
  successGetDetail(response) {
    if (response.success)
      this.setState({ detail: response.result });
    else {
   this.props.setCloseModal();
     
    }
  }
  /* #endregion */

  render() {

    const { classes } = this.props
    console.log(classes)
    return (
      <React.Fragment>
           
    
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.openModal}
          onClose={this.setCloseModal}
        >


          {/* <TabList style={{
                        width: '600px',
                        padding: '1rem .5rem ',
                        height: 'auto',
                        outline: 'none',
                        position: 'absolute',
                        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
                        backgroundColor: '#fff',
                        top: '50%',
                        left: '45%',
                        marginLeft: '-300px',
                        marginTop: '-150px',
                    }} list={this.state.tabs}></TabList> */}
          <Paper style={{
            width: '70%',
            padding: '1rem .5rem ',
            height: 'auto',
            outline: 'none',
            position: 'absolute',
            boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
            backgroundColor: '#fff',
            top: '27%',
            left: "25%",
            marginLeft: '-300px',
            marginTop: '-150px',
          }}>
            <h3 >
              <FaIcon color="gray" name="fa fa-edit" size={20} />
              <span style={{ marginRight: '5px' }}>ویرایش کارمزد</span>

            </h3>
            <hr />
            {/* <Fieldset legend="اطلاعات معامله"> */}
            <Grid container spacing={8} className="no-margin">
              <Grid item md={4}>
              <b> عنوان مشتری : </b>
              <span>{this.state.detail.partyFullName}</span>

              </Grid>
           
              <Grid item md={4}>
              <b>نماد : </b>
              <span>{this.state.detail.fullProductName}</span>

              </Grid>
              <Grid item md={4}>
              <b>شماره اعلامیه : </b>
              <span>{this.state.detail.ticketNumber}</span>

              </Grid>
              <Grid item md={4}>
              <b>تعداد : </b>
              <span>{this.state.detail.volume}</span>

              </Grid>
              <Grid item md={4}>
              <b>تاریخ : </b>
              <span>{this.state.detail.dateJalali}</span>

              </Grid>
              <Grid item md={4}>
              <b>قیمت : </b>
              <span>{this.state.detail.price}</span>

              </Grid>
              
            </Grid>       
            {/* </Fieldset> */}
      
            <Grid container spacing={8} className="no-margin">
              <Grid item md={12}>

              </Grid>
              <Grid item md={5}></Grid>
              <Grid item md={4}>
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button type="button" onClick={() => this.changeFeType(1)} active="true" class={this.state.feeType === 1 ? " btn btn-info active" : "btn btn-info"}>کارمزد درصدی</button>
                  <button type="button" onClick={() => this.changeFeType(2)} class={this.state.feeType === 2 ? " btn btn-info active" : "btn btn-info"}>کارمزد مبلغی</button>
                </div>
              </Grid>
              <Grid item md={4}></Grid>
            </Grid>
            {this.state.feeType === 1 ? <UpdatePercentFee feeEditTypeList={this.props.feeEditTypeList} afterSubmit={this.afterSubmit} detail={this.state.detail} />
             :  <UpdateValueFee feeEditTypeList={this.props.feeEditTypeList} afterSubmit={this.afterSubmit} detail={this.state.detail}  />}
           

          </Paper>


        </Modal>

      </React.Fragment>

    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}
/*<-------------------connect------------->*/
const mapDispatchToProps = dispatch => {
  return {
      setUpdateRow: data => dispatch(setUpdateRow(data)),

  };

};
var UpdateTradeNumber=connect(mapStateToProps, mapDispatchToProps)( withStyles(styles)(UpdateTradeNumberComponent));
 export default UpdateTradeNumber


