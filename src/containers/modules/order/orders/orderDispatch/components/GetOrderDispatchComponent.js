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
import kendo from '@progress/kendo-ui';
import moment from 'moment';
import './GetOrderDispatchComponent.css';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete'
import GetPartiesService from '../../../../personsAndCustomers/customers/customersList/services/GetPartiesService';
import { searchProducts } from '../../../../../../services/getProducts';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import GetAllProductsPaging from "../../../../../../services/getProducts";
import { productTemplate, productHeaderTemplate } from 'constants/autoCompleteTemplate';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import '@progress/kendo-ui';
import GetOrdersStatusService from '../services/GetOrderDispatchService';
import TabList from 'shared/components/tab/tab';
import GetOrderWaitingList from './GetOrderWaitingListComponent';
import GetOrderOngoingList from './GetOrderOngoingListComponent';
const $ = require("jquery");

class GetOrderDispatch extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      /* #region filter state */
   
      tabList :[
        { label: "فهرست انتظار", key: 1, id: 1, component: <GetOrderWaitingList   displayName="GetOrderWaitingList"    {...props}/> },
        { label: "در دست اقدام", key: 2, id: 2, component: <GetOrderOngoingList    displayName="GetOrderOngoingList"    {...props}/> },
    ]
      /* #region list state */

  
     

      
      /* #endregion */

      /* #endregion */
    };
    /* #region bind */

    

    /* #endregion */



  }

  componentDidMount() {

    this.getDropDownData();

  }
  /* #region get drop-Downs */

  getDropDownData() {

  }


  



  

  getBranchList() {
    GetBranchService.getBranchesByFilter(null, response => DropDownListDataProvider(this, "branchList", response))
  }

  getOrderType() {
    GetEnum('securityexchange', response => DropDownListDataProvider(this, "simpleSecurityExchangeList", response))

  }

  getOrderState(){
    GetEnum('vouchermasterstate', response => DropDownListDataProvider(this, "orderStateList", response))

    
     
  }

 


  /* #endregion */


  /* #region handle change filters */




  render() {

    return (
      <React.Fragment>
        <Header {...this.props} />
        <br />
                <TabList updatePerChange style={{ height: 535, marginTop: -15 }}  list={this.state.tabList}></TabList>
      </React.Fragment>

    )
  }
}

export default GetOrderDispatch;
