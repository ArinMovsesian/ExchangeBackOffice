import React from 'react';
import { Edit } from 'shared/components/kendoGrid/kendoGrid';

const Columns = function (props, state, classes) {
    return [
        {
            title: "عنوان نقش",
            field: "name",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "عنوان در پایگاه داده",
            field: "normalizedName",
            show: true,
            width: "290px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "توضیحات",
            field: "description",
            show: true,
            width: "400px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        
    ];

}


export default Columns;