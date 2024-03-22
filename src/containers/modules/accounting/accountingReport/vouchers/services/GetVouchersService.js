import { Post } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;
const api = {
    getVouchersApi: "vouchermaster/getflatvouchermasters"
};

const  GetVouchersService= function (command, then) {
        Post(url + api.getVouchersApi, command, then, true);
  
};
export default GetVouchersService;