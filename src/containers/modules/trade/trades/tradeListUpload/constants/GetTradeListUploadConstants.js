import React from 'react';
import {CheckColumn} from 'shared/components/kendoGrid/kendoGrid';
const Columns = function (prop, state, classes) {
    return [
        {
            title: "شماره قرارداد",
            field: "contrctNumber",
            show: true,
            isFixed: false,
            dynamicColumn: false, 
            attributes: { class: "text-center"},
        },
        {
            title: "پیغام",
            field: "errorResult",
            show: true,
            isFixed: false,
            dynamicColumn: false, 
            attributes: { class: "text-right"},
        },
    ];
};


export default Columns;