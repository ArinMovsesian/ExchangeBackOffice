const setDelete = (state = {} , action) =>{
    switch(action.type){
       
        case  'SET_DELETE':
        console.log(action.data)
            return action.data;
            
        default :
            return state;
    }
}

export default setDelete;