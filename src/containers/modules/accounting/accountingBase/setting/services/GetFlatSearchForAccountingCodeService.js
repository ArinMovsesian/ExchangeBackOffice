import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.AccountingUrl;
const api = {
    getflatsearchforaccountingcode: 'accountingreport/getflatsearchforaccountingcode'
};

const GetFlatSearchForAccountingCodeService ={
    getflatsearchforaccountingcodeMethod:function (command, then) {
        Post(url + api.getflatsearchforaccountingcode, command, then, true);
    }
};
export default GetFlatSearchForAccountingCodeService;