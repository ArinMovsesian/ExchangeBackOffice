import {Post} from '../../core/axiosHelper';
import urlSettings from 'constants/urlSettings'

const  AuthenticationService={

     urlApi : {
        loginUserTokenApi: urlSettings.loginUrl+"authentication/login"
    },
     login:function(command,then){
        
        Post(this.urlApi.loginUserTokenApi,command,then,false);
    
    }
}
export default AuthenticationService;