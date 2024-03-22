import React from 'react';
import Form from "shared/components/form/pureForm";
import Fieldset from 'shared/components/fieldset/fieldset';
import { LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import Button from '@material-ui/core/Button';
import G from '@material-ui/core/Grid';
import ReactDOM from 'react-dom';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import toastr from 'toastr';
import { getFlatSearchForAccountingCodeTemplate, getFlatSearchForAccountingCodeHeaderTemplate } from '../../../../../../constants/autoCompleteTemplate';
import GetFlatSearchForAccountingCodeService from '../services/GetFlatSearchForAccountingCodeService';
import SaveAccountSettingServices from '../services/SaveAccountSettingServices';
import GetAccountSettingServices from '../services/GetAccountSettingServices';
import euroSymbol from 'material-ui/svg-icons/action/euro-symbol';
class AccountingSettingComponentAccountingReport extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentAssets: {
                name: "sellectedCurrentAssets",
                field: "title",
                headerTemplate: getFlatSearchForAccountingCodeHeaderTemplate,
                template: getFlatSearchForAccountingCodeTemplate,
                placeholder: " جستجوی کدهای حساب",
                fieldSearch: "phrase",
                additionalFilter: {level: [1,2]},
                label: "کدهای حساب مربوط به دارایی جاری"
                // schemaField: 'resultList'
            },
            sellectedCurrentAssets: {title: ''},


            nonCurrentAssets: {
                name: "sellectedNonCurrentAssets",
                field: "title",
                headerTemplate: getFlatSearchForAccountingCodeHeaderTemplate,
                template: getFlatSearchForAccountingCodeTemplate,
                placeholder: " جستجوی کدهای حساب",
                fieldSearch: "phrase",
                additionalFilter: {level: [1,2]},
                label: "کدهای حساب مربوط به دارایی غیر جاری"
                // schemaField: 'resultList'
            },
            sellectedNonCurrentAssets: {title: ''},


            currentDebt: {
                name: "sellectedCurrentDebt",
                field: "title",
                headerTemplate: getFlatSearchForAccountingCodeHeaderTemplate,
                template: getFlatSearchForAccountingCodeTemplate,
                placeholder: " جستجوی کدهای حساب",
                fieldSearch: "phrase",
                additionalFilter: {level: [1,2]},
                label: "کدهای حساب مربوط به دارایی بدهی جاری"
                // schemaField: 'resultList'
            },
            sellectedCurrentDebt: {title: ''},

            longTermDebt: {
                name: "sellectedLongTermDebt",
                field: "title",
                headerTemplate: getFlatSearchForAccountingCodeHeaderTemplate,
                template: getFlatSearchForAccountingCodeTemplate,
                placeholder: " جستجوی کدهای حساب",
                fieldSearch: "phrase",
                additionalFilter: {level: [1,2]},
                label: "کدهای حساب مربوط به دارایی بدهی بلند مدت"
                // schemaField: 'resultList'
            },
            sellectedLongTermDebt: {title: ''},


            
            equity: {
                name: "sellectedEquity",
                field: "title",
                headerTemplate: getFlatSearchForAccountingCodeHeaderTemplate,
                template: getFlatSearchForAccountingCodeTemplate,
                placeholder: " جستجوی کدهای حساب",
                fieldSearch: "phrase",
                additionalFilter: {level: [1,2]},
                label: "کدهای حساب مربوط به حقوق صاحبان سهام"
                // schemaField: 'resultList'
            },
            sellectedEquity: {title: ''},




            income: {
                name: "sellectedIncome",
                field: "title",
                headerTemplate: getFlatSearchForAccountingCodeHeaderTemplate,
                template: getFlatSearchForAccountingCodeTemplate,
                placeholder: " جستجوی کدهای حساب",
                fieldSearch: "phrase",
                additionalFilter: {level: [1,2]},
                label: "کدهای حساب مربوط به درآمدها"
                // schemaField: 'resultList'
            },
            sellectedIncome: {title: ''},


            cost: {
                name: "sellectedCost",
                field: "title",
                headerTemplate: getFlatSearchForAccountingCodeHeaderTemplate,
                template: getFlatSearchForAccountingCodeTemplate,
                placeholder: " جستجوی کدهای حساب",
                fieldSearch: "phrase",
                additionalFilter: {level: [1,2]},
                label: "کدهای حساب مربوط به هزینه ها"
                // schemaField: 'resultList'
            },
            sellectedCost: {title: ''},


            cashFlow: {
                name: "sellectedCashFlow",
                field: "title",
                headerTemplate: getFlatSearchForAccountingCodeHeaderTemplate,
                template: getFlatSearchForAccountingCodeTemplate,
                placeholder: " جستجوی کدهای حساب",
                fieldSearch: "phrase",
                additionalFilter: {level: [1,2,3]},
                label: "کدهای حساب مربوط به موجودی نقد و بانک"
                // schemaField: 'resultList'
            },
            sellectedCashFlow: {title: ''},



            
            clearingSettlementTCE: {
                name: "sellectedClearingSettlementTCE",
                field: "title",
                headerTemplate: getFlatSearchForAccountingCodeHeaderTemplate,
                template: getFlatSearchForAccountingCodeTemplate,
                placeholder: " جستجوی کدهای حساب",
                fieldSearch: "phrase",
                additionalFilter: {level: [1,2,3]},
                label: "کدهای حساب مربوط به اتاق پایاپای بورس"
                // schemaField: 'resultList'
            },
            sellectedClearingSettlementTCE: {title: ''},


            clearingSettlementIFB: {
                name: "sellectedClearingSettlementIFB",
                field: "title",
                headerTemplate: getFlatSearchForAccountingCodeHeaderTemplate,
                template: getFlatSearchForAccountingCodeTemplate,
                placeholder: " جستجوی کدهای حساب",
                fieldSearch: "phrase",
                additionalFilter: {level: [1,2,3]},
                label: "کدهای حساب مربوط به اتاق پایاپای فرابورس"
                // schemaField: 'resultList'
            },
            sellectedClearingSettlementIFB: {title: ''},


            kishBranch: {
                name: "sellectedkishBranch",
                field: "title",
                headerTemplate: getFlatSearchForAccountingCodeHeaderTemplate,
                template: getFlatSearchForAccountingCodeTemplate,
                placeholder: " جستجوی کدهای حساب",
                fieldSearch: "phrase",
                additionalFilter: {level: [1,2,3]},
                label: "کدهای حساب مربوط به شعبه کیش"
                // schemaField: 'resultList'
            },
            sellectedkishBranch: {title: ''},






            




            skip: 0,
            take: 2,
        
            currentAssetsGridData: [],
            nonCurrentAssetsGridData: [],
            currentDebtGridData: [],
            longTermDebtGridData: [],
            equityGridData: [],
            incomeGridData: [],
            costGridData: [],
            cashFlowGridData: [],
            clearingSettlementTCEGridData: [],
            clearingSettlementIFBGridData: [],
            kishBranchGridData: [],


            currentAssetObjectForGrid: {},
            nonCurrentAssetObjectForGrid: {},
            currentDebtObjectForGrid:{},
            longTermDebtObjectForGrid:{},
            equityObjectForGrid:{},
            incomeObjectForGrid:{},
            costObjectForGrid:{},
            cashFlowObjectForGrid:{},
            clearingSettlementTCEObjectForGrid:{},
            clearingSettlementIFBObjectForGrid:{},
            kishBranchObjectForGrid:{},

            currentAssetsDisabledBtn: true,
            nonCurrentAssetsDisabledBtn: true,
            currentDebtDisabledBtn: true,
            longTermDebtDisabledBtn: true,
            equityDisabledBtn: true,
            incomeDisabledBtn: true,
            costDisabledBtn: true,
            cashFlowDisabledBtn: true,
            clearingSettlementTCEDisabledBtn: true,
            clearingSettlementIFBDisabledBtn: true,
            kishBranchDisabledBtn: true,


            

          

        }
    }
    componentDidMount(){
        GetAccountSettingServices.getcurrentaccountingreportsettingMethod(null,(res) => {
                console.log('res: ',res);
                let currentAsset = res.result.balanceSheetReportSetting.currentAsset;
                let noneCurrentAsset = res.result.balanceSheetReportSetting.noneCurrentAsset;
                let currentLiabilities = res.result.balanceSheetReportSetting.currentLiabilities;
                let longTermDebt = res.result.balanceSheetReportSetting.longTermDebt;
                let equity = res.result.balanceSheetReportSetting.equity;

                let income = res.result.profitOrLostReportSetting.income;
                let cost = res.result.profitOrLostReportSetting.cost;



                let bankAccountCodes = res.result.liquiditySetting.bankAccountCodes;
                let tseAccountCodes = res.result.liquiditySetting.tseAccountCodes;
                let ifbAccountCodes = res.result.liquiditySetting.ifbAccountCodes;
                let kishAccountCodes = res.result.liquiditySetting.kishAccountCodes;

                console.log('currentAsset',currentAsset);
                console.log('noneCurrentAsset',noneCurrentAsset);
                console.log('currentLiabilities',currentLiabilities);
                console.log('longTermDebt',longTermDebt);
                console.log('equity',equity);
                this.setState({
                    currentAssetsGridData: currentAsset,
                    nonCurrentAssetsGridData: noneCurrentAsset,
                    currentDebtGridData: currentLiabilities,
                    longTermDebtGridData: longTermDebt,
                    equityGridData: equity,


                    incomeGridData:income,
                    costGridData:cost,


                    cashFlowGridData: bankAccountCodes,
                    clearingSettlementTCEGridData: tseAccountCodes,
                    clearingSettlementIFBGridData: ifbAccountCodes,
                    kishBranchGridData:kishAccountCodes,
                })
        });

    }
    pageChange = (event) => {
        this.setState({
            skip: event.page.skip,
            take: event.page.take
        });
    }
    handleChange = (value, name, btnDisabld, objectForGrid ) => {
        // console.log('name',name);
        if(value.value !== ''){
            // console.log('handleChange: ',value.value);
            const {code, title, levelTitle} = value.value;
            let ObjForGrid = {code: code, title: title, levelTitle: levelTitle};
            // console.log('newObj: ',newObjForGrid);
            this.setState({
                [name]: value.value,
                [objectForGrid]: ObjForGrid,
                [btnDisabld]: false
            })
        }else{
            this.setState({
                [name]: {title: ''},
                [objectForGrid]: {},
                [btnDisabld]: true
            })
        }
    }
    addToGrid = (grid, obj, errorMessage, autoCompleteValueProperty) => {
        console.log('getObject:>>> ', this.state[obj]);
        // console.log('gridData:>>> ', this.state.gridData);
        let token = false;
        if(this.state[grid].length === 0){
            let temp = this.state[grid];
            temp.push(this.state[obj]);
            this.setState({
                [grid]: temp,
                [autoCompleteValueProperty]: {title: ''},
            })
        }else {
            for(let i = 0; i < this.state[grid].length; i++){
                // console.log('this.state.gridData[i].code',this.state.gridData[i].code);
                if(this.state[grid][i].code == this.state[obj].code){
                    // alert(1);
                    toastr.error(' این مقدار در جدول '  + errorMessage +  ' وجود دارد ');
                    token = true;
                    break;
                    
                }
            }
            if(!token){
                let temp = this.state[grid]
                temp.push(this.state[obj]);
                this.setState({
                    [grid]: temp,
                    [autoCompleteValueProperty]: {title: ''},
                })
            }
        }

        //  alert(1);
        // let temp = this.state.gridData;
        // temp.splice(0,8);
        // this.setState({
        //     gridData: temp
        // })
      
     }
     deleteTableCellMethod = (e, grid) => {
            // console.log('B', e.dataItem);
         return(
             <td>
                <span class="fas fa-trash delete" style={{color: 'red', cursor: 'pointer', fontSize: '15px', margin: '5px'}} onClick={() => this.deleteRowItem(e.dataItem, grid)}></span>
            </td>
         )
     }
     deleteRowItem = (e, grid) => {
         console.log('delte e',e);
         console.log('delte grid',grid);
        for(let i = 0; i < this.state[grid].length; i++){
            console.log('this.state.gridData[i].code',e.code);
            if(this.state[grid][i].code == e.code){
                let temp = this.state[grid];
                temp.splice(i,1);
                // alert(1);
               this.setState({
                [grid]: temp,
               })
                
            }
        }
     }
   
    render() {
    
        return(
            <React.Fragment>
               <Form
                    service={SaveAccountSettingServices.saveAccountSettingMethod}
                    {...this.props}
                    {...this.state} 
                    // redirect={"/main/dashboard"}
                    entity={
                        {
                            liquiditySetting: {
                                bankAccountCodes: this.state.cashFlowGridData.map((value, index) => {return ({code: value.code})}), 
                                tseAccountCodes: this.state.clearingSettlementTCEGridData.map((value, index) => {return ({code: value.code})}), 
                                ifbAccountCodes: this.state.clearingSettlementIFBGridData.map((value, index) => {return ({code: value.code})}),
                                kishAccountCodes: this.state.kishBranchGridData.map((value, index) => {return ({code: value.code})}),

                            },
                            balanceSheetReportSetting:{
                                currentAsset: this.state.currentAssetsGridData.map((value, index) => {return ({code: value.code})}), //دارایی های جاری
                                noneCurrentAsset:this.state.nonCurrentAssetsGridData.map((value, index) => {return ({code: value.code})}), //دارایی های غیر جاری
                                currentLiabilities: this.state.currentDebtGridData.map((value, index) => {return ({code: value.code})}), // دارایی های بدهی جاری
                                longTermDebt: this.state.longTermDebtGridData.map((value, index) => {return ({code: value.code})}), //دارایی های بلند مدت 
                                equity: this.state.equityGridData.map((value, index) => {return ({code: value.code})}), // سهام
                            },
                            profitOrLostReportSetting: {
                                income: this.state.incomeGridData.map((value, index) => {return ({code: value.code})}), 
                                cost: this.state.costGridData.map((value, index) => {return ({code: value.code})}), 
                            },
                            dateFilter: {
                                startDate: new Date(),
                            }

                        }
                    }
                    className="form-height"
                >
                    <br/>
                    <Fieldset legend={'ترازنامه'} border={'2px solid rgba(117, 117, 117, 0.62)'}>


                    {/* کدهای حساب مربوط به دارایی های جاری */}
                    <G container spacing={8} className="no-margin">
                        <G item md={8}>
                            <AutoCompleteComponent {...this.state.currentAssets}
                                handleChange={(value) => this.handleChange(value, 'sellectedCurrentAssets', 'currentAssetsDisabledBtn', 'currentAssetObjectForGrid')}
                                value={this.state.sellectedCurrentAssets.title}
                                service={GetFlatSearchForAccountingCodeService.getflatsearchforaccountingcodeMethod} />
                                
                        </G>
                        <G item md={4}>
                        <Button variant="contained" className="margin-top-10 successButton" onClick={() => this.addToGrid('currentAssetsGridData', 'currentAssetObjectForGrid', 'جاری', 'sellectedCurrentAssets')} disabled={this.state.currentAssetsDisabledBtn}>
                            <span className="fa fa-plus margin-all-5"></span>
                            افزودن
                        </Button>
                        {/* <Button variant="contained" className="margin-top-10 successButton" onClick={this.Test}>
                            <span className="fa fa-plus margin-all-5"></span>
                            تست
                        </Button> */}
                        </G>
                    </G>
                    <div className="k-rtl height-page">
                        <LocalizationProvider language="fa-FA">
                            <Grid
                                data={this.state.currentAssetsGridData.slice(this.state.skip, this.state.take + this.state.skip)}
                                skip={this.state.skip}
                                take={this.state.take}
                                total={this.state.currentAssetsGridData.length}
                                pageable={true}
                                onPageChange={this.pageChange}
                            >
                                <Column field="title" title="عنوان"/>
                                <Column field="code" title="کد حساب" />
                                <Column field="levelTitle" title="سطح"/>
                                <Column title="حذف" cell={(e) => this.deleteTableCellMethod(e, 'currentAssetsGridData')} width="100px"/>
                            </Grid>
                        </LocalizationProvider>
                    </div>
                    <br/>

                    {/* کدهای حساب مربوط به دارایی های غیر جاری */}
                    <G container spacing={8} className="no-margin">
                        <G item md={8}>
                            <AutoCompleteComponent {...this.state.nonCurrentAssets}
                                handleChange={(value) => this.handleChange(value, 'sellectedNonCurrentAssets', 'nonCurrentAssetsDisabledBtn', 'nonCurrentAssetObjectForGrid')}
                                value={this.state.sellectedNonCurrentAssets.title}
                                service={GetFlatSearchForAccountingCodeService.getflatsearchforaccountingcodeMethod} />
                        </G>
                        <G item md={4}>
                        <Button variant="contained" className="margin-top-10 successButton" onClick={() => this.addToGrid('nonCurrentAssetsGridData', 'nonCurrentAssetObjectForGrid', 'غیر جاری', 'sellectedNonCurrentAssets')} disabled={this.state.nonCurrentAssetsDisabledBtn}>
                            <span className="fa fa-plus margin-all-5"></span>
                            افزودن
                        </Button>
                        </G>
                    </G>
                    <div className="k-rtl height-page">
                        <LocalizationProvider language="fa-FA">
                            <Grid
                                data={this.state.nonCurrentAssetsGridData.slice(this.state.skip, this.state.take + this.state.skip)}
                                skip={this.state.skip}
                                take={this.state.take}
                                total={this.state.nonCurrentAssetsGridData.length}
                                pageable={true}
                                onPageChange={this.pageChange}
                            >
                                <Column field="title" title="عنوان"/>
                                <Column field="code" title="کد حساب" />
                                <Column field="levelTitle" title="سطح"/>
                                <Column title="حذف" cell={(e) => this.deleteTableCellMethod(e, 'nonCurrentAssetsGridData')} width="100px"/>
                            </Grid>
                        </LocalizationProvider>
                    </div>
                    <br/>

                    {/* کدهای حساب مربوط به دارایی های بدهی جاری */}
                    <G container spacing={8} className="no-margin">
                        <G item md={8}>
                            <AutoCompleteComponent {...this.state.longTermDebt}
                                handleChange={(value) => this.handleChange(value, 'sellectedCurrentDebt', 'currentDebtDisabledBtn', 'currentDebtObjectForGrid')}
                                value={this.state.sellectedCurrentDebt.title}
                                service={GetFlatSearchForAccountingCodeService.getflatsearchforaccountingcodeMethod} />
                        </G>
                        <G item md={4}>
                        <Button variant="contained" className="margin-top-10 successButton" onClick={() => this.addToGrid('currentDebtGridData', 'currentDebtObjectForGrid', 'بدهی جاری', 'sellectedCurrentDebt')} disabled={this.state.currentDebtDisabledBtn}>
                            <span className="fa fa-plus margin-all-5"></span>
                            افزودن
                        </Button>
                        </G>
                    </G>
                    <div className="k-rtl height-page">
                        <LocalizationProvider language="fa-FA">
                            <Grid
                                data={this.state.currentDebtGridData.slice(this.state.skip, this.state.take + this.state.skip)}
                                skip={this.state.skip}
                                take={this.state.take}
                                total={this.state.currentDebtGridData.length}
                                pageable={true}
                                onPageChange={this.pageChange}
                            >
                                <Column field="title" title="عنوان"/>
                                <Column field="code" title="کد حساب" />
                                <Column field="levelTitle" title="سطح"/>
                                <Column title="حذف" cell={(e) => this.deleteTableCellMethod(e, 'currentDebtGridData')} width="100px"/>
                            </Grid>
                        </LocalizationProvider>
                    </div>
                    <br/>

                    {/* کدهای حساب مربوط به دارایی های بلند مدت */}
                    <G container spacing={8} className="no-margin">
                        <G item md={8}>
                            <AutoCompleteComponent {...this.state.currentDebt}
                                handleChange={(value) => this.handleChange(value, 'sellectedLongTermDebt', 'longTermDebtDisabledBtn', 'longTermDebtObjectForGrid')}
                                value={this.state.sellectedLongTermDebt.title}
                                service={GetFlatSearchForAccountingCodeService.getflatsearchforaccountingcodeMethod} />
                        </G>
                        <G item md={4}>
                        <Button variant="contained" className="margin-top-10 successButton" onClick={() => this.addToGrid('longTermDebtGridData', 'longTermDebtObjectForGrid', 'بدهی بلند مدت', 'sellectedLongTermDebt')} disabled={this.state.longTermDebtDisabledBtn}>
                            <span className="fa fa-plus margin-all-5"></span>
                            افزودن
                        </Button>
                        </G>
                    </G>
                    <div className="k-rtl height-page">
                        <LocalizationProvider language="fa-FA">
                            <Grid
                                data={this.state.longTermDebtGridData.slice(this.state.skip, this.state.take + this.state.skip)}
                                skip={this.state.skip}
                                take={this.state.take}
                                total={this.state.longTermDebtGridData.length}
                                pageable={true}
                                onPageChange={this.pageChange}
                            >
                                <Column field="title" title="عنوان"/>
                                <Column field="code" title="کد حساب" />
                                <Column field="levelTitle" title="سطح"/>
                                <Column title="حذف" cell={(e) => this.deleteTableCellMethod(e, 'longTermDebtGridData')} width="100px"/>
                            </Grid>
                        </LocalizationProvider>
                    </div>





                    {/* کدهای حساب مربوط به حقوق صاحبان سهام */}
                    <G container spacing={8} className="no-margin">
                        <G item md={8}>
                            <AutoCompleteComponent {...this.state.equity}
                                handleChange={(value) => this.handleChange(value, 'sellectedEquity', 'equityDisabledBtn', 'equityObjectForGrid')}
                                value={this.state.sellectedEquity.title}
                                service={GetFlatSearchForAccountingCodeService.getflatsearchforaccountingcodeMethod} />
                        </G>
                        <G item md={4}>
                        <Button variant="contained" className="margin-top-10 successButton" onClick={() => this.addToGrid('equityGridData', 'equityObjectForGrid', 'حقوق صاحبان سهام', 'sellectedEquity')} disabled={this.state.equityDisabledBtn}>
                            <span className="fa fa-plus margin-all-5"></span>
                            افزودن
                        </Button>
                        </G>
                    </G>
                    <div className="k-rtl height-page">
                        <LocalizationProvider language="fa-FA">
                            <Grid
                                data={this.state.equityGridData.slice(this.state.skip, this.state.take + this.state.skip)}
                                skip={this.state.skip}
                                take={this.state.take}
                                total={this.state.equityGridData.length}
                                pageable={true}
                                onPageChange={this.pageChange}
                            >
                                <Column field="title" title="عنوان"/>
                                <Column field="code" title="کد حساب" />
                                <Column field="levelTitle" title="سطح"/>
                                <Column title="حذف" cell={(e) => this.deleteTableCellMethod(e, 'equityGridData')} width="100px"/>
                            </Grid>
                        </LocalizationProvider>
                    </div>

                    </Fieldset>

                    <br/>

                    <Fieldset legend={'صورت سود و زیان'} border={'2px solid rgba(117, 117, 117, 0.62)'}>
                    
                    {/* کدهای حساب مربوط به درآمدها */}
                    <G container spacing={8} className="no-margin">
                        <G item md={8}>
                            <AutoCompleteComponent {...this.state.income}
                                handleChange={(value) => this.handleChange(value, 'sellectedIncome', 'incomeDisabledBtn', 'incomeObjectForGrid')}
                                value={this.state.sellectedIncome.title}
                                service={GetFlatSearchForAccountingCodeService.getflatsearchforaccountingcodeMethod} />
                        </G>
                        <G item md={4}>
                        <Button variant="contained" className="margin-top-10 successButton" onClick={() => this.addToGrid('incomeGridData', 'incomeObjectForGrid', 'درآمدها', 'sellectedIncome')} disabled={this.state.incomeDisabledBtn}>
                            <span className="fa fa-plus margin-all-5"></span>
                            افزودن
                        </Button>
                        </G>
                    </G>
                    <div className="k-rtl height-page">
                        <LocalizationProvider language="fa-FA">
                            <Grid
                                data={this.state.incomeGridData.slice(this.state.skip, this.state.take + this.state.skip)}
                                skip={this.state.skip}
                                take={this.state.take}
                                total={this.state.incomeGridData.length}
                                pageable={true}
                                onPageChange={this.pageChange}
                            >
                                <Column field="title" title="عنوان"/>
                                <Column field="code" title="کد حساب" />
                                <Column field="levelTitle" title="سطح"/>
                                <Column title="حذف" cell={(e) => this.deleteTableCellMethod(e, 'incomeGridData')} width="100px"/>
                            </Grid>
                        </LocalizationProvider>
                    </div>

                    <br/>


                    {/* کدهای حساب مربوط به هزینه ها */}
                    <G container spacing={8} className="no-margin">
                    <G item md={8}>
                        <AutoCompleteComponent {...this.state.cost}
                            handleChange={(value) => this.handleChange(value, 'sellectedCost', 'costDisabledBtn', 'costObjectForGrid')}
                            value={this.state.sellectedCost.title}
                            service={GetFlatSearchForAccountingCodeService.getflatsearchforaccountingcodeMethod} />
                    </G>
                    <G item md={4}>
                    <Button variant="contained" className="margin-top-10 successButton" onClick={() => this.addToGrid('costGridData', 'costObjectForGrid', 'درآمدها', 'sellectedCost')} disabled={this.state.costDisabledBtn}>
                        <span className="fa fa-plus margin-all-5"></span>
                        افزودن
                    </Button>
                    </G>
                    </G>
                    <div className="k-rtl height-page">
                        <LocalizationProvider language="fa-FA">
                            <Grid
                                data={this.state.costGridData.slice(this.state.skip, this.state.take + this.state.skip)}
                                skip={this.state.skip}
                                take={this.state.take}
                                total={this.state.costGridData.length}
                                pageable={true}
                                onPageChange={this.pageChange}
                            >
                                <Column field="title" title="عنوان"/>
                                <Column field="code" title="کد حساب" />
                                <Column field="levelTitle" title="سطح"/>
                                <Column title="حذف" cell={(e) => this.deleteTableCellMethod(e, 'costGridData')} width="100px"/>
                            </Grid>
                        </LocalizationProvider>
                      </div>
                    <br/>


                    </Fieldset>

                    <br/>



                    <Fieldset legend={'نقدینگی'}  border={'2px solid rgba(117, 117, 117, 0.62)'}>




                    {/* کدهای حساب مربوط به موجودی نقد و بانک */}
                    <G container spacing={8} className="no-margin">
                        <G item md={8}>
                            <AutoCompleteComponent {...this.state.cashFlow}
                                handleChange={(value) => this.handleChange(value, 'sellectedCashFlow', 'cashFlowDisabledBtn', 'cashFlowObjectForGrid')}
                                value={this.state.sellectedCashFlow.title}
                                service={GetFlatSearchForAccountingCodeService.getflatsearchforaccountingcodeMethod} />
                        </G>
                        <G item md={4}>
                        <Button variant="contained" className="margin-top-10 successButton" onClick={() => this.addToGrid('cashFlowGridData', 'cashFlowObjectForGrid', 'موجودی نقد و بانک', 'sellectedCashFlow')} disabled={this.state.cashFlowDisabledBtn}>
                            <span className="fa fa-plus margin-all-5"></span>
                            افزودن
                        </Button>
                        </G>
                    </G>
                    <div className="k-rtl height-page">
                        <LocalizationProvider language="fa-FA">
                            <Grid
                                data={this.state.cashFlowGridData.slice(this.state.skip, this.state.take + this.state.skip)}
                                skip={this.state.skip}
                                take={this.state.take}
                                total={this.state.cashFlowGridData.length}
                                pageable={true}
                                onPageChange={this.pageChange}
                            >
                                <Column field="title" title="عنوان"/>
                                <Column field="code" title="کد حساب" />
                                <Column field="levelTitle" title="سطح"/>
                                <Column title="حذف" cell={(e) => this.deleteTableCellMethod(e, 'cashFlowGridData')} width="100px"/>
                            </Grid>
                        </LocalizationProvider>
                    </div>

                    <br/>



                    {/* کدهای حساب مربوط به اتاق پایاپای بورس */}
                    <G container spacing={8} className="no-margin">
                        <G item md={8}>
                            <AutoCompleteComponent {...this.state.clearingSettlementTCE}
                                handleChange={(value) => this.handleChange(value, 'sellectedClearingSettlementTCE', 'clearingSettlementTCEDisabledBtn', 'clearingSettlementTCEObjectForGrid')}
                                value={this.state.sellectedClearingSettlementTCE.title}
                                service={GetFlatSearchForAccountingCodeService.getflatsearchforaccountingcodeMethod} />
                        </G>
                        <G item md={4}>
                        <Button variant="contained" className="margin-top-10 successButton" onClick={() => this.addToGrid('clearingSettlementTCEGridData', 'clearingSettlementTCEObjectForGrid', 'اتاق پایاپای بورس', 'sellectedClearingSettlementTCE')} disabled={this.state.clearingSettlementTCEDisabledBtn}>
                            <span className="fa fa-plus margin-all-5"></span>
                            افزودن
                        </Button>
                        </G>
                    </G>
                    <div className="k-rtl height-page">
                        <LocalizationProvider language="fa-FA">
                            <Grid
                                data={this.state.clearingSettlementTCEGridData.slice(this.state.skip, this.state.take + this.state.skip)}
                                skip={this.state.skip}
                                take={this.state.take}
                                total={this.state.clearingSettlementTCEGridData.length}
                                pageable={true}
                                onPageChange={this.pageChange}
                            >
                                <Column field="title" title="عنوان"/>
                                <Column field="code" title="کد حساب" />
                                <Column field="levelTitle" title="سطح"/>
                                <Column title="حذف" cell={(e) => this.deleteTableCellMethod(e, 'clearingSettlementTCEGridData')} width="100px"/>
                            </Grid>
                        </LocalizationProvider>
                    </div>

                    <br/>



                    {/* کدهای حساب مربوط به اتاق پایاپای فرابورس */}
                    <G container spacing={8} className="no-margin">
                        <G item md={8}>
                            <AutoCompleteComponent {...this.state.clearingSettlementIFB}
                                handleChange={(value) => this.handleChange(value, 'sellectedClearingSettlementIFB', 'clearingSettlementIFBDisabledBtn', 'clearingSettlementIFBObjectForGrid')}
                                value={this.state.sellectedClearingSettlementIFB.title}
                                service={GetFlatSearchForAccountingCodeService.getflatsearchforaccountingcodeMethod} />
                        </G>
                        <G item md={4}>
                        <Button variant="contained" className="margin-top-10 successButton" onClick={() => this.addToGrid('clearingSettlementIFBGridData', 'clearingSettlementIFBObjectForGrid', 'اتاق پایاپای فرابورس', 'sellectedClearingSettlementIFB')} disabled={this.state.clearingSettlementIFBDisabledBtn}>
                            <span className="fa fa-plus margin-all-5"></span>
                            افزودن
                        </Button>
                        </G>
                    </G>
                    <div className="k-rtl height-page">
                        <LocalizationProvider language="fa-FA">
                            <Grid
                                data={this.state.clearingSettlementIFBGridData.slice(this.state.skip, this.state.take + this.state.skip)}
                                skip={this.state.skip}
                                take={this.state.take}
                                total={this.state.clearingSettlementIFBGridData.length}
                                pageable={true}
                                onPageChange={this.pageChange}
                            >
                                <Column field="title" title="عنوان"/>
                                <Column field="code" title="کد حساب" />
                                <Column field="levelTitle" title="سطح"/>
                                <Column title="حذف" cell={(e) => this.deleteTableCellMethod(e, 'clearingSettlementIFBGridData')} width="100px"/>
                            </Grid>
                        </LocalizationProvider>
                    </div>

                    <br/>


                      {/* کدهای حساب مربوط به شعبه کیش */}
                    <G container spacing={8} className="no-margin">
                        <G item md={8}>
                            <AutoCompleteComponent {...this.state.kishBranch}
                                handleChange={(value) => this.handleChange(value, 'sellectedkishBranch', 'kishBranchDisabledBtn', 'kishBranchObjectForGrid')}
                                value={this.state.sellectedkishBranch.title}
                                service={GetFlatSearchForAccountingCodeService.getflatsearchforaccountingcodeMethod} />
                        </G>
                        <G item md={4}>
                        <Button variant="contained" className="margin-top-10 successButton" onClick={() => this.addToGrid('kishBranchGridData', 'kishBranchObjectForGrid', 'شعبه کیش', 'sellectedkishBranch')} disabled={this.state.kishBranchDisabledBtn}>
                            <span className="fa fa-plus margin-all-5"></span>
                            افزودن
                        </Button>
                        </G>
                    </G>
                    <div className="k-rtl height-page">
                        <LocalizationProvider language="fa-FA">
                            <Grid
                                data={this.state.kishBranchGridData.slice(this.state.skip, this.state.take + this.state.skip)}
                                skip={this.state.skip}
                                take={this.state.take}
                                total={this.state.kishBranchGridData.length}
                                pageable={true}
                                onPageChange={this.pageChange}
                            >
                                <Column field="title" title="عنوان"/>
                                <Column field="code" title="کد حساب" />
                                <Column field="levelTitle" title="سطح"/>
                                <Column title="حذف" cell={(e) => this.deleteTableCellMethod(e, 'kishBranchGridData')} width="100px"/>
                            </Grid>
                        </LocalizationProvider>
                    </div>

                    <br/>
                    </Fieldset>
                </Form>
            </React.Fragment>
        );
    }

}
export default AccountingSettingComponentAccountingReport;