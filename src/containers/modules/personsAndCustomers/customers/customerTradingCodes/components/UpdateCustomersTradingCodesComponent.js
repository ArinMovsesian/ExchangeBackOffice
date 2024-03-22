import React from 'react'
import styles from '../../../../../layout/panel/theme';
import Header from '../../../../../../shared/components/stateHeader/stateHeader';
import Form from '../../../../../../shared/components/form/form';
import { Grid, withStyles } from '@material-ui/core';
import GetPartiesService from "../../customersList/services/GetPartiesService";
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import Input from 'shared/components/formInput/inputForm';
import Fieldset from 'shared/components/fieldset/fieldset';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import GetMainMarket from 'services/GetMainMarkets';
import AddCustomersRelation from "../../customersRelation/services/CreateCustomersRelationService";
import GetPartyCodeWithMainMarketsService from '../services/GetPartyCodeWithMainMarkets';
class UpdateCustomersTradingCodesComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            customerRelation: null,
            filterMarket: null,
            partyId: 0,
            //TSE
            pamTSECode: '',
            thirdOldTSEBourseCode: '',
            secondOldTSEBourseCode: '',
            firstOldTSEBourseCode: '',
            TSEBourseCodeValid: '',
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
        };

    }
    componentDidMount() {
      this.getAllPartyCodeWithMainMarkets();
      this.getPartyCodeByFilter();
    }
    getAllPartyCodeWithMainMarkets = () => {
        // GetMainMarket((response)=>{
        //     console.log('market',response);
        //     this.setState({
        //                     list: response.result
        //     })
        // })

        const body = {
            entity: this.props.location.state.partyId,
            // entity: 5607
        };
        GetPartyCodeWithMainMarketsService.getAllPartyCodeWithMainMarkets(body,(response) => {
            console.log('getAllPartyCodeWithMain',response);
            // DropDownListDataProvider("relation",response.result.mainMarkets)
            this.setState({
                    list: response.result.mainMarkets,
                    partyId: this.props.location.state.partyId,
            })
        })
    };

    getPartyCodeByFilter = () => {
        const body = {

            entity: {
                id: this.props.location.state.id,
                partyId: this.props.location.state.partyId,
            },

                    // mainMarketId: 1 //this is fix

        };
        GetPartyCodeWithMainMarketsService.getPartyCodeByFilter(body, (response) => {
            console.log('getPartyByFilter', response.result);
            // for (let key in response.result) {
            //        console.log(key + " -> " + response.result[key]);
            // }
            // console.log('filterMarket', filterMarket);
            this.setState({
                // customerRelation : item.value,
                getPartyId: response.result.id,
                //TSE
                pamTSECode: response.result.pamTSECode,
                thirdOldTSEBourseCode: response.result.thirdOldTSEBourseCode,
                secondOldTSEBourseCode: response.result.secondOldTSEBourseCode,
                firstOldTSEBourseCode: response.result.firstOldTSEBourseCode,
                TSEBourseCodeValid: response.result.TSEBourseCodeValid,
                TSEBourseCode: response.result.TSEBourseCode,
                //IME
                imeBourseCode: response.result.imeBourseCode,
                imeBuyerBourseCode: response.result.imeBuyerBourseCode,
                imeSellerCode: response.result.imeSellerCode,
                imeFutureCode: response.result.imeFutureCode,
                //EFP and IEE
                pamIEECode: response.result.pamIEECode,
                IEEBourseCode: response.result.IEEBourseCode,
                pamEFP: response.result.pamEFP
            })
        });
    };
    handleChange(value, name) {
        let item = value.value;
        this.setState({
            [name]: item
        })
    }
    render(){
        // console.log('getId', this.state.getId);
        // console.log('list', this.state.list);
        return(
            <React.Fragment>
                <Header {...this.props}/>
                <Form
                    {...this.props}
                    {...this.state}
                    service={GetPartyCodeWithMainMarketsService.updatePartyCode}
                    entity={
                        {
                            id:  this.props.location.state.id,
                            partyId: this.props.location.state.partyId,
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
                            created: "2019-02-23T14:22:46.134Z",
                            modified: "2019-02-23T14:22:46.134Z",
                            nationalId: "string",
                            fullName: "string",
                            // mainMarketId: 1,
                            // mainMarketTitle: "string",
                            // mainMarketCode: 0
                        }
                    }
                >
                    <Fieldset legend={'اطلاعات کاربر'}>
                        <Grid container spacing={16} className="no-margin">
                            <Grid item md={3}>
                                <h3><span>نام/ نام خانوادگی: </span><strong>{this.props.location.state.fullName}</strong></h3>
                            </Grid>
                            <Grid item md={3}>
                                <h3><span>کد ملی: </span><strong>{this.props.location.state.nationalId}</strong></h3>
                            </Grid>
                        </Grid>
                    </Fieldset>
                    <br/>
                    {this.state.list.map(
                        (value) => {
                            return (
                                <React.Fragment>
                                    <Fieldset legend={value.title}>
                                            {
                                                value.id === 1
                                                ?
                                                    <React.Fragment>
                                                        <Grid container spacing={16} className="no-margin">
                                                            <Grid item md={3}>
                                                                <Input label="پم کد معاملات بورسی اوراق" handleChange={(e) => this.handleChange(e, 'pamTSECode')} value={this.state.pamTSECode} required />
                                                            </Grid>
                                                            <Grid item md={3}>
                                                                <Input label="سومین کد بورس قدیمی معاملات اوراق" handleChange={(e) => this.handleChange(e, 'thirdOldTSEBourseCode')} value={this.state.thirdOldTSEBourseCode} required />
                                                            </Grid>
                                                            <Grid item md={3}>
                                                                <Input label="دومین کد بورس قدیمی معاملات اوراق" handleChange={(e) => this.handleChange(e, 'secondOldTSEBourseCode')} value={this.state.secondOldTSEBourseCode} required />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={16} className="no-margin">
                                                            <Grid item md={3}>
                                                                <Input label="اولین کد بورس قدیمی معاملات اوراق" handleChange={(e) => this.handleChange(e, 'firstOldTSEBourseCode')} value={this.state.firstOldTSEBourseCode} required />
                                                            </Grid>
                                                            <Grid item md={3}>
                                                                <Input label="تاریخ اعتبار کد بورسی معاملات اوراق" handleChange={(e) => this.handleChange(e, 'TSEBourseCodeValid')} value={this.state.TSEBourseCodeValid} required />
                                                            </Grid>
                                                            <Grid item md={3}>
                                                                <Input label="کد بورسی معاملات اوراق" handleChange={(e) => this.handleChange(e, 'TSEBourseCode')} value={this.state.TSEBourseCode} required />
                                                            </Grid>
                                                        </Grid>
                                                    </React.Fragment>

                                                :
                                                value.id  === 2
                                                ?
                                                    <React.Fragment>
                                                        <Grid container spacing={16} className="no-margin">
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
                                                    </React.Fragment>
                                                :
                                                value.id === 3
                                                ?
                                                    <React.Fragment>
                                                        <Grid container spacing={16} className="no-margin">
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
                                                    </React.Fragment>
                                                :
                                                null
                                            }

                                    </Fieldset>
                                    <br />
                                </React.Fragment>
                            )
                        }
                    )}

                </Form>
            </React.Fragment>

        )
    }
}
export default withStyles(styles)(UpdateCustomersTradingCodesComponent)