import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Paper from '@material-ui/core/Paper';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetCustomersInternetactivityColumn';
import Grid from '@material-ui/core/Grid';
import './GetCustomersInternetactivityComponent.css';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownListDataProvider from "core/dropDownListDataProvider";
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import GetEnum from 'services/getEnum';
import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import NoDataDatePicker from 'shared/components/persianDatePicker/noDataDatePicker';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import GetPartiesService from '../../../customers/customersList/services/GetPartiesService';
import GetCustomersInternetactivityServices from '../services/GetCustomersInternetactivityServices';



class GetCustomersInternetactivityComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جتسجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
            },
            selectedParty: {fullName : '', id: 0},
           

            startDate: null,
            endDate: null,

            
            // filter: {
            //     logic: "and",
            //     filters: []
            // }

        };
    }
    componentDidMount() {
      
    }
    handlePartyChange = (value) =>{
        let item = value.value;
        this.setState({
            selectedParty: item
        })
    };
    handleDate = (value, name) => {
        this.setState({
            [name]: value,
        })
    }

 
    excelReportHandler = () => {
        // alert('excel')
        var command = {
            reportFilter: {
                
                partyId: this.state.selectedParty.id,
                dateFilter: {
                    startDate: this.state.startDate,
                    endDate: this.state.endDate
                }
            
            },
            sort: [
                {
                    field: "partyFullName",
                    dir: "asc"
                }
            ]
        };
        GetCustomersInternetactivityServices.getExcelExport(command, 'فعالیت اینترنتی مشتریان');

    }
    pdfReportHandler = () => {
        // alert('pdf')
        var command = {
            reportFilter: {
                partyId: this.state.selectedParty.id,
                dateFilter: {
                    startDate: this.state.startDate,
                    endDate: this.state.endDate
                }
                
            },
            sort: [
                {
                    field: "partyFullName",
                    dir: "asc"
                }
            ]
        };
        GetCustomersInternetactivityServices.getPdfExport(command, 'فعالیت اینترنتی مشتریان');
    }

  
    render() {

        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container customersInternetactivity"}>
                  <GridServer
                        {...this.props}
                        {...this.state}
                        sort={[
                            {
                                field: "detailLedgerCode",
                                dir: "asc"
                            }
                        ]}
                        reloadColumnAfterGet
                        service={GetCustomersInternetactivityServices.getcustomersinternetactivityMethod}
                        Columns={Columns}
                        reportFilter={
                            {
                                partyId: this.state.selectedParty.id,
                                dateFilter: {
                                    startDate: this.state.startDate,
                                    endDate: this.state.endDate
                                }
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
                                <AutoCompleteComponent {...this.state.party}
                                handleChange={(value) => this.handlePartyChange(value)}
                                value={this.state.selectedParty.fullName}
                                service={GetPartiesService.getAllPartyForAutocomplete} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} className="no-margin">
                            <Grid item md={3}>
                                    <NoDataDatePicker isNull={true} selectedDate={this.state.startDate} label="تاریخ آخرین ویرایش" handleOnChange={(e) => this.handleDate(e, 'startDate') }/>
                                    {/* <PersianDatePicker selectedDate={this.state.BirthDate} label="تاریخ تولد" handleOnChange={this.handleBirthDate} /> */}     
                            </Grid>
                            <Grid item md={3}>
                           
                                    <NoDataDatePicker isNull={true} selectedDate={this.state.endDate} label="تاریخ آخرین ویرایش" handleOnChange={(e) => this.handleDate(e, 'endDate')}/>
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

export default GetCustomersInternetactivityComponent;
