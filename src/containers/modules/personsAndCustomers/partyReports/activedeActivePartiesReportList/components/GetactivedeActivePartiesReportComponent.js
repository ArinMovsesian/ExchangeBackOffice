import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetActivedeActivePartiesReportColumn';
import Grid from '@material-ui/core/Grid';
import './GetActivedeActivePartiesReportComponent.css';
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
import GetActivedeActivePartiesReportServices from '../services/GetActivedeActivePartiesReportServices';



class GetActivedeActivePartiesReportComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {


            startDate: new Date(),
            endDate: new Date(),

            
            // filter: {
            //     logic: "and",
            //     filters: []
            // }

        };
    }
    
    handleDate = (value, name) => {
        this.setState({
            [name]: value,
        })
    }

 
    excelReportHandler = () => {
        
        var command = {
            reportFilter: {
                startDate: this.state.startDate,
                endDate: this.state.endDate
                
            
            },
            sort: [
                {
                    field: "partyType",
                    dir: "asc"
                }
            ]
        };
        GetActivedeActivePartiesReportServices.getExcelExport(command, 'مشتریان فعال و غیرفعال');

    }
    pdfReportHandler = () => {
   
        var command = {
            reportFilter: {
                
                startDate: this.state.startDate,
                endDate: this.state.endDate
                
            },
            sort: [
                {
                    field: "partyType",
                    dir: "asc"
                }
            ]
        };
        GetActivedeActivePartiesReportServices.getPdfExport(command, 'مشتریان فعال و غیرفعال');
    }

  
    render() {
        console.log('props', this.props);
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container activedeactiveparties"}>
                  <GridServer
                        {...this.props}
                        {...this.state}
                        sort={[
                            {
                                field: "partyType",
                                dir: "asc"
                            }
                        ]}
                        reloadColumnAfterGet
                        service={GetActivedeActivePartiesReportServices.activedeactivepartiesreportMethod}
                        Columns={Columns}
                        reportFilter={
                            {
                                dateFilter: {
                                    startDate: this.state.startDate,
                                    endDate: this.state.endDate
                                }
                            }
                        }
                        callServiceAgain
                        reRender
                        // classHeightOpenPanel={"height-open-grid"}
                        hasToolbar={{haveExcelPfdReport: {excelReportHandler: this.excelReportHandler, pdfReportHandler: this.pdfReportHandler}}}
                    >
                        <div classPage={"height-search"}>
                        <Grid container spacing={8} className="no-margin">
                           
                         
                       
                            <Grid item md={5}>
    
                                    <NoDataDatePicker isNull={true} selectedDate={this.state.startDate} label="از تاریخ" handleOnChange={(value) => this.handleDate(value,'startDate')}/>
                                    {/* <PersianDatePicker selectedDate={this.state.BirthDate} label="تاریخ تولد" handleOnChange={this.handleBirthDate} /> */}
                            </Grid>
                            <Grid item md={5}>
                           
                                    <NoDataDatePicker isNull={true} selectedDate={this.state.endDate} label="تا تاریخ" handleOnChange={(value) => this.handleDate(value,'endDate')}/>
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

export default GetActivedeActivePartiesReportComponent;
