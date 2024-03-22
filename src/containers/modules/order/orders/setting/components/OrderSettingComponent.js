import React from 'react';
import Header from "shared/components/stateHeader/stateHeader";
import Form from "shared/components/form/form";
import TimePicker from "shared/components/timePicker/timePicker";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from 'shared/components/formInput/inputForm'
import DropDownComponent from 'shared/components/dropDown/dropDown';
import GetEnum from 'services/getEnum';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import OrderSettingService from '../services/OrderSettingService';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import { Grid as KendoGrid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import toastr from 'toastr';

class OrderSettingComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataItem: {},
            unSelectedBranchList: {
                name: "UnSelectedBranch",
                feild: "title",
                label: "شعبه",
                list: []
            },
            buyOrderBranchList: {
                name: "buyOrderBranch",
                feild: "title",
                label: "شعبه",
                list: []
            },
            sellOrderBranchList: {
                name: "sellOrderBranch",
                feild: "title",
                label: "شعبه",
                list: []
            },
        };
        this.successGetUnselectedBranch = this.successGetUnselectedBranch.bind(this);
        this.successGetAllBranch = this.successGetAllBranch.bind(this);
    }

    handleChange(value, name) {

        let item = value.value;
        this.setState({
            [name]: item,
        })
    }



    componentWillMount() {

    }

    componentDidMount() {

        this.getUnselectedBranch();
        this.getAllBranch();
    }

    getAllBranch() {
        OrderSettingService.getUnSelectedBranch(this.successGetUnselectedBranch);
    }

    successGetAllBranch(response) {
        if (response.success) {
            this.setState({
                buyOrderBranchList: {
                    name: "buyOrderBranch",
                    feild: "title",
                    label: "شعبه",
                    list: response.result
                },
                sellOrderBranchList: {
                    name: "sellOrderBranch",
                    feild: "title",
                    label: "شعبه",
                    list: response.result
                }
            });
        }

    }

    getUnselectedBranch() {
        OrderSettingService.getUnSelectedBranch(this.successGetUnselectedBranch);
    }

    // 
    successGetUnselectedBranch(response) {
        if (response.success) {
            this.setState({

                unSelectedBranchList: {
                    name: "unSelectedBranch",
                    feild: "title",
                    label: "شعبه",
                    list: response.result
                }
            });
        }

    }


    //انتخاب شعبه (ردیف لاول)
    selectBranchId(event) {

    }


    // نمای سفارش اینترنتی
    offlineOrder(event) {
        return <td>

            {
                <Grid item md={2}>
                    <div className="k-rtl">
                        <ComboBoxComponent isFilterable {...this.state.voucherStateList}
                            handleChange={(value, name) => this.handleChangeVoucherMaster(value, name)}
                            value={this.state.voucherState} />
                    </div>
                </Grid>
            }

        </td>
    }


    //دریافت اطلاعات کل لیست
    pureData(data) {

        let dataItem = this.state.dataItem;
        if (data.length > 0 && data[data.indexOf(dataItem)] !== undefined)
            data[data.indexOf(dataItem)].inEdit = false;
        return data;
    }


    //افزودن یک ردیف شعبه
    enterInsert(e) {
        e.preventDefault();
        const dataItem = {
            sellOrderBranchId: 0,
            buyOrderBranchId: 0,
            offlineOrderBranchId: 0,
            branchId: 0
        };
        let data = this.pureData(this.state.data)
        data.push(dataItem)
        this.setState({
            data: data
        });

    }



    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Form
                    {...this.props}
                    {...this.state}
                    service={OrderSettingService.saveSetting}
                    entity={{

                    }}

                >

                    <div>

                        <LocalizationProvider language="fa-FA">

                            <KendoGrid

                                style={{ height: '44rem' }}
                                data={this.state.data}
                                rowHeight={50}
                                onItemChange={this.itemChange}
                                selectedField="selected"
                                onRowClick={(e) => {

                                    this.setState({ dataItem: e.dataItem })

                                }}
                            >
                                <GridToolbar>
                                    <button
                                        title="افزودن شعبه"
                                        className="k-button k-success"
                                        onClick={this.enterInsert}

                                    >افزودن شعبه
                                     </button>


                                </GridToolbar>
                                <Column field="branch" editable={false} title="شعبه" width="200px" cell={this.unSelectedBranch} />
                                <Column field="offlineOrderBranch" title="سفارشات اینترنتی" cell={this.offlineOrder} />
                                <Column field="buyOrderBranch" title="حضوری خرید" cell={this.sellOrder} />
                                <Column field="sellOrderBranch" title="حضوری فروش" cell={this.buyOrder} />
                            </KendoGrid>
                        </LocalizationProvider>
                    </div>
                </Form>
                {/* <Form
                    service={OrderSettingService.saveSetting}
                    {...this.props}
                    {...this.state}
                    redirect={"/main/dashboard"}
                    entity={
                        {


                        }
                    }
                    className="form-height"
                >
                    <Grid container spacing={16} className="no-margin">
                        <Grid item md={12}>
                            <Grid item md={11}>
                                <Table style={{ position: 'relative' }}>


                                    <TableHead className="background-gray-sell table-header">
                                        <TableRow >
                                            <TableCell>شعبه</TableCell>
                                            <TableCell>سفارشات اینترنتی</TableCell>
                                            <TableCell>حضوری خرید</TableCell>
                                            <TableCell>حضوری فروش</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody className="table-row" >
                                        {this.state.branches.map(b =>
                                            <TableRow hover={true} >
                                                <TableCell>

                                                </TableCell>
                                                <TableCell>{this.state.t0DateJalali}</TableCell>
                                                <TableCell align="right">{this.state.tseRemainT0.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </Grid>

                        </Grid>
                    </Grid>

                </Form> */}
            </React.Fragment>
        )
    }

}
export default OrderSettingComponent;