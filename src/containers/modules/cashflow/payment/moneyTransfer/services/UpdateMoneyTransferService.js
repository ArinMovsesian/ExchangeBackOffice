import { Post} from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const api = {
    updatetransfer: "cashflowmaster/updatetransfer",
};


const UpdateMoneyTransferService = {
    updatetransferMethod: function (command, then) {
        Post(url + api.updatetransfer, command, then);
    },
};
export default UpdateMoneyTransferService;