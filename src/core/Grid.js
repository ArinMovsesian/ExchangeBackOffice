import React from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { IntlProvider, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import columns from './columns.js';
import faMessages from '../constants/fa.json';

loadMessages(faMessages, 'fa-FA');

class GridComponent extends React.Component {
    constructor(props) {
        super(props);

        const dataState = this.createDataState({
            take: 8,
            skip: 0
        });

        this.state = {
            columns: columns,
            ...dataState
        };
    }

    createDataState(dataState) {
        return {
            result: process(products.slice(0), dataState),
            dataState: dataState
        };
    }

    dataStateChange = (event) => {
        this.setState(this.createDataState(event.data));
    }

    onColumnsSubmit = (columnsState) => {
        this.setState({
            columns: columnsState
        });
    }

    render() {
        if (this.props.serverSide) {
            return (
                <LocalizationProvider language="fa-FA">
                    <Grid
                        ata={this.props.items}
                        style={{ width: '100%', height: '100%' }}
                        skip={this.props.skip}
                        take={this.props.take}
                        total={this.props.totalRecords}
                        pageable={{ pageSizes: [50, 75, 100], }}
                        onPageChange={this.props.pageChange}
                        reorderable={true}
                        sortable={true}
                        sort={this.props.sort}
                        onSortChange={this.props.sortChange}>
                        {
                            this.props.columns.map((column, idx) =>
                                column.show && (<Column
                                    key={idx}
                                    field={column.field}
                                    title={column.title}
                                    filter={column.filter}
                                    columnMenu={
                                        props =>
                                            <CustomColumnMenu
                                                {...props}
                                                columns={this.state.columns}
                                                onColumnsSubmit={this.onColumnsSubmit}
                                            />
                                    }
                                />)
                            )}
                    </Grid>
                </LocalizationProvider>
            );
        } else {
            return (
                <LocalizationProvider language="fa-FA">
                    <Grid
                        data={orderBy(this.props.items, this.props.sort)}
                        style={{ width: '100%', height: '100%' }}
                        skip={this.props.skip}
                        take={this.props.take}
                        total={this.props.totalRecords}
                        pageable={{ pageSizes: [50, 75, 100], }}
                        onPageChange={this.props.pageChange}
                        reorderable={true}
                        sortable={true}
                        sort={this.props.sort}
                        onSortChange={this.props.sortChange}>
                        
                        <Column field="row" title="ردیف" width="80px" sortable={false} />
                        <Column field="code" title="کد" width="105px" />
                        <Column field="title" title="عنوان" className="text-right" />
                        <Column field="categoryTitle" title="گروه حساب کل" width="250px" className="text-right" />
                        <Column field="natureTitle" title="ماهیت حساب" width="250px" className="text-right" />
                        <Column title="ویرایش" width="80px" sortable={false} />
                        {/* <Column title="حذف" width="155px" sortable={false} /> */}
                    </Grid>
                </LocalizationProvider>
            )
        }

    }
}
export default GridComponent;