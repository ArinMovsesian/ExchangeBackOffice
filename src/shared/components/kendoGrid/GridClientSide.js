import React from 'react';
import Button from '@material-ui/core/Button';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import { orderBy } from '@progress/kendo-data-query';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import faMessages from 'constants/fa.json';
import { connect } from "react-redux";
import { CustomColumnMenu } from 'shared/components/kendoGrid/kendoGrid';
import Loading from 'core/Loading';

loadMessages(faMessages, 'fa-FA');
const $ = require("jquery");
class GridClientSideComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: this.props.Columns(this.props, this.state),
            isLoading: false,
            items: [],
            totalRecords: 0,
            skip: 0,
            take: 50,
            sort: this.props.sort,
            res: [],
           
        };
     
        this.onPageChange = this.onPageChange.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        this.getFromServer = this.getFromServer.bind(this);
        this.successAfterGet = this.successAfterGet.bind(this);
       
    }

    getFromServer() {
     
        this.props.service(this.props.command, this.successAfterGet);
    }

    componentDidUpdate(prevProps,prevState){
        if (this.props.setDelete !== prevProps.setDelete) {
           
            this.getFromServer();

        }
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        this.getFromServer();

    }

    successAfterGet(response) {
        if (response.success) {

            if (response.result && response.result.length > 0) {

                this.setState({
                    res: response.result,
                    items: response.result.slice(this.state.skip, (this.state.skip + this.state.take)),
                    totalRecords: response.totalRecords,
                })
            } else {
                this.setState({
                    res: [],
                    items: [],
                    totalRecords: response.totalRecords,
                })
            }
            this.setState({
                isLoading : false
            })

        }
    }

    onSortChange(e) {
        this.setState({
            sort: e.sort
        }, function () {

        });
    }
    onPageChange(e) {
        this.setState((state) => { return { items: state.res.slice(e.page.skip, (e.page.skip + e.page.take)) } });
        this.setState({
            skip: e.page.skip,
            take: e.page.take,
        }, function () {
        });

    }




    onColumnsSubmit = (columnsState) => {
        this.setState({
            columns: columnsState
        });
    }

    showByDynamicColumn(column) {
    
        return (
            column.isFixed ?
                (
                    !column.dynamicColumn ?
                        <Column
                            key={column.id}
                            field={column.field}
                            title={column.title}
                            className={column.class}
                            width={column.width}

                        />
                        : <Column
                            key={column.id}
                            title={column.title}
                            width={column.width}
                            cell={(e) => column.cell(e)}

                        />) :
                column.show && (
                    !column.dynamicColumn ?
                        <Column
                            key={column.id}
                            field={column.field}
                            title={column.title}
                            className={column.class}
                            width={column.width}
                            filter={column.filter}
                            format={column.format}
                            columnMenu={
                                props =>
                                    <CustomColumnMenu {...props}
                                        columns={this.state.columns}
                                        onColumnsSubmit={this.onColumnsSubmit}
                                    />

                            }
                        />
                        : <Column
                            key={column.id}
                            title={column.title}
                            width={column.width}
                            cell={(e) => column.cell(e)}
                            columnMenu={
                                props =>
                                    <CustomColumnMenu {...props}
                                        columns={this.state.columns}
                                        onColumnsSubmit={this.onColumnsSubmit}
                                    />

                            }
                        />))
    }

    render() {
       
        
        if (this.state.isLoading) {
            return (<Loading />)
        }
        else {
       
            return (

                <div className={(this.state.res.length >= 11 ? "main-height" : '')}>
                
                    <div className="k-rtl height-page">
                        <LocalizationProvider language="fa-FA">
                            <Grid
                                data={this.state.items.length>0 ? orderBy(this.state.items, this.state.sort):this.state.items}
                                style={{ width: '100%', height: '100%' }}
                                skip={this.state.skip}
                                take={this.state.take}
                                total={this.state.totalRecords}
                                pageable={{ pageSizes: [50, 100, 200] }}
                                pageSizes={this.state.take}
                                onPageChange={this.onPageChange}
                                reorderable={true}
                                resizable={true}
                                sortable={{ allowUnsort: false }}
                                sort={this.state.sort}
                                onSortChange={this.onSortChange}>
                                    
                                { 
                                    this.props.hasToolbar
                                    ?   
                                    <GridToolbar>
                                        {    
                                            this.props.hasToolbar.haveExcelPfdReport
                                            ?
                                            <div class="report-area">
                                                <button class="excel-report margin-right-5" onClick={this.props.hasToolbar.haveExcelPfdReport.excelReportHandler}><i class="k-icon k-i-excel"></i></button>
                                                <button class="pdf-report margin-right-5" onClick={this.props.hasToolbar.haveExcelPfdReport.pdfReportHandler}><i class="k-icon k-i-pdf"></i></button>
                                            </div>
                                            :
                                            null

                                        }
                                        {
                                            this.props.hasToolbar.haseExcelReport
                                            ?
                                            <div class="report-area">
                                                <button class="excel-report" onClick={this.props.hasToolbar.haseExcelReport.excelReportHandler}><i class="k-icon k-i-excel"></i></button>
                                            </div>
                                            :
                                            null
                                        }
                                    </GridToolbar>
                                    :
                                    null
                                }
                                {

                                    this.state.columns.map((column, id) =>

                                        this.showByDynamicColumn(column)

                                    )}
                                    
                            

                            </Grid>
                        </LocalizationProvider>
                    </div>
                </div>
            );
        }
    }
}
GridClientSideComponent.defaultProps = {
    
    hasToolbar: false,
    
}
const mapStateToProps = state => {
    return {
        accessToken: state.accessToken,
        setDelete: state.setDelete

    };
};


const mapDispatchToProps = dispatch => {
    return {
        
    };

};

/*<-------------------connect------------->*/
const GridClient = connect(mapStateToProps, mapDispatchToProps)(GridClientSideComponent);

export default GridClient;