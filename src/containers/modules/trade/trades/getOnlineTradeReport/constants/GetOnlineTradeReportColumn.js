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
            title: "نحوه ثبت سفارش",
            field: "serviceName",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "مشتریان ابتدای دوره",
            field: "numberOfCustomersFirstDate",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
         
        },
        {
            title: "مشتریان طی دوره",
            field: "numberOfCustomersInDate",
            show: true,
            
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "کل مشتریان",
            field: "totalCustomers",
            show: true,
           
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "مشتریان فعال",
            field: "totalActiveCustomers",
            show: true,
           
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "حجم معاملات ابتدای دوره",
            field: "tradeVolumeFirstDate",
            show: true,
           
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "حجم معاملات طی دوره",
            field: "tradeVolumeInDate",
            show: true,
            
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "مبلغ کل",
            field: "totalAmount",
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