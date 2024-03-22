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
            width: "400px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "عنوان نوع حساب تفضیلی",
            field: "accountClassTitle",
            show: true,
            width: "500px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "فعال",
            field: "isLastLevel",
            show: true,
            width: "80px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {

                return (

                    <CheckColumn status={event.dataItem.status} />
                )
            },
        },
        {
            title: "مرکز هزینه اجباری",
            field: "requiredCostCenter",
            show: true,
            width: "80px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {

                return (

                    <CheckColumn status={event.dataItem.requiredCostCenter} />
                )
            },
        },
        {
            title: "آنالیز پذیر",
            field: "isAnalyzable",
            show: true,
            width: "80px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {

                return (

                    <CheckColumn status={event.dataItem.isAnalyzable} />
                )
            },
        },
        {
            title: "تفضیل پذیر",
            field: "hasDetail",
            show: true,
            width: "80px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {

                return (

                    <CheckColumn status={event.dataItem.hasDetail} />
                )
            },
        },
        {
            title: "گزارش فصلی",
            field: "requiredSeasonalReport",
            show: true,
            width: "80px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {

                return (

                    <CheckColumn status={event.dataItem.requiredSeasonalReport} />
                )
            },
        },
        {
            title: "توضیحات",
            field: "description",
            show: true,
            width: "200px",
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