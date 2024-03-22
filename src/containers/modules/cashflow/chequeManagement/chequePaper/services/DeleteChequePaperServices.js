import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const secondUrl = urlSettings.BasicInfoUrl;
const api = {
    deletecashflowchequedetailbyid: "cashflowchequedetail/deletecashflowchequedetailbyid",
};


const DeleteChequePaperServices = {
    deletecashflowchequedetailbyidMethod: function (command, then) {
        Post(url + api.deletecashflowchequedetailbyid, command, then);
    },
};
export default DeleteChequePaperServices;