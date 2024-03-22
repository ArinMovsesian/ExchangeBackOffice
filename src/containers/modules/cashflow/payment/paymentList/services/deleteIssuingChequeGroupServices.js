import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const api = {
    deleteissuingchequegroupApi: "cashflowmaster/deleteissuingchequegroup",
};


const deleteIssuingChequeGroupServices = {
    deleteIssuingChequegroupMethod: function (command, then) {
        Post(url + api.deleteissuingchequegroupApi, command, then);
    },
};
export default deleteIssuingChequeGroupServices;