import React from 'react';
import Paper from '@material-ui/core/Paper';
import Loading from '../../../../../core/Loading';
import FaIcon from '../../../../../shared/components/Icon/Icon';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import classNames from 'classnames';
import GetBranchService from '../services/GetBranchService';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridClient } from '../../../../../shared/components/kendoGrid/kendoGrid';
import Columns from "../constants/branchColumns";

class GetBranch extends React.Component {
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
        if (this.state.isLoading) {
            return (<Loading />)
        } else {
            return (
                <React.Fragment>
                    <WrapperPaper />
                    <Header {...this.props} />
                    <Paper className={"main-paper-container branch"}>

                        <GridClient
                            {...this.state}
                            service={GetBranchService.getBranchesByFilter}
                            {...this.props}
                            Columns={Columns}
                            command={
                                {
                                    optionalFilter: {
                                        take: 500,
                                        page: 1

                                    }
                                }
                            } >;
                        </GridClient>

                    </Paper>
                </React.Fragment >
            )
        }
    }
}

export default GetBranch;