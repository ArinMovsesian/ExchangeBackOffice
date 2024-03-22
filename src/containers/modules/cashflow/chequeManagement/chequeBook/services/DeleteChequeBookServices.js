import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const secondUrl = urlSettings.BasicInfoUrl;
const api = {
    deletecashflowchequemasterbyid: "cashflowchequemaster/deletecashflowchequemasterbyid",
};


const DeleteChequeBookServices = {
    deleteCashFlowChequeMasterByIdMethod: function (command, then) {
        Post(url + api.deletecashflowchequemasterbyid, command, then);
    },
};
export default DeleteChequeBookServices;