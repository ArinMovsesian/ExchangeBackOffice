import React from 'react';
import Paper from '@material-ui/core/Paper';
import Loading from '../../../../../core/Loading';
import FaIcon from '../../../../../shared/components/Icon/Icon';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import classNames from 'classnames';
import GetBankAccountsService from '../services/GetBankAccountsService';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridClient } from '../../../../../shared/components/kendoGrid/kendoGrid';
import Columns from "../constants/bankAccountColumns";

class GetBankAccounts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: [
                {
                    field: "code",
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
                <Paper className={"main-paper-container bank-account "}>

                    <GridClient
                        {...this.state}
                        service={GetBankAccountsService.getAllBankDeposit}
                        {...this.props}
                        Columns={Columns}
                        command={null} >;
                        </GridClient>

                </Paper>
            </React.Fragment>
        )

    }
}

export default GetBankAccounts;