import urlSettings from 'constants/urlSettings';
import { ApiRequestUnauthorizedWithError } from 'core/axiosHelper';


const url = {
    captcha: urlSettings.loginUrl,

};

const api = {
    GetCaptcha: "Captcha/GetCaptcha",
}
const GetCaptchaService =  function (then) {
    ApiRequestUnauthorizedWithError(url.captcha + api.GetCaptcha, 'POST','json',null, then);
    
 
}
export default GetCaptchaService;