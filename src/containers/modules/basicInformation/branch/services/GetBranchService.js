import { Post,Get } from '../../../../../core/axiosHelper';
import urlSettings from '../../../../../constants/urlSettings';

const url = urlSettings.BasicInfoUrl;
const api = {
    getbranchesbyfilterApi: "branch/getbranchesbyfilter",
    getTsebranchesApi: "branch/gettsebranches"
};

const GetBranchService = {
    getBranchesByFilter: function (command, then) {
        Post(url + api.getbranchesbyfilterApi, command, then, true);
    },
    getTseBranches: function (then) {
        Get(url + api.getTsebranchesApi, null, then, true);
    }


};
export default GetBranchService;