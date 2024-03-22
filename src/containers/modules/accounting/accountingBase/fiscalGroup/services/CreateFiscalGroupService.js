import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';


const url = urlSettings.AccountingUrl;

const api = {
    savefiscalgroupApi: "fiscalyear/savefiscalgroup"
}
const AddFiscalGroupService = {

    saveFiscalGroup: function (command, then) {
        Post(url + api.savefiscalgroupApi, command, then, true);
    }
}
export default AddFiscalGroupService;