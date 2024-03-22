import React from 'react';
import moment from 'moment';
import AddCustomersRelation from "../services/CreatePartyRoleService";
import styles from '../../../../../layout/panel/theme';
import Header from '../../../../../../shared/components/stateHeader/stateHeader';
import Form from '../../../../../../shared/components/form/form';
import { Grid, withStyles } from '@material-ui/core';
import GetPartiesService from "../../customersList/services/GetPartiesService";
import DropDownComponent from 'shared/components/dropDown/dropDown';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import AutoCompleteComponent from '../../../../../../shared/components/dropDown/autocomplete';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import GetPartyRoleService from "../services/GetPartyRoleService";
import CreatePartyRoleService from '../services/CreatePartyRoleService';
import NoDataDatePicker from 'shared/components/persianDatePicker/noDataDatePicker';
class CreatePartyRoleComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جتسجوی مشتری اصلی بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
                list: []
            },
            selectedParty: {  fullName : ''},
            relation: {
                name: "customerRelation",
                feild: "captionFA",
                label: "نقش",
                list: []
            },
            customerRelation: {},
            validUntil:null,
   
        };
        this.handleValidUntil = this.handleValidUntil.bind(this);
        this.handlePartyChange = this.handlePartyChange.bind(this);
        this.handleDropDownChange = this.handleDropDownChange.bind(this);
    }
    componentDidMount() {
        // console.log('bb', this.state.birthDate);
        this.getDropDownLists();
        // let today = new Date().toISOString()
        // console.log('today',today);

    }
    getDropDownLists = () =>{
     GetPartyRoleService.getSimplePersonalityRolesMethod(null, (response) => DropDownListDataProvider(this,"relation",response));
    
    };
    handleDropDownChange = (item) => {
      
        this.setState({
            customerRelation : item.value,
        })
    };
    handleValidUntil(value) {
        console.log(value);
        this.setState({
            validUntil: value
        })
    }
    handlePartyChange = (item) => {
        console.log('item',item);
        this.setState({
            selectedParty : item.value,
        });
    };
   render(){
       return(
           <React.Fragment>
           <Header {...this.props}/>
           <Form
              service={CreatePartyRoleService.savePartyRoleMethod}
              {...this.props}
              {...this.state}
              entity={
                {
                   partyId: this.state.selectedParty ? this.state.selectedParty.id : null,
                   personalityRoleCodeId: this.state.customerRelation ? this.state.customerRelation.codeId : null,
                   validUntil:  this.state.validUntil ? this.state.validUntil : null,
                }
              }
           >
           <Grid container spacing={8} className="no-margin">
               <Grid item md={10}>
                   <Grid item md={12}>
                       <AutoCompleteComponent
                           {...this.state.party}
                           handleChange={(value) => this.handlePartyChange(value)}
                           service={GetPartiesService.getAllPartyForAutocomplete}
                           value={this.state.selectedParty.fullName} required
                       />
                   </Grid>
               </Grid>
               <Grid item md={3}>
                   <Grid item md={12}>
                       <div className="k-rtl">
                           <DropDownComponent
                               {...this.state.relation}
                               handleChange={(value) => this.handleDropDownChange(value)}
                               value={this.state.customerRelation}
                           />
                       </div>
                   </Grid>
                   <br/>
                   <Grid item md={8}>
                   <NoDataDatePicker isNull={true} selectedDate={this.state.validUntil}  label="تاریخ اعتبار نقش" handleOnChange={this.handleValidUntil}/>
                       {/* <PersianDatePicker selectedDate={this.state.validUntil} label="تاریخ اعتبار نقش" handleOnChange={this.handleValidUntil} /> */}
                   </Grid>
               </Grid>
           </Grid>
         </Form>
         </React.Fragment>

       )
   }
}
export default withStyles(styles)(CreatePartyRoleComponent)