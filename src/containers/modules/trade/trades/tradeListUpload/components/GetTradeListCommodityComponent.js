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
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete'
import GetPartiesService from '../../../../personsAndCustomers/customers/customersList/services/GetPartiesService';
import { GetAllSectors } from '../../../../../../services/getSectors';
import { searchProducts } from '../../../../../../services/getProducts';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import GetAllProductsPaging from "../../../../../../services/getProducts";
import { productTemplate, productHeaderTemplate } from 'constants/autoCompleteTemplate';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import {myContext} from '../../../../../../store/contextProvider/provider';
import '@progress/kendo-ui';
import './GetTradeListCommodityComponent.css';
import customersCommodityTradeCountColumn from '../../tradeListCommodity/constants/GetTradeListCommidityConstants';
import {resultCommodityTrade} from '../../tradeListCommodity/constants/GetTradeListCommidityConstants';



import GetTradeListCommodityServices from "../../tradeListCommodity/services/GetTradeListCommodityServices";
import urlSettings from "../../../../../../constants/urlSettings";
const $ = require("jquery");

class GetTradeListCommodityComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sort: [{
                field: "created",
                dir: "desc"
            }],
        };

    }

    componentDidMount() {
        console.log('ss', this.props.history.location.uploadResultData);
    }
    /* #region get drop-Downs */


    render() {

        return (
            <React.Fragment>
                <Paper className={"main-paper-container"}>
                        <div className={"Result-Commodity-Trade"}>
                            <h1 style={{padding: '20px 5px'}}>رکورهای ثبت نشده</h1>
                            <GridServer
                                {...this.props}
                                {...this.state}
                                service={GetTradeListCommodityServices.resultCommodityTradeMethod}
                                Columns={resultCommodityTrade}
                                command={null}
                                sort={this.state.sort}
                                reRender={true}
                                callServiceAgain={true}
                            >
                            </GridServer>
                        </div>

                        <div className={"Customers-Commodity-Trade-Count"}>
                            <h1 style={{padding: '20px 5px'}}>وضعیت فایل بارگزاری شده</h1>
                            <GridServer
                                {...this.props}
                                {...this.state}
                                service={GetTradeListCommodityServices.customersCommodityTradeCountMethod}
                                Columns={customersCommodityTradeCountColumn}
                                command={null}
                                sort={this.state.sort}
                                reRender={true}
                                callServiceAgain={true}
                                >
                            </GridServer>
                        </div>
                </Paper>
            </React.Fragment>

        )
    }
}
GetTradeListCommodityComponent.defaultProps= {
    downloadURL: urlSettings.TradeUrl,
};
export default GetTradeListCommodityComponent;
