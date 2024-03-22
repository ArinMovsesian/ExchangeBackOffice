import { Post, Get } from '../../../../../core/axiosHelper';
import urlSettings from '../../../../../constants/urlSettings';

const url = urlSettings.BasicInfoUrl;
const api = {
    savebranchApi: "branch/savebranch",
    getallenumtypeApi :"common/getallenumtype",
    getmainmarketsApi:"mainmarket/getmainmarkets"
};

const AddBranchService = {
    saveBranch: function (command, then) {
        Post(url + api.savebranchApi, command, then, true);
    },
    getAllEnumType : function(params , then) {
        Get(url + api.getallenumtypeApi, params , then);
    },
    getMainMarkets : function(params , then) {
        Get(url + api.getmainmarketsApi , params , then);
    }
};
export default AddBranchService;