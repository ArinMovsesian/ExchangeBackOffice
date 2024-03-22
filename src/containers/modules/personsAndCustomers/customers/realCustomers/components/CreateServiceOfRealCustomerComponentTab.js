import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import classNames from 'classnames';
import Input from 'shared/components/formInput/inputForm';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import Fieldset from 'shared/components/fieldset/fieldset';
import toastr from 'toastr';
import Header from 'shared/components/stateHeader/stateHeader';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import AutoCompleteComplete from 'shared/components/dropDown/autocomplete';
import IBAN from 'shared/components/iban/textMask';
import styles from 'containers/layout/panel/theme';
import Button from '@material-ui/core/Button';
import Submit from 'shared/components/submitAction/actionSubmit';
import Form from 'shared/components/form/form';
import GetEnum from 'services/getEnum';
import DropDownListDataProvider from "../../../../../../core/dropDownListDataProvider";
import getSimpleMainMarkets from 'services/getSimpleMainMarkets';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
// import GetPartiesService from '../../../customers/customersList/services/GetPartiesService';
import NoDataDatePicker from 'shared/components/persianDatePicker/noDataDatePicker';

import { getServicesHeaderTemplate, getServicesTemplate } from 'constants/autoCompleteTemplate';
import GetCustomersServicesSerivce from '../../../partyService/customersSerivceList/services/GetCustomersServicesSerivce';
import SaveCustomerServicesService from '../../../partyService/customersSerivceList/services/SaveCustomerServicesService';
import GetPartiesService from '../../customersList/services/GetPartiesService';
import GetPartyByIdService from '../services/GetPartyByIdService';


class CreateServiceOfRealCustomerComponentTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جتسجوی مشتری اصلی بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
                list: []
              },
            selectedParty: {
                fullName: '',
                id: 0
            },
            getServices: {
                name: "selectedGetServices",
                field: "title",
                headerTemplate: getServicesHeaderTemplate,
                template: getServicesTemplate,
                fieldSearch: 'phrase',
                placeholder: "جتسجوی سرویس  بر اساس عنوان و توضیحات",
                list: []
            },
            selectedGetServices: {title: '',id: 0},
            archiveLetterNumber: '',
            archiveNumber: undefined,
            desc: '',
            isActive: true,
            contractAmount: undefined,
            amount: undefined,
            date:null,

            market: {
                name: "selectedMarket",
                feild: "title",
                label: "بازار",
                list: []
            },
            selectedMarket: {id: 0},
            // stateBack :
            // this.props.location.state && this.props.location.state.backPath ? 
            // {
            //     title : 'بازگشت به تب خدمات',
            //     path : this.props.location.state.backPath,
            //     customeBackInfo : true,
            //     partyId : this.props.location.state.partyId,
            //     tabId: 2,
            // } : {},



            fromPartyFullName: '',
        }
    }
    handleChangeMarket = (value) => {
      
            this.setState({
                selectedMarket: value.value,
               
            })
      
    };
   
    componentDidMount() {
      
        getSimpleMainMarkets((response) => DropDownListDataProvider(this,"market",response));
        GetPartyByIdService.GetPartyByIdMethod({entity:this.props.location.state.partyId }, (res) => {
                console.log('GetPartyByIdMethod', res);
                this.setState({
                    fromPartyFullName: res.result.fullName
                })
        })
      console.log('stateBack::',this.state.stateBack);
      console.log('stateBack::',this.props);
            // let  command = {      
            //     reportFilter: {
            //         pharse: '', 
            //     },
            //     optionalFilter: {
            //         take: 100,
            //         page: 1,
            //     }
            // }
            // GetPartiesService.getAllPartyForAutocomplete(command,(res) => {
            //     console.log('GGG',res);
            //     console.log('GGGG',this.props.location.state);
            //     for(let i = 0; i < res.result.length; i++){
            //         if(res.result[i].id == this.props.location.state.partyId){
            //             // alert(1);
            //             this.setState({
            //                 fromPartyFullName: res.result[i].fullName,
            //             })
            //         }
            //     }
            // })
        }
    // handleChange = (item,name) => {
    //     this.setState({
    //       [name]: item.value
    //     });
     
    // }
    handleChange = (value, name) => {
        let item = value.value;
        this.setState({
            [name]: item
        })
    };
    handleChangeCheck = name => (event) => {
        this.setState({
            [name]: event.target.checked,
        })
    };
    handlehDate(value){
        this.setState({
            date: value,
        })
    }
    render() {
        console.log(this.state);
        // let t = this.props.location.state.partyId
        // const { classes } = this.props;
        return (
            <React.Fragment>
                <Header {...this.props} backParams={
                    this.props.location.state === undefined ? undefined : {
                       
                        
                       
                        // title : 'بازگشت به تب خدمات',
                        path : this.props.location.state.backPath,
                        customeBackInfo : true,
                        partyId : this.props.location.state.partyId,
                        tabId: 2,

                    }
                }/>
                <Form
                    {...this.props}
                    {...this.state}
                    entity={
                        {
                            partyId:  this.props.location.state.partyId,
                            serviceId: this.state.selectedGetServices.id,
                            validUntil: this.state.date,
                            archiveNumber: this.state.archiveNumber,
                            archiveLetterNumber: this.state.archiveLetterNumber,
                            amount: this.state.amount,
                            contractAmount: this.state.contractAmount,
                            mainMarketId: this.state.selectedMarket.id,
                            description: this.state.description,
                            isActive: this.state.isActive,
                        }
                    }
                    // redirect={this.props.location.state !== undefined ? "/main/persons/customers/completeRegister": "/main/persons/partyService/customerServiceList"}
                    service={SaveCustomerServicesService.savepartyserviceMethod}
                    cancelModal={() => {}}
                    afterSubmit={
                        () => {
                      
                           this.props.history.push(
                            {
                              pathname: "/main/persons/customers/completeRegister",
                              state: {
                                // title : this.props.location.state.title,
                                // path : this.props.location.state.backPath,
                                customeBackInfo : true,
                                partyId : this.props.location.state.partyId,
                                tabId: 2,
                              }
                            }
                        );
                        }
                    }
                    className="form-height"
 
                >
                   

                        <Grid container spacing={8}>
                            <Grid item md={10}>
                              
                           
                               
                                 <Input label="نام و نام خانوادگی" value={this.state.fromPartyFullName} disabled />
                                

                          
                                
                              
                            </Grid>
                           
                        </Grid>
                        <Grid container spacing={8}>
                        <Grid item md={7}>
                                        <div className="k-rtl">
                                            <AutoCompleteComponent
                                            {...this.state.getServices}
                                            handleChange={(value) => this.handleChange(value, 'selectedGetServices')}
                                            service={GetCustomersServicesSerivce.getservicesMethod}
                                            value={this.state.selectedGetServices.title}
                                            />
                                        </div>
                                       
                               

                                </Grid>
                                <Grid item md={3}>
                                    <NoDataDatePicker isNull={true} selectedDate={this.state.date} label="تاریخ اعتبار خدمت" handlehDate={this.date}/>            
                                </Grid>
                        </Grid>
                        <br/>
                        <Grid container spacing={8}>
                            <Grid item md={10}>
                                <Fieldset legend={'شماره بایگانی'}>
                                    <Grid container spacing={8}>
                                        <Grid item md={6}>
                                            <NumberFormatComponent
                                                id=""
                                                label="عدد"
                                                value={this.state.archiveNumber}
                                                handleChange={(value, error) => this.handleChange(value, 'archiveNumber')}
                                                type="number"/>
                                        </Grid>
                                        <Grid item md={6}>
                                            <Input label="حرف" handleChange={(e) => this.handleChange(e, 'archiveLetterNumber')} value={this.state.archiveLetterNumber}/>
                                        </Grid>
                                    
                                    </Grid>
                                </Fieldset>
                            </Grid>
                        </Grid>
                       
                        <Grid container spacing={8}>
                                
                                <Grid item md={4}>
                                    <NumberFormatComponent
                                            id=""
                                            label="مقدار"
                                            value={this.state.amount}
                                            handleChange={(value, error) => this.handleChange(value, 'amount')}
                                             type="number"
                                    />
                                </Grid>
                                <Grid item md={4}>
                                    <NumberFormatComponent
                                            id=""
                                            label="مقدار قرار داد"
                                            value={this.state.contractAmount}
                                            handleChange={(value, error) => this.handleChange(value, 'contractAmount')}
                                            type="number"
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <DropDownComponent {...this.state.market}
                                                        handleChange={(value) => this.handleChangeMarket(value)} isFilterable={false}
                                                        value={this.state.selectedMarket} required hasAll/>
                                    </div>
                                 </Grid>
                                
                        </Grid>
                        <Grid container spacing={8}>
                            <Grid item md={10}>
                                <Input label="توضیحات" handleChange={(e) => this.handleChange(e, 'desc')} value={this.state.desc} isMultiLine={true} />
                            </Grid>
                            
                        </Grid>
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={6}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.isActive}
                                                onChange={this.handleChangeCheck('isActive')}
                                                value=""
                                                color="primary"
                                            />
                                        }
                                        label="فعال"
                                     />
                            </Grid>
                        </Grid>
                      
                    
                </Form>
            </React.Fragment>
        )
    }
}
CreateServiceOfRealCustomerComponentTab.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateServiceOfRealCustomerComponentTab);