import urlSettings from 'constants/urlSettings';
import { Post, Get } from 'core/axiosHelper';


const url = urlSettings.BasicInfoUrl;

const api = {
    getallproductspaging: "product/getallproductspaging",
};
const GetAllProductsPaging =  {
    getAllProductsPagingMethod: function (command, then) {
        Post(url + api.getallproductspaging, command, then);
    },
};
export default GetAllProductsPaging;