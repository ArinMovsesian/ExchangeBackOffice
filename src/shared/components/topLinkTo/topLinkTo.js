import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import FaIcon from 'shared/components/Icon/Icon';

class LinkTo extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Link to={
                
                
                {
                    pathname:this.props.to,
                    state:this.props.routeStateParams
                
                }} className="push-left">
                <React.Fragment>
                    <Button variant="contained"  className={this.props.className}>
                        <FaIcon name={this.props.icon} size={14} />
                        <span className="margin-right-4">
                        {this.props.title}
                        </span>
                    </Button>
                </React.Fragment>

            </Link>

        )
    }
}
LinkTo.defaultProps={
    stateParams:{}
}
export default LinkTo;