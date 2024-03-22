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
import './prepaymentCommodityTradeUploadComponent.css';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import Columns from '../constants/prepaymentCommodityTradeUploadColumns';
import Uploader from 'shared/components/uploader/uploaderArea';
import NoDataDatePicker from 'shared/components/persianDatePicker/noDataDatePicker';
import '@progress/kendo-ui';
import urlSettings from '../../../../../../constants/urlSettings';
import GetPreReceiveArchive from '../services/GetPreReceiveArchive';

const $ = require("jquery");

class PrepaymentCommodityTradeUploadComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            getDate: new Date(),
            columns: Columns(),
        };


    }

    componentDidMount() {
        this.getTradeList();
        console.log('today', this.state.getDate.toLocaleDateString());
        this.setState({
            getDate: this.state.getDate.toLocaleDateString()
        });
        

        // GetPreReceiveArchive.getprereceivearchiveMethod({optionalFilter: {page:  1,take: 10,}}, (res) => {
        //     console.log('res:: ',res);
        // })

    }
    /* #region get drop-Downs */

    rerenderComponent = (data) => {
        // console.log('data', data.result);

        // this.props.history.push(
        //     {
        //         pathname: '/main/trade/trades/tradeListCommodity',
        //         uploadResultData: data.result
        //     }
        // )

    };
    handleDate = (value) => {
        console.log('handleDate',value);
        
        this.setState({
            getDate: value,
        })
    }

    errorRerenderCompoent = () => {
        this.getTradeList();
    }


    getTradeList = () => {
        let self = this;
        $("#prepaymentcommoditytrade").kendoGrid({
            dataSource: {
                transport: {
                    read: function (option) {
                        if (option.data.state) {
                            self = option.data
                        }
                        var command = {
                           
                            OptionalFilter: {
                                page: option.data.page ? option.data.page : 1,
                                take: option.data.take ? option.data.take : 10,
                                // sort: option.data.sort ? option.data.sort :
                                //     [{
                                //         field: "",
                                //         dir: "desc"
                                //     }]
                            }
                        };
                        
                        GetPreReceiveArchive.getprereceivearchiveMethod(command, function (response) {
                        //     // $("#soknaReport .k-grid-footer .k-grid-footer-wrap " +
                        //     //     "tbody tr td div.total-amount-sum").text(kendo.toString(response.totalAmountSum, 'n0'));
                            option.success(response);
                        })
                    }
                },
                pageSize: 10,
                // sort: {
                //     field: "errorMessage",
                //     dir: "desc"
                // },
                serverPaging: true,
                serverSorting: true,
                schema: {
                    data: "result",
                    total: "totalRecords",
                },
                // aggregate: [
                //     { field: "remainT0", aggregate: "sum" },
                // ]
            },
            autoBind: true,
            sortable: {
                allowUnsort: false
            },
            resizable: true,
            // reorderable: true,
            // navigatable: false,
            // selectable: "multiple",
            columnMenu: {
                messages: {
                    sortAscending: "صعودی",
                    sortDescending: "نزولی",
                    columns: "ستون ها"
                }
            },
            pageable: {
                pageSizes: [50, 150, 200],
                buttonCount: 5,
                messages: {
                    itemsPerPage: "تعداد سطر در هر صفحه",
                    display: "{0} - {1} از {2} مورد",
                    empty: ""
                }
            },
            allowCopy: true,
            
            noRecords: {
                template: '<p class="orange-page font-size-2 no-data">رکوردی جهت نمایش وجود ندارد.</p>'
            },
            dataBound: function (e) {
               
                if (this.dataSource.data().length > 0) {
                    let grid = $("#prepaymentcommoditytrade").data("kendoGrid");
                    let items = grid.dataSource.view();
                    items.map((item, index) => {
                        let id = items[index].uid;
                        let currentRow = grid.table.find("tr[data-uid='" + id + "']");
                        // if (index === this.dataSource.data().length - 1) {
                        if (index === this.dataSource.data().length) {
                            currentRow.css({ display: 'none', visibility: 'hidden' });
                        } else {
                            currentRow.find(".account-code").css({ color: '#039be5', cursor: 'pointer' });
                        }
                    });
                };
               
            },
            columns: self.state.columns,
        });

    };

    render() {

        return (
            <React.Fragment>
                <Header {...this.props} />
                <div className={"main-paper-container prepaymentcommoditytrade"}>
                    <Grid container spacing={8} className="padding-20">
                        <Grid item md={2}>
                            <NoDataDatePicker isNull={true} selectedDate={this.state.getDate} label="تاریخ" handleOnChange={this.handleDate}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="padding-20">
                        <Grid item md={6}>
                            <Uploader data={{ Date: this.state.getDate}} errorRerenderCompoent={this.errorRerenderCompoent} rerenderComponent={this.rerenderComponent}  uploadItem={{title: ''}} accepted={[".xls", ".xlsx"]} uploadUrl={urlSettings.TradeUrl} uploadApi={'settlementcommoditytransaction/uploadprepaymentcommoditytrade'} />
                        </Grid>
                    </Grid>
                    <div className={"k-rtl height-content-grid"}>
                            <div id="prepaymentcommoditytrade" className="height-page"></div>
                    </div>
                </div>
            </React.Fragment>

        )
    }
}

export default PrepaymentCommodityTradeUploadComponent;
