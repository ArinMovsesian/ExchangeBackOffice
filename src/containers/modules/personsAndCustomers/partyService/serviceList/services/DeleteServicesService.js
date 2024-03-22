import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.BasicInfoUrl;
const api = {
    deleteservice: "services/deleteservice",
};

const DeleteServicesService = {
    deleteserviceMethod: function (command, then) {
        Post(url + api.deleteservice, command, then);
    },
};
export default DeleteServicesService;