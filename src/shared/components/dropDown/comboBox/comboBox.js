import React from 'react';
import kendo from '@progress/kendo-ui';
// import '@progress/kendo-ui';
import { DropDownList, MultiSelect } from '@progress/kendo-react-dropdowns';
import { AutoComplete } from '@progress/kendo-dropdowns-react-wrapper';
import { filterBy } from '@progress/kendo-data-query';
import { ComboBox } from '@progress/kendo-react-dropdowns';


class ComboBoxComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.list,
            value: this.props.value,
            loading: false,
            initialValue:this.props.value
        }

        this.filterChange = this.filterChange.bind(this);
        this.filterData = this.filterData.bind(this);

    }

    componentDidMount(){
      
        let list=this.props.list;
        let all={title:"همه",code:-1}
       
        let hasAll=list.includes(all);
        if(this.props.hasAll && !hasAll)
      {
          list.push(all)
      }
        this.setState({
            data: list,
            value: this.props.value
        })
    
}

componentDidUpdate(prevProps) {

    if (prevProps !== this.props && (this.state.data===undefined||this.state.data.length<1)) {
        this.setState({
            data: this.props.list,
            value: this.props.value
        })
    }
    else if(prevProps !== this.props)
    {  this.setState({
          value: this.props.value
      })
  }
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

    handleChange(e) {
        console.log('handleChange',e);
        this.setState({
            value: e.target.value
        });
        if(e.target.value===null)
            this.props.handleChange({ value: e.target.value }, this.props.name);

    }

    handleBlur(e) {
        console.log("handleBlur",e.target.value);
        this.props.handleChange({ value: e.target.value }, this.props.name);
    };

    serverFilterChange = (event) => {

    };


    render() {

        return (
            <div className="k-rtl">


                <div className="example-col">

                    {this.props.required ? <span class="required-star-dropdown" >*</span> : ''}

                    <ComboBox
                        style={{ width: '100%' }}
                        dataItemKey={this.props.dataItemKey}
                        label={this.props.label}
                        filterable={this.props.isFilterable}
                        data={this.state.data}
                        required={this.props.required}
                        textField={this.props.field}
                        onFilterChange={this.filterChange}
                        value={this.state.value}
                        onChange={(e) => this.handleChange(e)}
                        onClose={(e) => this.handleBlur(e)}
                    />

                </div>
            </div>

        )






    }
}

ComboBoxComponent.defaultProps = {
    type: 'client',
    data: [],
    feild: 'title',
    dataItemKey:''

}
export default ComboBoxComponent;