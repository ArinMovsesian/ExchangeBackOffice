import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.PartyManagementUrl;
const url2 = urlSettings.CashFlowUrl;
const api = {
    getpartybankaccountsbypartyid: "partybankaccount/getpartybankaccountsbypartyid",
    getflatpayment: "cashflowmaster/getflatpayment",
    getpaymentbyid: "cashflowmaster/getpaymentbyid",
};


const GetPartyBankAccountsByPartyIdService = {
    getpartybankaccountsbypartyidMethod: function (command, then) {
        Post(url + api.getpartybankaccountsbypartyid, command, then);
    },

    getflatpaymentMethod: function (command, then) {
        Post(url2 + api.getflatpayment, command, then);
    },

    getpaymentbyidMethod: function (command, then) {
        Post(url2 + api.getpaymentbyid, command, then);
    },
};
export default GetPartyBankAccountsByPartyIdService;