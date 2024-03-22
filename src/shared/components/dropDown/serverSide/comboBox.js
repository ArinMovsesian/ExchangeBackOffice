import React from 'react';
import { ComboBox } from '@progress/kendo-react-dropdowns';

class ComboBoxServerSide extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data :[{title: '', id: ''}],
        };
    }
    componentDidMount() {
        let temp = [];
            this.props.service({reportFilter: {phrase: ""}}, (response) => {
                let title = this.props.title;
                let id = this.props.id;
                temp = response.result.map(function(temp) {return {title: temp[title], id: temp[id]}});
                this.setState({
                    data: temp
                })
            })

    }

    onFilterChange = (event) => {
        let temp = [];
        this.props.service({reportFilter: {phrase: event.filter.value}}, (response) => {
            console.log('result',response.result);
            if(response.result === ""){
                this.setState({
                    data: []
                })
            }else{
                let title = this.props.title;
                let id = this.props.id;
                temp = response.result.map(function(temp) {return {title: temp[title], id: temp[id]}});
                console.log('res', temp);
                this.setState({
                    data: temp
                })
            }

        });
    };

    onChange = (event) => {
        if(event.target.value == undefined){
            this.props.handleChange(0);
        }else{
            this.props.handleChange(event.target.value.id);
        }
    };


    render() {
        return (
            <div className="k-rtl">
                <div className="example-col">
                    <ComboBox
                        style={{ width: '100%' }}
                        data={this.state.data}
                        dataItemKey={'id'}
                        textField={'title'}
                        allowCustom={false}
                        onFilterChange={this.onFilterChange}
                        onChange={this.onChange}
                        filterable={true}
                        placeholder={this.props.placeholder}
                    />
                </div>
            </div>
        );
    }
}
ComboBoxServerSide.defaultProps = {
    id: '',
    title: '',
};
export default ComboBoxServerSide