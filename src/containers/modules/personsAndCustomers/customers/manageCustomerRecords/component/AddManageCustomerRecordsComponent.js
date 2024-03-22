import React from 'react'

// import AddCustomersRelation from "../services/CreateCustomersRelationService";
import styles from '../../../../../layout/panel/theme';
import Header from '../../../../../../shared/components/stateHeader/stateHeader';
import Form from '../../../../../../shared/components/form/form';
import { Grid, withStyles } from '@material-ui/core';
import GetPartiesService from "../../customersList/services/GetPartiesService";
import DropDownComponent from 'shared/components/dropDown/dropDown';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import Paper from '@material-ui/core/Paper';
import GetEnum from 'services/getEnum';
import AutoCompleteComponent from '../../../../../../shared/components/dropDown/autocomplete';
import Fieldset from 'shared/components/fieldset/fieldset';

import GetManageCustomerRecordsServices from '../services/GetManageCustomerRecordsServices';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import Uploader from 'shared/components/uploader/uploaderArea';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {CheckColumn} from 'shared/components/kendoGrid/kendoGrid';

import FaIcon from 'shared/components/Icon/Icon';
import Button from '@material-ui/core/Button';
import urlSettings from '../../../../../../constants/urlSettings';
class AddManageCustomerRecordsComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جتسجوی مشتری اصلی بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
                list: [],
                label: 'اطلاعات مشتری'
            },
            selectedParty: {  fullName : ''},
            getAllAttachmentCategory: [],
            uploaderItem: {}
        }
    }

    handleChange = (item, name) => {
        console.log([name], item.value);
        if(item.value == ''){
            this.setState({
                [name] : item.value,
                getAllAttachmentCategory: [],
                uploaderItem: {}
            })
        }else{
            this.setState({
                [name] : item.value,
            },() => {
                GetManageCustomerRecordsServices.getAllAttachmentCategoryMethod({partyId: this.state.selectedParty.id},(res) =>{
                    console.log('res', res.result);
                    this.setState({
                        getAllAttachmentCategory: res.result
                    })
                })
            })
        }

    };
    upload(uploaderItem) {
        this.setState({ uploaderItem });
    }
    rerenderComponent = () => {
        // this.setState({ uploaderItem: {}});
        GetManageCustomerRecordsServices.getAllAttachmentCategoryMethod({partyId: this.state.selectedParty.id},(res) =>{
            console.log('res', res.result);
            this.setState({
                getAllAttachmentCategory: res.result,
                uploaderItem: {}
            })
        })
    };

    render(){
        console.log('uploaderItem', this.state.uploaderItem);
        return(
            <React.Fragment>
                <Header {...this.props}/>
                <br />
                <Paper>

                <Grid container spacing={8} className="padding-20">

                    <Grid item md={12}>
                        <AutoCompleteComponent
                            {...this.state.party}
                            handleChange={(value) => this.handleChange(value, 'selectedParty')}
                            value={this.state.selectedParty.fullName}
                            service={GetPartiesService.getAllPartyForAutocomplete} />
                    </Grid>
                </Grid>

                </Paper>

                <Grid container spacing={8} className="padding-20">
                    {
                            this.state.getAllAttachmentCategory.length === 0
                            ?
                            null
                            :
                            <Grid item md={5}>
                                <Card >
                                    <div class="cardHeader">
                                        <h3> مدارک مشتری</h3>
                                        <hr />
                                    </div>
                                    <CardContent>
                                        <div className="uploadFileScroll">
                                            <Table style={{ width: "95%", marginRight: "2.5%" }}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="left">عنوان مدرک</TableCell>
                                                        <TableCell >آپلود مدرک</TableCell>
                                                        <TableCell>وضعیت</TableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody style={{height: '100px',overflow: 'scroll !important'}}>
                                                    {
                                                        this.state.getAllAttachmentCategory.map(
                                                            (value, index) => {
                                                                return(

                                                                    <TableRow key={value.id}>
                                                                        <TableCell component="th" scope="row">
                                                                            {value.captionFA}
                                                                        </TableCell>
                                                                        <TableCell align="left">
                                                                            <Button variant="outlined" size="small" onClick={() => this.upload(value)} color="primary">
                                                                                <FaIcon name="fa fa-upload" size={13} />
                                                                            </Button>
                                                                        </TableCell>
                                                                        <TableCell align="right">
                                                                            <CheckColumn status={value.isUploaded} />
                                                                        </TableCell>
                                                                    </TableRow>

                                                                )
                                                            }
                                                        )
                                                    }

                                                </TableBody>

                                            </Table>
                                        </div>
                                        <br />
                                    </CardContent>
                                </Card>
                            </Grid>
                    }

                    <Grid item md={5}>
                        {
                            this.state.uploaderItem.codeId
                            ?
                            <Uploader data={{ partyId: this.state.selectedParty.id, categoryId: this.state.uploaderItem.codeId}} rerenderComponent={this.rerenderComponent}  uploadItem={this.state.uploaderItem} accepted={[".png", ".jpg",]} uploadUrl={urlSettings.PartyManagementUrl} uploadApi={'attachment/upload'}/>
                            :
                            null
                        }
                    </Grid>


                </Grid>
            </React.Fragment>

        )
    }
}
export default withStyles(styles)(AddManageCustomerRecordsComponent)