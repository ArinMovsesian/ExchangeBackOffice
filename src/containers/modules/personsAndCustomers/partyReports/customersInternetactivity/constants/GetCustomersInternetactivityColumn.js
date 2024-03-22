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
            title: "نام / نام خانوادگی",
            field: "partyFullName",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
           
        },
        {
            title: "کد تفضیل",
            field: "detailLedgerCode",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "تعداد روزهای معامله مشتری",
            field: "numberOfDayThatCustomerDoesTrade",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        
        // {
        //     title: "تصویر جلوی کارت ملی",
        //     field: "nationalCard",
        //     show: true,
        //     width: "100px",
        //     isFixed: false,
        //     dynamicColumn: true,
        //     cell: (event) => {
        //         return (
        //             <CheckColumn status={event.dataItem.nationalCard} />
        //         )
        //     },
        // },
       
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