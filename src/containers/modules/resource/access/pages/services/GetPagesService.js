import { Post } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.loginUrl;
const api = {
    getAllPageResourcesApi: "resource/getallpageresources"
};


const GetPagesService  = {
    getAllPageResources : function(command , then){
        Post(url + api.getAllPageResourcesApi ,command , then);
    }
};

export default GetPagesService;