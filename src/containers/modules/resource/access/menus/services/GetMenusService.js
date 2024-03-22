import { Post } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.loginUrl;
const api = {
    getallmenuresourcesApi: "resource/getallmenuresources"
};


const GetMenusService  = {
    getAllMenuResources : function(command , then){
        Post(url + api.getallmenuresourcesApi ,command , then);
    }
};

export default GetMenusService;


