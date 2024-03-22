import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.BasicInfoUrl;
const api = {
    savecashflowsetting: 'settings/savecashflowsetting'
};

const TradeNumberSettingService ={
    saveTradeNumberSettingMethod:function (command, then) {
        Post(url + api.savecashflowsetting, command, then, true);
    },
    getTradeNumberSettingMethod:function (command, then) {
        Post(url + api.savecashflowsetting, command, then, true);
    }
};
export default TradeNumberSettingService;