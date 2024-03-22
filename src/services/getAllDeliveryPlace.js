import urlSettings from 'constants/urlSettings';
import { Post, Get } from 'core/axiosHelper';


const url = urlSettings.BasicInfoUrl;

const api = {
    getalldeliveryplace: "product/getalldeliveryplace",
};
const getAllDeliveryPlace =  {
    getalldeliveryplaceMethod: function (command, then) {
        Post(url + api.getalldeliveryplace, command, then);
    },
};
export default getAllDeliveryPlace;