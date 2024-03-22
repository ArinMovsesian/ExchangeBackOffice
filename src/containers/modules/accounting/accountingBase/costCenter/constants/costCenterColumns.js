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
            title: "مرکز سرگروه",
            field: "parentTitle",
            show: true,
            width: "500px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "مرکز سطح آخر",
            field: "isLastLevel",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {

                return (

                    <CheckColumn status={event.dataItem.isLastLevel} />
                )
            },
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