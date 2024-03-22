import urlSettings from 'constants/urlSettings';
import { Post, Get } from 'core/axiosHelper';


const url = urlSettings.BasicInfoUrl;

const api = {
    getalltransportation: "transportation/getalltransportation",
};
const getAllTransportation =  {
    getalltransportationMethod: function (command, then) {
        Post(url + api.getalltransportation, command, then);
    },
};
export default getAllTransportation;