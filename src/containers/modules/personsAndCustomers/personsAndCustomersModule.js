import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CustomersModule from './customers/customersModule';
import PartyGroupModule from './partyGroup/partyGroupModule';
import partyServiceModule from './partyService/partyServiceModule';
import partyReportsModule from './partyReports/partyReportsModule';

class PersonsAndCustomersModule extends React.Component {
    render() {
        return(
            <div className="height-page">
                <Switch>
                    <Route path="/main/persons/customers" component={CustomersModule}/>
                    <Route path="/main/persons/partyGroup" component={PartyGroupModule}/>
                    <Route path="/main/persons/partyService" component={partyServiceModule}/>
                    <Route path="/main/persons/partyReports" component={partyReportsModule}/>
                </Switch>
            </div>

        )    
    }
}
export default PersonsAndCustomersModule; 