import React, { Component } from 'react';
import { connect } from "react-redux";
import Loading from '../../../core/Loading';

const options = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'My chart'
    },
    series: [
      {
        data: [1, 2, 1, 4, 3, 6]
      }
    ]
  };
class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };

        console.log(this.state.startDate);
    }
    
    render() {
        if (this.state.isLoading) {
            return(<Loading />)
        }
        else {
            return(
            <React.Fragment>
                <div style={{color: '#FFF'}}>داشبورد</div>
            </React.Fragment>
            )
        }
       

    }
    
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
export default Dashboard; 