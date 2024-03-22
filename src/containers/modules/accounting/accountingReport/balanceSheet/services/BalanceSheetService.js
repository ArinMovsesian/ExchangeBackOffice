import { Post } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;
const api = {
    accountBookApi: "accountingreport/getbalancesheetreport"
};

 const  BalanceSheetService= {
       
       getBalanceSheetService:function(command,then){
        Post(url + api.accountBookApi, command, then, true);
      }
       

}
export default BalanceSheetService;
