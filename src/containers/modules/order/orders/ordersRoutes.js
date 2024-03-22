import GetOrders from "./ordersList/components/GetOrdersComponent";
import AddOrderComponent from "./createOrder/components/CreateOrderComponent";
import GetOrdersStatus from "./ordersStatusList/components/GetOrdersStatusComponent";
import OrderSettingComponent from "./setting/components/OrderSettingComponent";
import GetOrderDispatch from "./orderDispatch/components/GetOrderDispatchComponent";
import GetDailyOrders from "./dailyOrdersList/components/GetDailyOrdersComponent";
import UpdateOrderComponent from "./updateOrder/components/UpdateOrderComponent";
import GetRemovedOrders from "./removedOrder/components/GetRemovedOrdersComponent";
import GetTseOrderBranch from "./orderOfflineTradeTabs/components/GetTseOrderBranchComponent";
import GetTradesWithoutOrder from "./tradesWithoutOrder/components/GetTradesWithoutOrderComponent";
import GetMatchOrders from "./matchOrdersList/components/GetMatchOrdersComponent";
import GetDoneOrders from "./doneOrderList/components/GetDoneOrdersComponent";
import AddMatchOrders from "./matchOrdersList/components/AddMatchOrdersComponent";
import GetDoneOrdersByIds from "./doneOrderByIdsList/components/GetDoneOrdersByIdsComponent";
const route = {
    GetOrders: {
        component: GetOrders,
        title: "فهرست سفارش ها ",
        path: "/main/order/orders/getOrders",
        back: null,
        // add: null,
        edit: null,
        icon: 'fas fa-chart-bar',
        get add() { return route.AddOrder },
        get detail() { return route.GetMatchOrders },
    },
    GetMatchOrders: {
        component: GetMatchOrders,
        title: "فهرست معاملات تطبیق داده شده با سفارش ",
        path: "/main/order/orders/getMatchOrders",
        edit: null,
        icon: 'fas fa-chart-bar',
        // get add(){return route.AddMatchOrders},
        get add() { return route.AddMatchOrders },
        get back() { return route.GetDoneOrders },

    },
    GetDoneOrders: {
        component: GetDoneOrders,
        title: "فهرست سفارش های انجام شده ",
        path: "/main/order/orders/getDoneOrders",
        edit: null,
        icon: 'fas fa-chart-bar',
        add: null,
        get back() { return route.GetOrders },

    },
    GetTradesWithoutOrder: {
        component: GetTradesWithoutOrder,
        title: "فهرست سفارش های انجام شده فاقد درخواست ",
        path: "/main/order/orders/tradesWithoutOrder",
        back: null,
        // add: null,

        edit: null,
        icon: 'fas fa-chart-bar',
        get add() { return route.AddOrder },
    },
    GetDailyOrders: {
        component: GetDailyOrders,
        title: "فهرست سفارش های فعال",
        path: "/main/order/orders/getDailyOrders",
        back: null,
        // add: null,
        edit: null,
        icon: 'fas fa-list',
        get add() { return route.AddOrder },
    },
    GetRemovedOrders: {
        component: GetRemovedOrders,
        title: " فهرست سفارش های ابطال شده",
        path: "/main/order/orders/getRemovedOrders",
        back: null,
        // add: null,
        edit: null,
        icon: 'fas fa-list',
        get add() { return route.AddOrder },
    },

    AddOrder: {
        component: AddOrderComponent,
        title: "افزودن سفارش ",
        path: "/main/order/orders/addOrder",
        get back() { return route.GetOrders },
        icon: 'fas fa-plus',

    },
    UpdateOrder: {
        component: UpdateOrderComponent,
        title: "ویرایش سفارش ",
        path: "/main/order/orders/updateOrder",
        get back() { return route.GetOrders },
        icon: 'fas fa-edit',

    },
    UpdateDoneOrder: {
        component: UpdateOrderComponent,
        title: "ویرایش سفارش کاملا انجام شده ",
        path: "/main/order/orders/updateDoneOrder",
        get back() { return route.DoneOrdersByIds },
        icon: 'fas fa-edit',

    },
    GetOrdersStatus: {
        component: GetOrdersStatus,
        title: "تب های معاملاتی",
        path: "/main/order/orders/getOrdersStatus",
        back: null,
        // add: null,
        edit: null,
        icon: 'fas fa-chart-bar',
        add: null
    },

    GetOrderDispatch: {
        component: GetOrderDispatch,
        title: "مدیریت اقدام",
        path: "/main/order/orders/getOrderDispatch",
        back: null,
        // add: null,
        edit: null,
        icon: 'fas fa-chart-bar',
        add: null
    },
    GetTseOfflineOrderBranch: {
        component: GetTseOrderBranch,
        title: "تب های معاملاتی",
        path: "/main/order/orders/GetTseOfflineOrderBranch",
        back: null,
        // add: null,
        edit: null,
        icon: 'fas fa-chart-bar',
        add: null
    },

    OrderSetting: {
        component: OrderSettingComponent,
        title: "تنظیمات سفارش ها",
        path: "/main/order/orders/setting",
        back: null,
        // add: null,
        edit: null,
        icon: 'fas fa-chart-bar',
        add: null
    },

    AddMatchOrders: {
        component: AddMatchOrders,
        title:"افزودن اعلامیه به سفارش",
        path: "/main/order/orders/addMatchOrder",
        
        get back() { return route.GetMatchOrders },
        // add: null,
        edit: null,
        icon: 'fas fa-chart-bar',
        add: null
    },
    DoneOrdersByIds: {
        component: GetDoneOrdersByIds,
        title:" سفارش های انجام شده فاقد سریال ",
        path: "/main/order/orders/getDoneOrdersByIds",
        
        get back() { return route.GetTradesWithoutOrder },
        // add: null,
        edit: null,
        icon: 'fas fa-chart-bar',
        add: null
    },

}


export default route;

