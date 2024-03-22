import urlSettings from 'constants/urlSettings';
import { Get } from 'core/axiosHelper';

const url = {
    sharedData: urlSettings.BasicInfoUrl,

};
const api = {
    getallenumtypeApi: "common/",
}
const GetEnum =  function (enumName, then) {
        Get(url.sharedData + api.getallenumtypeApi+enumName + 'Enum', null, then);
}

export default GetEnum;