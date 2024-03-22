import React from 'react';
import Paper from '@material-ui/core/Paper';
import Loading from 'core/Loading';
import FaIcon from 'shared/components/Icon/Icon';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import classNames from 'classnames';
import GetServicesService from '../services/GetServicesService';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridClient } from 'shared/components/kendoGrid/kendoGrid';
import Columns from "../constants/GetServicesColumn";

class GetServicesComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: [
                {
                    field: "title",
                    dir: "asc"
                }
            ]
        }
    }
    componentDidMount() {
    }

    render() {

        return (
            <React.Fragment>
                <WrapperPaper />
                <Header {...this.props} />
                <Paper className={"main-paper-container"}>

                    <GridClient
                        {...this.state}
                        service={GetServicesService.getservicesMethod}
                        {...this.props}
                        Columns={Columns}
                        command={null}
                        callServiceAgain
                        reRender >;
                        
                        </GridClient>

                </Paper>
            </React.Fragment>
        )

    }
}

export default GetServicesComponent;