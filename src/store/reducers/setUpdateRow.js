const setUpdateRow = (state = {} , action) =>{
    switch(action.type){
       
        case  'SET_UPDATE_ROW':
        console.log(action.data)
            return action.data;
            
        default :
            return state;
    }
}

export default setUpdateRow;