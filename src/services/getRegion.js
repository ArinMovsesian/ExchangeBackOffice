import urlSettings from 'constants/urlSettings';
import { Post } from 'core/axiosHelper';


const url = {
    sharedData: urlSettings.BasicInfoUrl,

};

const api = {
  
    getallregionsbyfilterApi: "region/getallregionsbyfilter",
   

}
const GetAllRegion =  function (command,then) {
    Post(url.sharedData + api.getallregionsbyfilterApi, command, then);
    
 
}
export default GetAllRegion;