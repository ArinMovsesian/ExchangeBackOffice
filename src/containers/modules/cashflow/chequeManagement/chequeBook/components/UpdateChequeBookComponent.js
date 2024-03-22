import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import classNames from 'classnames';
import Input from 'shared/components/formInput/inputForm'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import Fieldset from 'shared/components/fieldset/fieldset';
import toastr from 'toastr';
import Header from 'shared/components/stateHeader/stateHeader';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import AutoCompleteComplete from 'shared/components/dropDown/autocomplete';
import IBAN from 'shared/components/iban/textMask';
import styles from 'containers/layout/panel/theme';
import Button from '@material-ui/core/Button';
import Submit from 'shared/components/submitAction/actionSubmit';
import Form from 'shared/components/form/form';
import GetEnum from 'services/getEnum';
import GetAllBankNames from 'services/getBanks';
import GetAllRegion from 'services/getRegion';
import GetMainMarket from 'services/GetMainMarkets';
import GetPartiesService from "../../../../personsAndCustomers/customers/customersList/services/GetPartiesService";
import GetChequeBookServices from "../services/GetChequeBookServices";
import ComboBoxServerSide from "../../../../../../shared/components/dropDown/serverSide/comboBox";
import SaveChequeBookServices from "../services/SaveChequeBookServices";
import DropDownListDataProvider from "../../../../../../core/dropDownListDataProvider";
import ComboBoxServerSideBest from "../../../../../../shared/components/dropDown/comboBox/serverSideComboBox";
import UpdateCheuqeBookServices from "../services/UpdateCheuqeBookServices";

class UpdateChequeBookComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchBankDeposit: {
                name: "selectedSearchBankDeposit",
                // field: "accountNumber",
                placeholder: "شماره حساب بانکی",
                textField: 'fullAccountNumber',
                keyField: 'id',
                // pro1: 'id',
                // prop2: 'accountTypeTitle'
                // list: [],
                // title: 'accountTypeTitle',
                // id: 'id'
            },
            selectedSearchBankDeposit: {id: 0},



            isDefault: true,
            isActive: false,
            fromSerial: null,
            toSerial: null,
            chequeBookTitle: '',

            chequeType: {
                name: "selectedChequeType",
                field: "title",
                label: "نوع چک",
                list: []
            },
            selectedChequeType: {},
            chequeTypeId: undefined,
            bankDepositIdTemp: undefined
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleBankDepositChange = this.handleBankDepositChange.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);

    }

    handleChange(value, name) {
        console.log([name], value.value);
        let item = value.value;
        this.setState({
            [name]: item
        })
    }
    ComboBoxServerSideHandler = (event) => {
        console.log('event',event);
        if(event === null) {
            this.setState({
                selectedSearchBankDeposit: {}
            })
        }else {
            // let {id, accountTypeTitle} = event;
            this.setState({
                selectedSearchBankDeposit: event
            })
        }
    };
    handleBankDepositChange(item){
        console.log('handleBankDepositChange', item.value);
        this.setState({
            selectedSearchBankDeposit : item.value,
        })
    }
    handleCheckChange(event, name){
        this.setState({
            [name]: event.target.checked,
        })
    }
    componentDidMount() {
        // console.log('pp',this.props.location.state.id);
        let command = {
            entity: this.props.location.state.id
        };
        GetEnum('chequetype', response => DropDownListDataProvider(this, "chequeType", response));
        GetChequeBookServices.getcashflowchequemasterbyidMethod(command, (res) => {
            let {title,isActive,isDefault,fromSerial,toSerial, chequeType,bankDepositId,id } = res.result;
            this.setState({
                id:id,
                chequeBookTitle: title,
                isActive: isActive,
                isDefault: isDefault,
                fromSerial: fromSerial,
                toSerial: toSerial,
                chequeTypeId: chequeType,
                bankDepositIdTemp: bankDepositId
            }, () => {
                GetEnum('chequetype', response => {
                    for(let i = 0; i < response.result.length; i++ ){
                        console.log(response.result);

                        if(response.result[i].code == this.state.chequeTypeId){
                            console.log(response.result[i]);
                            this.setState({
                                selectedChequeType: response.result[i]
                            })
                        }
                    }
                });
                GetChequeBookServices.searchBankDepositMethod({reportFilter: {phrase: ''}},(res) => {
                    for(let i = 0; i < res.result.length; i++ ){
                        if(res.result[i].id == this.state.bankDepositIdTemp){
                            // let {id, accountTypeTitle} = res.result[i];
                            // let a = {id, accountTypeTitle};
                            // console.log('PPPP',a);
                            this.setState({
                                selectedSearchBankDeposit: res.result[i]
                            })
                        }
                    }
                })

            });
            console.log('ressss',res);
        })
    }
    render() {
        console.log('C',this.state.selectedChequeType)
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Form
                    {...this.props}
                    {...this.state}
                    entity={
                        {
                            id: this.state.id,
                            title: this.state.chequeBookTitle,
                            bankDepositId:this.state.selectedSearchBankDeposit.id,
                            fromSerial: this.state.fromSerial,
                            toSerial: this.state.toSerial,
                            isDefault: this.state.isDefault,
                            isActive: this.state.isActive,
                            chequeType: this.state.selectedChequeType.code,
                            printFormat: 1

                        }
                    }
                    service={UpdateCheuqeBookServices.updatecashflowchequemasterMethod}
                    className="form-height"
                >
                    <Fieldset legend={'اطلاعات چک'}>
                        <Grid container spacing={8}>
                            <Grid item md={6}>
                                <Input label="عنوان دسته چک" handleChange={(e) => this.handleChange(e, 'chequeBookTitle')} value={this.state.chequeBookTitle}  required/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={8}>
                            <Grid item md={6}>
                                <div className="k-rtl">
                                <ComboBoxServerSideBest
                                    {...this.state.searchBankDeposit}
                                    handleChange={(value) => this.ComboBoxServerSideHandler(value)}
                                    service={GetChequeBookServices.searchBankDepositMethod}
                                    defaultVal={this.state.selectedSearchBankDeposit}
                                    validityIcon={false}
                                    validity={false}
                                />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container spacing={8}>
                            <Grid item md={6}>
                                <div className="k-rtl">
                                    <DropDownComponent
                                        isFilterable={true}
                                        {...this.state.chequeType}
                                        handleChange={(value, name) => this.handleChange(value, name)}
                                        value={this.state.selectedChequeType}
                                        required
                                    />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container spacing={8}>
                            <Grid item md={3}>
                                <div className="k-rtl">
                                    <NumberFormatComponent
                                        id="fromSerial"
                                        label="از شماره سریال"
                                        value={this.state.fromSerial}
                                        handleChange={(value, error) => this.handleChange(value, 'fromSerial')}
                                        type="number"
                                        isSeparator={false}
                                        required
                                    />

                                </div>
                            </Grid>
                            <Grid item md={3}>
                                <div className="k-rtl">
                                    <NumberFormatComponent
                                        id="toSerial"
                                        label="تا شماره سریال"
                                        value={this.state.toSerial}
                                        handleChange={(value, error) => this.handleChange(value, 'toSerial')}
                                        type="number"
                                        isSeparator={false}
                                        required
                                    />
                                </div>
                            </Grid>
                            <Grid container spacing={8}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.isDefault}
                                        onChange={(value) =>this.handleCheckChange(value,'isDefault')}
                                        value="purchaseFromBank"
                                        color="primary"
                                    />
                                }
                                label="دسته چک پیش فرض"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.isActive}
                                        onChange={(value) => this.handleCheckChange(value,'isActive')}
                                        value="purchaseFromBank"
                                        color="primary"
                                    />
                                }
                                label="وضعیت فعال بودن"
                            />
                            </Grid>
                        </Grid>
                    </Fieldset>
                </Form>
            </React.Fragment>
        )
    }
}
UpdateChequeBookComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateChequeBookComponent);