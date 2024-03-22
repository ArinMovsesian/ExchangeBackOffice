import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.AccountingUrl;
const api = {
    updatevouchercategory: "vouchercategory/updatevouchercategory",
};


const UpdateVoucherTypeManagmentPriorityService = {
    updatevouchercategoryMethod: function (command, then) {
        // Post('http://localhost:57113/api/' + api.updatevouchercategory, command, then);
        Post(url + api.updatevouchercategory, command, then);
    },
};
export default UpdateVoucherTypeManagmentPriorityService;