const settings = (state = {
    baseApiUrl:"http://localhost:9330/api",
    loginUrl: 'http://localhost:9330/api/account/Login',
    registerUrl: 'http://localhost:9330/api/account/AddUser'
}, action) => {
    switch (action.type) {
        // case 'CHANGE_SETTINGS':
        //     return  action.data
        default:
            return state
    }
}

export default settings