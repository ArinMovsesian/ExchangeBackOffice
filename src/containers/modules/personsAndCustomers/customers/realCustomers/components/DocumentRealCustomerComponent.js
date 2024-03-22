import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import classNames from 'classnames';
import Input from 'shared/components/formInput/inputForm'
import Email from 'shared/components/email/email'
import Header from 'shared/components/stateHeader/stateHeader'
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes, { func } from 'prop-types';
import styles from '../../../../../layout/panel/theme'
import DropDownComponent from 'shared/components/dropDown/dropDown';
import toastr from 'toastr';
import Form from 'shared/components/form/pureForm';
import AddRealCustomerService from '../services/CrateRealCustomerService';
import IBAN from 'shared/components/iban/textMask';
import Typography from '@material-ui/core/Typography';
import NationalCode from 'shared/components/nationalCode/nationalCode';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import serials from 'constants/serial';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import Fieldset from 'shared/components/fieldset/fieldset';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Uploader from 'shared/components/uploader/uploaderArea';
import FaIcon from 'shared/components/Icon/Icon';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import {CheckColumn} from 'shared/components/kendoGrid/kendoGrid';
import GetManageCustomerRecordsServices from "../../manageCustomerRecords/services/GetManageCustomerRecordsServices";
import urlSettings from '../../../../../../constants/urlSettings';
class DocumentRealCustomer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      submittedFiles: [],
      rows: {
        nationalCode: { title: "کارت ملی", name: "nationalCode", file: [], code: 1, preview: '', fileName: '' },
        bithCertificate: { title: "شناسنامه", file: [], name: "bithCertificate", code: 2, preview: '', fileName: '' },
      },
      getAllAttachmentCategory: [],
      uploaderItem: {},
      partyId: 0
    };
    this.handleUpload = this.handleUpload.bind(this);
    this.upload = this.upload.bind(this);

  }

  componentDidMount() {
  
    // console.log('AAA',this.props.location.state);
    // console.log('BBB',this.props.location.state.customeBackInfo);
    if (this.props.location.state && !this.props.location.state.customeBackInfo) {
      this.setState({
        partyId: this.props.location.state
      }, () => {
        GetManageCustomerRecordsServices.getAllAttachmentCategoryMethod({partyId: this.state.partyId},(res) =>{
          this.setState({
            getAllAttachmentCategory: res.result
          })
        })
      })
    }else if(this.props.location.state && this.props.location.state.customeBackInfo){
      this.setState({
        partyId: this.props.location.state.partyId
      }, () => {
        GetManageCustomerRecordsServices.getAllAttachmentCategoryMethod({partyId: this.state.partyId},(res) =>{
          this.setState({
            getAllAttachmentCategory: res.result
          })
        })
      })
    } 
    else {
      this.props.history.push("/main/persons/customers/getParties");
    }
  }

  handleUpload(file) {
    let rows = Object.assign({}, this.state.rows);
    rows[file.name].preview = file.files.preview;
    rows[file.name].fileName = file.files.name;
    this.setState({ rows })
  }

  upload(uploaderItem) {
    this.setState({ uploaderItem });
  }
  rerenderComponent = () => {
    // this.setState({ uploaderItem: {}});
    // this.props.history.push(this.props.back.path);
    GetManageCustomerRecordsServices.getAllAttachmentCategoryMethod({partyId: this.state.partyId},(res) =>{
      this.setState({
        getAllAttachmentCategory: res.result,
        uploaderItem: {}
      })
    })
  };
  render() {
    console.log('DocumentRealCustomer', this.state.uploaderItem);
    return (
      <React.Fragment>
        <br />
        <Grid container spacing={16}>

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
                      <TableCell >وضعیت</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
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
          <Grid item md={5}>
            {this.state.uploaderItem.codeId ?
                <Uploader data={{ partyId: this.state.partyId, categoryId: this.state.uploaderItem.codeId}} rerenderComponent={this.rerenderComponent}  uploadItem={this.state.uploaderItem} accepted={[".png", ".jpg",]} uploadUrl={urlSettings.PartyManagementUrl} uploadApi={'attachment/upload'}/>
              // <Uploader rerenderComponent={this.rerenderComponent} partyId={this.state.partyId} uploadItem={this.state.uploaderItem} accepted={[".png", ".jpg"]} /> :
                :
              ''
            }
          </Grid>
        </Grid>

      </React.Fragment >
    )
  }
}

DocumentRealCustomer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DocumentRealCustomer);