import React from 'react';
import Button from '@material-ui/core/Button';
import { Grid as KendoUiGrid } from '@progress/kendo-react-grid';
import { GridColumn as Column } from '@progress/kendo-react-grid';
import { LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import { orderBy } from '@progress/kendo-data-query';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import faMessages from 'constants/fa.json';
import FaIcon from 'shared/components/Icon/Icon';
import { CustomColumnMenu } from 'shared/components/kendoGrid/kendoGrid';
import Loading from 'core/Loading';
import kendoGrid from './kendoGrid';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Filter from './filterPanel/filterPanel'
import styles from 'containers/layout/panel/theme';
import './kendoServer.css'
import Detail from './detailPanel/detailPanel';
import { connect } from "react-redux";
import '@progress/kendo-ui';
import { object } from 'prop-types';

const $ = require("jquery");

loadMessages(faMessages, 'fa-FA');

class GridServerSideComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: this.props.Columns(this.props, this.state),
            // isLoading: true,
            items: [],
            totalRecords: 0,
            skip: 0,
            take: 50,
            open: false,
            isFirst: true,
            openDetail: this.props.openDetail,
            sort: this.props.sort,
            reRender: false
        };
        // this.onPageChange = this.onPageChange.bind(this);
        // this.onSortChange = this.onSortChange.bind(this);
        this.getFromServer = this.getFromServer.bind(this);
        // this.successAfterGet = this.successAfterGet.bind(this);
        this.handleExpandSearchPanel = this.handleExpandSearchPanel.bind(this);
        this.handleExpandDetailPanel = this.handleExpandDetailPanel.bind(this);
        this.search = this.search.bind(this);
        this.preGet = this.preGet.bind(this);

    }

    getFromServer() {
        let self = this;
       

        $("#kendo-ui-jquery-grid").kendoGrid({
            dataSource: {
                transport: {
                    read: function (option) {
                        var command = {

                            reportFilter: self.props.reportFilter,
                            OptionalFilter: {
                                page: option.data.page ? option.data.page : 1,
                                take: option.data.take ? option.data.take : 50,
                                sort: option.data.sort ? option.data.sort : []
                            }
                        }

                        
                        if (!self.state.isFirst) {
                       
                            self.props.service(command, function (response) {
                                option.success(response);
                            })

                       }
                       else{
                        
                           self.setState({isFirst:false})
                       }

                    }
                }
            },
            pageSize: 50,
            sort: self.props.sort,
            serverPaging: true,
            serverSorting: true,
            schema: {
                data: "result",
                total: "totalRecords",
                model: {
                    fields: self.props.fields
                },
            },
            aggregate: self.props.aggregates,
            autoBind: true,
            sortable: {
                allowUnsort: false
            },
            resizable: true,
            reorderable: true,
            navigatable: false,
            columnMenu: true,
            pageable: {
                pageSizes: [50, 150, 200],
                buttonCount: 5,
                messages: {
                    itemsPerPage: "تعداد سطر در هر صفحه",
                    display: "{0} - {1} از {2} مورد",
                    empty: ""
                }
            },
            allowCopy: true,
            noRecords: {
                template: ' <p class="orange-page font-size-2 no-data">رکوردی جهت نمایش وجود ندارد.</p>'
            },
            columns: self.state.columns

        })

    }



    componentDidUpdate(prevProps, prevState) {

         
        if ((this.props.reRender) && this.state.reRender) {
         console.log("2",this.state.isFirst)

            var command = {
                reportFilter: this.props.reportFilter,
                OptionalFilter: {
                    take: this.state.take,
                    page: (this.state.skip / this.state.take) + 1,
                    sort: this.props.sort
                }
            };
            if (!this.state.isFirst)
            {
                this.setState({
                    reRender: false
                })

            }
                            this.getFromServer(command);

        }
        if (this.props.open !== prevProps.open) {
            this.setState({ open: this.props.open });
        }
        if (this.props.openDetail !== prevProps.openDetail) {
            this.setState({ openDetail: this.props.openDetail });
        }

        if (this.props.setDelete !== prevProps.setDelete) {
            var command = {
                reportFilter: this.props.reportFilter,
                OptionalFilter: {
                    take: this.state.take,
                    page: (this.state.skip / this.state.take) + 1,
                    sort: this.props.sort
                }
            };
            this.getFromServer(command);

        }



    }

    componentDidMount(pre) {
        this.getFromServer();
        if (this.props.requestToService && !this.props.callServiceAgain) {

            let sort = this.props.sort;
            // this.setState({
            //     // isLoading: true
            // })

            if (this.props.sort[0].field.split(".").length == 2) {
                sort = [{
                    field: this.props.sort[0].field.split(".")[1],
                    dir: this.props.sort[0].dir
                }]
            }
            var command = {
                reportFilter: this.props.reportFilter,
                OptionalFilter: {
                    take: this.state.take,
                    page: (this.state.skip / this.state.take) + 1,
                    sort: sort
                }
            }
            this.getFromServer(command);
        } else if (!this.props.requestToService) {
            this.setState({
                isLoading: false,
                res: [],
                items: [],
                totalRecords: 0,
            })
        } else {
            this.setState({
                reRender: true
            })
        }
    }

    preGet() {
        if (this.props.preGet)
            this.props.preGet();
    }


    afterResponse(response) {
        return new Promise((resolve, reject) => {
            resolve(this.props.getNewResponse(response));
        })
    }
    onColumnsSubmit = (columnsState) => {
        this.setState({
            columns: columnsState
        });
    }
    handleExpandSearchPanel() {
        this.setState({
            open: !this.state.open
        })
    }
    handleExpandDetailPanel() {
        this.setState({
            openDetail: !this.state.openDetail
        })
    }
    search() {
        this.preSeaarch().then(result => {

            this.setState({
                skip: 1
            });
            var command = {
                reportFilter: result,

            }
            this.getFromServer(command)
            this.setState((state) => {
                state.open = !state.open
            });
        })
    };

    preSeaarch() {
        return new Promise((resolve, reject) => {
            if (this.props.preSearch)
                resolve(this.props.preSearch())
            else
                resolve(this.props.reportFilter)
        })
    }

 

    render() {
        const { classes } = this.props;
        if (this.state.isLoading) {
            return (<Loading />)
        }
        else {

            return (
                <React.Fragment>
                    {this.props.children ?
                        this.props.children.length === undefined ?
                            <Filter search={this.search} handleExpandSearchPanel={this.handleExpandSearchPanel} {...this.state}>
                                {this.props.children}
                            </Filter>
                            :
                            this.props.children.map(children => {

                                if (children.props.id !== "detail") {
                                    return <Filter byDetail search={this.search} handleExpandSearchPanel={this.handleExpandSearchPanel} {...this.state}>
                                        {children}
                                    </Filter>

                                }

                                else {

                                    return (<Detail search={this.search} handleExpandDetailPanel={this.handleExpandDetailPanel} {...this.state}>
                                        {children}
                                    </Detail>);
                                }
                            })


                        : ''}
                    <Paper className={"main-paper-container-server"}>
                        <div className={"main-height"}>
                            <div className={(this.state.open ? this.props.classHeightOpenPanelFull : (this.state.open ? this.props.classHeightOpenPanel : this.state.openDetail ? this.props.heightOpenDetailPanel : this.props.heightClosePanel))}>
                                <div className="k-rtl height-page">
                                    <div id="kendo-ui-jquery-grid"></div>
                                </div>
                            </div>
                        </div>
                    </Paper>
                </React.Fragment>

            );
        }




    }
}


GridServerSideComponent.defaultProps = {
    heightClosePanel: "heightClosePanel",
    heightOpenDetailPanel: "heightClosePanel",
    classHeightOpenPanelFull: '',
    dynamicColumns: false,
    requestToService: true,
    open: false,
    openDetail: false,
    sort: [
        {
            field: "code",
            dir: "asc"
        }
    ]
}
const mapStateToProps = state => {

    return {
        setDelete: state.setDelete
    };
};



/*<-------------------connect------------->*/
const GridServer = connect(mapStateToProps)(GridServerSideComponent);



export default withStyles(styles)(GridServer);