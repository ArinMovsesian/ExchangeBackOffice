import React from 'react';
import Paper from '@material-ui/core/Paper';
import GetGeneralLedgerService from '../services/GetGeneralLedgerService';
import Loading from '../../../../../../core/Loading';
import FaIcon from '../../../../../../shared/components/Icon/Icon';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import classNames from 'classnames';
import toastr from 'toastr';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridClient } from '../../../../../../shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/generalLedgerColumns';

class GetGeneralLedger extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sort: [
                {
                    field: "code",
                    dir: "asc"
                }
            ]
        }
    }
    excelReportHandler = () => {
       var command = {
        sort: [
            {
                field: "code",
                dir: "asc"
            }
        ]
       }
        GetGeneralLedgerService.getExcelExport(command,'general-ledger');
    }
    pdfReportHandler= () => {
        var command = {
            sort: [
                {
                    field: "code",
                    dir: "asc"
                }
            ]
           }
        GetGeneralLedgerService.getPdfExport(command,'general-ledger');
    }
    render() {
        return (
            <React.Fragment>
                <WrapperPaper />
                <Header {...this.props} />
                <Paper className={"main-paper-container general-ledger"}>
                    <GridClient
                        {...this.state}
                        {...this.props}
                        command={null}
                        service={GetGeneralLedgerService.getGeneralLedgers}
                        Columns={Columns}
                        hasToolbar={{haveExcelPfdReport: {excelReportHandler: this.excelReportHandler, pdfReportHandler: this.pdfReportHandler}}}  
                    />
                </Paper>
            </React.Fragment>
        )
    }
}

export default GetGeneralLedger;