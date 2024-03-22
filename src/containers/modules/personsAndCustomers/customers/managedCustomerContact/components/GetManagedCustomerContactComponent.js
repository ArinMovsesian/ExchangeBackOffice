import React from 'react';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridClient, GridServer } from 'shared/components/kendoGrid/kendoGrid';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import FaIcon from 'shared/components/Icon/Icon';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../../../../layout/panel/theme';
import AutoCompleteComplete from 'shared/components/dropDown/autocomplete';
import GetEnum from 'services/getEnum';
import Columns from '../constants/GetManagedCustomerContactColumn';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetPartiesService from "../../customersList/services/GetPartiesService";
import WrapperPaper from "../../../../../../shared/components/mainPaper/wrapperPaper";
import GetManagedCustomerContactServices from "../services/getManagedCustomerContactService";
// import './GetCustomerTradingComponent.css'
class GetManagedCustomerContactComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log('GetManagedCustomerContactComponent props: ',this.props);
        this.state = {
            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جتسجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
                list: []
            },
            sort: [{
                field: "created",
                dir: "desc"
            }],
            selectedParty: {  fullName: '', id: 0 },
        };
    }
    handlePartyChange = (item) => {
        this.setState({
            selectedParty : item.value,
        })
    };
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <WrapperPaper />
                <Header {...this.props} />
                <Paper className={"main-paper-container managed-customer-contact"}>

                    <GridServer
                        {...this.props}
                        {...this.state}
                        reportFilter={
                            {
                                partyId: this.state.selectedParty ? this.state.selectedParty.id : 0
                            }
                        }
                        service={GetManagedCustomerContactServices.getAllContactByFilterMethod}
                        Columns={Columns}
                        command={null}
                        sort={this.state.sort}
                        classHeightOpenPanel={"height-open-grid"}
                        reRender={true}
                        callServiceAgain={true}
                        >
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

export default withStyles(styles)(GetManagedCustomerContactComponent);