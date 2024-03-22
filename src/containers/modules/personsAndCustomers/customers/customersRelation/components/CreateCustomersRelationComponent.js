import React from 'react'

import AddCustomersRelation from "../services/CreateCustomersRelationService";
import styles from '../../../../../layout/panel/theme';
import Header from '../../../../../../shared/components/stateHeader/stateHeader';
import Form from '../../../../../../shared/components/form/form';
import { Grid, withStyles } from '@material-ui/core';
import GetPartiesService from "../../customersList/services/GetPartiesService";
import DropDownComponent from 'shared/components/dropDown/dropDown';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import AutoCompleteComponent from '../../../../../../shared/components/dropDown/autocomplete';
class CreateCustomersRelationComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            partyParent: {
                name: "selectedParentParty",
                field: "fullName",
                placeholder: "جتسجوی مشتری اصلی بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
                list: []
            },
            partyChild: {
                name: "selectedChildParty",
                field: "fullName",
                placeholder: "جتسجوی مشتری وابسته بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
                list: []
            },
            relation: {
                name: "customerRelation",
                feild: "title",
                label: "نوع ارتباط",
                list: []
            },
            selectedParentParty: {  fullName : ''},
            selectedChildParty: { fullName: ''},
            customerRelation: null,
   
        }
      
    }
    componentDidMount() {
        this.getDropDownLists();
    }

    getDropDownLists = () =>{
        GetEnum("relationshiptype",(response)=> {console.log('ress', response);DropDownListDataProvider(this,"relation",response)})
    };

   
    handleParentChange = (item) => {
        this.setState({
            selectedParentParty : item.value,
        })
    };
    handleChildChange = (item) => {
        this.setState({
            selectedChildParty : item.value,
        })
    };
    handleDropDownChange = (item) => {
        this.setState({
            customerRelation : item.value,
        })
    };
   render(){
       return(
           <React.Fragment>
           <Header {...this.props}/>
           <Form
              service={AddCustomersRelation}
              {...this.props}
              entity={
                {
                    parentPartyId: this.state.selectedParentParty ? this.state.selectedParentParty.id : null,
                    childPartyId:  this.state.selectedChildParty ? this.state.selectedChildParty.id : null,
                    relationshipType:  this.state.customerRelation ? this.state.customerRelation.code : null,
                }
              }
           >
           <Grid container spacing={8} className="no-margin">
               <Grid item md={10}>
                   <Grid item md={12}>
                       <AutoCompleteComponent
                           {...this.state.partyParent}
                           handleChange={(value) => this.handleParentChange(value)}
                           service={GetPartiesService.getAllPartyForAutocomplete}
                           value={this.state.selectedParentParty.fullName}
                       />
                   </Grid>
               </Grid>
               <Grid item md={10}>
                   <Grid item md={12}>
                       <AutoCompleteComponent
                           {...this.state.partyChild}
                           handleChange={(value) => this.handleChildChange(value)}
                           service={GetPartiesService.getAllPartyForAutocomplete}
                           value={this.state.selectedChildParty.fullName}
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
               </Grid>
           </Grid>
         </Form>
         </React.Fragment>

       )
   }
}
export default withStyles(styles)(CreateCustomersRelationComponent)