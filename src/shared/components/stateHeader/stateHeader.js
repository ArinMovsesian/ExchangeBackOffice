import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import BackTo from 'shared/components/backButton/backButton'
import Grid from '@material-ui/core/Grid';
import FaIcon from 'shared/components/Icon/Icon';
import classNames from 'classnames';
import AddRoute from 'shared/components/addRoute/addRoute'

import './header.css'
import AddRouteById from '../addRoute/addRouteById';

class Header extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="header">
                <Grid container spacing={24}>
                    <Grid item md={8}>
                        <h1 className={classNames("main-header")}>
                            <FaIcon name={this.props.icon} size={30} />
                            <span className="main-paper-text">
                                {this.props.title}
                            </span>
                        </h1>
                    </Grid>
                    <Grid item md={4}>
                        {this.props.back ? <BackTo  {...this.props} /> : ''}
                        {this.props.location.state && this.props.location.state.backButton ? <BackTo back={this.props.location.state.backButton} {...this.props} /> : ''}
                        {this.props.add ? <AddRoute {...this.props} /> : ''}
                        {this.props.addById ? <AddRouteById {...this.props} /> : ''}
                    </Grid>
                </Grid>
            </div>

        )
    }
}

export default Header;