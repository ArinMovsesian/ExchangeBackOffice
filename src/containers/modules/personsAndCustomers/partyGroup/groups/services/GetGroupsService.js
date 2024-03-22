import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';



const url = urlSettings.PartyManagementUrl;
const api = {
    getallgroupbyfilterApi :"group/getallgroupbyfilter",
    deletegroupApi :'group/deletegroup'
};

const GetGroupsService = {
    getAllGroupByFilter : function(command , then){
        Post(url + api.getallgroupbyfilterApi, command , then);
    },
    deleteGroup : function(command , then){
        Post(url + api.deletegroupApi , command , then)
    }
};

export default GetGroupsService;