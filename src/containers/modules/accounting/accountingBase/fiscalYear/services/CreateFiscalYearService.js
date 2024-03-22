import {Post} from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings'

const url = urlSettings.AccountingUrl;
const api = {
    fiscalyear: "fiscalyear/savefiscalyear"
}
const CreateFiscalYearService={
   
     DoSave:function(command,then){
        Post(url+api.fiscalyear,command,then,true);
    
    }
}
export default CreateFiscalYearService;