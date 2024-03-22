import React from 'react';
import { Edit } from 'shared/components/kendoGrid/kendoGrid';

const Columns = function (prop, state, classes) {
    return [
        {
            title: "عنوان",
            field: "title",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "ویرایش",
            field: "code",
            isFixed: true,
            width: "100px",
            dynamicColumn: true,

            cell: (event) => {

                return (

                    <Edit   {...prop} sateParams={{ accountNumber: event.dataItem.accountNumber }} />
                )
            },

        },

    ];

}


export default Columns;