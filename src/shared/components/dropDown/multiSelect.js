import React from 'react';
import '@progress/kendo-ui';
import { DropDownList, MultiSelect } from '@progress/kendo-react-dropdowns';
import { AutoComplete } from '@progress/kendo-dropdowns-react-wrapper';
import { filterBy } from '@progress/kendo-data-query';


class MultiSelectComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.list,
            value: this.props.value,
            opened: false,
            loading: false
        }
        this.template = "<span>This is #:data# with template</span>"
        this.filterChange = this.filterChange.bind(this);
        this.filterChangeAutoComplete = this.filterChangeAutoComplete.bind(this);
        this.filterData = this.filterData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    componentDidUpdate(prevProps) {

        if (prevProps !== this.props) {
            if (this.props.value.length > 0 && this.props.selectField) {
                let value = [];
                this.props.value.map(v => {
                    if (typeof (v) !== 'object') {
                        this.props.list.map(m => {
                            if (m[this.props.selectField] == v)
                                value.push(m);
                        })
                    }
                    this.setState({
                        data: this.props.list,
                        value: value
                    })


                })
            }
            else {
                this.setState({
                    data: this.props.list,
                    value: this.props.value
                })
            }


        }
    }

    templateAutoComplete(event) {

    }
    filterChange = (event) => {
        this.setState({
            data: this.filterData(event.filter)
        });
    }

    filterData(filter) {
        const data = this.props.list.slice();
        return filterBy(data, filter);
    }

    handleChange(e, name) {

        this.setState({
            value: e.target.value
        })
        let value = [];
        if (this.props.selectField) {
            e.target.value.map(v => {
                value.push(e.target.value[this.props.selectField])
            })


        }
        else {
            value = e.target.value
        }
        this.props.handleChange({ value: value }, name);
    }
    handleBlur(e, name) {
        this.setState({
            opened: true
        })
        this.state.data.map(item => {
            if (item.fullName === e.target.value)
                e.target.selectedItem = item
        })
        this.props.handleChange({ value: e.target.selectedItem })

    }

    handleChangeItem(e, name) {
        this.setState({
            value: e.target.value
        })

        if (e.target.value.length >= 3) {
            this.setState({
                loading: true,
                opened: true
            })
            this.filterChangeAutoComplete(e)
        }
        else {
            this.setState({
                data: [],
                opened: false
            })
        }
    }
    filterChangeAutoComplete = (e) => {
        var command = {
            reportFilter: {
                pharse: e.target.value
            },
            optionalFilter: {
                take: 100,
                page: 1,
            }
        }
        let self = this;
        this.props.service(command, function (response) {
            if (response.bRuleCode === 1000) {

                response.result.map(item => {
                    if (item.fullName === e.target.value) {
                        self.setState({
                            opened: false,
                            loading: false
                        })
                    } else {
                        self.setState({
                            loading: false,
                            opened: true,
                            data: response.result
                        })
                    }
                })
            }

        })
    }
    // itemRender = (item) =>{
    //     console.log(item);
    //     // console.log(itemProps);

    // }

    serverFilterChange = (event) => {
        // this.setState({
        //     data : this.serverFilterData(event.filter)
        // })
    }

    // serverFilterData(filter){
    //     const data
    // }
    render() {


        return (
            <MultiSelect
                dataItemKey={this.props.dataItemKey}
                data={this.state.data}
                textField={this.props.feild}
                filterable={this.props.isFilterable}
                label={this.props.label}
                onFilterChange={this.filterChange}
                disabled={this.props.disabled}
                value={this.state.value}
                onChange={(e) => this.handleChange(e, this.props.name)}
            />
        );




    }

}

MultiSelectComponent.defaultProps = {
    type: 'client',
    data: [],
    feild: 'title',
    dataItemKey:'',
    disabled: false
}
export default MultiSelectComponent;