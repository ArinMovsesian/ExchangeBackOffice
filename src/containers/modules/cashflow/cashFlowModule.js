import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ChequeManagementModule from "./chequeManagement/chequeManagementModule";
import ReceiveModule from "./Receivce/receiveModule";
import PaymentModule from "./payment/paymentModule";
import PaymentAndReceiveModule from "./paymentAndReceive/paymentAndReceiveModule";
import SettingModule from "./setting/settingModule";

class CashFlowModule extends Component {

    render() {
        return (
            <div className="height-page">
                <Switch>
                    <Route path="/main/cashFlow/cashFlowSetting" component={SettingModule} />
                    <Route path="/main/cashFlow/chequeManagement" component={ChequeManagementModule} />
                    <Route path="/main/cashFlow/receive" component={ReceiveModule} />
                    <Route path="/main/cashFlow/payment" component={PaymentModule} />
                    <Route path="/main/cashFlow/paymentAndReceive" component={PaymentAndReceiveModule} />
                </Switch>
            </div>
        )
    }
}

export default CashFlowModule;


