import React from 'react';
import { Edit } from 'shared/components/kendoGrid/kendoGrid';

const Columns = function (props) {
    return [
        {
            title: "نام صفحه",
            field: "pageName",
            show: true,
            width: "350px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "عنوان صفحه",
            field: "pageTitle",
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