import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import LinkTo from '../topLinkTo/topLinkTo'
import styles from 'containers/layout/panel/theme';
import { withStyles } from '@material-ui/core/styles';


class AddRoute extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {classes}=this.props;
        return (
            !this.props.add.length ?
           <LinkTo to={this.props.add.path} routeStateParams={this.props.routeStateParams} className="successButton" icon="fa fa-plus"  title={this.props.add.title}/>
           :
           this.props.add.map((add)=>
           <LinkTo to={add.path} className="successButton margin-right-5" icon="fa fa-plus"  title={add.title}/>

           )

        )
    }
}
AddRoute.defaultProps={
    routeStateParams:{}
}
export default withStyles(styles)(AddRoute);

