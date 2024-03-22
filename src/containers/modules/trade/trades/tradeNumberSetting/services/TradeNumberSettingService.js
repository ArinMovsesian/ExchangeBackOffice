import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.BasicInfoUrl;
const api = {
    savecashflowsetting: 'settings/savecashflowsetting'
};

const SaveTradeNumberSettingService ={
    saveTradeNumberSettingMethod:function (command, then) {
        Post(url + api.savecashflowsetting, command, then, true);
    }
};
export default SaveTradeNumberSettingService;