import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const api = {
    deleteissuingchequeApi: "cashflowmaster/deleteissuingcheque",
};


const deleteIssuingChequeServices = {
    deleteIssuingChequeMethod: function (command, then) {
        Post(url + api.deleteissuingchequeApi, command, then);
    },
};
export default deleteIssuingChequeServices;