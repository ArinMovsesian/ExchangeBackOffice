import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.BasicInfoUrl;
const api = {
    saveservice: "services/saveservice",
};

const AddServicesService = {
    saveserviceMethod: function (command, then) {
        Post(url + api.saveservice, command, then);
    },
};
export default AddServicesService;