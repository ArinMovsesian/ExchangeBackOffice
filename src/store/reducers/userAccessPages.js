const userAccessPages = (state = {} , action) =>{
    switch(action.type){
        case  'SET_USER_ACCESS_PAGES':
            return action.data;
            
        default :
            return state;
    }
}

export default userAccessPages;