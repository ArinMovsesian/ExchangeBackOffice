import React from 'react'
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
import UpdatePartyRoleService from '../services/UpdatePartyRoleService';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import GetPartyRoleService from "../services/GetPartyRoleService";
import CreatePartyRoleService from '../services/CreatePartyRoleService';
import Input from 'shared/components/formInput/inputForm';
import NoDataDatePicker from 'shared/components/persianDatePicker/noDataDatePicker';
class UpdatePartyRoleComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جتسجوی مشتری اصلی بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
                list: []
            },
            selectedParty: {partyFullName: '', partyId: '', id: ''},
            relation: {
                name: "customerRelation",
                feild: "captionFA",
                label: "نقش",
                list: []
            },
            customerRelation: {},
            validUntil: null,
            // showDate: true,
        };
        this.handleValidUntil = this.handleValidUntil.bind(this);
        this.handlePartyChange = this.handlePartyChange.bind(this);
        this.handleDropDownChange = this.handleDropDownChange.bind(this);
        this.getPartyRoleById = this.getPartyRoleById.bind(this);
}
    componentDidMount() {
        // this.getDropDownLists();
        this.getPartyRoleById();
    }

    // getDropDownLists = () =>{
    //     GetPartyRoleService.getAllPersonalityRolesMethod(null, (response) => DropDownListDataProvider(this,"relation",response));
    // };
    getPartyRoleById(){
        GetPartyRoleService.getPartyRoleByIdMethod({entity: this.props.location.state.id}, (response) => {
            let {codeId, externalCode, captionFA, captionEN, partyFullName, partyId, id, validUntil} = response.result;
            // if(response.result.validUntil == '0001-01-01T00:00:00'  || response.result.validUntil === null) {
                this.setState({
                    selectedParty: {partyFullName, partyId, id},
                    customerRelation:  {codeId, externalCode, captionFA, captionEN},
                    validUntil: validUntil,
                    // showDate: false,
                }, () => {

                    GetPartyRoleService.getAllPersonalityRolesMethod(null, (response) => DropDownListDataProvider(this,"relation",response));
                });
            // }else {
            //     this.setState({
            //         selectedParty: {partyFullName, partyId, id},
            //         customerRelation:  {codeId, externalCode, captionFA, captionEN},
            //         validUntil: response.result.validUntil,
            //         showDate: true,
            //     }, () => {

            //         GetPartyRoleService.getAllPersonalityRolesMethod(null, (response) => DropDownListDataProvider(this,"relation",response));
            //     });
            // }

        })
    }
    handleDropDownChange = (item) => {
        console.log(item);
        this.setState({
            customerRelation : item.value,
        })
    };
    handleValidUntil(value) {
        this.setState({
            validUntil: value
        });
    }
    handlePartyChange = (item) => {
        this.setState({
            selectedParty : item.value,
        })
    };

   render(){
        console.log('render validUntil: ',this.state.validUntil);
       return(

           <React.Fragment>
               <Header {...this.props}/>
               <Form
                   service={UpdatePartyRoleService.updatePartyRoleMethod}
                   {...this.props}
                   {...this.state}
                   entity={
                       {
                           id: this.state.selectedParty ? this.state.selectedParty.id : null,
                           partyId: this.state.selectedParty ? this.state.selectedParty.partyId : null,
                           personalityRoleCodeId: this.state.customerRelation ? this.state.customerRelation.codeId : null,
                           validUntil: this.state.validUntil
                       }
                   }
               >
                   <Grid container spacing={8} className="no-margin">
                       <Grid item md={10}>
                           <Grid item md={12}>
                               <Input label="نام و نام خانوادگی" value={this.state.selectedParty.partyFullName} disabled />
                           </Grid>
                       </Grid>
                       <Grid item md={3}>
                           <Grid item md={12}>
                               <div className="k-rtl">
                                   <DropDownComponent
                                       {...this.state.relation}
                                       handleChange={(value) => this.handleDropDownChange(value)}
                                       value={this.state.customerRelation}
                                       isDisabled
                                   />
                               </div>
                           </Grid>
                           <br/>
                           <NoDataDatePicker isNull={true} selectedDate={this.state.validUntil} label="تاریخ اعتبار نقش" handleOnChange={this.handleValidUntil}/>
                           {/* {
                               this.state.showDate === true
                               ?
                                   <Grid item md={8}>
                                       <PersianDatePicker selectedDate={this.state.validUntil} label="تاریخ اعتبار نقش" handleOnChange={this.handleValidUntil} />
                                   </Grid>
                               :
                               null
                           } */}

                       </Grid>
                   </Grid>
               </Form>
           </React.Fragment>

       )
   }
}
export default withStyles(styles)(UpdatePartyRoleComponent)