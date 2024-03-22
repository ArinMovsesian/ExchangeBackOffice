import React from 'react';
import {CheckColumn} from 'shared/components/kendoGrid/kendoGrid';
const Columns = function (prop, state, classes) {
    return [
        {
            title: "نام مشتری",
            field: "fullPartyName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            footerTemplate: "<div style='text-align: right !important;'>جمع صفحه</div><div style='text-align: right !important;margin-top: 10px'>جمع کل</div>",
            // attributes: { class: "text-center" }
        },
        {
            title: "کد ملی",
            field: "nationalId",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            // attributes: { class: "text-center" }
        },
        {
            title: "کد حساب",
            field: "detailLedgerCode",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            // attributes: { class: "text-center" }
        },
        {
            title: "کد بورسی",
            field: "bourseCode",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            // attributes: { class: "text-center" }
        },
        {
            title: "پرداخت",
            field: "payment",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            filter: "numeric",
            format: "{0:n0}",
            width: '200px',
            attributes: { class: "text-left changeDirection"},
        },
        {
            title: "دریافت",
            field: "deposits",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            filter: "numeric",
            format: "{0:n0}",
            width: '200px',
            attributes: { class: "text-left changeDirection"},
        },
        {
            title: "مانده",
            field: "remainT0",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left changeDirection"},
            width: '200px',
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: left !important; direction: ltr !important'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: left !important;margin-top: 10px; direction: ltr !important' class='total-amount-sum'></div>"
        
        },
    ];
};


export default Columns;