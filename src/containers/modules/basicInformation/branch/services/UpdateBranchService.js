import { Post} from '../../../../../core/axiosHelper';
import urlSettings from '../../../../../constants/urlSettings';

const url = urlSettings.BasicInfoUrl;
const api = {
    savebranchApi: "branch/savebranch"
};

const EditBranchService = {
    saveBranch: function (command, then) {
        Post(url + api.savebranchApi, command, then, true);
    }
};
export default EditBranchService;