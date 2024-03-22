const loadingBar = (state = {}, action) => {
    switch (action.type) {
        case 'SET_LOADINGBAR':
            return action.data;
        default:
            return state
    }
};
export default loadingBar