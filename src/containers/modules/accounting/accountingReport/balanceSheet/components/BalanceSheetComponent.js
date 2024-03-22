import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import DropDownComponent from 'shared/components/dropDown/dropDown';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetVoucherTypeService from '../../../accountingBase/voucherType/services/GetVoucherTypeService';
import moment from 'moment';

import  {Paper}  from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Filter from 'shared/components/kendoGrid/filterPanel/filterPanel';
import BalanceSheetService from '../services/BalanceSheetService';
import NumericBySign from '../../../../../../shared/components/numericBySign/numericBySign';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import GetFiscalYearsService from '../../../../../modules/accounting/accountingBase/fiscalYear/services/GetFiscalYearsService';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './BalanceSheetComponent.css'
class BalanceSheetComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      incomItems:[],
      currentAsset:[],
      sumOfCurrentAsset:0,
      noneCurrentAsset:[],
      sumOfNoneCurrentAsset:0,
      sumOfAssets:0,
      currentDebt:[],
      equity:[],
      longTermDebt:[],
      sumOfCurrentDebt:0,
      sumOfDebtsAndEquity:0,
      sumOfEquity:0,
      sumOfLongTermDebt:0,
      open:true,
      fromVoucherNumber:'',
      toVoucherNumber:'',
      voucherTypeList: {
        name: "voucherType",
        field: "title",
        label: "نوع سند",
        list: []
      },
      voucherType:[],
      branchDropDowm: {
        name: "branch",
        field: "title",
        label: "شعبه",
        list: []
      },
      noLastTrade:false,
      branch:{id:0},
      fiscalYearDropDowm: {
        name: "fiscalYear",
        feild: "title",
        label: "سال مالی ",
        list: []
      },
      fromDate:moment(new Date().setDate(new Date().getDate() - 365)),

      endDate:new Date(),
      fiscalYear:{id:0},


    };

    this.handleExpandSearchPanel=this.handleExpandSearchPanel.bind(this);
    this.successGetBalancesheet=this.successGetBalancesheet.bind(this);
    this.getBranches=this.getBranches.bind(this);
    this.successGetBranch=this.successGetBranch.bind(this);
    this.getFiscalYears=this.getFiscalYears.bind(this);
    this.successGetFiscalYears=this.successGetFiscalYears.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.search=this.search.bind(this);
    this.handleChangeDate=this.handleChangeDate.bind(this);
    this.handleChangeCheck=this.handleChangeCheck.bind(this);

    this.getBalancesheet();
  }

   componentDidMount(){
    GetVoucherTypeService(null, (response) => DropDownListDataProvider(this, "voucherTypeList", response));
    
     this.getBranches();
     this.getBalancesheet();
   }
   getBranches() {
    var command = {
      optionalFilter: {
        take: 500,
        page: 1
      }
    }
    GetBranchService.getBranchesByFilter(command, this.successGetBranch);
  }

  successGetBranch(response) {
    if (response.result) {
      this.setState({
        branchDropDowm: {
          name: "branch",
          field: "title",
          label: "شعبه",
          list: response.result
        }
      },function(){
        this.getFiscalYears()
      })
    }
  }
  getFiscalYears() {
    GetFiscalYearsService.getFiscalYears(null, this.successGetFiscalYears);
  }

  successGetFiscalYears(response) {
    if (response.success) {
   
    
        this.setState({
          fiscalYear: response.result[0],
          reRender: true,
          fromDate: response.result[0].startDate,
          toDate: new Date(),
          fiscalYearDropDowm: {
            name: "fiscalYear",
            feild: "title",
            label: "سال مالی ",
            list: response.result
          }
        }, function () {
          this.getBalancesheet()
        })
      

    }
  }
  handleExpandSearchPanel() {
    this.setState({
      open: !this.state.open

    })
  }


  search(){
    this.getBalancesheet();
  }
  getBalancesheet(){
   

    var command={
      reportFilter: {
        dateFilter: {
          startDate: this.state.fromDate,
          endDate: this.state.toDate
        },
        noLastTrade: this.state.noLastTrade,
        fromVoucherNumber: this.state.fromVoucherNumber !== '' ? Number(this.state.fromVoucherNumber) : 0,
        toVoucherNumber: this.state.toVoucherNumber !== '' ? Number(this.state.toVoucherNumber) : 0,
      
        voucherType: this.state.voucherType.map(v=>v.id)
      }

    }
    BalanceSheetService.getBalanceSheetService(command,this.successGetBalancesheet);
  }
  handleChange(item, name) {
    this.setState({
      [name]: item.value
    })
  }

  handleChangeFiscalYear(item) {
    this.setState({
      fiscalYear: item.value,
      fromDate: item.value.startDate,
      toDate: item.value.endDate,
    })
  }

  handleChangeDate(item, name) {
    this.setState({
      [name]: item
    })
  }
  successGetBalancesheet(response){
     if(response.success)
     this.setState({
      currentAsset:response.result.currentAsset,
      currentDebt:response.result.currentDebt,
      sumOfCurrentAsset:response.result.sumOfCurrentAsset,
      noneCurrentAsset:this.state.noneCurrentAsset,
      sumOfAssets:this.state.sumOfAssets,
      sumOfCurrentDebt:this.state.sumOfCurrentDebt,
      sumOfDebtsAndEquity:this.state.sumOfDebtsAndEquity,
      sumOfEquity:this.state.sumOfEquity,
      sumOfLongTermDebt:this.state.sumOfLongTermDebt,
      noneCurrentAsset:this.state.noneCurrentAsset,
      noneCurrentAsset:this.state.noneCurrentAsset,
      sumOfNoneCurrentAsset:this.state.sumOfNoneCurrentAsset,
      equity:this.state.equity,
      longTermDebt:this.state.longTermDebt,

     })
  }
  componentDidMount(){
  
  }
  handleChangeCheck = (event, name) => {
    console.log("event",event.target.checked);
    this.setState({
      [name]: event.target.checked
    })

  };
  render() {
    return (
      <React.Fragment>
        <Header {...this.props} />
     
              <Grid container spacing={8} className="no-margin">
              <Grid item md={12}>
              <Filter search={this.search}
            handleExpandSearchPanel={this.handleExpandSearchPanel} {...this.state}>
            <div classPage={"height-search"}>
            <Grid container spacing={8} className="no-margin">
            <Grid item md={2} >
                  <NumberFormatComponent id="fromVoucherNumber" label="شماره سند از"
                    value={this.state.fromVoucherNumber}
                    handleChange={(value, error) => this.handleChange(value, 'fromVoucherNumber')} type="number" />
                </Grid>
                <Grid item md={2} >
                  <NumberFormatComponent id="toVoucherNumber" label="شماره سند تا"
                    value={this.state.toVoucherNumber}
                    handleChange={(value, error) => this.handleChange(value, 'toVoucherNumber')} type="number" />
                </Grid>
                {/* <Grid item md={2}>
                  <DropDownComponent {...this.state.fiscalYearDropDowm}
                    handleChange={(value, name) => this.handleChangeFiscalYear(value)} isFilterable={true}
                    value={this.state.fiscalYear} />
                </Grid> */}
                {/* <Grid item md={2}>
                  <ComboBoxComponent  {...this.state.branchDropDowm}
                    handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                    value={this.state.branch} />
                    </Grid> */}
                     <Grid item md={2} >
                  <PersianDatePicker label="از تاریخ"  handleOnChange={(e) => this.handleChangeDate(e, 'fromDate')} selectedDate={this.state.fromDate} />
                </Grid>
                <Grid item md={2} >
                  <PersianDatePicker label="تا تاریخ" handleOnChange={(e) => this.handleChangeDate(e, 'toDate')} selectedDate={this.state.toDate} />
                </Grid>
                <Grid item md={2}>
                  <FormControlLabel
                    style={{ marginTop: 14 }}
                    control={
                      <Checkbox
                        checked={this.state.noLastTrade}
                        onChange={(value) => this.handleChangeCheck(value, 'noLastTrade')}
                        value="noLastTrade"
                        color="primary"

                      />
                    }
                    label="بدون معاملات آخر"
                  />
                </Grid>
                <Grid item md={6}>
                  <div className="k-rtl">
                    <MultiSelectComponent isFilterable {...this.state.voucherTypeList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      value={this.state.voucherType} />
                  </div>
                </Grid>
          
                </Grid>
             </div>
              </Filter>
              </Grid>
              <Grid item md={12} className={this.state.open ? 'marginTop100': 'marginTop4'}>
                
              </Grid>
                <Grid item md={6}>
                <Paper
               
               >
                  <h3 style={{paddingTop:12,paddingRight:12,color:"#2196f3"}}>دارایی ها</h3>
                  <hr />
                  <div  className={this.state.open ? "height-for-open":"height-for-close"}>
                  <Table >
  
  <TableBody>
  <TableRow >
        <TableCell >
          <b>
          دارایی های جاری

          </b>
        </TableCell>
        <TableCell >
        </TableCell>
        <TableCell >
        </TableCell>
    
      </TableRow>
    {this.state.currentAsset.map(row => (
      <TableRow key={row.id}>
        <TableCell >
          {row.code}
        </TableCell>
        <TableCell align="left">{row.title}</TableCell>
        <TableCell align="right"> <NumericBySign field={row.balance} /> </TableCell>
    
      </TableRow>
    ))}
          <TableRow>
        <TableCell style={{colro:"rgba(3, 60, 130, 0.87)"}}>
         جمع دارایی های جاری
        </TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="right"> <NumericBySign field={this.state.sumOfCurrentAsset} /> </TableCell>
    
      </TableRow>
      <TableRow>
     
      </TableRow>
      <TableRow >
        <TableCell >
          <b>
          دارایی های غیر جاری

          </b>
        </TableCell>
        <TableCell >
        </TableCell>
        <TableCell >
        </TableCell>
    
      </TableRow>
      {this.state.noneCurrentAsset.map(row => (
      <TableRow key={row.id}>
        <TableCell >
          {row.code}
        </TableCell>
        <TableCell align="left">{row.title}</TableCell>
        <TableCell align="right"> <NumericBySign field={row.balance} /> </TableCell>
    
      </TableRow>
      
    ))}
       <TableRow>
        <TableCell style={{colro:"rgba(3, 60, 130, 0.87)"}}>
         جمع دارایی های جاری
        </TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="right"> <NumericBySign field={this.state.sumOfCurrentAsset} /> </TableCell>
    
      </TableRow>
      <TableRow>
     
      </TableRow>
      <TableRow>
    
      </TableRow>
      <TableRow>
        <TableCell style={{colro:"rgba(3, 60, 130, 0.87)"}}>
         جمع دارایی ها              </TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="right"> <NumericBySign field={this.state.sumOfCurrentAsset} /> </TableCell>
    
      </TableRow>
  </TableBody>
</Table>
                  </div>
   
        </Paper >
                  </Grid>
                  <Grid  item md={6}>
                <Paper >
             
                  <h3 style={{paddingTop:12,paddingRight:12,color:"#2196f3"}}>بدهی ها</h3>
                  <hr/>
                  <div  className={this.state.open ? "height-for-open":"height-for-close"}>
        <Table >
  
        <TableBody>
        <TableRow >
              <TableCell >
                <b>
              بدهی های جاری

                </b>
              </TableCell>
              <TableCell >
              </TableCell>
              <TableCell >
              </TableCell>
          
            </TableRow>
          {this.state.currentDebt.map(row => (
            <TableRow key={row.id}>
              <TableCell >
                {row.code}
              </TableCell>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="right"> <NumericBySign field={row.balance} /> </TableCell>
          
            </TableRow>
          ))}
                <TableRow>
              <TableCell style={{colro:"rgba(3, 60, 130, 0.87)"}}>
               جمع بدهی های جاری
              </TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="right"> <NumericBySign field={this.state.sumOfCurrentDebt} /> </TableCell>
          
            </TableRow>
            <TableRow>
              
            </TableRow>
            <TableRow >
              <TableCell >
                <b>
              بدهی های بلند مدت

                </b>
              </TableCell>
              <TableCell >
              </TableCell>
              <TableCell >
              </TableCell>
          
            </TableRow>
          {this.state.longTermDebt.map(row => (
            <TableRow key={row.id}>
              <TableCell >
                {row.code}
              </TableCell>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="right"> <NumericBySign field={row.balance} /> </TableCell>
          
            </TableRow>
          ))}
                <TableRow>
              <TableCell style={{colro:"rgba(3, 60, 130, 0.87)"}}>
               جمع بدهی های بلند مدت
              </TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="right"> <NumericBySign field={this.state.sumOfLongTermDebt} /> </TableCell>
          
            </TableRow>
            <TableRow>
            </TableRow>
            <TableRow>
            <TableCell style={{colro:"rgba(3, 60, 130, 0.87)"}}>
               جمع بدهی ها
              </TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="right"> <NumericBySign field={this.state.sumOfDebt} /> </TableCell>
          
            </TableRow>
            <TableRow>
              
            </TableRow>
            <TableRow >
              <TableCell >
                <b>
              حقوق صاحبان سهام

                </b>
              </TableCell>
              <TableCell >
              </TableCell>
              <TableCell >
              </TableCell>
          
            </TableRow>
          {this.state.equity.map(row => (
            <TableRow key={row.id}>
              <TableCell >
                {row.code}
              </TableCell>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="right"> <NumericBySign field={row.balance} /> </TableCell>
          
            </TableRow>
          ))}
                <TableRow>
              <TableCell style={{colro:"rgba(3, 60, 130, 0.87)"}}>
               جمع حقوق صاحبان سهام
              </TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="right"> <NumericBySign field={this.state.sumOfEquity} /> </TableCell>
          
            </TableRow>
            <TableRow>
              
            </TableRow>
            <TableRow>
              <TableCell style={{colro:"rgba(3, 60, 130, 0.87)"}}>
               جمع بدهی ها حقوق صاحبان سهام
              </TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="right"> <NumericBySign field={this.state.sumOfDebtsAndEquity} /> </TableCell>
          
            </TableRow>
        </TableBody>
      </Table>
      </div>
      <br/>
              
            
    
        </Paper>
                  </Grid>
                  </Grid>
       
    
      </React.Fragment>

    )
  }
}
export default BalanceSheetComponent;
