import { Post } from '../../../../../../core/axiosHelper';
import urlSetting from '../../../../../../constants/urlSettings';

const url = urlSetting.BasicInfoUrl;
const api = {
    changePassApi: "resource/changePass",
   
};

const ProfileChangePasswordService = {
   
 
    changePass: function (command, then) {
        Post(url + api.changePassApi, command, then);
    },
  
};
export default ProfileChangePasswordService;