import urlSettings from 'constants/urlSettings';
import { Post, Get } from '../../../../../../core/axiosHelper';


const url = {

    party: urlSettings.PartyManagementUrl
};

const api = {
    savepartyApi: "party/saveparty",
  
}
const AddRealCustomerService = {
  
    saveParty: function (command, then) {
        Post(url.party + api.savepartyApi, command, then);
    },
 
}
export default AddRealCustomerService;