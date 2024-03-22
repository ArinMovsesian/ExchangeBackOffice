import { Post, Get } from '../../../../../core/axiosHelper';
import urlSettings from '../../../../../constants/urlSettings';

const url = urlSettings.loginUrl;
const api = {
  getAllAccessedMenuApi: "resource/getallaccessedmenu",
};

const NestedListService = {
    getAllAccessedMenu: function (command, then) {
        Post(url + api.getAllAccessedMenuApi, command, then, true);
    },

};
export default NestedListService; 