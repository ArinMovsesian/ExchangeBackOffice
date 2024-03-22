import urlSettings from 'constants/urlSettings';
import { Post } from 'core/axiosHelper';


const url = {
    sharedData: urlSettings.BasicInfoUrl,

};

const api = {
   getSectorsApi: "sector/getsectors",
}
export const GetAllSectors =  function (then) {
    console.log(url.sharedData + api.getSectorsApi)
        Post(url.sharedData + api.getSectorsApi, null, then);
    
 
}
