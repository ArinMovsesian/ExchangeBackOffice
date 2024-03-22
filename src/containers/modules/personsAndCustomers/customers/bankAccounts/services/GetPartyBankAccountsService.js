import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.PartyManagementUrl;
const api = {
    getallpartybankaccountbyfilter: "partybankaccount/getallpartybankaccountbyfilter",
    getpartybankaccountbyid: "partybankaccount/getpartybankaccountbyid"
};

const GetPartyBankAccountsService = {
    getAllPartyBankAccountByFilterMethod : function (command , then) {
        Post(url + api.getallpartybankaccountbyfilter, command , then);
    },
    getPartyBankAccountByIdMethod : function (command , then) {
        Post(url + api.getpartybankaccountbyid, command , then);
    }
};
export default GetPartyBankAccountsService;