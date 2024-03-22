import React from 'react';
import { Edit, CheckColumn } from 'shared/components/kendoGrid/kendoGrid';

const Columns = function (prop, state, classes) {
    return [
        {
            title: "کد",
            field: "code",
            show: true,
            width: "105px",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "عنوان",
            field: "title",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "گروه حساب کل",
            field: "categoryTitle",
            show: true,
            width: "250px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "ماهیت حساب",
            field: "natureTitle",
            show: true,
            width: "250px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        }
        // {
        //     title: "ویرایش",
        //     field: "code",
        //     isFixed: true,
        //     width: "100px",
        //     dynamicColumn: true,

        //     cell: (event) => {

        //         return (

        //             <Edit   {...prop} sateParams={{ accountNumber: event.dataItem.accountNumber }} />
        //         )
        //     },

        // },

    ];

}


export default Columns;