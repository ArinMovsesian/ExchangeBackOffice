const accessToken = (state = {} , action) =>{
    switch(action.type){
        case  'SET_TOKEN':
            return action.data;
            
        default :
            return state;
    }
}

export default accessToken;