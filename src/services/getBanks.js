import urlSettings from 'constants/urlSettings';
import { Get } from 'core/axiosHelper';


const url = {
    sharedData: urlSettings.BasicInfoUrl,

};

const api = {
    getallbanknamesApi: "bankname/getallbanknames",
}
const GetAllBankNames =  function (then) {
        Get(url.sharedData + api.getallbanknamesApi, null, then);
    
 
}
export default GetAllBankNames;