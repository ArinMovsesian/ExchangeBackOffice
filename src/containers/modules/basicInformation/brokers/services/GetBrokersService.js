import { Post,Get } from '../../../../../core/axiosHelper';
import urlSettings from '../../../../../constants/urlSettings';

const url = urlSettings.BasicInfoUrl;
const api = {
    getallbrokerApi: "broker/getallbroker",
    getTsebranchesApi: "branch/gettsebranches"
};

const GetBrokerService = {
    getAllBroker: function (command, then) {
        Post(url + api.getallbrokerApi, command, then, true);
    },
    getTseBranches: function (then) {
        Get(url + api.getTsebranchesApi, null, then, true);
    }


};
export default GetBrokerService;