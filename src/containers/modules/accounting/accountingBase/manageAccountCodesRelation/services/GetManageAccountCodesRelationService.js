import { Post } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;
const api = {
    getAccountCodeRelation: "accountCodeRelation/getAccountCodesRelation",
    deleteAccountCodeRelation: "accountCodeRelation/deleteAccountCodesRelation",

};

const GetManageAccountCodesRelationService = {
    getAccountCodes: function (command, then) {
        Post(url + api.getAccountCodeRelation, command, then);
    },
    deleteRelation: function (command, then) {
        Post(url + api.deleteAccountCodeRelation, command, then);
    }
};
export default GetManageAccountCodesRelationService;