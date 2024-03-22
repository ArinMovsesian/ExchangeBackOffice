import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import classNames from 'classnames';
import FaIcon from 'shared/components/Icon/Icon';
import Input from 'shared/components/formInput/inputForm'
import Header from 'shared/components/stateHeader/stateHeader'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes, { func } from 'prop-types';
import Autocomplete from 'shared/components/autocomplete/autocomplete';
import Submit from 'shared/components/submitAction/actionSubmit';
import styles from '../../../../../layout/panel/theme'
import DropDownComponent from 'shared/components/dropDown/dropDown';
import toastr from 'toastr';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import GetSubsidiaryLedgerService from '../../subsidaryLedger/services/GetSubsidiaryLedgerService';
import DropDownListDataProvider from "core/dropDownListDataProvider";


import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import { detailLedgerTemplate, detailLedgerHeaderTemplate} from '../../../../../../constants/autoCompleteTemplate';
import GetDetailLedgerService from '../../detailLedger/services/GetDetailLedgerService';

import Form from 'shared/components/form/form';
import AddManageAccountCodesRelationService from '../services/CreateManageAccountCodesRelationService';

class AddManageAccountCodesRelation
 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            subsidiaryLedgerCodeList: {
                name: "subsidiaryLedgerCode",
                field: "fullTitle",
                label: "کد معین",
                list: []
              },
              subsidiaryLedgerCode:{ fulltitle: '', code: '' },
              detailLedgerList: {
                name: "detailLedgerCode",
                feild: "fullTitle",
                label: "کد تفصیل",
                list: []
              },
              detailLedger: { id: '', title: '' },
            
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCheck = this.handleChangeCheck.bind(this);

    }

    componentDidMount(){
        this.getSubsiadaryLedgerList();
    }
    getSubsiadaryLedgerList(){
        let defaultCommand = {
            entity: ""
          }
        GetSubsidiaryLedgerService.getsubsidiaryledgers(defaultCommand, (response) => {
            DropDownListDataProvider(this, "subsidiaryLedgerCodeList", response);
        })
    }

  

    handleChange(value, name) {
        let item = value.value
        this.setState({
            [name]: item
        })
    };

    handleChangeCheck = name => (event) => {
        this.setState({
            [name]: event.target.checked
        })

    };

  

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <WrapperPaper />
                <Header {...this.props} />
                <Form

                 
                   {...this.props}
                   
                    service={AddManageAccountCodesRelationService.saveAccountCodes}
                    className="form-height"
                   
                >
                   

                    <Grid container spacing={8} className="no-margin">
                    <Grid item md={5}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.subsidiaryLedgerCodeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.subsidiaryLedgerCode} />
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div className="k-rtl">
                    <AutoCompleteComponent
                      handleChange={(value) => this.handleChange(value, "detailLedger")}
                      headerTemplate={detailLedgerHeaderTemplate}
                      template={detailLedgerTemplate}
                      fieldSearch={"searchPhrase"}
                      label="کد تفصیل"
                      field="fullTitle"

                      value={this.state.detailLedger.fullTitle}
                      placeholder="کد حسساب یا کد تفصیل را وارد کنید"
                      service={GetDetailLedgerService.getDetailLedgersForAutoComplete} />
                  </div>
                </Grid>
                     </Grid>
            

                
                </Form>
            </React.Fragment>
        )
    }
}
AddManageAccountCodesRelation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddManageAccountCodesRelation);