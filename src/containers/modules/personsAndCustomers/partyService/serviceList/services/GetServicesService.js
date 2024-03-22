import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.BasicInfoUrl;
const api = {
    getservices: "services/getservices",
};

const GetServicesService = {
    getservicesMethod: function (command, then) {
        Post(url + api.getservices, command, then);
    },
};
export default GetServicesService;