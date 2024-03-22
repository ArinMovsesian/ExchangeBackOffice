import { Post } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;
const api = {
    getcustomeraccountbookApi: "accountbook/getcustomeraccountbook",
    getallpartyforautocompleteApi: "party/getallpartyforautocomplete"
};

const GetCustomerAccountBookService = {
   
    getCustomerAccountBook: function (command, then) {
        Post(url + api.getcustomeraccountbookApi, command, then);
    },
  
  
};
export default GetCustomerAccountBookService;