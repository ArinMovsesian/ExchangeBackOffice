import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const secondUrl = urlSettings.BasicInfoUrl;
const api = {
    savecashflowchequemaster: "cashflowchequemaster/savecashflowchequemaster",
};


const SaveChequeBookServices = {
    saveCashFlowChequeMasterMethod: function (command, then) {
        Post(url + api.savecashflowchequemaster, command, then);
    },
};
export default SaveChequeBookServices;