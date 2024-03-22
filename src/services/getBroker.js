import urlSettings from 'constants/urlSettings';
import { Post, Get } from 'core/axiosHelper';


const url = urlSettings.BasicInfoUrl;

const api = {
    getallbroker: "broker/getallbroker",
};
const getBroker =  {
    getallbrokerMethod: function (command, then) {
        Post(url + api.getallbroker, command, then);
    },
};
export default getBroker;