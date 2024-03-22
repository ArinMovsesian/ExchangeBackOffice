import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.BasicInfoUrl;
const api = {
    saveaccountingreportsetting: 'settings/saveaccountingreportsetting'
};

const SaveAccountSettingServices ={
    saveAccountSettingMethod:function (command, then) {
        Post(url + api.saveaccountingreportsetting, command, then, true);
    }
};
export default SaveAccountSettingServices;