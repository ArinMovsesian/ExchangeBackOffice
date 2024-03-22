const user = (state = {}, action) => {
    switch (action.type) {
        case 'LOGGED_IN':
            return action.data;
        case 'LOGGED_OUT':
            return {
                
                accessToken: ""
            };
        default:
            return {
                accessToken: ""
            };
    }
}

export default user