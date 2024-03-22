export function Column() {
    return [
        {
            title: "تاریخ",
            field: "voucherDateJalali",
            width: "200px",
            attributes: { class: "text-center" }
        },
        {
            title: "شرح سند",
            field: "description",
            width: "400px"

        },
        {
            title: " بدهکار",
            field: "debit",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-center" }
        },
        {
            title: " بستانکار",
            field: "credit",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-center" }
        },

        {
            title: "مانده بدهکار",
            field: "debitRemain",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-center" }
        },
        {
            title: "مانده بستانکار",
            field: "creditRemain",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-center" }
        },
        {
            title: "مانده کل",
            field: "remain",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-center" }
        },
    ];

}
