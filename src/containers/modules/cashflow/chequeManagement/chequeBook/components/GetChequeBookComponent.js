import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetChequeBookColumn';
import Grid from '@material-ui/core/Grid';
import './GetChequeBookComponent.css';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
// import GetTradeNumberService from "../../../trade/trades/tradeNumber/services/GetTradeNumberService";
import GetChequeBookServices from "../services/GetChequeBookServices";
// import {withoutHeaderTmeplate, HeaderwithoutHeaderTmeplate} from "../../../../../../constants/withoutHeaderTmeplate";
// import {bankDepositWithoutHeaderTemplate} from "../../../../../../constants/bankDepositWithoutHeaderTemplate";
// import {chequeBookTitleWidoutHeaderTemplate} from "../../../../../../constants/chequeBookTitleWidoutHeaderTemplate";


class GetChequeBookComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {


            chequeBookTitle: {
                name: "chequeBookTitleSelected",
                placeholder: 'عنوان دسته چک',
                dataTextField: 'title',
                dataValueField: 'id',
                fieldSearch: 'phrase',
                template: null,
                headerTemplate: null
            },
            chequeBookTitleSelected: [],





            bankDeposit: {
                name: "bankDepositSelected",
                placeholder: 'شماره حساب بانک',
                dataTextField: 'fullAccountNumber',
                dataValueField: 'id',
                fieldSearch: 'phrase',
                template: null,
                headerTemplate: null
            },
            bankDepositSelected: [],






            chequeType: {
                name: "selectedChequeType",
                field: "title",
                label: "نوع چک",
                list: []
            },
            selectedChequeType: { code: 0, title: '' },

            // bankDeposit: {
            //     name: "bankDepositSelected",
            //     field: "accountTypeTitle",
            //     label: "شماره حساب بانک",
            //     list: []
            // },
            // bankDepositSelected: [],

            filter: {
                logic: "and",
                filters: []
            }

        };
    }
    componentDidMount() {
        GetEnum('chequetype', response => DropDownListDataProvider(this, "chequeType", response));
    }
    handleChange(value, name) {
        let item = value.value;
        this.setState({
            [name]: item
        })
    }
    removeMultiSelectHandles(event, name) {
        let list = this.state[name];

        for(let i = 0; i < this.state[name].length; i++){
            if(event.id == this.state[name][i].id){
                list.splice(i,1);
            }
        }
        this.setState({
            [name]: list
        });
        console.log('remove in parent', event);
    }
    addMultiSelectHandles(event, name){
        let list = this.state[name];
        list.push(event);
        this.setState({
            [name]: list
        });
        console.log('add in parent', event);
    }
    // filterChange = (e) => {
    //     // alert(12);
    //     this.setState({
    //         filter: e.filter
    //     });
    // }
    excelReportHandler = () => {
        // alert('excel')
        var command = {
            reportFilter: {
                
                id: null,
                title: this.state.chequeBookTitleSelected.length > 0 ?  this.state.chequeBookTitleSelected.map((v) => v.title):[],
                bankDepositId: this.state.bankDepositSelected.length > 0 ?  this.state.bankDepositSelected.map((v) => v.id):[],
                chequeType: this.state.selectedChequeType.code
            
            },
            sort: [
                {
                    field: "code",
                    dir: "asc"
                }
            ]
        };
        GetChequeBookServices.getExcelExport(command, 'دسته چک');

    }
    pdfReportHandler = () => {
        // alert('pdf')
        var command = {
            reportFilter: {
                
                    id: null,
                    title: this.state.chequeBookTitleSelected.length > 0 ?  this.state.chequeBookTitleSelected.map((v) => v.title):[],
                    bankDepositId: this.state.bankDepositSelected.length > 0 ?  this.state.bankDepositSelected.map((v) => v.id):[],
                    chequeType: this.state.selectedChequeType.code
                
            },
            sort: [
                {
                    field: "code",
                    dir: "asc"
                }
            ]
        };
        GetChequeBookServices.getPdfExport(command, 'دسته چک');
    }



 
    render() {
        // console.log('selectedChequeType', this.state.selectedChequeType);
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container chequeBook"}>
                    <GridServer
                        {...this.props}
                        {...this.state}
                        sort={[
                            {
                                field: "",
                                dir: ""
                            }
                        ]}
                        reloadColumnAfterGet
                        service={GetChequeBookServices.getAllCashFlowChequeMasterByFilterMethod}
                        Columns={Columns}
                        reportFilter={
                            {
                                id: null,
                                title: this.state.chequeBookTitleSelected.length > 0 ?  this.state.chequeBookTitleSelected.map((v) => v.title):[],
                                bankDepositId: this.state.bankDepositSelected.length > 0 ?  this.state.bankDepositSelected.map((v) => v.id):[],
                                chequeType: this.state.selectedChequeType.code
                            }
                        }
                        callServiceAgain
                        reRender
                        classHeightOpenPanel={"height-open-grid"}
                        hasToolbar={{haveExcelPfdReport: {excelReportHandler: this.excelReportHandler, pdfReportHandler: this.pdfReportHandler}}}
                        //filterable
                        // filterable={true}
                        // filter={this.state.filter}
                        // onFilterChange={this.filterChange}
                        //filterable
                    >
                        <div classPage={"height-search"}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={6}>
                                    <MultiSelectAutoCompleteComponent
                                        {...this.state.chequeBookTitle}
                                        handleChange={(value) => this.addMultiSelectHandles(value, 'chequeBookTitleSelected')}
                                        handleRemoveItem={(value) => this.removeMultiSelectHandles(value, 'chequeBookTitleSelected')}
                                        service={GetChequeBookServices.searchcashflowchequemasterMethod}
                                        defaultValue={this.state.chequeBookTitleSelected.map((c) =>  {return {title: c.title, id: c.id}})}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <MultiSelectAutoCompleteComponent
                                        {...this.state.bankDeposit}
                                        handleChange={(value) => this.addMultiSelectHandles(value, 'bankDepositSelected')}
                                        handleRemoveItem={(value) => this.removeMultiSelectHandles(value, 'bankDepositSelected')}
                                        service={GetChequeBookServices.searchBankDepositMethod}
                                        defaultValue={this.state.bankDepositSelected.map((c) =>  {return {fullAccountNumber: c.fullAccountNumber, id: c.id}})}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <DropDownComponent
                                            isFilterable
                                            hasAll
                                            {...this.state.chequeType}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            value={this.state.selectedChequeType}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </GridServer>
                </Paper>
            </React.Fragment>

        )
    }
}

export default GetChequeBookComponent;
