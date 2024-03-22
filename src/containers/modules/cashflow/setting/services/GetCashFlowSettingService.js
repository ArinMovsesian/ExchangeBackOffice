import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.BasicInfoUrl;
const api = {
    getcurrentcashflowsetting: 'settings/getcurrentcashflowsetting'
};

const GetCashFlowSettingService ={
    getcurrentcashflowsettingMethod:function (command, then) {
        Post(url + api.getcurrentcashflowsetting, command, then, true);
    }
};
export default GetCashFlowSettingService;