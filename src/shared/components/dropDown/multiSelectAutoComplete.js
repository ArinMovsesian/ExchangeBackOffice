import React from 'react';
import ReactDOM from 'react-dom';
import kendo from '@progress/kendo-ui';
import {  MultiSelect } from '@progress/kendo-dropdowns-react-wrapper';
import { customerTemplate, customerHeaderTemplate } from 'constants/autoCompleteTemplate';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import   classNames from 'classnames';
import FormControl from '@material-ui/core/FormControl';
import styles from 'containers/layout/panel/theme';
import './autocomplete.css'
let mainValue = '';
class MultiSelectAutoCompleteComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log('props',props);
        this.state = {
            // data: this.props.list,
            // value: [{id: 1, fullName: 'arin'}],
            // result:[]
        };
        
        let self = this;
        this.dataSource = new kendo.data.DataSource({
            transport: {
                    read: function (options) {
                        // if(self.state.value && self.state.value.length>0)
                        self.filterChangeAutoComplete(options);
                    },

                },

                // data: [],

            // transport: {
            //     read: {
            //         url: "https://demos.telerik.com/kendo-ui/service/products",
            //         dataType: "jsonp"
            //     }
            // },
            pageSize: 100,
            serverPaging: true,
            serverFiltering: true,

            // schema: {
            //     data: "result",
            //     total: "totalRecords",
            // }
        });
        this.dataTextField = this.props.dataTextField;
        this.dataValueField = this.props.dataValueField;
        this.filterChangeAutoComplete = this.filterChangeAutoComplete.bind(this);
        this.handleFilterItem = this.handleFilterItem.bind(this);
        this.handleSelectedItem = this.handleSelectedItem.bind(this);
        this.handleDeselectItem = this.handleDeselectItem.bind(this);
    }

    // componentDidUpdate(prevProps) {
    //     if (this.state.value && this.state.value.length >= 3) {
    //         console.log("this.state.value",this.state.value);
    //         this.dataSource.transport.read();
    //     }
    //     if (prevProps !== this.props) {
    //         this.setState({
    //             data: this.props.list,
    //             value: this.props.value
    //         })
    //     }
    // }

    handleSelectedItem(e) {
        
       // let result=this.state.result;
       // console.log("result",e.dataItem.init(),e.dataItem)
       // result.push(e.dataItem);
       console.log("handleSelectedItem",e.dataItem);
       this.props.handleChange(e.dataItem);

       // let result = [];
        // result.push(e.dataItem);
        // this.setState({
        //     result: result
        // })
        // this.props.handleChange({ value: result });
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false
    }

    handleDeselectItem(e) {

        console.log("handleDeselectItem",e.dataItem);
        this.props.handleRemoveItem(e.dataItem);

     }
    handleFilterItem(e) {
        this.setState({
            value: e.filter.value
        });
        if (e.filter.value === '') {
            this.props.handleChange({ value: [] });
        }
    }
    filterChangeAutoComplete = (options) => {
        let command = {
            reportFilter: {
            // [this.props.fieldSearch]: this.state.value
               [this.props.fieldSearch]: mainValue
            },
            optionalFilter: {
                take: 25,
                page: 1,
            }
        };
        let self=this;
        this.props.service(command, function (response) {
            console.log('multiSelectAutoComplete response',response);
            if (response.success) {
                response.totalRecords = response.result.length;
                if(self.props.initialValue){
                    let initialValue = response.result.find(r => {
                        return r[initialValue.field] === initialValue.value
                    });
                    // self.setState({value:initialValue});
                }
                options.success(response.result);
            }

        })
    };


    changeItems = (e) => {
        if(e.filter == undefined){
            console.log('change fire');
            console.log('undefined');
            mainValue = '';
            this.dataSource.transport.read();
        }else{
            console.log('change fire');
            console.log(e.filter.value);
            mainValue = e.filter.value;
            this.dataSource.transport.read();

        }
    };
    render() {
        console.log('result', this.state.result);
        const {classes}=this.props;
        return (
            <FormControl className={classes.formControlAutoComplete+this.props.classes} xs={8} variant="outlined" error={this.state.error} fullWidth>
             <InputLabel
                    ref={ref => {
                        this.labelRef = ReactDOM.findDOMNode(ref);
                    }}
                    className={!this.state.error ? classes.inputLabelOutLineFoccused : classes.inputLabelOutLineErrorFoccused}
                    htmlFor={this.props.id}
             >
                 {this.props.required ? <span class="required-star" >*</span> : ''}
                 {this.props.label}
             </InputLabel>

             {/*<MultiSelect*/}
                {/*dataSource={this.dataSource}*/}
                {/*dataTextField={this.props.field}*/}
                {/*minLength={3}*/}
                {/*autoWidth={true}*/}
                {/*headerTemplate={this.props.headerTemplate}*/}
                {/*template={this.props.template}*/}
                {/*placeholder={this.props.placeholder}*/}
                {/*// filtering={(e) => this.handleFilterItem(e)}*/}
                {/*select={(e) => this.handleSelectedItem(e)}*/}
                {/*deselect={(e)=>this.handleDeselectItem(e)}*/}
                {/*virtual={{ itemHeight: 26 }}*/}
                {/*// data={this.state.subsetData}*/}
                {/*// dataItemKey={DataTransferItem.key}*/}
                {/*value={this.state.result}*/}
                {/*onPageChange={this.pageChange}*/}
                {/*filterable={true}*/}
                {/*dataValueField={"fullTitle"}*/}
                {/*onFilterChange={(e) => this.handleFilterItem(e)}*/}
                {/*popupSettings={{*/}
                    {/*height: '210px'*/}
                {/*}}*/}
            {/*/>*/}


                <MultiSelect
                    dataSource={this.dataSource}
                    dataTextField={this.dataTextField}
                    dataValueField={this.dataValueField}
                    autoWidth={true}
                    placeholder={this.props.placeholder}
                    select={this.handleSelectedItem}
                    deselect={this.handleDeselectItem}
                    filtering={this.changeItems}
                    // virtual={{ itemHeight: 26 }}
                    // minLength={20}
                    headerTemplate={this.props.headerTemplate}
                    itemTemplate= {this.props.template}
                    value={this.props.defaultValue}
                    autoBind={false}
                    enable={!this.props.disabled}
                    // filtering={(e) => this.handleFilterItem(e)}
                    // deselect={(e)=>this.handleDeselectItem(e)}
                    // data={this.state.subsetData}
                    // dataItemKey={DataTransferItem.key}
                    // value={this.state.result}
                    // onPageChange={this.pageChange}
                    // filterable={true}
                    // onFilterChange={(e) => this.handleFilterItem(e)}
                    // popupSettings={{
                    //     height: '210px'
                    // }}
                />
            </FormControl>

        )
    }
}
MultiSelectAutoCompleteComponent.defaultProps = {
    template: customerTemplate,
    headerTemplate: customerHeaderTemplate,
    fieldSearch:"pharse",
    disabled: false
};

export default withStyles(styles)(MultiSelectAutoCompleteComponent);