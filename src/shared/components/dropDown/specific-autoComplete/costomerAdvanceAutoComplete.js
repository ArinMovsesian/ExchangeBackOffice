import React from 'react';
import kendo from '@progress/kendo-ui';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Input from 'shared/components/formInput/inputForm';

import { AutoComplete } from '@progress/kendo-dropdowns-react-wrapper';
import { customerTemplate, customerHeaderTemplate } from 'constants/autoCompleteTemplate'
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import FormControl from '@material-ui/core/FormControl';
import styles from 'containers/layout/panel/theme';
import Modal from "@material-ui/core/Modal";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import Fieldset from 'shared/components/fieldset/fieldset';
import './detailLedgerAdvanceAutoComplete.css'
import '../autocomplete.css';
import FaIcon from '../../Icon/Icon';
import NationalCode from 'shared/components/nationalCode/nationalCode';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import GetDetailLedgerBalanceService from '../../../../containers/modules/accounting/accountingReport/detailLedgerBalannce/services/GetDetailLedgerBalanceService';
const $ = require("jquery");
class CustomerAdvanceAutoCompleteComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.list,
            value: this.props.value,
            open: false,
            columns:[  {
                title: "نام نام خانوداگی",
                field: "bankTitle",
                show: true,
                class: "text-right",
                isFixed: false,
                dynamicColumn: false,
                width: '120px'
            },
            {
                title: "نام پدر",
                field: "bankTitle",
                show: true,
                class: "text-right",
                isFixed: false,
                dynamicColumn: false,
                width: '120px'
            },
            {
                title: "کد ملی",
                field: "branchName",
                show: true,
                class: "text-right",
                isFixed: false,
                dynamicColumn: false,
                width: '120px'
            },
            {
                title: "شماره حساب",
                field: "bankAccountUsagesTitle",
                show: true,
                class: "text-right",
                isFixed: false,
                dynamicColumn: false,
            },
            {
                title: "کد تفصیل",
                field: "branchCode",
                show: true,
                class: "text-left",
                isFixed: false,
                dynamicColumn: false,
                width: '120px'
            },]
        };

        let self = this;
        this.dataSource = new kendo.data.DataSource({

            transport: {
                read: function (option) {



                    if (option) {

                        self.filterChangeAutoComplete(option);
                    }
                }
            },
            pageSize: 100,
            serverPaging: true,
            serverFiltering: true,
            schema: {

                data: "result",
                total: "totalRecords",
            }
        })

        this.filterChangeAutoComplete = this.filterChangeAutoComplete.bind(this);
        this.handleFilterItem = this.handleFilterItem.bind(this);
        this.focus = this.focus.bind(this);
        this.handleSelectedItem = this.handleSelectedItem.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.openAdvanceModal = this.openAdvanceModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if (this.props.focus)
            this.focus();
        if (this.props.keyDownPress)
            this.autoComplete.widgetInstance.element[0].addEventListener("keydown", this.handleKeyDown);

            this.getCustomerInfo();
    }

    handleKeyDown(event) {

        this.props.onKeyDownPress(event);
    }
    handleChange(value, name) {
        let item = value.value;
        this.setState({
            [name]: item
        })
    }

    componentDidUpdate(prevProps) {

        if (this.state.value && this.state.value.length >= 3) {

            this.dataSource.transport.read();
        }
        if (prevProps !== this.props) {
            this.setState({
                data: this.props.list,
                value: this.props.value
            })
        }

    }


    handleSelectedItem(e) {

        this.setState({
            value: e.dataItem
        })

        this.props.handleChange({ value: e.dataItem });
    }

    handleKeyDown(event) {
        this.props.onKeyDownPress(event);
    }

    handleFilterItem(e) {

        this.setState({
            value: e.filter.value
        });
        if (e.filter.value === '') {
            this.props.handleChange({ value: '' });
        }
    }

    focus() {
        this.autoComplete.widgetInstance.element[0].focus()
    }


    openAdvanceModal = () => {
        this.setState({ open: true });
    }

    filterChangeAutoComplete = (option) => {

        var command = {
            optionalFilter: {
                take: 100,
                page: 1,
            },
            reportFilter: {},
        }
        if (this.props.additionalFilter) {
            Object.entries(this.props.additionalFilter).forEach(function ([key, value]) {
                command.reportFilter[key] = value;

            });
            command.reportFilter[this.props.fieldSearch] = this.state.value;

            console.log(command);

        } else {
            command = {

                reportFilter: {
                    [this.props.fieldSearch]: this.state.value,
                },
                optionalFilter: {
                    take: 100,
                    page: 1,
                }
            }
        }

        var self = this;
        this.props.service(command, function (response) {

            if (response.success) {
                response.totalRecords = response.result.length;

                if (self.props.initialValue) {


                    var initialValue = response.result.find(r => {
                        return r[initialValue.field] === initialValue.value
                    });
                    self.setState({ value: initialValue });
                }

                option.success(response);

            }


        })
    }

    getCustomerInfo() {

        let self = this;
        $("#customer-list").kendoGrid({
          dataSource: {
            transport: {
              read: function (option) {
                if (option.data.state) {
                  self = option.data
                }
    
                var command = {
                  reportFilter: {
                    isNotConsiderSettlementDays:self.state.isNotConsiderSettlementDays,
    
                    fromDetailLedgerCode: self.state.fromDetailLedger ? self.state.fromDetailLedger.code : '',
                    toDetailLedgerCode: self.state.toDetailLedger ? self.state.toDetailLedger.code : '',
                    vouhcerCategoryExcetionListCode: self.state.exceptionCatagory,
                    voucherCategoryInclude: self.state.voucherType.length ? self.state.voucherType.map((vt) => vt.code) : [],
                    fiscalYearId: self.state.fiscalYear.id,
                    balanceSheetColumnType: self.state.balanceSheetColumnType.code,
                    branchId: self.state.branch ? self.state.branch.id : 0,
                    mainClassId: self.state.mainClassId.id,
                    costCenterId: self.state.costCenterId,
                    fromVoucherNumber: self.state.fromVoucherNumber !== '' ? self.state.fromVoucherNumber : 0,
                    toVoucherNumber: self.state.toVoucherNumber !== '' ? self.state.toVoucherNumber : 0,
                    accountBalanaceRemainType: self.state.accountBalanaceRemainType.code,
                    fromSubsidiaryLedgerCode: self.state.fromSubsidiaryLedgerCode ? self.state.fromSubsidiaryLedgerCode.code : '',
                    toSubsidiaryLedgerCode: self.state.toSubsidiaryLedgerCode ? self.state.toSubsidiaryLedgerCode.code : '',
                    dateFilter: {
                      startDate: self.state.fromDate,
                      endDate: self.state.toDate
                    }
                  },
    
                  OptionalFilter: {
                    page: option.data.page ? option.data.page : 1,
                    take: option.data.take ? option.data.take : 50,
                    sort: option.data.sort ? option.data.sort :
                      [{
                        field: "accountCode",
                        dir: "asc"
                      }]
                  }
                }
    
    
                GetDetailLedgerBalanceService.getNormalDetailedgerBalanceSheet(command, function (response) {
                 
                  if (response.result.length > 0) {
                    // response.result.push({
                    //   totalCreditLeave: response.totalCreditLeave,
                    //   totalCreditSum: response.totalCreditSum,
                    //   totalCreditTurnover: response.totalCreditTurnover,
                    //   totalDebitLeave: response.totalDebitLeave,
                    //   totalDebitSum: response.totalDebitSum,
                    //   totalDebitTurnover: response.totalDebitTurnover
                    // });
                    // this.setState({response:response});
                    self.setState({
                      response: {
    
                        totalCreditLeave: response.totalCreditLeave,
                        totalCreditSum: response.totalCreditSum,
                        totalCreditTurnover: response.totalCreditTurnover,
                        totalDebitLeave: response.totalDebitLeave,
                        totalDebitSum: response.totalDebitSum,
                        totalDebitTurnover: response.totalDebitTurnover
                      }
                    })
                  }
                  option.success(response);
                })
              }
            },
    
            pageSize: 50,
            sort: {
              field: "accountCode",
              dir: "asc"
            },
            serverPaging: true,
            serverSorting: true,
            schema: {
              data: "result",
              total: "totalRecords",
              model: {
                fields: {
                  accountCode: "accountCode",
                  accountTitle: "accountTitle",
                  debitTurnover: "debitTurnover",
                  creditTurnover: "creditTurnover",
                  debitSum: "debitSum",
                  creditSum: "creditSum",
                  debitLeave: "debitLeave",
                  creditLeave: "creditLeave"
                }
              }
            },
            aggregate: [
              { field: "debitTurnover", aggregate: "sum" },
              { field: "creditTurnover", aggregate: "sum" },
              { field: "debitSum", aggregate: "sum" },
              { field: "creditSum", aggregate: "sum" },
              { field: "debitLeave", aggregate: "sum" },
              { field: "creditLeave", aggregate: "sum" }]
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
          //   var scrollOffset = {
          //     left:10000 ,
          // };
          //   var container = e.sender.wrapper.children(".k-grid-content"); // or ".k-virtual-scrollable-wrap"
          //   container.scrollLeft(scrollOffset.left);
            if (this.dataSource.data().length > 0) {
              let grid = $("#customer-list").data("kendoGrid");
              let items = grid.dataSource.view();
              items.map((item, index) => {
                let id = items[index].uid;
                let currentRow = grid.table.find("tr[data-uid='" + id + "']");
                currentRow.find(".account-code").css({ color: '#039be5', cursor: 'pointer' });
                // if (index === this.dataSource.data().length - 1) {
                  // currentRow.css({ display: 'none', visibility: 'hidden' });
                
                // } else {
                  currentRow.find(".account-code").css({ color: '#039be5', cursor: 'pointer' });
                // }
              });
            };
       
            $("#customer-list tbody tr td span.detail-account-book").on("click", function (item) {
              var grid = $("#customer-list").data("kendoGrid");
              var row = $(item.target).closest("tr");
              var dataItem = grid.dataItem(row);
    
              self.props.history.push(
                {
                  pathname: self.props.detail.path,
                  state: self.props.location.state === undefined ? {
                    backButton: { path: self.props.path, title: self.props.title },
                    mainClassId: self.state.mainClassId,
                    fiscalYear: self.state.fiscalYear,
                    fromDate: self.state.fromDate,
                    toDate: self.state.toDate,
                    branch: self.state.branch,
                    balanceSheetColumn: self.state.balanceSheetColumnType,
                    fromVoucherNumber: self.state.fromVoucherNumber !== '' ? Number(self.state.fromVoucherNumber) : 0,
                    toVoucherNumber: self.state.toVoucherNumber !== '' ? Number(self.state.toVoucherNumber) : 0,
                    accountBalanaceRemainType: self.state.accountBalanaceRemainType,
                    costCenter: self.state.costCenter,
                    exceptionCatagory: self.state.exceptionCatagory,
                    voucherType: self.state.voucherType,
    
                    fromDetailLedger: {
                      id: dataItem.accountId,
                      fullTitle: dataItem.accountTitle
                    },
                    toDetailLedger: {
                      id: dataItem.accountId,
                      fullTitle: dataItem.accountTitle
                    },
                    startDate: self.state.fromDate,
                    endDate: self.state.toDate,
    
                    fromSubsidiaryLedger: self.state.fromSubsidiaryLedgerCode,
                    toSubsidiaryLedger: self.state.toSubsidiaryLedgerCode,
                    // fromSubsidiaryLedger : {
                    //   id : dataItem.accountId,
                    //   fullTitle : dataItem.accountTitle
                    // },
                    // toSubsidiaryLedger : {
                    //   id : dataItem.accountId,
                    //   fullTitle : dataItem.accountTitle
                    // },
    
                    // fromSubsidiaryLedgerCode:{
                    //   fullTitle : dataItem.accountTitle,
                    //   code : dataItem.accountCode
                    // },
                    // toSubsidiaryLedgerCode:{
                    //   fullTitle : dataItem.accountTitle,
                    //   code : dataItem.accountCode
                    // },
    
                  } :
                    self.props.location.state && self.props.location.state.accountCode !== undefined ? {
                      backButton: { path: self.props.path, title: self.props.title },
                      fiscalYear: self.state.fiscalYear,
                      fromDate: self.state.fromDate,
                      toDate: self.state.toDate,
                      branch: self.state.branch,
                      mainClassId: self.state.mainClassId,
    
                      balanceSheetColumn: self.state.balanceSheetColumn,
                      fromVoucherNumber: self.state.fromVoucherNumber,
                      toVoucherNumber: self.state.toVoucherNumber,
                      accountBalanaceRemainType: self.state.accountBalanaceRemainType,
                      costCenter: self.state.costCenter,
                      exceptionCatagory: self.state.exceptionCatagory,
                      voucherType: self.state.voucherType,
                      accountCode: self.props.location.state.accountCode,
                      // fromSubsidiaryLedger : {
                      //   id : dataItem.accountId,
                      //   fullTitle : dataItem.accountTitle
                      // },
                      // toSubsidiaryLedger : {
                      //   id : dataItem.accountId,
                      //   fullTitle : dataItem.accountTitle
                      // },
                      fromDetailLedger: {
                        id: dataItem.accountId,
                        fullTitle: dataItem.accountTitle
                      },
                      toDetailLedger: {
                        id: dataItem.accountId,
                        fullTitle: dataItem.accountTitle
                      },
                      startDate: self.state.fromDate,
                      endDate: self.state.toDate,
    
                      fromSubsidiaryLedger: self.state.fromSubsidiaryLedgerCode,
                      toSubsidiaryLedger: self.state.toSubsidiaryLedgerCode,
    
                    } :
                      {
                        backButton: { path: self.props.path, title: self.props.title },
                        fiscalYear: self.state.fiscalYear,
                        fromDate: self.state.fromDate,
                        toDate: self.state.toDate,
                        mainClassId: self.state.mainClassId,
    
                        branch: self.state.branch,
                        balanceSheetColumn: self.state.balanceSheetColumn,
                        fromVoucherNumber: self.state.fromVoucherNumber,
                        toVoucherNumber: self.state.toVoucherNumber,
                        accountBalanaceRemainType: self.state.accountBalanaceRemainType,
                        costCenter: self.state.costCenter,
                        exceptionCatagory: self.state.exceptionCatagory,
                        voucherType: self.state.voucherType,
                        fromDetailLedger: {
                          id: dataItem.accountId,
                          fullTitle: dataItem.accountTitle
                        },
                        toDetailLedger: {
                          id: dataItem.accountId,
                          fullTitle: dataItem.accountTitle
                        },
                        startDate: self.state.fromDate,
                        endDate: self.state.toDate,
    
                        fromSubsidiaryLedger: self.state.fromSubsidiaryLedgerCode,
                        toSubsidiaryLedger: self.state.toSubsidiaryLedgerCode,
                        // fromSubsidiaryLedger : {
                        //   id : dataItem.accountId,
                        //   fullTitle : dataItem.accountTitle
                        // },
                        // toSubsidiaryLedger : {
                        //   id : dataItem.accountId,
                        //   fullTitle : dataItem.accountTitle
                        // }
                      }
                })
    
    
    
            });
          },
          columns: self.state.columns
        });
      }
    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        // console.log("disabled",this.props.disabled)
        const { classes } = this.props;
        return (

            <React.Fragment>
                <FormControl className={classes.formControlAutoComplete} xs={8} variant="outlined" error={this.state.error} fullWidth>
                    <InputLabel
                        ref={ref => {
                            this.labelRef = ReactDOM.findDOMNode(ref);
                        }}
                        className={!this.state.error ? classes.inputLabelOutLineFoccused : classes.inputLabelOutLineErrorFoccused}

                        htmlFor={this.props.id}
                    >
                        {this.props.required ?
                            <span class="required-star" >*</span> : ''
                        }
                        {this.props.label}
                    </InputLabel>

                    <AutoComplete
                        ref={(auto) => { this.autoComplete = auto; }}
                        dataSource={this.dataSource}
                        dataTextField={this.props.field}
                        minLength={3}
                        autoWidth={true}
                        headerTemplate={this.props.headerTemplate}
                        template={this.props.template}
                        value={this.state.value}
                        placeholder={this.props.placeholder}
                        filtering={(e) => this.handleFilterItem(e)}
                        select={(e) => this.handleSelectedItem(e)}
                        virtual={{ itemHeight: 26 }}


                    />
                    <Button
                        type="button"

                        onClick={this.openAdvanceModal}
                        // variant="contained"
                        // variant="contained"
                        // variant="contained"
                        style={{
                            position: 'absolute',
                            top: '23%',
                            // borderRight: 'solid 3px',
                            padding: '8px 0',
                            backgroundColor: "#f8f4f4",
                            left: "2px"
                        }}
                        color="white"
                        className={"advance-search-button"}>
                        <FaIcon color="black" name="fa fa-search" size={20} />
                    </Button>
                </FormControl>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <Paper style={{
                        width: '65%',
                        padding: '1rem .5rem ',
                        height: 'auto',
                        outline: 'none',
                        position: 'absolute',
                        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
                        backgroundColor: '#fff',
                        top: '21%',
                        left: '25%',
                        marginLeft: '-300px',
                        marginTop: '-150px',
                    }}>
                        <h3>
                            <FaIcon color="gray" name="fa fa-search" size={20} />
                            <span style={{ marginRight: '5px' }}> جستجوی پیشرفته مشتری</span>
                            {/*<b>*/}
                            {/*حذف {this.props.deleteHeader}*/}
                            {/*</b>*/}
                        </h3>
                        <hr />
                        <div style={{ position: 'relative' }}>
                            {/* {
                                this.state.issuingChequeModalLoader
                                ?
                                <div style={{backgroundColor: '#ffffffad', position: 'absolute', top: 0, left: 0, width: '580px', height: '100%', zIndex: 9999}} id="issuingChequeModalLoader">
                                    <div  className="flex flex-1 flex-col items-center justify-center height-page">
                                        <CircularProgress/>
                                    </div>
                                </div>
                                :
                                null
                            } */}

                            {/* <Grid container spacing={8} className="no-margin">
                                <Grid item md={11}>
                                    <PersianDatePicker selectedDate={this.state.chequeDate} label="تاریخ چک" handleOnChange={(value) => this.handleDate(value, 'chequeDate')} disabled/>
                                </Grid>
                            </Grid> */}



                            {/* <Grid container spacing={8} className="no-margin">
                                <Grid item md={11}>
                                    <Input label="شماره سریال چک" type="text" handleChange={(value) => this.chequeSerialNumberH(value)}
                                           value={this.state.chequeSerialNumber} required />
                                </Grid>
                            </Grid> */}


                            {/* <Grid container spacing={8} className="no-margin">
                                <Grid item md={11}>
                                    <NumberFormatComponent
                                        id="" label="مبلغ چک"
                                        value={this.state.chequeAmount}
                                        handleChange={(value) => this.handleChange(value, 'chequeAmount')}
                                        type="number"
                                        isSeparator={true}
                                        disabled
                                        
                                    />
                                </Grid>
                            </Grid> */}
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={3}>
                                    <Fieldset style={{ marginTop: "-3px !important" }} className={"fieldset-in-search"} legend={'جستجو بر اساس مشخصات'}>

                                        <Grid container spacing={8} className="no-margin">
                                            <Grid item md={11}>

                                                <Input label="نام نام خانوادگی" handleChange={(e) => this.handleChange(e, 'fullName')} value={this.state.fullName} />

                                            </Grid>
                                            <Grid item md={11}>

                                                <NationalCode id="nationalCode" label="کد ملی"
                                                    value={this.state.nationalCode}
                                                    handleChange={(value) => this.handleChange(value, 'nationalCode')} type="number" />

                                            </Grid>
                                            <Grid item md={11}>

                                                <Input label="نام پدر" handleChange={(e) => this.handleChange(e, 'fatherName')} value={this.state.fatherName} />

                                            </Grid>
                                            <Grid item md={11}>

                                                <NumberFormatComponent id="detailLedgerCode" label="کد تفصیل"
                                                    value={this.state.detailLedgerCode}
                                                    handleChange={(value, error) => this.handleChange(value, 'detailLedgerCode')} type="number" />
                                            </Grid>
                                            <Grid item md={11}>
                                                <NumberFormatComponent id="accountCode" label="شماره حساب"
                                                    value={this.state.accountCode}
                                                    handleChange={(value, error) => this.handleChange(value, 'accountCode')} type="number" />
                                            </Grid>
                                        </Grid>
                                        <Button variant="contained" color="secondary" style={{ backgroundColor: '#218ee3', color: '#FFF' }} onClick={this.reRenderGrid}>
                                            جستجو
                        </Button>
                                    </Fieldset>

                                </Grid>
                                <Grid item md={9}>
                                    <div className={"k-rtl  height-content-grid"}>
                                        <div id="customer-list" className="height-page"></div>
                                    </div>
                                </Grid>
                            </Grid>
                            {/* <Grid container spacing={8} className="no-margin">
                                <Grid item md={11}>
                                    <RadioButtons {...this.state.chequeDetailType} radioH={this.radioChange}/>
                                </Grid>
                            </Grid> */}
                            {/* <Grid container spacing={8} className="no-margin">
                                <Grid item md={11}>
                                    <Input label="شرح چک" handleChange={(e) => this.handleChange(e, 'deleteDescription')} value={this.state.deleteDescription} isMultiLine={true} />
                                </Grid>
                            </Grid> */}
                            {/* <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.chequeHashur}
                                        onChange={this.handleChangeCheck('chequeHashur')}
                                        value="chequeHashur"
                                        color="primary"
                                    />
                                }
                                label="هاشور حواله"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.chequeDateLetter}
                                        onChange={this.handleChangeCheck('chequeDateLetter')}
                                        value="chequeDateLetter"
                                        color="primary"
                                    />
                                }
                                label="تاریخ به حروف"
                            /> */}
                        </div>
                        <br />
                        <Button variant="contained" color="secondary" style={{ backgroundColor: '#218ee3', color: '#FFF' }} onClick={this.reRenderGrid}>
                            تایید
                        </Button>
                        <Button variant="contained" color="secondary" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={this.handleClose}>
                            انصراف
                        </Button>
                    </Paper>
                </Modal>

            </React.Fragment>
        )
    }
}
CustomerAdvanceAutoCompleteComponent.defaultProps = {
    template: customerTemplate,
    headerTemplate: customerHeaderTemplate,
    fieldSearch: "pharse",
    additionalFilter: false,
    roleCode: 0,
    // schemaField:"result"

}

export default withStyles(styles)(CustomerAdvanceAutoCompleteComponent);