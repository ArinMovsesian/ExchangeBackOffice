import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import TradesModule from './trades/tradesModule'
import SettingModule from './setting/settingModule'

class TradeModule extends Component {
   
    render() {
        return (
            <div className="height-page">
                <Switch>
                    <Route path="/main/trade/trades" component={TradesModule} />
                    <Route path="/main/trade/setting" component={SettingModule} />
                </Switch>
            </div>
        )
    }
}

export default TradeModule;


