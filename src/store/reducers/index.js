import { combineReducers } from 'redux';
import settings from './settings';
import user from './user';
import accessToken from './accessToken';
import userInfo from './userInfo';
import loadingBar from './loadingBar';
import setDelete from './setDelete'
import setUpdateRow from './setUpdateRow';

export default combineReducers({
    settings,
    user,
    accessToken,
    userInfo,
    loadingBar,
    setDelete,
    setUpdateRow
});
