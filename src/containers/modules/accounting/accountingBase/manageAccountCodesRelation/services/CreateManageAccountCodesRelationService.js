import { Post } from '../../../../../../core/axiosHelper';
import urlSetting from '../../../../../../constants/urlSettings';

const url = urlSetting.AccountingUrl;
const api = {
      saveAccountCodeRelation: "accountCodeRelation/saveAccountCodesRelation",
};

const AddManageAccountCodesRelationService = {
    saveAccountCodes: function (command, then) {
        Post(url + api.savecostcenterApi, command, then);
    },
    
};
export default AddManageAccountCodesRelationService;