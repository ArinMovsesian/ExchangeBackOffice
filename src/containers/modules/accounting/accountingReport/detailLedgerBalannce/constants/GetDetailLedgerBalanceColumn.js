export function Columns6() {
    return [
        {
            title: "کد حساب",
            width: '130px',
            field: "accountCode",
            attributes: { class: "text-center" },
            footerTemplate: "<div>جمع صفحه</div><div>جمع کل</div>"
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
            footerTemplate: "<div>#=kendo.toString(sum, 'n0')#</div>" +
            '<div class="totla-debit-turnover"></div>'
        },
        {
            title: "گردش بستانکار تا دوره",
            field: "creditTurnover",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: "<div>#=kendo.toString(sum, 'n0')#</div>" +
            '<div class="total-credit-turnover"></div>'
        },
        {
            title: "گردش بدهکار",
            field: "debitSum",
            width: "150px",
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
            width: "150px",
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
            width: "150px",
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
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: "<div>#=kendo.toString(sum, 'n0')#</div>" +
            '<div class="total-credit-leave"></div>'
        },
        {
            title: "دفتر حساب تفضیل",
            field: "id",
            width: "100px",
            attributes: { class: "text-center" },
            template: '<span class="fas fa-eye detail-account-book"></span>'
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
            footerTemplate: "<div>جمع صفحه</div><div>جمع کل</div>"
        },
        {
            title: "عنوان حساب",
            field: "accountTitle"
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
            title: "دفتر حساب تفضیل",
            field: "id",
            width: "100px",
            attributes: { class: "text-center" },
            template: '<span class="fas fa-eye detail-account-book"></span>'

        },

    ];

}



