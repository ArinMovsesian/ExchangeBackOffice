import urlSettings from 'constants/urlSettings';
import { Post } from '../../../../../../core/axiosHelper';

const url = {
    party: urlSettings.PartyManagementUrl
};
const api = {
    getpartybyid :"party/getpartybyid",

}
const GetPartyByIdService = {
    
    GetPartyByIdMethod : function(command , then){
        Post(url.party + api.getpartybyid, command , then);
    },
   
}
export default GetPartyByIdService;