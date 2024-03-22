import { Post } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;
const api = {
    getsubsidiaryledgersApi: "vouchercategory/getallvouchercategories"
};


   const GetVoucherTypeService= function (command, then) {
        Post(url + api.getsubsidiaryledgersApi, command, then, true);
 
};
export default GetVoucherTypeService;