import { Post } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;
const api = {
    saveDraftManualVoucherApi:"manualvoucher/savedraftmanualvoucher",
    saveManualVoucherApi:"ManualVoucher/SaveManualVoucher",

};

const AddVouchersService = {
    saveDraftManualVoucher: function (command , then) {
        Post(url + api.saveDraftManualVoucherApi, command, then);
    },
    saveManualVoucher: function (command , then) {
        Post(url + api.saveManualVoucherApi, command, then);
    },
}

export default AddVouchersService;