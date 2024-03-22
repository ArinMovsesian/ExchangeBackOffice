import React from 'react';
import Paper from '@material-ui/core/Paper';
import GetCostCentersService from '../services/GetCostCentersService';
import Loading from '../../../../../../core/Loading';
import FaIcon from '../../../../../../shared/components/Icon/Icon';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import classNames from 'classnames';
import toastr from 'toastr';
import Grid from '@material-ui/core/Grid';
import action from 'constants/action';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridClient } from '../../../../../../shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/costCenterColumns';
class GetCostCenters extends React.Component {
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
            OptionalFilter: {
                sort: [
                    {
                        field: "code",
                        dir: "asc"
                    }
                ]
            }
        }
        GetCostCentersService.getExcelExport(command,'cost-center');
     }
     pdfReportHandler= () => {}
    render() {
        return (
            <React.Fragment>
          
                <Header {...this.props} />
                <Paper className={"main-paper-container cost-center "}>
                    <GridClient
                        {...this.state}
                        {...this.props}
                        service={GetCostCentersService.getCostCenters}
                        command={null}
                        Columns={Columns}
                        onLoadingChange={this.onLoadingChange}
                        hasToolbar={{haveExcelPfdReport: {excelReportHandler: this.excelReportHandler, pdfReportHandler: this.pdfReportHandler}}}
                    />
                </Paper>
            </React.Fragment>
        )
    }
}

export default GetCostCenters;