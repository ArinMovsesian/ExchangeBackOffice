

import ProfileChangePassword from './profileInfo/components/ProfileChangePassword'


const route = {
   
    
  
    ProfileChangePassword: {
        component: ProfileChangePassword,
        title: "تغییر رمز عبور کاربر",
        path: "/main/resource/profile/changePassword",
        // get add(){return [route.AddRealCustomer,route.AddLegalCustomer]},
        // get edit (){return [route.EditRealCustomer , route.EditLegalCustomer]},
        add:null,
        edit:null,
        icon: 'fas fa-lock'
    },

   
 
};

export default route;