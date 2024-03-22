import urlSettings from 'constants/urlSettings';
import { Post, Get } from 'core/axiosHelper';


const url = urlSettings.BasicInfoUrl;

const api = {
    getallproducer: "product/getallproducer",
};
const getAllProducer =  {
    getallproducerMethod: function (command, then) {
        Post(url + api.getallproducer, command, then);
    },
};
export default getAllProducer;