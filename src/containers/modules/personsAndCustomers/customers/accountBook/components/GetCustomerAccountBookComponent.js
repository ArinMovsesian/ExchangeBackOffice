import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import { Grid } from '@material-ui/core';
import kendo from '@progress/kendo-ui';
import Paper from '@material-ui/core/Paper';
import GetEnum from 'services/getEnum';
import moment from 'moment';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import './GetCustomerAccountBookComponent.css'
import { GetDropDownElement } from '../../../../../../core/getMultiSelectElement';
import CheckBoxList from '../../../../../../shared/components/checkBoxList/checkBoxList';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import GetCustomerAccountBookService from '../services/GetCustomerAccountBookService';
import GetPartiesService from "../../customersList/services/GetPartiesService";
import { Column } from '../constants/GetCustomerAccountBookColumn';


const $ = require("jquery");

class GetCustomerAccountBook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      response: {},
      fromDate: moment(new Date()).add(-1, "years"),
      toDate: moment(new Date()),
      accountcodesForApi: [],
      reRender: false,
      bankAccountType: 0,
      bankAccount: {
        name: "bankAccountType",
        feild: "title",
        label: "نوع گزارش",
        list: []
      },
      party: {
        name: "selectedParty",
        field: "fullName",
        placeholder: "جتسجوی مشتری اصلی بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفضیل",
        list: []
      },
      selectedParty: {
        fullName: '',
        id: 0
      },
      open: false,
      columns: Column()

    }

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeParty = this.handleChangeParty.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleExpandSearchPanel = this.handleExpandSearchPanel.bind(this);
    this.successBankAccountType = this.successBankAccountType.bind(this);
    this.search = this.search.bind(this);

  }

  componentDidMount() {
    // if (this.props.location.state && this.props.location.state.accountCode)
    //   this.setState({ accountCodes: [{ code: this.props.location.state.accountCode }] });
    this.getDropDownData();
    this.getCustomerAccountBook(true);
  }

  getDropDownData() {

    let defaultCommand = {
      entity: ""
    }
    GetEnum("accountbookreporttype", this.successBankAccountType);
  }

  getCustomerAccountBook(isFirst) {
    let self = this;
    $("#customer-account-book").kendoGrid({
      dataSource: {
        transport: {
          read: function (option) {
            if (option.data.state) {
              self = option.data
            }
            var command = {
              reportFilter: {
                detailLedgerId: self.state.selectedParty.detailLedgerId,
                partyId: self.state.selectedParty.id,
                accountBookReportType: self.state.bankAccountType.code,
                dateFilter: {
                  startDate: self.state.fromDate,
                  endDate: self.state.toDate
                }
              },

              OptionalFilter: {
                page: option.data.page ? option.data.page : 1,
                take: option.data.take ? option.data.take : 50,
                sort: option.data.sort ? option.data.sort :
                  []
              }
            }
            if(isFirst){
              var res = {
                result: [],
                totalRecords: 0
              };
              option.success(res);
            }else{
              GetCustomerAccountBookService.getCustomerAccountBook(command, function (response) {
                var res = {
                  result: [],
                  totalRecords: 0
                };
                if (response.result) {
                  response.result.map(item => {
                    res.result.push(item.accountBookRow)
                  });
                  res.totalRecords = response.totalRecords;
                }
                option.success(res);
              })
            }
           
          }
        },

        pageSize: 50,
        serverPaging: true,
        serverSorting: true,
        schema: {
          data: "result",
          total: "totalRecords",
        }
      },

      autoBind: true,
      sortable: {
        allowUnsort: false
      },
      resizable: true,
      reorderable: true,
      navigatable: false,
      columnMenu: {
        messages: {
          sortAscending: "صعودی",
          sortDescending: "نزولی",
          columns: "ستون ها"
        }
      },
      pageable: {
        pageSizes: [50, 150, 200],
        buttonCount: 5,
        messages: {
          itemsPerPage: "تعداد سطر در هر صفحه",
          display: "{0} - {1} از {2} مورد",
          empty: ""
        }
      },
      allowCopy: true,
      noRecords: {
        template: ' <p class="orange-page font-size-2 no-data">رکوردی جهت نمایش وجود ندارد.</p>'
      },
      dataBound: function (e) {

        var grid = $("#customer-account-book").data("kendoGrid");
        var items = grid.dataSource.view();

        items.map((item, index) => {
          if(item.remain < 0){
            let id = items[index].uid;
            let currentRow = grid.table.find("tr[data-uid='" + id + "']");
            var td = currentRow.find("td:last-child");
            $(td).html("<font color=\"red\">" + kendo.toString(item.remain, "0:#,##0;(#,##0)") + "</font>");
          }
        
          // var remain = items[items.length - 1].remain;
          // var footer = $(".k-footer-template");
          // var td = $(footer).find('td:last-child');
          // if (remain < 0) {
          //   $(td).html("<font color=\"red\">" + kendo.toString(e, "0:#,##0;(#,##0)") + "</font>");
          // } else if (e > 0)
          //   $(td).html(kendo.toString(e, "#,##0;#,##0"));
          // else $(td).html("0");
        })
       

      },
      columns: self.state.columns
    });
  }

  successBankAccountType(response) {
    if (response.success) {
      this.setState({
        bankAccountType: response.result[1],
        bankAccount: {
          name: "bankAccountType",
          feild: "title",
          label: "نوع گزارش",
          list: response.result
        }

      })
    }
  }


  handleChangeParty(item) {
    this.setState({
      selectedParty: item.value
    });
    if (item.value != "")
      this.getCustomerAccountBook();
  }
  handleChange(item , name){
    this.setState({
      [name] : item.value
    });
  }
  handleChangeDate(item, name) {
    this.setState({
      [name]: item
    })
  }
  handleExpandSearchPanel() {
    this.setState({
      open: !this.state.open
    })
  }

  search() {
    $("#customer-account-book").data("kendoGrid").dataSource.read(this);
  }


  render() {

    return (
      <React.Fragment>
        <Header {...this.props} browserBack={this.props.location.state ? this.props.location.state.browserBack === true : false} />
        <Paper className={"main-paper-container customer-account-book"}>
          <Filter search={this.search}
            handleExpandSearchPanel={this.handleExpandSearchPanel} {...this.state}>
            <div classPage={"height-search"}>
              <Grid container spacing={8} className="no-margin">

                <Grid item md={6}>
                  <div className="k-rtl">
                    <AutoCompleteComponent
                      {...this.state.party}
                      handleChange={(value) => this.handleChangeParty(value)}
                      service={GetPartiesService.getAllPartyForAutocomplete}
                      value={this.state.selectedParty.fullName}
                    />
                  </div>
                </Grid>

                <Grid item md={2} >
                  <PersianDatePicker label="از تاریخ" max={this.state.toDate} handleOnChange={(e) => this.handleChangeDate(e, 'fromDate')} selectedDate={this.state.fromDate} />
                </Grid>
                <Grid item md={2} >
                  <PersianDatePicker label="تا تاریخ" min={this.state.fromDate} handleOnChange={(e) => this.handleChangeDate(e, 'toDate')} selectedDate={this.state.toDate} />
                </Grid>


                <Grid item md={2}>
                  <DropDownComponent {...this.state.bankAccount}
                    handleChange={(value, name) => this.handleChange(value, name)} isFilterable={false}
                    value={this.state.bankAccountType} />
                </Grid>



              </Grid>
            </div>
          </Filter>
          <div className={"k-rtl " + (this.state.open ? "height-open-grid" : "height-content-grid")}>
            <div id="customer-account-book" className="height-page"></div>
          </div>
        </Paper>
      </React.Fragment>
    )
  }
}
export default GetCustomerAccountBook;

