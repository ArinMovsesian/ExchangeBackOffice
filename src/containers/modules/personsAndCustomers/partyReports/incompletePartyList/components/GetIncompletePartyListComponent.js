import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetIncompletePartyColumn';
import Grid from '@material-ui/core/Grid';
import './GetIncompletePartyListComponent.css';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import NoDataDatePicker from 'shared/components/persianDatePicker/noDataDatePicker';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import GetIncompletePartyService from '../services/GetIncompletePartyService';



class GetIncompletePartyListComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {


            attachmentcategorytype: {
                name:"attachmentcategorytypeSelected",
                field:'title',
                list:[],
                label:"نوع دسته بندی"
            },
            attachmentcategorytypeSelected: [],



            partyType: {
                name: "selectedPartyType",
                field: "title",
                label: "نوع مشتری",
                list: []
            },
            selectedPartyType: { code: 0, title: '' },

            lastModificationDate: new Date(),

            
            // filter: {
            //     logic: "and",
            //     filters: []
            // }

        };
    }
    componentDidMount() {
        GetEnum('attachmentcategorytype',(res) => {
            console.log('attachmentcategorytype: ', res);
        });
        GetEnum('partytype', response => DropDownListDataProvider(this, "partyType", response));
        GetEnum('attachmentcategorytype', response => DropDownListDataProvider(this, "attachmentcategorytype", response));
    }
    handleChange = (value, name) =>{
        let item = value.value;
        this.setState({
            [name]: item
        })
    };
    handleDate = (value) => {
        this.setState({
            lastModificationDate: value,
        })
    }

 
    excelReportHandler = () => {
      
        var command = {
            reportFilter: {
                
                partyAttachmentList: this.state.attachmentcategorytypeSelected.length > 0 ? this.state.attachmentcategorytypeSelected.map(s=>{return s.code}) : [],
                partyType: this.state.selectedPartyType.code,
                lastModificationDate: this.state.lastModificationDate
            
            },
            sort: [
                {
                    field: "fullName",
                    dir: "asc"
                }
            ]
        };
        GetIncompletePartyService.getExcelExport(command, 'مشتریان ناقص');

    }
    pdfReportHandler = () => {
        // alert('pdf')
        var command = {
            reportFilter: {
                
                partyAttachmentList: this.state.attachmentcategorytypeSelected.length > 0 ? this.state.attachmentcategorytypeSelected.map(s=>{return s.code}) : [],
                partyType: this.state.selectedPartyType.code,
                lastModificationDate: this.state.lastModificationDate
                
            },
            sort: [
                {
                    field: "fullName",
                    dir: "asc"
                }
            ]
        };
        GetIncompletePartyService.getPdfExport(command, 'مشتریان ناقص');
    }

  
    render() {
        console.log('props', this.props);
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container inCompletePartyList"}>
                  <GridServer
                        {...this.props}
                        {...this.state}
                        sort={[
                            {
                                field: "fullName",
                                dir: "asc"
                            }
                        ]}
                        reloadColumnAfterGet
                        service={GetIncompletePartyService.getflatpartyserviceMethod}
                        Columns={Columns}
                        reportFilter={
                            {
                                partyAttachmentList: this.state.attachmentcategorytypeSelected.length > 0 ? this.state.attachmentcategorytypeSelected.map(s=>{return s.code}) : [],
                                partyType: this.state.selectedPartyType.code,
                                lastModificationDate: this.state.lastModificationDate
                            }
                        }
                        callServiceAgain
                        reRender
                        classHeightOpenPanel={"height-open-grid"}
                        hasToolbar={{haveExcelPfdReport: {excelReportHandler: this.excelReportHandler, pdfReportHandler: this.pdfReportHandler}}}
                    >
                        <div classPage={"height-search"}>
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={12}>
                                        <div className="k-rtl">
                                            <MultiSelectComponent
                                                {...this.state.attachmentcategorytype}
                                                handleChange={(value, name) => this.handleChange(value, name)}
                                                isFilterable={true}
                                                value={this.state.attachmentcategorytypeSelected} />
                                        </div>
                            </Grid>
                            </Grid>
                            <Grid container spacing={8} className="no-margin">
                            <Grid item md={3}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.partyType}
                                    handleChange={(value) => this.handleChange(value, 'selectedPartyType')} isFilterable={false}
                                    value={this.state.selectedPartyType} required />
                                </div>
                            </Grid>
                            <Grid item md={3}>
                           
                                    <NoDataDatePicker isNull={true} selectedDate={this.state.lastModificationDate} label="تاریخ آخرین ویرایش" handleOnChange={this.handleDate}/>
                                    {/* <PersianDatePicker selectedDate={this.state.BirthDate} label="تاریخ تولد" handleOnChange={this.handleBirthDate} /> */}
                                
                            </Grid>
                        </Grid>
                        </div>
                    </GridServer>
                </Paper>
            </React.Fragment>

        )
    }
}

export default GetIncompletePartyListComponent;
