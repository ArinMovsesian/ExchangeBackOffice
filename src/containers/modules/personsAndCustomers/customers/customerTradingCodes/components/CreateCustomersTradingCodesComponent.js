import React from 'react'
import styles from '../../../../../layout/panel/theme';
import Header from '../../../../../../shared/components/stateHeader/stateHeader';
import Form from '../../../../../../shared/components/form/form';
import { Grid, withStyles } from '@material-ui/core';
import GetPartiesService from "../../customersList/services/GetPartiesService";
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import getSimpleMainMarkets from 'services/getSimpleMainMarkets';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import NoDataDatePicker from 'shared/components/persianDatePicker/noDataDatePicker';
import Input from 'shared/components/formInput/inputForm';
import Fieldset from 'shared/components/fieldset/fieldset';
import GetMainMarket from 'services/GetMainMarkets';
import AddCustomersRelation from "../../customersRelation/services/CreateCustomersRelationService";
import SaveCustomerTradingCodeSerivces from '../services/SaveCustomerTradingCodeSerivces';
class CreateCustomersTradingCodesComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جتسجوی مشتری اصلی بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
                list: []
            },
            selectedParty: {  fullName : '', id: 0, nationalId: 0},


            market: {
                name: "selectedMarket",
                feild: "title",
                label: "بازار",
                list: []
            },
            selectedMarket: {id: 0, code: 0, title: ''},


            // engtype: {
            //     name: "selectedEngtype",
            //     feild: "title",
            //     label: "نوع انرژی",
            //     list: []
            // },
            // selectedEngtype: {code: 0},

            energyDropDownShow: false,
              //TSE
              pamTSECode: '',
              thirdOldTSEBourseCode: '',
              secondOldTSEBourseCode: '',
              firstOldTSEBourseCode: '',
              TSEBourseCodeValid: null,
              TSEBourseCode: '',
              //IME
              imeBourseCode: '',
              imeBuyerBourseCode: '',
              imeSellerCode: '',
              imeFutureCode: '',
              //EFP and IEE
              pamIEECode: '',
              IEEBourseCode: '',
              pamEFP: ''
            

       
         
        }

    }
    componentDidMount() {
        // this.getMainMarket();
        getSimpleMainMarkets((response) => DropDownListDataProvider(this,"market",response));
        GetEnum("engtype", (response)=>  {DropDownListDataProvider(this,"engtype",response)});
    }
    handleChangeMarket = (value) => {
        console.log('changeMarket', value.value);
        if(value.value.code === 1) {
            this.setState({
                selectedMarket: value.value,
                // energyDropDownShow: true,
                  //IME
                imeBourseCode: '',
                imeBuyerBourseCode: '',
                imeSellerCode: '',
                imeFutureCode: '',
                //EFP and IEE
                pamIEECode: '',
                IEEBourseCode: '',
                pamEFP: ''
            })
        }else if(value.value.code === 2) {
            this.setState({
                selectedMarket: value.value,
                 //TSE
                pamTSECode: '',
                thirdOldTSEBourseCode: '',
                secondOldTSEBourseCode: '',
                firstOldTSEBourseCode: '',
                TSEBourseCodeValid: null,
                TSEBourseCode: '',
                //EFP and IEE
                pamIEECode: '',
                IEEBourseCode: '',
                pamEFP: ''
                // energyDropDownShow: true,
            })
        }else if(value.value.code === 3){
            this.setState({
                selectedMarket: value.value,
                //TSE
                pamTSECode: '',
                thirdOldTSEBourseCode: '',
                secondOldTSEBourseCode: '',
                firstOldTSEBourseCode: '',
                TSEBourseCodeValid: null,
                TSEBourseCode: '',
                //IME
                imeBourseCode: '',
                imeBuyerBourseCode: '',
                imeSellerCode: '',
                imeFutureCode: '',
                // energyDropDownShow: false,
                // selectedEngtype: {code: 0},
            })
        }
    };
    handleChangeEngtype = (value) => {
        this.setState({
            selectedEngtype: value.value,
        })
    };


    // getMainMarket = () => {
    //     // GetMainMarket((response) => {DropDownListDataProvider(this,"relation",response)})
    //     // GetMainMarket((response) => {console.log('getmarket',response)});
    // };

    // handleDropDownChange = (item) => {
    //     this.setState({
    //         customerRelation : item.value,
    //     })
    // };
    handleAutoChange = (item) => {
        console.log('party item: ',item);
        this.setState({
            selectedParty : item.value,
        })
    };
    handleDate = (value) => {
        this.setState({
            TSEBourseCodeValid: value,
        })
    };
    handleChange = (value, name) => {
        let item = value.value;
        this.setState({
            [name]: item
        })
    }
    render(){
        return(
            <React.Fragment>
                <Header {...this.props}/>
                <Form
                    {...this.props}
                    {...this.state}
                    service={SaveCustomerTradingCodeSerivces.savepartycodeMethod}
                    entity={
                        {
                           
              
                            partyId: this.state.selectedParty.id,
                            tseBourseCode: this.state.TSEBourseCode,
                            tseBourseCodeValid: this.state.TSEBourseCodeValid,
                            firstOldTSEBourseCode: this.state.firstOldTSEBourseCode,
                            secondOldTSEBourseCode: this.state.secondOldTSEBourseCode,
                            thirdOldTSEBourseCode: this.state.thirdOldTSEBourseCode,
                            pamTSECode: this.state.pamTSECode,
                            pamIEECode: this.state.pamIEECode,
                            pamEFPCode: this.state.pamEFP,
                            ieeBourseCode: this.state.IEEBourseCode,
                            imeBourseCode: this.state.imeBourseCode,
                            imeBuyerBourseCode: this.state.imeBuyerBourseCode,
                            imeSellerCode: this.state.imeSellerCode,
                            imeFutureCode: this.state.imeFutureCode,
                            // created: "2019-02-23T14:22:46.134Z",
                            // modified: "2019-02-23T14:22:46.134Z",
                            nationalId: this.state.selectedParty.nationalId,
                            fullName: this.state.selectedParty.fullName,
                            
                            mainMarketId: this.state.selectedMarket.id,
                            mainMarketTitle: this.state.selectedMarket.title,
                            mainMarketCode: this.state.selectedMarket.code
                        }
                    }
                >
                    <Grid container spacing={8} className="no-margin">
                       
                            <Grid item md={10}>
                                <AutoCompleteComponent
                                    {...this.state.party}
                                    handleChange={(value) => this.handleAutoChange(value)}
                                    service={GetPartiesService.getAllPartyForAutocomplete}
                                    value={this.state.selectedParty.fullName}
                                />
                            </Grid>
                      
                    </Grid>
                    <Grid container spacing={8} className="no-margin">
                        <Grid item md={2}>
                            <div className="k-rtl">
                                <DropDownComponent {...this.state.market}
                                                    handleChange={(value) => this.handleChangeMarket(value)} isFilterable={false}
                                                    value={this.state.selectedMarket} required/>
                            </div>
                        </Grid>

                        {/* <Grid item md={2}>
                            {
                                this.state.energyDropDownShow === true
                                    ?
                                    <div className="k-rtl">
                                        <DropDownComponent {...this.state.engtype}
                                                            handleChange={(value) => this.handleChangeEngtype(value)} isFilterable={false}
                                                            value={this.state.selectedEngtype} required/>
                                    </div>
                                    :
                                    null
                            }

                        </Grid> */}
                    </Grid>
                    <br />
                    {
                        this.state.selectedMarket.id === 1
                        ?
                        <React.Fragment>
                        <Fieldset legend={this.state.selectedMarket.title}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={3}>
                               
                                    <NumberFormatComponent id="pamTSECode" label="پم کد معاملات بورسی اوراق" value={this.state.homePhone} handleChange={(value) => this.handleChange(value, 'pamTSECode')} type="number"  required/>
                          
                                    {/* <Input label="پم کد معاملات بورسی اوراق" handleChange={(e) => this.handleChange(e, 'pamTSECode')} value={this.state.pamTSECode} required /> */}
                                </Grid>
                                <Grid item md={3}>
                                    <Input label="سومین کد بورس قدیمی معاملات اوراق" handleChange={(e) => this.handleChange(e, 'thirdOldTSEBourseCode')} value={this.state.thirdOldTSEBourseCode} required />
                                </Grid>
                                <Grid item md={3}>
                                    <Input label="دومین کد بورس قدیمی معاملات اوراق" handleChange={(e) => this.handleChange(e, 'secondOldTSEBourseCode')} value={this.state.secondOldTSEBourseCode} required />
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={3}>
                                    <Input label="اولین کد بورس قدیمی معاملات اوراق" handleChange={(e) => this.handleChange(e, 'firstOldTSEBourseCode')} value={this.state.firstOldTSEBourseCode} required />
                                </Grid>
                                <Grid item md={3}>
                                    {/* <Input label="تاریخ اعتبار کد بورسی معاملات اوراق" handleChange={(e) => this.handleChange(e, 'TSEBourseCodeValid')} value={this.state.TSEBourseCodeValid} required /> */}
                                    <NoDataDatePicker isNull={true} selectedDate={this.state.TSEBourseCodeValid} label="تاریخ اعتبار کد بورسی معاملات اوراق" handleOnChange={(value) => this.handleDate(value)}/>
                                </Grid>
                                <Grid item md={3}>
                                    <Input label="کد بورسی معاملات اوراق" handleChange={(e) => this.handleChange(e, 'TSEBourseCode')} value={this.state.TSEBourseCode} required />
                                </Grid>
                            </Grid>
                        </Fieldset>
                        </React.Fragment>
                        :
                        this.state.selectedMarket.id === 2
                        ?
                        <React.Fragment>
                        <Fieldset legend={this.state.selectedMarket.title}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={2}>
                                    <Input label="کد بورسی معاملات کالا" handleChange={(e) => this.handleChange(e, 'imeBourseCode')} value={this.state.imeBourseCode} required />
                                </Grid>
                                <Grid item md={3}>
                                    <Input label="کد بورسی معاملات کالا/ خریدار" handleChange={(e) => this.handleChange(e, 'imeBuyerBourseCode')} value={this.state.imeBuyerBourseCode} required />
                                </Grid>
                                <Grid item md={3}>
                                    <Input label="کد بورسی معاملات کالا/ فروشنده" handleChange={(e) => this.handleChange(e, 'imeSellerCode')} value={this.state.imeSellerCode} required />
                                </Grid>
                                <Grid item md={3}>
                                    <Input label="کد بورسی آتی کالا" handleChange={(e) => this.handleChange(e, 'imeFutureCode')} value={this.state.imeFutureCode} required />
                                </Grid>
                            </Grid>
                        </Fieldset>
                        </React.Fragment>
                        :
                        this.state.selectedMarket.id === 3
                        ?

                        <React.Fragment>
                        <Fieldset legend={this.state.selectedMarket.title}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={3}>
                                    <Input label="پم کد معاملات بورس انرژی/ برق" handleChange={(e) => this.handleChange(e, 'pamIEECode')} value={this.state.pamIEECode} required />
                                </Grid>
                                <Grid item md={3}>
                                    <Input label="کد بورسی معاملات انرژی/ برق" handleChange={(e) => this.handleChange(e, 'IEEBourseCode')} value={this.state.IEEBourseCode} required />
                                </Grid>
                                <Grid item md={3}>
                                    <Input label="پم کد معاملات بورسی انرژی/ فیزیکی" handleChange={(e) => this.handleChange(e, 'pamEFP')} value={this.state.pamEFP} required />
                                </Grid>
                            </Grid>
                        </Fieldset>
                        </React.Fragment>
                        :
                        null
                    }
                    <br />
                                
                </Form>
            </React.Fragment>

        )
    }
}
export default withStyles(styles)(CreateCustomersTradingCodesComponent)