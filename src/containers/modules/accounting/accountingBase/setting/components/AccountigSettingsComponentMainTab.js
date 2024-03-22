import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';

import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum'
import kendo from '@progress/kendo-ui';
import moment from 'moment';

import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';

import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';

import { productTemplate, productHeaderTemplate } from 'constants/autoCompleteTemplate';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import '@progress/kendo-ui';

import TabList from 'shared/components/tab/tab';
import AccountingSettingsComponents from './AccountingSettingsComponents';
import AccountingSettingComponentAccountingReport from './AccountingSettingComponentAccountingReport';



const $ = require("jquery");

class AccountigSettingsComponentMainTab extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

            tabList :[
                { label: "عمومی", key: 1, id: 1, component: <AccountingSettingsComponents   displayName="AccountingSettingsComponents"    {...props}/> },
                { label: "گزارش های حسابداری", key: 2, id: 2, component: <AccountingSettingComponentAccountingReport    displayName="AccountingSettingComponentAccountingReport"    {...props}/> },
            ]
        };
    }
    render() {

        return (
            <React.Fragment>
                <Header {...this.props} />
                <br />
                <TabList updatePerChange style={{ marginTop: -15 }}  list={this.state.tabList}></TabList>
            </React.Fragment>

        )
    }
}

export default AccountigSettingsComponentMainTab;
