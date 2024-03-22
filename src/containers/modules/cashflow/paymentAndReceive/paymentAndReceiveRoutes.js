import GetPaymentAndReceiveListComponent from "./paymentAndReceiveList/components/GetPaymentAndReceiveListComponent";


const route = {
    paymentAndReceiveList: {
        component: GetPaymentAndReceiveListComponent,
        title: "گزارش دریافت و پرداخت",
        path: "/main/cashFlow/paymentAndReceive/paymentAndReceiveReposrt",
        back: null,
        add: null,
        edit: null,
        icon: 'fas fa-money-bill',
    },


};
export default route;

