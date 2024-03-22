import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const secondUrl = urlSettings.BasicInfoUrl;
const api = {
    updatecashflowchequemaster: "cashflowchequemaster/updatecashflowchequemaster",
};


const UpdateCheuqeBookServices = {
    updatecashflowchequemasterMethod: function (command, then) {
        Post(url + api.updatecashflowchequemaster, command, then);
    },
};
export default UpdateCheuqeBookServices;