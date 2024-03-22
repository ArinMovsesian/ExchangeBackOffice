
export function Columns(prop, state, classes) {
    return [
        {
            title: "تاریخ",
            width: '180px',
            field: "voucherDateJalali",
            attributes: { class: "text-center" },
        },

        {
            title: " مانده بانک و صندوق",
            field: "leaveBankFund",
            width: "200px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            template: '#if(leaveBankFund>=0){#' +
            '<b>#= Math.abs(leaveBankFund).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b>#}' +
            'else {#' +
            '<b class="red-color">(#= Math.abs(leaveBankFund).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b>#}#'


        },
        {
            title: "اسناد در جریان وصول",
            field: "vouchersGetting",
            attributes: { class: "text-left" },

            width: "200px",
            template: '#if(vouchersGetting>=0){#' +
                '<b>#= Math.abs(vouchersGetting).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b>#}' +
                'else {#' +
                '<b class="red-color">(#= Math.abs(vouchersGetting).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b>#}#'


        },
        {
            title: "بدهکار پایاپای",
            field: "debitCleared",
            width: "200px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
             template: '#if(debitCleared>=0){#' +
                '<b>#= Math.abs(debitCleared).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b>#}' +
                'else {#' +
                '<b class="red-color">(#= Math.abs(debitCleared).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b>#}#'

        },
        {
            title: "بستانکار پایاپای",
            field: "creditCleared",
            width: "200px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            template: '#if(creditCleared>=0){#' +
            '<b>#= Math.abs(creditCleared).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b>#}' +
            'else {#' +
            '<b class="red-color">(#= Math.abs(creditCleared).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b>#}#'

        },
        {
            title: "خالص پایاپای",
            field: "leaveCleared",
            width: "200px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            template: '#if(leaveCleared>=0){#' +
                '<b>#= Math.abs(leaveCleared).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b>#}' +
                'else {#' +
                '<b class="red-color">(#= Math.abs(leaveCleared).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b>#}#'



        },
        {
            title: "مانده بورس",
            field: "leaveTse",
            width: "200px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            template: '#if(leaveTse>=0){#' +
                '<b>#= Math.abs(leaveTse).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b>#}' +
                'else {#' +
                '<b class="red-color">(#= Math.abs(leaveTse).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b>#}#'


        },
        {
            title: "مانده فرابورس",
            field: "leaveIfb",
            width: "200px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            template: '#if(leaveIfb>=0){#' +
                '<b>#= Math.abs(leaveIfb).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b>#}' +
                'else {#' +
                '<b class="red-color">(#= Math.abs(leaveIfb).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b>#}#'


        },
        {
            title: "مانده بدهکار مشتریان",
            field: "debitCustomers",
            width: "200px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            template: '#if(debitCustomers>=0){#' +
                '<b>#= Math.abs(debitCustomers).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b>#}' +
                'else {#' +
                '<b class="red-color">(#= Math.abs(debitCustomers).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b>#}#'


        },
        {
            title: "مانده بستانکار مشتریان",
            field: "creditCustomers",
            width: "200px",
            filter: "numeric",
            attributes: { class: "text-left" },

            format: "{0:n0}",
            template: '#if(creditCustomers>=0){#' +
                '<b>#= Math.abs(creditCustomers).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b>#}' +
                'else {#' +
                '<b class="red-color">(#= Math.abs(creditCustomers).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b>#}#'



        },
        {
            title: "خالص مانده مشتریان",
            field: "leaveCustomers",
            width: "200px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            template: '#if(leaveCustomers>=0){#' +
                '<b>#= Math.abs(leaveCustomers).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b>#}' +
                'else {#' +
                '<b class="red-color">(#= Math.abs(leaveCustomers).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b>#}#'


        },
        {
            title: "مانده کیش",
            field: "leaveKish",
            width: "200px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],

            template: '#if(leaveKish>=0){#' +
                '<b>#= Math.abs(leaveKish).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b>#}' +
                'else {#' +
                '<b class="red-color">(#= Math.abs(leaveKish).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b>#}#'


        },
        {
            title: "مازاد (کسری)",
            field: "totalLeave",
            width: "200px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],

            template: '#if(totalLeave>=0){#' +
                '<b>#= Math.abs(totalLeave).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b>#}' +
                'else {#' +
                '<b class="red-color">(#= Math.abs(totalLeave).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b>#}#'


        },
        {
            title: "عملیات",
            field: "id",
            width: "200px",
            attributes: { class: "text-center" },
            template: '<span class="fas fa-excel liquidity-excel"></span>' +
                '<span class="fas fa-pdf liquidity-pdf"></span>'
        }

    ];

}
