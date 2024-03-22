import GetServicesComponent from "./serviceList/components/GetServicesComponent";
import AddServicesComponent from "./serviceList/components/AddServicesComponent";
import GetCustomersServiceComponent from "./customersSerivceList/components/GetCustomersServiceComponent";
import AddCustomerServiceComponent from "./customersSerivceList/components/AddCustomerServiceComponent";


const route = {

    GetService: {
        component: GetServicesComponent,
        title: "فهرست خدمات",
        path: "/main/persons/partyService/getServices",
        back : null,
        get add(){return route.AddService},
        // get edit(){return  route.UpdateGroup},
        // get list(){return  route.GetPartiesGroup},
        icon: 'fas fa-list-alt'
    },
    AddService :{
        component: AddServicesComponent,
        title: "افزودن سرویس",
        path: "/main/persons/partyService/addService",
        get back(){return  route.GetService},
        icon: 'fa fa-plus'
    },
    // UpdateGroup :{
    //     component: '',
    //     title: "ویرایش گروه",
    //     path: "/main/persons/partyGroup/updateGroup",
    //     get back(){return  route.GetGroups},
    //     icon: 'fa fa-pencil'
    // },




    GetCustomersService :{
        component: GetCustomersServiceComponent,
        title: "فهرست خدمات مشتریان",
        path: "/main/persons/partyService/getCustomersServices",
        icon: 'fas fa-list-alt',
        get add(){return route.AddCustomersService},
    },
    AddCustomersService :{
        component: AddCustomerServiceComponent,
        title: "افزودن خدمات مشتریان",
        path: "/main/persons/partyService/addCustomerService",
        get back(){return  route.GetCustomersService},
        icon: 'fa fa-plus'
    },
   
}

export default route;