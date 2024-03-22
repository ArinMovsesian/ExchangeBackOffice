import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.BasicInfoUrl;
const api = {
    getsettingindatecashflowsetting: 'settings/getsettingindatecashflowsetting'
};

const GetSettingInDateAccountingSettingService ={
    getsettingindatecashflowsettingMethod:function (command, then) {
        Post(url + api.getsettingindatecashflowsetting, command, then, true);
    }
};
export default GetSettingInDateAccountingSettingService;