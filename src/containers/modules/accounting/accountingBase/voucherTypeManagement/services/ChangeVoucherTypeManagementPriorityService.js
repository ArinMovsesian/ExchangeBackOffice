import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.AccountingUrl;
const api = {
    updatevouchercategorypriority: "vouchercategory/updatevouchercategorypriority",
};


const ChangeVoucherTypeManagementPriorityService = {
    updatevouchercategorypriorityMethod: function (command, then) {
        // Post('http://localhost:57113/api/' + api.updatevouchercategorypriority, command, then);
        Post(url + api.updatevouchercategorypriority, command, then);
    },
};
export default ChangeVoucherTypeManagementPriorityService;