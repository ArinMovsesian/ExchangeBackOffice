import CashFlowSettingComponent from "./components/CashFlowSettingComponent";
import Dashboard from "../../dashboard/dashboard";
import CashFlowSettingComponentMainTab from "./components/CashFlowSettingComponentMainTab";
const route = {
    setting: {
        component: CashFlowSettingComponentMainTab,
        title: "تنظیمات دریافت و پرداخت",
        path: "/main/cashFlow/cashFlowSetting/getSetting",
        get back(){return route.dashboard},
        // add: null,
        // edit: null,
        icon: 'fas fa-money-bill',
    },
    dashboard: {
        component: Dashboard,
        path: "/main/dashboard",
    }

};
export default route;

