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
import GetPartiesService from '../../../customers/customersList/services/GetPartiesService';
import NoDataDatePicker from 'shared/components/persianDatePicker/noDataDatePicker';
import GetCustomersServicesSerivce from '../services/GetCustomersServicesSerivce';
import { getServicesHeaderTemplate, getServicesTemplate } from 'constants/autoCompleteTemplate';
import SaveCustomerServicesService from '../services/SaveCustomerServicesService';

class AddCustomerServiceComponent extends React.Component {
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
        }
    }
    handleChangeMarket = (value) => {  
        this.setState({
            selectedMarket: value.value,
            
        })
    };
   
    componentDidMount() {
        
        getSimpleMainMarkets((response) => DropDownListDataProvider(this,"market",response));
       
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
        
        return (
            <React.Fragment>
                <Header {...this.props} {...this.state}/>
                <Form
                    {...this.props}
                    {...this.state}
                    entity={
                        {
                            partyId: this.state.selectedParty.id,
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
                    redirect={"/main/persons/partyService/customerServiceList"}
                    service={SaveCustomerServicesService.savepartyserviceMethod}
                    className="form-height"
                >
                   

                        <Grid container spacing={8}>
                            <Grid item md={10}>
                        
                              <div className="k-rtl">
                                    <AutoCompleteComponent
                                    {...this.state.party}
                                    handleChange={(value) => this.handleChange(value, 'selectedParty')}
                                    service={GetPartiesService.getAllPartyForAutocomplete}
                                    value={this.state.selectedParty.fullName}
                                    />
                                </div>
                                    
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
AddCustomerServiceComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddCustomerServiceComponent);