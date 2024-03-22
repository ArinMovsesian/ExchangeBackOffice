import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
import { Get } from '../../../../../../core/axiosHelper';

const url = urlSettings.TradeUrl;
const api = {
    updateTradeNumber: "trade/assignrightacceptance",
  
};


const AssignrightacceptanceService = {
    update: function (command, then) {
        Post(url + api.updateTradeNumber, command, then);
    },
   
    
};
export default AssignrightacceptanceService;