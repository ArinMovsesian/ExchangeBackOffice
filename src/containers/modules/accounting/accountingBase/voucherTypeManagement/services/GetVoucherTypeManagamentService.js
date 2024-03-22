import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.AccountingUrl;
const api = {
    getallvouchercategories: "vouchercategory/getallvouchercategories",
    getfullvouchercategory: "vouchercategory/getfullvouchercategory",
};


const GetVoucherTypeManagamentService = {
    getallvouchercategoriesMethod: function (command, then) {
        // Post('http://localhost:57113/api/' + api.getallvouchercategories, command, then);
        Post(url + api.getallvouchercategories, command, then);
    },
    getfullvouchercategoryMethod: function (command, then) {
        // Post('http://localhost:57113/api/' + api.getfullvouchercategory, command, then);
        Post(url + api.getfullvouchercategory, command, then);
    },
};
export default GetVoucherTypeManagamentService;