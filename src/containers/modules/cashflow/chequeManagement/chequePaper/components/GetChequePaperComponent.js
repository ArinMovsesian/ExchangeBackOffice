import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetChequePaperColumn';
import Grid from '@material-ui/core/Grid';
import "./GetChequePaperComponent.css";
import DropDownComponent from 'shared/components/dropDown/dropDown';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete';
import Input from 'shared/components/formInput/inputForm';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import GetChequePaperServices from "../services/GetChequePaperServices";
import GetChequeBookServices from "../../chequeBook/services/GetChequeBookServices";
import { element } from 'prop-types';

// import {chequeBookTitleWidoutHeaderTemplate} from "../../../../../../constants/chequeBookTitleWidoutHeaderTemplate";


class GetChequePaperComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chequeBookTitle: {
                name: "chequeBookTitleSelected",
                // field: "fullName",
                // list: [],
                // value:'',
                placeholder: 'عنوان دسته چک',
                dataTextField: 'title',
                dataValueField: 'id',
                fieldSearch: 'phrase',
                template: null,
                headerTemplate: null
            },
            chequeBookTitleSelected: [],

            chequeStatus: {
                name: "selectedChequeStatus",
                feild: "title",
                label: "وضعیت چک",
                list: []
            },
            selectedChequeStatus: {},


            chequeType: {
                name: "selectedChequeType",
                feild: "title",
                label: "نوع چک",
                list: []
            },
            selectedChequeType: {},



            fromSerial: '',
            toSerial: ''
        };
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

    componentDidMount() {
       
        GetEnum("chequestate", (response)=>  {console.log('sss',response);DropDownListDataProvider(this,"chequeStatus",response)});
        GetEnum('chequetype', response => DropDownListDataProvider(this, "chequeType", response));
    }
    handleChange(value, name) {

        let item = value.value;
        this.setState({
            [name]: item
        })
    }

    excelReportHandler = () => {
        // alert('excel')
        var command = {
            reportFilter: {
                
                title:  this.state.chequeBookTitleSelected.length > 0 ?  this.state.chequeBookTitleSelected.map((val) => val.title):[],
                chequeState: this.state.selectedChequeStatus.code,
                fromSerial: this.state.fromSerial,
                toSerial: this.state.toSerial,
                chequeType: this.state.selectedChequeType.code,
            
            },
            sort: [
                {
                    field: "",
                    dir: ""
                }
            ]
        };
        GetChequePaperServices.getExcelExport(command, 'برگه چک');

    }
    pdfReportHandler = () => {
        // alert('pdf')
        var command = {
            reportFilter: {
                
                title:  this.state.chequeBookTitleSelected.length > 0 ?  this.state.chequeBookTitleSelected.map((val) => val.title):[],
                chequeState: this.state.selectedChequeStatus.code,
                fromSerial: this.state.fromSerial,
                toSerial: this.state.toSerial,
                chequeType: this.state.selectedChequeType.code,
                
            },
            sort: [
                {
                    field: "",
                    dir: ""
                }
            ]
        };
        GetChequePaperServices.getPdfExport(command, 'برگه چک');
    }
    render() {
        console.log('chequeBookTitleSelected', this.state.chequeBookTitleSelected);
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container chequePaper"}>
                    <GridServer
                        {...this.props}
                        {...this.state}
                        sort={[
                            {
                                field: "",
                                dir: ""
                            }
                        ]}
                        reloadColumnAfterGet={true}
                        service={GetChequePaperServices.getallcashflowchequedetailbyfilterMethod}
                        Columns={Columns}
                        reportFilter={
                            {
                                title:  this.state.chequeBookTitleSelected.length > 0 ?  this.state.chequeBookTitleSelected.map((val) => val.title):[],
                                chequeState: this.state.selectedChequeStatus.code,
                                fromSerial: this.state.fromSerial,
                                toSerial: this.state.toSerial,
                                chequeType: this.state.selectedChequeType.code,

                            }
                        }
                        callServiceAgain={true}
                        reRender
                        classHeightOpenPanel={"height-open-grid"}
                        hasToolbar={
                            {
                                haveExcelPfdReport: {
                                    excelReportHandler: this.excelReportHandler,
                                    pdfReportHandler: this.pdfReportHandler,
                                },
                                
                            }
                        }
                        >
                        <div classPage={"height-search"}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={8}>
                                    <MultiSelectAutoCompleteComponent
                                        {...this.state.chequeBookTitle}
                                        handleChange={(value) => this.addMultiSelectHandles(value, 'chequeBookTitleSelected')}
                                        handleRemoveItem={(value) => this.removeMultiSelectHandles(value, 'chequeBookTitleSelected')}
                                        service={GetChequeBookServices.searchcashflowchequemasterMethod}
                                        defaultValue={this.state.chequeBookTitleSelected.map((c) =>  {return {title: c.title, id: c.id}})}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <DropDownComponent
                                            {...this.state.chequeStatus}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            isFilterable={true}
                                            value={this.state.selectedChequeStatus}
                                            hasAll
                                        />
                                    </div>
                                </Grid>
                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <DropDownComponent
                                            {...this.state.chequeType}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            isFilterable={true}
                                            value={this.state.selectedChequeType}
                                            hasAll
                                        />
                                    </div>
                                </Grid>
                                <Grid item md={2}>
                                    <Input label="از سریال" handleChange={(e) => this.handleChange(e, 'fromSerial')} value={this.state.fromSerial} />
                                </Grid>
                                <Grid item md={2}>
                                    <Input label="تا سریال" handleChange={(e) => this.handleChange(e, 'toSerial')} value={this.state.toSerial} />
                                </Grid>
                            </Grid>

                        </div>
                    </GridServer>
                </Paper>
            </React.Fragment>

        )
    }
}

export default GetChequePaperComponent;
