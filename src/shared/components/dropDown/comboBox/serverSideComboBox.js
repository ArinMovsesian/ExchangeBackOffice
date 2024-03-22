import React from 'react';
import ReactDOM from 'react-dom';
import { ComboBox } from '@progress/kendo-react-dropdowns';
import ComboBoxServerSide from "../serverSide/comboBox";


let textField = '';
let keyField = '';
// let placeholder = '';
let pageSize = '';
let emptyItem = { [textField]: 'منتظر بمانید...' };
let loadingData = [];

class ComboBoxServerSideBest extends React.Component {
    constructor(props){
        super(props);
        // placeholder = this.props.placeholder;
        textField =this.props.textField;
        keyField = this.props.keyField;
        pageSize = 1;
        emptyItem = { [textField]: 'منتظر بمانید...' };
        loadingData = [];
        while (loadingData.length < pageSize) {
            loadingData.push({ ...emptyItem });
        }
    }
    dataCaching = [];
    pendingRequest;
    requestStarted = false;
    state = {
        data: [],
        skip: 0,
        total: 0,
        // value: this.props.defaultVal,
        filter: '',
        validityIcon: this.props.validity,
        validityStyle: true,
    };

    componentDidMount() {
        this.requestData( '');
    }


    componentWillReceiveProps(nextProps, nextContext) {
        // this.setState({
        //     value: this.props.defaultVal,
        // })
    }

    requestData(filter) {
        // if (this.requestStarted) {
        //         //     clearTimeout(this.pendingRequest);
        //         //     this.pendingRequest = setTimeout(() => { this.requestData(skip, filter); }, 50);
        //         //     return;
        //         // }
        // this.requestStarted = true;
        this.props.service({reportFilter: {phrase: filter}}, (response) => {
            //
            // const items = [];
            // response.result.forEach((element, index) => {
            //     // const { id, accountTypeTitle } = element;
            //     // const item = { [keyField]: id, [textField]: accountTypeTitle };
            //     items.push(element);
            //     this.dataCaching[index + skip] = element;
            // });

                this.setState({
                    data: response.result,

                });

            // this.requestStarted = false;
        });
    }


    onFilterChange = (event) => {
        const filter = event.filter.value;
        console.log('filter',filter);
        if(this.props.validity === false) {
            if(filter === ''){
                this.setState({
                    validityStyle: false,
                })
            }else {
                this.setState({
                    validityStyle: true,
                })
            }
        }
          
        // this.resetCach();
        this.requestData(filter);

        this.setState({
            data: loadingData,
            // skip: 0,
            filter: filter
        });

    };

    // pageChange = (event) => {
    //     const skip = event.page.skip;
    //     const filter = this.state.filter;
    //
    //     if (this.shouldRequestData(skip)) {
    //         this.requestData(skip, filter || '');
    //     }
    //
    //     const data = this.getCachedData(skip);
    //
    //     this.setState({
    //         data: data,
    //         skip: skip
    //     });
    // };

    onChange = (event) => {
        const value = event.target.value;
        console.log('event', value);
        if(this.props.validity === false) {
            if(value === null){
                this.setState({
                    validityStyle: false,
                })
            }else {
                this.setState({
                    validityStyle: true,
                })
            }
        }
       
        this.props.handleChange(event.target.value);
        // console.log(event.target.value);
        if (value && value[textField] === emptyItem[textField]) {
            return;
        }
        this.setState({
            value: value
        });
    };

    render() {
        return (

                <div className="example-col">
                
                    <ComboBox
                        data={this.state.data}
                        value={this.props.defaultVal}
                        onChange={this.onChange}
                        textField={textField}
                        dataItemKey={keyField}
                        // placeholder={placeholder}
                        filterable={true}
                        onFilterChange={this.onFilterChange}
                        // virtual={{
                        //     pageSize: pageSize,
                        //     skip: this.state.skip,
                        //     total: this.state.total
                        // }}
                        // onPageChange={this.pageChange}
                        style={{ width: '100%'}}
                        label={ <div>{this.state.validityIcon === false?<span class="required-star" >*</span>: '' }{this.props.placeholder}</div>}
                        valid={this.state.validityStyle}
                        disabled={this.props.disabled}  
                    />
                </div>

        );
    }

    componentWillUnmount() {
        // this.resetCach();
    }

    // shouldRequestData(skip) {
    //     for (let i = 0; i < pageSize; i++) {
    //         if (!this.dataCaching[skip + i]) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    // getCachedData(skip) {
    //     const data = [];
    //     for (let i = 0; i < pageSize; i++) {
    //         data.push(this.dataCaching[i + skip] || { ...emptyItem });
    //     }
    //     return data;
    // }

    // resetCach() {
    //     this.dataCaching.length = 0;
    // }
}
ComboBoxServerSideBest.defaultProps = {
    textField: '',
    keyField: '',
    defaultVal: {id: 0, accountTypeTitle: ''},
    validity: true,
    disabled: false
};
export default ComboBoxServerSideBest