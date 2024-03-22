import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.AccountingUrl;

const api = {
    getsoknareport: "soknareport/getsoknareport"
};

const GetSoknaReportService = {
    GetSoknaReportServiceMethod: function (command, then) {
        // Post('http://localhost:57113/api/' + api.getsoknareport, command, then);
        Post(url + api.getsoknareport, command, then);
    },
};
export default GetSoknaReportService;