import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import AccountingBaseModule from './accountingBase/accountingBaseModule';
import AccountingReportModule from './accountingReport/accountingReportModule'
class AccountingModule extends Component {

    render() {
        return (
            <div className="height-page">
                <Switch>
                    <Route path="/main/accounting/report" component={AccountingReportModule} />
                    <Route path="/main/accounting/base" component={AccountingBaseModule}  />
                </Switch>
            </div>
        )
    }
}

export default AccountingModule;


