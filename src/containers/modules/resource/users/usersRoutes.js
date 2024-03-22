


import GetUsers from './usersList/components/GetUsersComponent';
import AddUser from './usersList/components/CreateUserComponent';
import GetRoles from './rolesList/components/GetRolesComponent';
import AddRole from './rolesList/components/CreateRolesComponent';
const route = {
   
    GetUsers: {
        component: GetUsers,
        title: "فهرست کاربران",
        path: "/main/resource/users/getUsers",
        get add(){return route.AddUser},
        // get edit (){return [route.EditRealCustomer , route.EditLegalCustomer]},
        edit:null,
        icon: 'fas fa-users'
    },
  
    AddUser: {
        component: AddUser,
        title: "افزودن کاربر جدید",
        path: "/main/resource/users/addUser",
        get back(){return route.GetUsers},
        // get edit (){return [route.EditRealCustomer , route.EditLegalCustomer]},
        add:null,
        edit:null,
        icon: 'fas fa-users'
    },
    GetRoles: {
        component: GetRoles,
        title: "فهرست نقش ها",
        path: "/main/resource/users/getRoles",
        get add(){return route.AddUser},
        // get edit (){return [route.EditRealCustomer , route.EditLegalCustomer]},
        edit:null,
        icon: 'fas fa-users'
    },
  
    AddRole: {
        component: AddRole,
        title: "افزودن نقش جدید",
        path: "/main/resource/users/addRole",
        get back(){return route.GetUsers},
        // get edit (){return [route.EditRealCustomer , route.EditLegalCustomer]},
        add:null,
        edit:null,
        icon: 'fas fa-users'
    },

   
 
};

export default route;