import React from 'react';
import kendo from '@progress/kendo-ui';
import { AutoComplete, ComboBox, DropDownList, MultiSelect } from '@progress/kendo-dropdowns-react-wrapper';

import './autocomplete.css'
class AutoCompleteComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.list,
            value: this.props.value
        };

        let self = this;
        this.dataSource = new kendo.data.DataSource({

            transport: {
                read: function (option) {


                    if (self.state.value && self.state.value.length >= 1) {

                        self.filterChangeAutoComplete(option);
                    }

                }
            },
            pageSize: this.props.pageSize,
            serverPaging: true,
            serverFiltering: true,
            schema: {
                data: "result",
                total: "totalRecords",
            }
        })

        this.filterChangeAutoComplete = this.filterChangeAutoComplete.bind(this);
        this.handleFilterItem = this.handleFilterItem.bind(this);
        this.handleSelectedItem = this.handleSelectedItem.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.state.value && this.state.value.length >= 3) {

            this.dataSource.transport.read();
        }
        if (prevProps !== this.props) {
            this.setState({
                data: this.props.list,
                value: this.props.value
            })
        }
    }


    handleSelectedItem(e) {

        this.setState({
            value: e.dataItem
        })
        
        this.props.handleChange({ value: e.dataItem });
    }

    handleFilterItem(e) {
     
        this.setState({
            value: e.filter.value
        });
        if (e.filter.value === '') {
            this.props.handleChange({ value: '' });
        }
    }
    filterChangeAutoComplete = (option) => {

        var command = {
            reportFilter: {
                pharse: this.state.value
            },
            optionalFilter: {
                take: 100,
                page: 1,
            }
        }
        this.props.service(command, function (response) {

            if (response.success) {
                response.totalRecords = response.result.length;
                option.success(response);
            }

        })
    }

    render() {
        return (
            <MultiSelect 
                dataSource={this.dataSource}
                dataTextField={this.props.dataTextField}
                autoBind={true}
                autoWidth={true}
                dataValueField={this.props.dataValueField}
                value={this.state.value}
                placeholder={this.props.placeholder}
                filtering={(e) => this.handleFilterItem(e)}
                select={(e) => this.handleSelectedItem(e)}
                virtual={{ itemHeight: 26 }}
            />

        )
    }
}
AutoCompleteComponent.defaultProps = {
    template: customerTemplate,
    headerTemplate: customerHeaderTemplate
}
export default AutoCompleteComponent;