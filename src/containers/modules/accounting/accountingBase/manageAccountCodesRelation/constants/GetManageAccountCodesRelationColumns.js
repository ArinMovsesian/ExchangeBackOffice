import React from 'react';
import { Edit, CheckColumn } from 'shared/components/kendoGrid/kendoGrid';
import Delete from 'shared/components/kendoGrid/deleteButton/deleteButton';
import GetManageAccountCodesRelationService from '../services/GetManageAccountCodesRelationService';
const Columns = function (prop, state, classes) {
    return [
        {
            title: "کد حساب",
            field: "accountCode",
            show: true,
            width: "105px",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "عنوان",
            field: "accountFullTitle",
            show: true,
            width: "700px",

            class: "text-right",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "سطح حساب",
            field: "accountLevel",
            show: true,
            width: "200px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "مرکز هزینه اجباری",
            field: "isLastLevel",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {

                return (

                    <CheckColumn status={event.dataItem.costCenterIsForced} />
                )
            },
        },
        {
            title: "نوع اعمال در گردش فصلی",
            field: "parentTitle",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "فعال",
            field: "isLastLevel",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {

                return (

                    <CheckColumn status={event.dataItem.isActive} />
                )
            },
        },
        {
            title: "عملیات",
            field: "code",
            isFixed: true,
            width: "100px",
            dynamicColumn: true,

            cell: (event) => {

                return (
                    <Delete deleteService={GetManageAccountCodesRelationService.deleteRelation}  {...prop} info={event.dataItem} entity={ {id:event.dataItem.id}}  fullName={event.dataItem.accountFullTitle }/>
               
                )
            },

        },

    ];

}


export default Columns;