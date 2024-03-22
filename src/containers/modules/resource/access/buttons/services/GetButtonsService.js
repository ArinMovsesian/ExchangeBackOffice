import { Post } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.loginUrl;
const api = {
    getallbuttonresourcesApi: "resource/getallbuttonresources"
};


const GetButtonsService  = {
    getAllButtonResources : function(command , then){
        Post(url + api.getallbuttonresourcesApi ,command , then);
    }
};

export default GetButtonsService;


