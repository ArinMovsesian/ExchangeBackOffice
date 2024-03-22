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
            title: "ماهیت حساب",
            field: "natureTitle",
            show: true,
            width: "150px",
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "فعال",
            field: "status",
            show: true,
            width: "80px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                let status = event.dataItem.status === 1;
                return (
                    
                    <CheckColumn status={status} />
                )
            },
        },
        {
            title: "قابل پیگیری",
            field: "isTrackable",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.isTrackable} />
                )
            },
        },
        {
            title: "تعدادی",
            field: "isCountable",
            show: true,
            width: "80px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    
                    <CheckColumn status={event.dataItem.isCountable} />
                )
            },
        },
        {
            title: "مرکز هزینه اجباری",
            field: "requiredCostCenter",
            show: true,
            width: "120px",
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
            width: "100px",
            isFixed: false,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    
                    <CheckColumn status={event.dataItem.hasDetail} />
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