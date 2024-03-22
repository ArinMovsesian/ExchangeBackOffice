
import GetGroups from './groups/components/GetGroupsComponent';
import AddGroup from './groups/components/AddGroupComponent';
import UpdateGroup from './groups/components/UpdateGroupComponent';
import GetGroupTypes from './groupTypes/components/GetGroupTypesComponent';
import AddGroupType from './groupTypes/components/AddGroupTypeComponent';
import UpdateGroupType from './groupTypes/components/UpdateGroupTypeComponent';
import GetPartiesGroup from './partiesGroup/components/GetPartiesGroupComponent';

const route = {

    GetGroups: {
        component: GetGroups,
        title: "فهرست گروه ها",
        path: "/main/persons/partyGroup/getGroups",
        back : null,
        get add(){return route.AddGroup},
        get edit(){return  route.UpdateGroup},
        get list(){return  route.GetPartiesGroup},
        icon: 'fas fa-list-alt'
    },
    AddGroup :{
        component: AddGroup,
        title: "افزودن گروه",
        path: "/main/persons/partyGroup/addGroup",
        get back(){return  route.GetGroups},
        icon: 'fa fa-plus'
    },
    UpdateGroup :{
        component: UpdateGroup,
        title: "ویرایش گروه",
        path: "/main/persons/partyGroup/updateGroup",
        get back(){return  route.GetGroups},
        icon: 'fa fa-pencil'
    },
    GetGroupTypes: {
        component: GetGroupTypes,
        title: "فهرست نوع گروه ها",
        path: "/main/persons/partyGroup/typeGroups",
        back : null,
        get add(){return route.AddGroupType},
        get edit(){return  route.UpdateGroupType},
        icon: 'fas fa-object-group'
    },
    AddGroupType :{
        component: AddGroupType,
        title: "افزودن نوع گروه",
        path: "/main/persons/partyGroup/addGroupType",
        get back(){return  route.GetGroupTypes},
        // get list(){return  route.PartiesGroup}
        icon: 'fa fa-plus'
    },
    UpdateGroupType :{
        component: UpdateGroupType,
        title: "ویرایش نوع گروه",
        path: "/main/persons/partyGroup/updateGroupType",
        get back(){return  route.GetGroupTypes},
        icon: 'fa fa-pencil'
    },
    GetPartiesGroup:{
        component: GetPartiesGroup,
        title: "فهرست مشتریان گروه",
        path: "/main/persons/partyGroup/getPartiesGroup",
        back : null,
        icon: 'fas fa-user-friends'
    },
    

}

export default route;