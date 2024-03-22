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
import toastr from 'toastr';
import Fieldset from 'shared/components/fieldset/fieldset';
import { connect } from "react-redux";
import MenuItem from '@material-ui/core/MenuItem';
import Form from 'shared/components/form/pureForm'
import { setUpdateRow } from 'store/actions';
import AssignrightacceptanceService from '../../services/AssignrightacceptanceService';

class AssignRightAcceptanceComponent extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      /* #region filter state */
      date: new Date(),
      openModal: false,
      feeType: 1,
      detail: {},
      feeEditType:{code:0,title:''}
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

  afterSubmit(object){
 
    this.setState({ openModal: false },function(){
      this.props.setUpdateRow(object);
      this.props.setCloseModal();

    })
  }

  componentDidUpdate(prevProps,prevState){
 
   if(this.props.open!==prevProps.open)
   {
     this.setState({openModal:this.props.open})
 
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

    this.setState({ openModal: true }, this.getDetail)
  }


  /* #endregion */


  /* #region handle change filters */

  handleChange(value, name) {
    let item = value.value;

    this.setState({

      [name]: item
    })


  }


 
  setCloseModal() {
    this.setState({ openModal: false })
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
            width: '42%',
            padding: '1rem .5rem ',
            height: 'auto',
            outline: 'none',
            position: 'absolute',
            boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
            backgroundColor: '#fff',
            top: '27%',
            left: "40%",
            marginLeft: '-300px',
            marginTop: '-150px',
          }}>
            <h3 >
              <FaIcon color="gray" name="fa fa-edit" size={20} />
              <span style={{ marginRight: '5px' }}>حق تقدم استفاده نشده</span>

            </h3>
            <hr />
            {/* <Fieldset legend="اطلاعات معامله"> */}
            <Grid container spacing={16} className="no-margin">
              <Grid item md={6}>
                <b> عنوان مشتری : </b>
                <span>{this.state.detail.partyFullName}</span>

              </Grid>

              <Grid item md={6}>
                <b>نماد : </b>
                <span>{this.state.detail.fullProductName}</span>

              </Grid>
              <Grid item md={6}>
                <b>شماره اعلامیه : </b>
                <span>{this.state.detail.ticketNumber}</span>

              </Grid>
              <Grid item md={6}>
                <b>تعداد : </b>
                <span>{this.state.detail.volume}</span>

              </Grid>
              <Grid item md={6}>
                <b>تاریخ : </b>
                <span>{this.state.detail.dateJalali}</span>

              </Grid>
              <Grid item md={6}>
                <b>قیمت : </b>
                <span>{this.state.detail.price}</span>

              </Grid>

            </Grid>
            {/* </Fieldset> */}
    <Form
    service={AssignrightacceptanceService.update}
    entity={{
      transactionId:this.state.detail.id ,
      acceptanceValue: 1000,
      editType: this.state.feeEditType.code

    }}
   
    {...this.props}
    {...this.state}
    cancelModal
    afterSubmit={()=>this.afterSubmit(this.state.detail)}
    >
  <Grid container spacing={16} className="no-margin">
              <Grid item md={5}>
                <Input label="قیمت اسمی" disabled={true} handleChange={(e) => this.handleChange(e, 'rayanBourseFee')} value="100" />
              </Grid>
              <Grid item md={1}>
              </Grid>
              <Grid item md={5}>
                <div className="k-rtl">
                  <DropDownComponent isFilterable {...this.props.feeEditTypeList}
                    handleChange={(value, name) => this.handleChange(value, name, false)}
                    value={this.state.feeEditType} />

                </div>
              </Grid>
            </Grid>

    </Form > 
    
          

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
var AssignRightAcceptance = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AssignRightAcceptanceComponent));
export default AssignRightAcceptance


