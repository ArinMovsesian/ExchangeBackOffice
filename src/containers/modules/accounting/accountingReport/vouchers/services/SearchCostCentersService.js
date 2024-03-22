import { Post } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;
const api = {
    searchcostcenters: "costcenter/searchcostcenters"
};

const  SearchCostCentersService= function (command, then) {
        Post(url + api.searchcostcenters, command, then, true);
  
};
export default SearchCostCentersService;