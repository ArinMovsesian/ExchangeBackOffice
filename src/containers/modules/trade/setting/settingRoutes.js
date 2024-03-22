
import TradeSettingComponent from './components/TradeSettingComponent'
import TradeNumberSettingComponent from './components/TradeNumberSettingComponent';

const route = {
    tradeSetting: {
        component: TradeSettingComponent,
        title: "تنظیمات معاملات",
        path: "/main/trade/setting/tradeSetting",
        get back(){return route.dashboard},
        add: null,
        edit: null,
        icon: 'fas fa-money-bill',
    },
    tradeNumberSetting: {
        component: TradeNumberSettingComponent,
        title: "تنظیمات اعلامیه خرید و فروش",
        path: "/main/trade/setting/tradeNumberSetting",
        get back(){return route.dashboard},
        add: null,
        edit: null,
        icon: 'fas fa-money-bill',
    },
    


   
};
export default route;

