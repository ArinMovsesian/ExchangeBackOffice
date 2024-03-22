import { Post } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;
const api = {
        getprofitorlostreportApi: "accountingreport/getprofitorlostreport"
};

export const  GetIncomeStatementService= function (command, then) {
        Post(url + api.getprofitorlostreportApi, command, then, true);
}
