import React from 'react';
import Paper from '@material-ui/core/Paper';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import GetPartyBankAccountsService from '../services/GetPartyBankAccountsService';
import GetPartiesService from '../../customersList/services/GetPartiesService';
import Columns from '../constants/partyBankAccountsColumns';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import AutoCompleteComplete from 'shared/components/dropDown/autocomplete';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import IBAN from 'shared/components/iban/textMask';
import GetAllRegion from '../../../../../../services/getRegion';
import GetAllBankNames from '../../../../../../services/getBanks';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import './GetPartyBanckAccountComponent.css';
class GetPartyBankAccounts extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جتسجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
                list: []
            },
            selectedParty: {
                fullName : ''
            },
            sort: [{
                field: "party.created",
                dir: "desc"
            }]
        };
        this.handlePartyChange = this.handlePartyChange.bind(this);
    }
    componentDidMount() {

    }

    handlePartyChange(item){
        // let item = value.value;
        console.log('item',item);
        this.setState({
            selectedParty : item.value,
            // partyType : item.partyType
        })
    }

    render() {
        console.log('selectedParty',this.state.selectedParty);
        return (
            <React.Fragment>
                <WrapperPaper />
                <Header {...this.props} addIsAlwaysEnabled addByIdStateParams={this.state.selectedParty ? { id: this.state.selectedParty } : undefined} />
                <Paper className={"main-paper-container party-bank-account-managed"}>

                    <GridServer
                        {...this.props}
                        {...this.state}
                        reportFilter={
                            {
                                // partyId: this.state.selectedParty,
                                partyId: this.state.selectedParty ? this.state.selectedParty.id : 0,
                                id:0
                            }
                        }
                        service={GetPartyBankAccountsService.getAllPartyBankAccountByFilterMethod}
                        Columns={Columns}
                        command={null}
                        sort={this.state.sort}
                        reRender={true}
                        callServiceAgain={true}
                        classHeightOpenPanel={"height-open-grid"}>
                        <div classPage={"height-search"}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={12}>
                                    <AutoCompleteComplete
                                        {...this.state.party}
                                        handleChange={(value) => this.handlePartyChange(value)}
                                        value={this.state.selectedParty.fullName}
                                        service={GetPartiesService.getAllPartyForAutocomplete} />
                                </Grid>
                            </Grid>
                        </div>
                    </GridServer>

                </Paper>
            </React.Fragment>
        )

    }

}

export default GetPartyBankAccounts;


