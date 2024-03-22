import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.AccountingUrl;
const api = {
    deletevouchercategory: "vouchercategory/deletevouchercategory",
};


const DeleteVoucherTypeManagementService = {
    deletevouchercategoryMethod: function (command, then) {
        // Post('http://localhost:57113/api/' + api.deletevouchercategory, command, then);
        Post(url + api.deletevouchercategory, command, then);
    },
};
export default DeleteVoucherTypeManagementService;