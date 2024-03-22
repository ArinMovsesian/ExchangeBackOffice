import React from 'react';
import { Edit } from 'shared/components/kendoGrid/kendoGrid';

const Columns = function (props) {
    return [
        {
            title: "نام منو",
            field: "menuName",
            show: true,
            width: "350px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "عنوان منو",
            field: "menuTitle",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "ویرایش",
            isFixed: true,
            width: "80px",
            dynamicColumn: true,

            cell: (event) => {

                return (

                    <Edit   {...props} sateParams={{ resourceId: event.dataItem.id }} />
                )
            },

        },

    ];

}


export default Columns;