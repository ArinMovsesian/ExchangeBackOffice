import React from 'react';
import Paper from '@material-ui/core/Paper';
import Loading from '../../../../../../core/Loading';
import FaIcon from '../../../../../../shared/components/Icon/Icon';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import classNames from 'classnames';
import toastr from 'toastr';
import Grid from '@material-ui/core/Grid';
import action from 'constants/action';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridServer } from '../../../../../../shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetManageAccountCodesRelationColumns';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import './GetManageAccountCodesRelationComponent.css'
import GetManageAccountCodesRelationService from '../services/GetManageAccountCodesRelationService';
import GetSubsidiaryLedgerService from '../../subsidaryLedger/services/GetSubsidiaryLedgerService';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import { detailLedgerTemplate, detailLedgerHeaderTemplate} from '../../../../../../constants/autoCompleteTemplate';
import GetDetailLedgerService from '../../detailLedger/services/GetDetailLedgerService';


class GetManageAccountCodesRelation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            sort: [
                {
                    field: "code",
                    dir: "asc"
                }
            ],
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
    handleChange(item, name) {

        this.setState({
          [name]: item.value
        })
      }

    render() {
        return (
            <React.Fragment>
          
                <Header {...this.props} />
                <Paper className={"main-paper-container  manage-account-codes-relation "}>
                    <GridServer
                        {...this.state}
                        {...this.props}
                        service={GetManageAccountCodesRelationService.getAccountCodes}
                        reportFilter={
                            {
                                subsidiaryLedgerCode:this.state.subsidiaryLedgerCode.code ,
                                detailLedgerCode:this.state.detailLedger.code ,
                            }
                        }
                        classHeightOpenPanel={"height-open-grid"}
                        Columns={Columns}
                        onLoadingChange={this.onLoadingChange}
                        sort={this.state.sort}
                        classHeightOpenPanel={"height-open-grid"}
                        reRender={true}>

                        <div classPage={"height-search"}>
                     <Grid container spacing={8} className="no-margin">
                     <Grid item md={5}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.subsidiaryLedgerCodeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.subsidiaryLedgerCode} />
                  </div>
                </Grid>
                <Grid item md={7}>
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
                     </div>
                    </GridServer>
                </Paper>
            </React.Fragment>
        )
    }
}

export default GetManageAccountCodesRelation;