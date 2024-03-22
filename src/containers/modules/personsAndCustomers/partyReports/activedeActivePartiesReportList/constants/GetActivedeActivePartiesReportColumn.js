import React from 'react';
// import { Delete} from 'shared/components/kendoGrid/kendoGrid';
import { Edit } from 'shared/components/kendoGrid/kendoGrid';
// import Delete from 'shared/components/kendoGrid/deleteButton/deleteButtonWithoutTD';
// import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';
import {CheckColumn} from 'shared/components/kendoGrid/kendoGrid';
// import DeleteManagedCustomerContactServices from "../services/deleteManagedCustomerContactService";

const Columns = function (props, state, classes) {
   
    return [
        {
            title: "نوع مشتری",
            field: "partyType",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "تعداد مشتریان",
            field: "totalCustomer",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
         
        },
        {
            title: "تعداد مشتریان فعال",
            field: "totalActiveCustomer",
            show: true,
            
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "تعداد مشتریان غیر فعال",
            field: "inActiveCustomer",
            show: true,
           
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "تعداد مشتریان اینترنتی فعال",
            field: "activeInternetCustomer",
            show: true,
           
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "تعداد مشتریان اینترنتی غیر فعال",
            field: "inActiveInternetCustomer",
            show: true,
           
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "تعداد مشتریان آنلاین فعال",
            field: "activeOnlineCustomer",
            show: true,
            
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "تعداد مشتریان آنلاین غیر فعال",
            field: "inActiveOnlineCustomer",
            show: true,
            
            isFixed: false,
            dynamicColumn: false,
        },
       
        // {
        //     title: "عملیات",
        //     isFixed: true,
        //     width: "150px",
        //     dynamicColumn: true,
        //     cell: (event) => {
        //         console.log('event',event.dataItem);
        //         let edit = event.dataItem.partyType === 1 ? props.edit[0] : props.edit[1];
              
        //         return (
        //             <Edit  {...props} edit={edit} routeEdit={edit} sateParams={{ partyId: event.dataItem.id}} />
        //         )
        //     }
        // }
       
    ];
}


export default Columns;