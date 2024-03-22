import GetMenus from './menus/components/GetMenusComponent';
import GetPages from './pages/components/GetPagesComponent';
import GetButtons from './buttons/components/GetButtonsComponent';
import GetAssignRoleToMenu from './AssignRole/components/GetAssignRoleToMenuComponent';
import GetAssignRoleToPage from './AssignRole/components/GetAssignRoleToPageComponent';
import GetAssignRoleToButton from './AssignRole/components/GetAssignRoleToButtonComponent';


const route = {
    GetMenus :{
        component :GetMenus,
        title :"فهرست منوها",
        path : "/main/resource/access/getMenus",
        add : null,
        edit:null,
        icon :"fas fa-bars"
    },
    GetPages :{
        component :GetPages,
        title :"فهرست صفحه ها",
        path : "/main/resource/access/getPages",
        add : null,
        edit:null,
        icon :"fas fa-bars"
    },
    GetButtons :{
        component :GetButtons,
        title :"فهرست المان ها",
        path : "/main/resource/access/getButtons",
        add : null,
        edit:null,
        icon :"fas fa-bars"
    },
    GetAssignRoleToMenu:{
        component :GetAssignRoleToMenu,
        title :"دسترسی نقش به منو",
        path : "/main/resource/access/getAssignRoleToMenu",
        add : null,
        edit:null,
        icon :"fas fa-universal-access"
    },
    GetAssignRoleToPage:{
        component :GetAssignRoleToPage,
        title :"دسترسی نقش به صفحه",
        path : "/main/resource/access/getAssignRoleToPage",
        add : null,
        edit:null,
        icon :"fas fa-universal-access"
    },
    GetAssignRoleToButton:{
        component :GetAssignRoleToButton,
        title :"دسترسی نقش به المان",
        path : "/main/resource/access/getAssignRoleToButton",
        add : null,
        edit:null,
        icon :"fas fa-universal-access"
    }
    
}

export default route;