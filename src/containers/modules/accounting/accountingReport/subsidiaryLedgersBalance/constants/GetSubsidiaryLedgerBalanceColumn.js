export function Columns6() {
    return [
        {
            title: "کد حساب",
            width: '130px',
            field: "accountCode",
            attributes: { class: "text-center" },
            footerTemplate: "<div>جمع صفحه</div><div>جمع کل</div>",
            template: '<div class="account-code text-center">#=accountCode#</div>'
        },
        {
            title: "عنوان حساب",
            field: "accountTitle",
        },
        {
            title: " گردش بدهکار تا دوره",
            field: "debitTurnover",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: "<div class='text-left'>#=kendo.toString(sum, 'n0')#</div>" +
                '<div class="total-debit-turnover text-left"></div>'
        },
        {
            title: "گردش بستانکار تا دوره",
            field: "creditTurnover",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class:'text-left' },
            aggregates: ["sum"],
            footerTemplate: "<div class='text-left'>#=kendo.toString(sum, 'n0')#</div>" +
                '<div class="total-credit-turnover text-left"></div>'
        },
        {
            title: "گردش بدهکار",
            field: "debitSum",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: "<div class='text-left'>#=kendo.toString(sum, 'n0')#</div>" +
                '<div class="total-debit-sum"></div>'
        },
        {
            title: "گردش بستانکار",
            field: "creditSum",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: "<div class='text-left'>#=kendo.toString(sum, 'n0')#</div>" +
            '<div class="total-credit-sum"></div>'
        },
        {
            title: "مانده بدهکار",
            field: "debitLeave",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: "<div class='text-left'>#=kendo.toString(sum, 'n0')#</div>" +
            '<div class="total-debit-leave"></div>'
        },
        {
            title: "مانده بستانکار",
            field: "creditLeave",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: "<div class='text-left'>#=kendo.toString(sum, 'n0')#</div>" +
            '<div class="total-credit-leave"></div>'
        },
        {
            title: "دفتر حساب",
            field: "id",
            width: "100px",
            attributes: { class: "text-center" },
            template: '<div class="fas fa-eye subsidiary-account-book"></div>'
        },

    ];

}

export function Columns4() {
    return [
        {
            title: "کد حساب",
            width: '130px',
            field: "accountCode",
            attributes: { class: "text-center" },
            footerTemplate: "<div>جمع صفحه</div><div>جمع کل</div>",
            template: '<div class="account-code text-center">#=accountCode#</div>'
        },
        {
            title: "عنوان حساب",
            field: "accountTitle",
        },
        {
            title: "گردش بدهکار",
            field: "debitSum",
            width: "180px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: "<div>#=kendo.toString(sum, 'n0')#</div>" +
                '<div class="total-debit-sum"></div>'
        },
        {
            title: "گردش بستانکار",
            field: "creditSum",
            width: "180px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: "<div>#=kendo.toString(sum, 'n0')#</div>" +
            '<div class="total-credit-sum"></div>'
        },

        {
            title: "مانده بدهکار",
            field: "debitLeave",
            width: "180px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: "<div>#=kendo.toString(sum, 'n0')#</div>" +
            '<div class="total-debit-leave"></div>'
        },
        {
            title: "مانده بستانکار",
            field: "creditLeave",
            width: "180px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: "<div>#=kendo.toString(sum, 'n0')#</div>" +
            '<div class="total-credit-leave"></div>'
        },
        {
            title: "دفتر حساب معین",
            field: "id",
            width: "120px",
            attributes: { class: "text-center" },
            template: '<div class="fas fa-eye subsidiary-account-book"></div>'
        },

    ];

}
