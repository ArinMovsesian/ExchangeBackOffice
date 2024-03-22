import GetIncompletePartyListComponent from "./incompletePartyList/components/GetIncompletePartyListComponent";
import UpdateUncompletedCustomerComponent from "../customers/realCustomers/components/UpdateUncompletedCustomerComponent";
import UpdateLegalUncompletedCustomerComponent from "../customers/legalcustomers/components/UpdateLegalUncompletedCustomerComponent";
import GetActivedeActivePartiesReportComponent from "./activedeActivePartiesReportList/components/GetactivedeActivePartiesReportComponent";
import GetCustomersInternetactivityComponent from "./customersInternetactivity/components/GetCustomersInternetactivityComponent";

const route = {

    GetIncompletePartyList: {
        component: GetIncompletePartyListComponent,
        title: "فهرست مشتریان ناقص",
        path: "/main/persons/partyReports/getIncompletePartyList",
        back : null,
        add: null,
        get edit(){return [route.UpdateUnCompletedParty , route.UpdateLegalUnCompletedParty]},
        // get edit(){return  route.UpdateGroup},
        // get list(){return  route.GetPartiesGroup},
        icon: 'fas fa-list-alt'
    },
    UpdateUnCompletedParty:{
        component: UpdateUncompletedCustomerComponent,
        title: 'ویراش مشتریان حقیقی ناقص',
        path: '/main/persons/partyReports/editRealUncompletedParty',
        icon:'fas fa-edit',
        add: null,
        get back(){return route.GetIncompletePartyList},
    },
    UpdateLegalUnCompletedParty:{
        component: UpdateLegalUncompletedCustomerComponent,
        title: 'ویراش مشتریان حقوقی ناقص',
        path: '/main/persons/partyReports/editLegalUncompletedParty',
        icon:'fas fa-edit',
        add: null,
        get back(){return route.GetIncompletePartyList},
    },



    GetActivedeActivePartiesReportList: {
        component: GetActivedeActivePartiesReportComponent,
        title: "فهرست مشتریان فعال و غیر فعال",
        path: "/main/persons/partyReports/getActivedeActiveParties",
        back : null,
        add: null,
        // get edit(){return [route.UpdateUnCompletedParty , route.UpdateLegalUnCompletedParty]},
        // get edit(){return  route.UpdateGroup},
        // get list(){return  route.GetPartiesGroup},
        icon: 'fas fa-list-alt'
    },

    GetCustomersInternetactivity: {
        component: GetCustomersInternetactivityComponent,
        title: "فهرست فعالیت اینترنتی مشتریان",
        path: "/main/persons/partyReports/getInternetActivityParties",
        back : null,
        add: null,
        icon: 'fas fa-list-alt'
    },


}

export default route;