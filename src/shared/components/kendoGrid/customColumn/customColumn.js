import React from 'react';
import { GridColumnMenuItemGroup, GridColumnMenuItem, GridColumnMenuItemContent } from '@progress/kendo-react-grid';

class CustomColumnMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: this.props.columns,
            columnsExpanded: false,
        };
    }

    onToggleColumn = (id) => {
        this.setState({
            columns: this.state.columns.map((column, idx) => {
                return idx === id ? { ...column, show: !column.show } : column;
            })
        });
    }

    onReset = (event) => {
        event.preventDefault();
        const allColumns = this.props.columns.map(col => {
            return {
                ...col,
                show: true
            };
        });

        this.setState({ columns: allColumns }, () => this.onSubmit());
    }

    onSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        this.props.onColumnsSubmit(this.state.columns);
        if (this.props.onCloseMenu) {
            this.props.onCloseMenu();
        }
    }

    onMenuItemClick = () => {
        const value = !this.state.columnsExpanded;
        this.setState({
            columnsExpanded: value,
        });
       
    }

    render() {
        const oneVisibleColumn = this.state.columns.filter(c => c.show).length === 1;

        return (
            <div>
                <GridColumnMenuItemGroup>
                    <GridColumnMenuItem
                        title={'ستون ها'}
                        iconClass={'k-i-columns'}
                        onClick={this.onMenuItemClick}
                    />
                    <GridColumnMenuItemContent show={this.state.columnsExpanded}>
                        <div className={'k-column-list-wrapper'}>
                            <form onSubmit={this.onSubmit} onReset={this.onReset}>
                                <div className={'k-column-list'}>
                                    {this.state.columns.map((column, idx) =>
                                        (
                                           !column.isFixed?
                                            <div key={idx} className={'k-column-list-item'}>
                                                <span>
                                                    <input
                                                        id={`column-visiblity-show-${idx}`}
                                                        className="k-checkbox"
                                                        type="checkbox"
                                                        readOnly={true}
                                                        disabled={column.show && oneVisibleColumn}
                                                        checked={column.show}
                                                        onClick={() => { this.onToggleColumn(idx); }}
                                                    />
                                                    <label
                                                        htmlFor={`column-visiblity-show-${idx}`}
                                                        className="k-checkbox-label"
                                                        style={{ userSelect: 'none' }}
                                                    >
                                                        {column.title}
                                                    </label>
                                                </span>
                                            </div>
                                            :''
                                        )
                                    )}
                                </div>
                                <div className={'k-columnmenu-actions'}>
                                    <button type={'reset'} className={'k-button'}>پاک کردن</button>
                                    <button className={'k-button k-primary'}>ذخیره</button>
                                </div>
                            </form>
                        </div>
                    </GridColumnMenuItemContent>
                </GridColumnMenuItemGroup>
            </div>);
    }
}

export default CustomColumnMenu;