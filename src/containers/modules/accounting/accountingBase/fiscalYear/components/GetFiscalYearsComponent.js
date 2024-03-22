/* #region imports */
import React from 'react';
import GetFiscalYearsService from '../services/GetFiscalYearsService';
import Paper from '@material-ui/core/Paper';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import { withStyles } from '@material-ui/core/styles';
import styles from 'containers/layout/panel/theme';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridClient } from '../../../../../../shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/fiscalYearsColumns';
/* #endregion */


class GetFiscalYears extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: [
                {
                    field: "title",
                    dir: "asc"
                }
            ]
        }

    }
    componentDidMount() {
     
    }
    excelReportHandler = () => {
        var command = {
            OptionalFilter: {
                sort: [
                    {
                        field: "code",
                        dir: "asc"
                    }
                ]
            }
        }
        GetFiscalYearsService.getExcelExport(command,'fiscal-year');
     }
     pdfReportHandler= () => {}
    render() {
        return (
            <React.Fragment>
                <WrapperPaper />
                <Header {...this.props} />
                <Paper className={"main-paper-container fiscal-year"}>
                <GridClient
                        {...this.state}
                        {...this.props}
                        service={GetFiscalYearsService.getFiscalYears}
                        command={null}
                        Columns={Columns}
                        onLoadingChange={this.onLoadingChange}
                        hasToolbar={{haveExcelPfdReport: {excelReportHandler: this.excelReportHandler, pdfReportHandler: this.pdfReportHandler}}}
                    />
                </Paper>

            </React.Fragment>
        );
    }
}


export default withStyles(styles)(GetFiscalYears);
