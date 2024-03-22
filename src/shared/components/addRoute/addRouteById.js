import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import LinkTo from '../topLinkTo/topLinkTo'
import styles from 'containers/layout/panel/theme';
import { withStyles } from '@material-ui/core/styles';
import FaIcon from "../Icon/Icon";
class AddRouteById extends React.Component {
    constructor(props) {
        super(props);
        this.go=this.go.bind(this);
        
    }

     go(){
        this.props.history.push(
            {
                pathname: this.props.addById.path,
                state: this.props.addByIdStateParams
            }
        )
     }

    render() {
        console.log("dis",this.props.addByIdStateParams)
        const {classes}=this.props;
        return (

           <Button disabled={!this.props.addByIdStateParams && !this.props.addIsAlwaysEnabled}  color="secondary" className="successButton push-left"  onClick={this.go}>
           <FaIcon name="fa fa-plus" size={14}/>
           <span className="margin-right-4">
            {this.props.addById.title}
           </span>
        </Button>
      
           

        )
    }
}
export default withStyles(styles)(AddRouteById);

