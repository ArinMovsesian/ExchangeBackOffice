import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.BasicInfoUrl;
const api = {
    getcurrentaccountingreportsetting: 'settings/getcurrentaccountingreportsetting'
};

const GetAccountSettingServices ={
    getcurrentaccountingreportsettingMethod:function (command, then) {
        Post(url + api.getcurrentaccountingreportsetting, command, then, true);
    }
};
export default GetAccountSettingServices;