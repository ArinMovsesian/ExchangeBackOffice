import React from 'react';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridClient, GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetLegalCustomersTradingCodesColumnsTab';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import FaIcon from 'shared/components/Icon/Icon';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../../../../layout/panel/theme';
// import GetPartyRelationService from '../../customersRelation/services/GetCustomersRelationService';
import GetEnum from 'services/getEnum';

import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import './GetLegalCustomersTradingCodesComponentTab.css'
import GetPartiesService from '../../customersList/services/GetPartiesService';
import CustomerTradingCodesService from '../../customerTradingCodes/services/CustomerTradingCodeServices';
// import CustomerTradingCodesService from "../services/CustomerTradingCodeServices";
// import GetPartiesService from "../../customersList/services/GetPartiesService";
function rand() {
    return Math.round(Math.random() * 20) - 10;
}




class GetLegalCustomersTradingCodesComponentTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // party: {
            //     name: "selectedParty",
            //     field: "fullName",
            //     placeholder: "جتسجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
            //     list: []
            // },
            sort: [{
                field: "created",
                dir: "desc"
            }],
            // selectedParty: {  fullName : ''},
        }
    }
    // handleParentChange = (item) => {
    //     this.setState({
    //         selectedParty : item.value,
    //     })
    // };
    add = () => {
        console.log("self",this.props);
        this.props.history.push(
            {
              pathname: this.props.addInGridPartyCodeLegal.path,
              state: {
                  backPath : "/main/persons/customers/completeRegisterLegal",
                //   title:"تکمیل فرم مشتریان",
                //   tabId: 3333333333333,
                  partyId : this.props.location.state && this.props.location.state.customeBackInfo ? this.props.location.state.partyId : this.props.location.state
              }
            }
        );
    };
    edit = (v) => {
        this.props.history.push(
            {
              pathname: this.props.editInGridPartyCodeLegal.path,
              state: {
                  id: v,
                  
                  backPath : "/main/persons/customers/completeRegisterLegal",
                //   title:"تکمیل فرم مشتریان",
                //   tabId: 3,
                  partyId : this.props.location.state && this.props.location.state.customeBackInfo ? this.props.location.state.partyId : this.props.location.state
              }
            }
        );
    }
    render() {
        console.log('selectedParty', this.state.selectedParty);
        const { classes } = this.props;
        return (
            <React.Fragment>
                {/* <Header {...this.props} /> */}
                <Paper className={"main-paper-container customer-legal-trading-tab"}>
                    <div>
                        <GridServer
                            {...this.state}
                            {...this.props}
                            reportFilter={
                                {
                                    partyId:  this.props.location.state && this.props.location.state.customeBackInfo ? this.props.location.state.partyId : this.props.location.state,
                                    // mainMarketId: 0
                                }
                            }
                            service={CustomerTradingCodesService.getAllPartyMethod}
                            Columns={Columns}
                            sort={this.state.sort}
                            classHeightOpenPanel={"height-open-grid"}
                            reRender={true}
                            callServiceAgain={true}
                            hasToolbar={{elemnts:[{id: 'add', title: 'افزودن کدهای معاملاتی مشتری', method: this.add}]}}
                            EditCustomerContactTab={this.edit}
                            >
                            {/* <div classPage={"height-search"}>
                                <Grid container spacing={8} className="no-margin">
                                    <Grid item md={6}>
                                        <AutoCompleteComponent
                                            {...this.state.party}
                                            handleChange={(value) => this.handleParentChange(value)}
                                            service={GetPartiesService.getAllPartyForAutocomplete}
                                            value={this.state.selectedParty.fullName}
                                        />
                                    </Grid>
                                </Grid>
                            </div> */}
                        </GridServer>
                    </div>
                </Paper>
            </React.Fragment>
        )
    }


}

export default withStyles(styles)(GetLegalCustomersTradingCodesComponentTab);