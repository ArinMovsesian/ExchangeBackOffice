import urlSettings from 'constants/urlSettings';
import { Post} from '../../../../../../core/axiosHelper';

const url = {
    party: urlSettings.PartyManagementUrl
};

const api = {
    updatepartyforuncompletedpartyApi :"party/updatepartyforuncompletedparty",
  
  
}
const UpdateUncompletedPartyService = {
    
    updatepartyforuncompletedpartyMethod : function(command , then){
        Post(url.party + api.updatepartyforuncompletedpartyApi, command , then);
    },
    
}
export default UpdateUncompletedPartyService;