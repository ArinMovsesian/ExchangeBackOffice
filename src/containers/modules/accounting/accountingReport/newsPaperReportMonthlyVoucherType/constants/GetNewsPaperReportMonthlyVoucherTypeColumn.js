import React from 'react';
const Columns = function (prop, state) {
    return [
      
        {
            title: "کد حساب",
            field: "accountCode",
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "عنوان حساب",
            field: "accountTitle",
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "شناسه حساب",
            field: "accountId",
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "جمع بدهکار",
            field: "debitSum",
            filter: "numeric",
            format: "{0:n0}",
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "جمع بستانکار",
            field: "creditSum",
            filter: "numeric",
            format: "{0:n0}",
            width: '200px',
            attributes: { class: "text-left" }
        },
     
        {
            title: "مانده بدهکار",
            field: "debitLeave",
            filter: "numeric",
            format: "{0:n0}",
            width: '200px',
            attributes: { class: "text-left" },
          
        },
        {
            title: "مانده بستانکار",
            field: "creditLeave",
            filter: "numeric",
            format: "{0:n0}",
            width: '200px',
            attributes: { class: "text-left" },
            
        },

    ];
};


export default Columns;