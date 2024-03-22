import React from 'react';
import { Edit} from 'shared/components/kendoGrid/kendoGrid';

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
            title: "نماد معاملاتی",
            field: "stationSymbol",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "شناسه معامله گر",
            field: "traderCode",
            show: true,
            width: "180px",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "شعبه جایگزین",
            field: "alternativeBranchTitle",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,

        },
        {
            title: "نوع مقصد",
            field: "branchStationTitle",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },    
        {
            title: "ویرایش",
            field: "accountNumber",
            isFixed: true,
            width: "100px",
            dynamicColumn: true,

            cell: (event) => {

                return (

                    <Edit   {...prop} sateParams={{ code: event.dataItem.code }} />
                )
            },

        },

    ];

}


export default Columns;