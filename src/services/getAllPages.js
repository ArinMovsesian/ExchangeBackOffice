import urlSettings from 'constants/urlSettings';
import { Post } from 'core/axiosHelper';


const url = {
    loginUrl: urlSettings.loginUrl,

};

const api = {
    getAllPageAccessByUsernameApi: "resource/getallpageaccessbyusername",
}
export const getAllPageAccessByUsername =  function (then) {
  
        Post(url.loginUrl + api.getAllPageAccessByUsernameApi, null, then);
    
 
}
