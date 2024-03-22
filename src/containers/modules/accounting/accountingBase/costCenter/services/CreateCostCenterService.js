import { Post } from '../../../../../../core/axiosHelper';
import urlSetting from '../../../../../../constants/urlSettings';

const url = urlSetting.AccountingUrl;
const api = {
    savecostcenterApi: "costcenter/savecostcenter",
    getparentcostcentersApi :"costcenter/getparentcostcenters"
};

const AddCostCenterService = {
    saveCostCenter: function (command, then) {
        Post(url + api.savecostcenterApi, command, then);
    },
    getParentCostCenters : function(command , then) {
        Post(url + api.getparentcostcentersApi , command , then);
    }
};
export default AddCostCenterService;