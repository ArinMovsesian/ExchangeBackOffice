import React from 'react';
import { Show,Edit, CheckColumn } from 'shared/components/kendoGrid/kendoGrid';

const Columns = function (prop, state, classes) {
 
    return [
        {
            title: "ردیف سند",
            field: "rowNumber",
            show: true,
            width: "100px",
            isFixed: false,
            dynamicColumn: false,
            footerTemplate: "<div>جمع صفحه</div><div>جمع کل</div>",

        },
        {
            title: "حساب معین",
            field: "subsidiaryLedgerCode",
            show: true,
            width: "110px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "عنوان معین",
            field: "subsidiaryLedgerTitle",
            show: true,
            width: "340px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "حساب تفصیلی",
            field: "detailLedgerCode",
            show: true,
            width: "120px",
           
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "عنوان تفصیلی",
            field: "detailLedgerTitle",
            show: true,
            width: "365px",
            class: "text-right",
            isFixed: false,

        },
        {
            title: "شرح ردیف",
            field: "description",
            show: true,
            width: "220px",
            class: "text-right font-small",
            isFixed: false,
         
            dynamicColumn: false,
        }, 
        {
            title: "بدهکار",
            field: "debit",
            show: true,
            width: "155px",
            isFixed: false,
            dynamicColumn: false,
            filter: "numeric",
            format: "{0:n0}",
            class:"text-left",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: "<div class='text-left'>#=kendo.toString(sum, 'n0')#</div>" +
                '<div class="total-debit-sum text-left"></div>'
        
        },  
        {
            title: "بستانکار",
            field: "credit",
            show: true,
            width: "155px",
            isFixed: false,
            dynamicColumn: false,
            filter: "numeric",
            format: "{0:n0}",
            class:"text-left",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: "<div class='text-left'>#=kendo.toString(sum, 'n0')#</div>" +
                '<div class="total-credit-sum text-left"></div>'
        
        },  
    
       

    ];

}


export default Columns;