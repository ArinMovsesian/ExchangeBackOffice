import GetBankAccounts from './bankAccounts/components/GetBankAccountsComponent'
import AddBankAccount from './bankAccounts/components/CreateBankAccountComponent';
import EditBankAccount from './bankAccounts/components/UpdateBankAccountComponent';
import GetBranch from './branch/components/GetBranchComponent';
import AddBranch from './branch/components/CreateBranchComponent';
import EditBranch from './branch/components/UpdateBranchComponent';
import GetBrokers from './brokers/components/GetBrokersComponent';
const route={
   
    GetBankAccounts:{
        title:"فهرست حسابهای بانکی",
        component:GetBankAccounts,
        path:"/main/basicInformation/getBankAccounts",
        back:null,
        get add(){return route.AddBankAccount},
        get edit(){return route.EditBankAccount},
        icon:"fas fa-money-check"
    },
    AddBankAccount:{
        title:"افزودن حساب بانکی",
        path:"/main/basicInformation/addBankAccount",
        get back(){return route.GetBankAccounts},
        icon:"fa fa-plus",
        component:AddBankAccount

    },
    EditBankAccount :{
        title :"ویرایش حساب بانکی",
        path : "/main/basicInformation/editBankAccount",
        get back(){return route.GetBankAccounts},
        icon :"fas fa-edit",
        component:EditBankAccount

    },
    GetBranch :{
        title:"فهرست شعب کارگزاری ",
        path:"/main/basicInformation/getBranch",
        back:null,
        get add(){return route.AddBranch},
        get edit(){return route.EditBranch},
        icon:"fas fa-code-branch",
        component:GetBranch

    },
    GetBrokers :{
        title:"فهرست  کارگزاری ",
        path:"/main/basicInformation/getBrokers",
        back:null,
        // get add(){return route.AddBranch},
        // get edit(){return route.EditBranch},
        icon:"fas fa-code-branch",
        component:GetBrokers

    },
    AddBranch :{
        title:"افزودن شعبه کارگزاری ",
        path:"/main/basicInformation/addBranch",
        back:null,
        get back(){return route.GetBranch},
        icon:"fa fa-plus",
        component:AddBranch

    },
    EditBranch :{
        title:"ویرایش شعبه کارگزاری ",
        path:"/main/basicInformation/editBranch",
        back:null,
        get back(){return route.GetBranch},
        icon:"fas fa-edit",
        component:EditBranch

    }

}


export default route;

