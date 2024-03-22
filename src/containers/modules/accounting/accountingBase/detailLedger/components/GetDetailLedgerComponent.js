import React from 'react';
import GetDetailLedgerService from '../services/GetDetailLedgerService'
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridServer } from '../../../../../../shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/detailLedgerColumns'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../../../../layout/panel/theme';
import "./GetDetailLedgerComponent.css";
class GetDetailLedger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            fromCode: null,
            toCode: null
        }
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeFromCode = this.handleChangeFromCode.bind(this);
        this.handleChangeToCode = this.handleChangeToCode.bind(this);
    }
    componentDidMount() {
        this.setState({
            isLoading: true
        });
    }

    componentDidUpdate() {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.title !== this.state.title || nextState.fromCode !== this.state.fromCode || nextState.toCode !== this.state.toCode;
    }


    handleChangeTitle(item) {
        this.setState({ title: item.value })
    }
    handleChangeFromCode(item) {

        this.setState({
            fromCode: item.value,
        })
    }
    handleChangeToCode(item) {
        this.setState({
            toCode: item.value,
        })
    }
    excelReportHandler = () => {
        var command = {
            ReportFilter: {
                fromCode: this.state.fromCode,
                toCode: this.state.toCode,
                title: this.state.title
            },
            OptionalFilter: {
                sort: [
                    {
                        field: "code",
                        dir: "asc"
                    }
                ]
            }
        }
        GetDetailLedgerService.getExcelExport(command,'detail-ledger');
     }
     pdfReportHandler= () => {}

    render() {


        const { classes } = this.props;
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container detail-ledger"}>
                    <GridServer
                        reportFilter={
                            {
                                fromCode: this.state.fromCode === null || this.state.fromCode === '' ? 0: this.state.fromCode,
                                toCode: this.state.toCode === null || this.state.toCode === '' ? 0: this.state.toCode,
                                title: this.state.title
                            }
                        }
                        service={GetDetailLedgerService.getDetailledgers}
                        Columns={Columns}
                        classHeightOpenPanel={"height-open-grid"}
                        hasToolbar={{haveExcelPfdReport: {excelReportHandler: this.excelReportHandler, pdfReportHandler: this.pdfReportHandler}}}
                        >
                        <div classPage={"height-search"}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={4} className="padding-right-10">
                                    <Input label="عنوان" handleChange={this.handleChangeTitle} value={this.state.title} />
                                </Grid>
                                <Grid item md={2} className="padding-right-10">
                                    <Input label="از کد" handleChange={this.handleChangeFromCode} type="number" min={this.state.toCode} value={this.state.fromCode} />
                                </Grid>
                                <Grid item md={2} className="padding-right-10">
                                    <Input label="تا کد" type="number" min={this.state.fromCode} handleChange={this.handleChangeToCode} value={this.state.toCode} />
                                </Grid>
                            </Grid>
                        </div>

                    </GridServer>
                </Paper>
            </React.Fragment>
        )
    }


}

export default withStyles(styles)(GetDetailLedger);