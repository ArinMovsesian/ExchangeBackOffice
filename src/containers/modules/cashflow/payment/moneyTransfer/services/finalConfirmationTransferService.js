import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const api = {
    finalconfirmationtransfer: "cashflowmaster/finalconfirmationtransfer",
};


const finalConfirmationTransferService = {
    finalconfirmationtransferMethod: function (command, then) {
        Post(url + api.finalconfirmationtransfer, command, then);
    },
};
export default finalConfirmationTransferService;