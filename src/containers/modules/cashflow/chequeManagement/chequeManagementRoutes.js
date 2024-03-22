import GetChequeBookComponent from "./chequeBook/components/GetChequeBookComponent";
import CreateChequeBookComponent from "./chequeBook/components/CreateChequeBookComponent";
import UpdateChequeBookComponent from "./chequeBook/components/UpdateChequeBookComponent";
import GetChequePaperComponent from "./chequePaper/components/GetChequePaperComponent";


const route = {
    GetChequeBook: {
        component: GetChequeBookComponent,
        title: "دسته چک",
        path: "/main/cashFlow/chequeManagement/chequeBook",
        back: null,
        get add(){return route.CreateChequeBook},
        get edit(){return route.UpdateChequeBook},
        icon: 'fas fa-money-bill',
    },
    CreateChequeBook: {
        component: CreateChequeBookComponent,
        title: "افزودن دسته چک",
        path: "/main/cashFlow/chequeManagement/createChequeBook",
        get back(){return route.GetChequeBook},
        add: null,
        edit: null,
        icon: 'fas fa-plus',
    },
    UpdateChequeBook: {
        component: UpdateChequeBookComponent,
        title: "به روز رسانی دسته چک",
        path: "/main/cashFlow/chequeManagement/updateChequeBook",
        get back(){return route.GetChequeBook},
        add: null,
        edit: null,
        icon: 'fas fa-edit',
    },





    GetChequePaper: {
        component: GetChequePaperComponent,
        title: "برگه چک",
        path: "/main/cashFlow/chequeManagement/chequePaper",
        back: null,
        add: null,
        edit: null,
        icon: 'fas fa-money-bill-alt',
    }
};
export default route;

