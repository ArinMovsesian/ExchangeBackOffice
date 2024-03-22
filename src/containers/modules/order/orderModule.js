import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import OrdersModule from './orders/ordersModule'

class OrderModule extends Component {
   
    render() {
        return (
            <div className="height-page">
                <Switch>
                    <Route path="/main/order/orders" component={OrdersModule} />
                </Switch>
            </div>
        )
    }
}

export default OrderModule;


