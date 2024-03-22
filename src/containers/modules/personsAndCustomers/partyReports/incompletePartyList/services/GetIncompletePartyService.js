import { Post, Get ,DownloadPdf, DownloadExcel} from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.PartyManagementUrl;
const api = {
    getflatpartyservice: "reporting/getincompletedocumentsofcustomers",
    GetIncompleteDocumentsOfCustomersPdf: "reporting/GetIncompleteDocumentsOfCustomersPdf",
    GetIncompleteDocumentsOfCustomersExcel: "reporting/GetIncompleteDocumentsOfCustomersExcel",

};

const GetIncompletePartyService = {
    getflatpartyserviceMethod: function (command, then) {
        Post(url + api.getflatpartyservice, command, then);
    },
    getPdfExport: function(command, then){
        DownloadPdf(url + api.GetIncompleteDocumentsOfCustomersPdf, command, then);
    },
    getExcelExport: function(command, then){
        DownloadExcel(url + api.GetIncompleteDocumentsOfCustomersExcel, command, then);
    }

};
export default GetIncompletePartyService;