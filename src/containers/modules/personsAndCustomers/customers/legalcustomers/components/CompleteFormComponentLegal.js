import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import classNames from 'classnames';
import Input from 'shared/components/formInput/inputForm'
import Header from 'shared/components/stateHeader/stateHeader'
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes, { func } from 'prop-types';
import styles from '../../../../../layout/panel/theme'
import DropDownComponent from 'shared/components/dropDown/dropDown';
import toastr from 'toastr';
import Form from 'shared/components/form/form';
import IBAN from 'shared/components/iban/textMask';
import Typography from '@material-ui/core/Typography';
import NationalCode from 'shared/components/nationalCode/nationalCode';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import serials from 'constants/serial';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import Fieldset from 'shared/components/fieldset/fieldset';
import TabList from 'shared/components/tab/tab';
import Paper from '@material-ui/core/Paper'
import DocumentLegalCustomerComponent from './DocumentLegalCustomerComponent';
import GetServiceOfLegalCustomerComponentTab from './GetServiceOfLegalCustomerComponentTab';
import GetLegalCustomerContactComponentTab from './GetLegalCustomerContactComponentTab';
import GetLegalPartyBankAccountsComponentTab from './GetLegalPartyBankAccountsComponentTab';
import GetLegalCustomersTradingCodesComponentTab from './GetLegalCustomersTradingCodesComponentTab';
// import UpdateRealCustomer from './UpdateRealCustomerComponent';
// import DocumentRealCustomer from './DocumentRealCustomerComponent';
// import ServicesOfRealCustomer from './ServicesOfRealCustomerComponent';
// import DetailRealCustomer from './DetailRealCustomerComponent';

// import GetServiceOfRealCustomerComponentTab from './GetServiceOfRealCustomerComponentTab';
// import GetCustomerContactComponentTab from './GetCustomerContactComponentTab';
// import GetPartyBankAccountsComponentTab from './GetPartyBankAccountsComponentTab';



// const tabs = [
//     {
//         label: "اسناد و مدارک",
//         id:1,
//         component: DocumentRealCustomer,

//     },
//     {
//         label :"اطلاعات بیشتر",
//         id:2,
//         component: DetailRealCustomer
//     },
//     {
//         label: "خدمات",
//         id:3,
//         component: ServiceOfRealCustomerComponent,
//     }
//     // { label: "اطلاعات اولیه", component: <UpdateRealCustomer /> },
// ];
let tabList = [];
let tabId = 1;
class CompleteFormComponentLegal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabList: [
                { label: "اسناد و مدارک", key: 1, id: 1, component: <DocumentLegalCustomerComponent displayName="DocumentLegalCustomerComponent"  {...this.props}/> },
                { label: "خدمات", key: 2, id: 2, component: <GetServiceOfLegalCustomerComponentTab displayName="GetServiceOfLegalCustomerComponentTab"  {...this.props}/> },
                { label: "اطلاعات تماس", key: 3, id: 3, component: <GetLegalCustomerContactComponentTab displayName="GetLegalCustomerContactComponentTab"  {...this.props}/> },
                { label: "مدیریت حسابهای بانکی", key: 4, id: 4, component: <GetLegalPartyBankAccountsComponentTab displayName="GetLegalPartyBankAccountsComponentTab"  {...this.props}/> },
                { label: "مدیریت کد های معاملاتی مشتری", key: 5, id: 5, component: <GetLegalCustomersTradingCodesComponentTab displayName="GetLegalCustomersTradingCodesComponentTab"  {...this.props}/> },
            ]
        };
        console.log('this.props legal !!!!!!!!!',this.props);
        // console.log("constructor");
        // this.initialTabs()
        
    }

   componentDidMount(){

   }
    //     initialTabs() {
    //         tabList=[];
    //         tabs.map((item, id) => {
    //             tabList.push({
    //                 label: item.label,
    //                 id: item.id,
    //                 component: React.createElement(item.component, { ... this.props })
    //             })
    //         })
    //     }
    // getInitialState() {
    //     let initState = JSON.parse(JSON.stringify(initialState));
    //     return initState;
    // }

    render() {
        // console.log("render",tabList);
        // console.log('tabId',this.props.location.state);
      
        if(typeof this.props.location.state  !== 'number'){
            tabId =  this.props.location.state.tabId
        }
       // let tabId = this.props.location.state.tabId == undefined ? 1 : this.props.location.state.tabId
        return (
            <React.Fragment>
                <WrapperPaper />
                <Header {...this.props} />
                {/* <TabList list={tabList}></TabList> */}
                <br />
                <TabList 
                updatePerChange 
                // style={{ height: 535, marginTop: -15 }} 
                list={this.state.tabList}
                selectedTab={this.state.tabList[tabId-1].component}
                ></TabList>
            </React.Fragment >
        )

    }

}
CompleteFormComponentLegal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CompleteFormComponentLegal);