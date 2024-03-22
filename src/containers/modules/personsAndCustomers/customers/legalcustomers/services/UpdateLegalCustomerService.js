import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';


const url = urlSettings.AccountingUrl;

const api = {
    savepartyApi: "party/saveparty",
}
const EditLegalCustomer = {

    updateLegalCustomer: function (command, then) {
        Post(url + api.savepartyApi, command, then, true);
    }
}
export default EditLegalCustomer;