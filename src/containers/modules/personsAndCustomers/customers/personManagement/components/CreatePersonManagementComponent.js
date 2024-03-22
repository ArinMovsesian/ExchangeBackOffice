import React from 'react';
import moment from 'moment';
// import AddCustomersRelation from "../services/CreatePartyRoleService";
import styles from '../../../../../layout/panel/theme';
import Header from '../../../../../../shared/components/stateHeader/stateHeader';
import Form from '../../../../../../shared/components/form/form';
import { Grid, withStyles } from '@material-ui/core';
// import GetPartiesService from "../../customersList/services/GetPartiesService";
import DropDownComponent from 'shared/components/dropDown/dropDown';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import AutoCompleteComponent from '../../../../../../shared/components/dropDown/autocomplete';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import GetPartyRoleService from '../../partyRole/services/GetPartyRoleService';
import Input from 'shared/components/formInput/inputForm';
// import CreatePartyRoleService from '../services/CreatePartyRoleService';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import NationalCode from 'shared/components/nationalCode/nationalCode';
import NoDataDatePicker from 'shared/components/persianDatePicker/noDataDatePicker';
import CreatePersonManagementService from '../services/CreatePersonManagementService';
class CreatePersonManagementComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
            relation: {
                name: "customerRelation",
                feild: "captionFA",
                label: "نقش",
                list: []
            },
            customerRelation: undefined,
           

            partyType :{
                name: "partyTypeSelected",
                feild: "title",
                label: "نوع مشتری",
                list: []
            },
            partyTypeSelected: undefined,

            name: '',
            firstName: '',
            lastName: '',
            fatherName: '',
        
            // nationalCode: '',
            nationalId: '',
            
            validUntil: null,
            realCustomer: false,
            legalCustomer: false,
            partyTypeDropDownStatus: false,
   
        };
     
    }
    componentDidMount() {
        // console.log('bb', this.state.birthDate);
        this.getDropDownLists();
        // let today = new Date().toISOString()
        // console.log('today',today);

    }
    getDropDownLists = () =>{
     GetPartyRoleService.getSimplePersonalityRolesMethod(null, (response) => DropDownListDataProvider(this,"relation",response));
     GetEnum('partytype', (response) => { DropDownListDataProvider(this,"partyType", response);});
    };
    
    handleCustomerRelation = (item) => {
        console.log('handleCustomerRelation', item);
        this.setState({
            partyTypeDropDownStatus: true,
            customerRelation : item.value,
        })
    };
    handlePartyChange = (item) => {
        console.log('handlePartyChange',item);
        this.setState({
            selectedParty : item.value,
        });
    };




    handleValidUntil = (value) => {
        console.log(value);
        this.setState({
            validUntil: value
        })
    }
    
    handleChange(event, name) {
        this.setState({
            [name]: event.value,
        });
        console.log([name], event.value);
    };
    handlePartyType = (item) => {
        
        console.log('item', item.value);
        if(item.value.code === 1){
            this.setState({
                realCustomer: true,
                legalCustomer: false,
            })
        } else if(item.value.code === 2){
            this.setState({
                realCustomer: false,
                legalCustomer: true,
            })
        }
        this.setState({
            partyTypeSelected : item.value,
        })
    }
   render(){
       console.log('customerRelation', this.state.customerRelation);
       console.log('partyTypeSelected', this.state.partyTypeSelected);
       return(
           <React.Fragment>
           <Header {...this.props}/>
           <Form
              service={CreatePersonManagementService.savePersonApiMethod}
              {...this.props}
              {...this.state}
              entity={
                {
                    party: {
                        name: this.state.name,
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        fatherName: this.state.fatherName,
                        partyType: this.state.partyTypeSelected === undefined ? 0 : this.state.partyTypeSelected.code,
                        nationalId: this.state.nationalCode,
                    },
                    partyRole: {
                        personalityRoleCodeId: this.state.customerRelation === undefined ? 0 : this.state.customerRelation.codeId,
                        validUntil: this.state.validUntil,
                    }
                }
              }
           >
           <Grid container spacing={8} className="no-margin">
             
               
                   <Grid item md={2}>
                       <div className="k-rtl">
                           <DropDownComponent
                               {...this.state.relation}
                               handleChange={(value) => this.handleCustomerRelation(value)}
                               value={this.state.customerRelation}
                           />
                       </div>
                   </Grid>
                   <br/>
                   
           
           </Grid>
           {
               this.state.partyTypeDropDownStatus
               ?
               <Grid container spacing={8} className="no-margin">

                    <Grid item md={2}>
                        <div className="k-rtl">
                            <DropDownComponent
                                {...this.state.partyType}
                                handleChange={(value) => this.handlePartyType(value)}
                                value={this.state.partyTypeSelected}
                            />
                        </div>
                    </Grid>
                </Grid>
                :
                null
           }
         
           <Grid container spacing={8} className="no-margin">
                        {
                        this.state.realCustomer
                        ?
                        <React.Fragment>
                            <Grid item md={2}>
                                <Input label="نام" handleChange={(e) => this.handleChange(e, 'firstName')} value={this.state.firstName} required />
                            </Grid>
                            <Grid item md={2}>
                                <Input label="نام خانوادگی" handleChange={(e) => this.handleChange(e, 'lastName')} value={this.state.lastName} required />
                            </Grid>
                            <Grid item md={2}>
                                <Input label="نام پدر" handleChange={(e) => this.handleChange(e, 'fatherName')} value={this.state.fatherName} required />
                            </Grid>
                    
                            <Grid item md={2}>
                                <NationalCode
                                id="nationalCode"
                                label="کد ملی"
                                value={this.state.nationalId}
                                handleChange={(value) => this.handleChange(value, 'nationalId')}
                                type="number"
                                />
                            </Grid>
                            <Grid item md={2}>
                            <NoDataDatePicker isNull={true} selectedDate={this.state.validUntil}  label="تاریخ اعتبار نقش" handleOnChange={this.handleValidUntil}/>   
                            </Grid>
                        </React.Fragment>
                        :
                        null
                        }
                        {
                            this.state.legalCustomer
                            ?
                            <React.Fragment>
                                <Grid item md={2}>
                                    <Input label="نام" handleChange={(e) => this.handleChange(e, 'name')} value={this.state.name} required />
                                </Grid>
                                <Grid item md={2}>
                                        <NumberFormatComponent id="nationalId"
                                            label="شناسه ملی"
                                            value={this.state.nationalId}
                                            handleChange={(value, error) => this.handleChange(value, 'nationalId')}
                                            type="number"
                                            format={'###########'}
                                            required={this.state.ecomomicCode !== ''? false: true} />
                                </Grid>
                                <Grid item md={2}>
                                    <NoDataDatePicker isNull={true} selectedDate={this.state.validUntil}  label="تاریخ اعتبار نقش" handleOnChange={this.handleValidUntil}/>   
                                </Grid>
                            </React.Fragment>
                            :
                            null
                        }
                                    
                
           </Grid>
         </Form>
         </React.Fragment>

       )
   }
}
export default withStyles(styles)(CreatePersonManagementComponent)