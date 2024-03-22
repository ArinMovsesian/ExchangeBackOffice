
export function Columns6(prop, state, classes) {
    return [
        {
            title: "کد حساب",
            width: '130px',
            field: "accountCode",
            attributes: { class: "text-center" },
            footerTemplate: "جمع کل",
            template: '<span class="account-code">#=accountCode#</span>'
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
            footerTemplate: "<div>#=kendo.toString(sum, 'n0')#</div>"
           
        },
        {
            title: "گردش بستانکار تا دوره",
            field: "creditTurnover",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: "<div>#=kendo.toString(sum, 'n0')#</div>"
        },
        {
            title: "گردش بدهکار",
            field: "debitSum",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: "<div>#=kendo.toString(sum, 'n0')#</div>"

        },
        {
            title: "گردش بستانکار",
            field: "creditSum",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: "<div>#=kendo.toString(sum, 'n0')#</div>"
           
            

        },
        {
            title: "مانده بدهکار",
            field: "debitLeave",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: "<div>#=kendo.toString(sum, 'n0')#</div>"
            

        },
        {
            title: "مانده بستانکار",
            field: "creditLeave",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: "<div>#=kendo.toString(sum, 'n0')#</div>"
           

        },
        {
            title: "دفتر حساب کل",
            field: "id",
            width: "100px",
            attributes: { class: "text-center" },
            template: '<span class="fas fa-eye general-account-book"></span>'
        }

    ];

}

export function Columns4() {

    return [
        {
            title: "کد حساب",
            width: '130px',
            field: "accountCode",
            attributes: { class: "text-center" },
            footerTemplate: "جمع کل",
            template: '<span class="account-code">#=accountCode#</span>'
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
            footerTemplate: "<div>#=kendo.toString(sum, 'n0')#</div>"
          


        },
        {
            title: "گردش بستانکار",
            field: "creditSum",
            width: "180px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: "<div>#=kendo.toString(sum, 'n0')#</div>"
          
        },

        {
            title: "مانده بدهکار",
            field: "debitLeave",
            width: "180px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: "<div>#=kendo.toString(sum, 'n0')#</div>"

        },
        {
            title: "مانده بستانکار",
            field: "creditLeave",
            width: "180px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: "<div>#=kendo.toString(sum, 'n0')#</div>"
        },
        {
            title: "دفتر حساب کل",
            field: "id",
            width: "100px",
            attributes: { class: "text-center" },
            template: '<span class="fas fa-eye general-account-book"></span>'
        }
    ];

}



