
const userId = (state = {}, action) => {
 
    if(action.type==="CHANGE_USER_ID")
      return action.lang;
      return state;
}

export default userId