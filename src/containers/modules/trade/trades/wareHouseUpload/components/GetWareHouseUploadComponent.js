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
import Uploader from 'shared/components/uploader/uploaderArea';
import '@progress/kendo-ui';
import urlSettings from '../../../../../../constants/urlSettings';


const $ = require("jquery");

class GetWareHouseUploadComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };


    }

    componentDidMount() {


    }
    /* #region get drop-Downs */

    rerenderComponent = (data) => {
        console.log('data', data.result);

        // this.props.history.push(
        //     {
        //         pathname: '/main/trade/trades/tradeListCommodity',
        //         uploadResultData: data.result
        //     }
        // )

    };
    render() {

        return (
            <React.Fragment>
                <Header {...this.props} />

                    <Grid container spacing={8} className="padding-20">
                        <Grid item md={6}>
                            <Uploader rerenderComponent={this.rerenderComponent}  uploadItem={{title: ''}} accepted={[".xls", ".xlsx"]} uploadUrl={urlSettings.TradeUrl} uploadApi={'trade/uploadwarehousetrade'} />
                        </Grid>
                    </Grid>

            </React.Fragment>

        )
    }
}

export default GetWareHouseUploadComponent;
