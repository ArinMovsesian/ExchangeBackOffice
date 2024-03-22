import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.AccountingUrl;

const api = {
   
    getTradingBook: "tradingBook/GetTradingBook",
  
};


const GetTradingBookService = {
 
    getTradingBookByPartyId:function(command,then){
        Post(url + api.getTradingBook, command, then);

    },
   
};
export default GetTradingBookService;