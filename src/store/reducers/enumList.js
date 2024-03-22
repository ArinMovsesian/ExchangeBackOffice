const enumList=(state={},action)=>{
    switch(action.type){
        case  'SET_ENUM':
            return action.data;
            
        default :
            return state;
    }
}
export default enumList;
