import GetPaymentListComponent from "./paymentList/components/GetPaymentListComponent";
import CreatePaymentComponent from "./paymentList/components/CreatePaymentComponent";
import GetMoneyTransferComponent from "./moneyTransfer/components/GetMoneyTransferComponent";
import CreateMoneyTransferComponent from "./moneyTransfer/components/CreateMoneyTransferComponent";
import EditPaymentComponent from "./paymentList/components/EditPaymentComponent";
import EditMoneyTransferComponent from "./moneyTransfer/components/EditMoneyTransferComponent";


const route = {
    paymentList: {
        component: GetPaymentListComponent,
        title: "فهرست پرداخت",
        path: "/main/cashFlow/payment/paymentList",
        back: null,
        get add(){return route.createPaymentList},
        get edit(){return route.editPaymentList},
        icon: 'fas fa-money-bill',
    },
    createPaymentList: {
        component: CreatePaymentComponent,
        title: "افزودن پرداخت",
        path: "/main/cashFlow/payment/createPayment",
        get back(){return route.paymentList},
        add: null,
        edit: null,
        icon: 'fas fa-money-bill',
    },
    editPaymentList: {
        component: EditPaymentComponent,
        title: "بروزرسانی پرداخت",
        path: "/main/cashFlow/payment/editPayment",
        get back(){return route.paymentList},
        add: null,
        edit: null,
        icon: 'fas fa-money-bill',
    },

    moneyTransferList: {
        component: GetMoneyTransferComponent,
        title: "فهرست انتقال وجه",
        path: "/main/cashFlow/payment/getMoneyTransfer",
        back: null,
        get add(){return route.createMoneyTransfer},
        edit: null,
        icon: 'fas fa-money-bill',
    },
    createMoneyTransfer: {
        component: CreateMoneyTransferComponent,
        title: "افزودن انتقال وجه",
        path: "/main/cashFlow/payment/createMoneyTransfer",
        get back(){return route.moneyTransferList},
        add: null,
        edit: null,
        icon: 'fas fa-money-bill',
    },
    editMoneyTransfer: {
        component: EditMoneyTransferComponent,
        title: "ویرایش انتقال وجه",
        path: "/main/cashFlow/payment/editMoneyTransfer",
        get back(){return route.moneyTransferList},
        add: null,
        edit: null,
        icon: 'fas fa-money-bill',
    }
};
export default route;

