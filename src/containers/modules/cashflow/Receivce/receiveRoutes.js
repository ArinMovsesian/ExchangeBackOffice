import GetReceiveListComponent from "./receiveList/components/GetReceiveListComponent";
import CreateReceiveComponent from "./receiveList/components/CreateReceiveComponent";
import EditReceiveComponent from "./receiveList/components/EditReceiveComponent";
import GetMoneyReceiveComponent from "./moneyReceive/components/GetMoneyReceiveComponent";
import CreateMoneyReceiveComponent from "./moneyReceive/components/CreateMoneyReceiveComponent";


const route = {
    receiveList: {
        component: GetReceiveListComponent,
        title: "فهرست دریافت",
        path: "/main/cashFlow/receive/receiveList",
        back: null,
        get add(){return route.createReceiveList},
        edit: null,
        icon: 'fas fa-money-bill',
    },
    createReceiveList: {
        component: CreateReceiveComponent,
        title: "افزودن دریافت",
        path: "/main/cashFlow/receive/createReceive",
        get back(){return route.receiveList},
        add: null,
        edit: null,
        icon: 'fas fa-money-bill',
    },
    editReceiveList: {
        component: EditReceiveComponent,
        title: "ویرایش دریافت",
        path: "/main/cashFlow/receive/editReceive",
        get back(){return route.receiveList},
        add: null,
        edit: null,
        icon: 'fas fa-money-bill',
    },

    moneyReceiverList: {
        component: GetMoneyReceiveComponent,
        title: "تقاضای وجه",
        path: "/main/cashFlow/receive/moneyRequest",
        get add(){return route.createMoneyReceiverList},
        edit: null,
        icon: 'fas fa-money-bill',
    },
    createMoneyReceiverList: {
        component: CreateMoneyReceiveComponent,
        title: " افزودن تقاضای وجه",
        path: "/main/cashFlow/receive/createMoneyRequest",
        get back(){return route.moneyReceiverList},
        add: null,
        edit: null,
        icon: 'fas fa-money-bill',
    }

};
export default route;

