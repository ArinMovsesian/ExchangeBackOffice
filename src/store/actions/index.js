
export const changeLanguage = lang => ({
    type: 'CHANGE_LANGUAGE',
    lang
})

export const loggedIn = data => ({
    type: 'LOGGED_IN',
    data
})

export const loggedOut = () => ({
    type: 'LOGGED_OUT'
})
// export const changeUserId = () => ({
//     type: 'CHANGE_USER_ID'
// })
export const setToken = data => ({
    type: 'SET_TOKEN',
    data
});

export const setUserAccessPages = data => ({
    type: 'SET_USER_ACCESS_PAGES',
    data
});
export const setDelete = data => ({
    type: 'SET_DELETE',
    data
});
export const setUpdateRow = data => ({
    type: 'SET_UPDATE_ROW',
    data
});


export const setEnum=data=>({
    type:'SET_ENUM',
    data
})
export const setUserInfo = data => ({
    type: 'SET_USERINFO',
    data
})

export const setLoadingBar = data => ({
    type: 'SET_LOADINGBAR',
    data
})
