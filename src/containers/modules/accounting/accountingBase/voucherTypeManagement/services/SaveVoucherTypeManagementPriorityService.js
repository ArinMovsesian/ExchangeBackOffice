import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.AccountingUrl;
const api = {
    savevouchercategory: "vouchercategory/savevouchercategory",
};


const SaveVoucherTypeManagementPriorityService = {
    savevouchercategoryMethod: function (command, then) {
        // Post('http://localhost:57113/api/' + api.savevouchercategory, command, then);
        Post(url + api.savevouchercategory, command, then);
    },
};
export default SaveVoucherTypeManagementPriorityService;