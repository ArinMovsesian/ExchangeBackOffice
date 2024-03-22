const Columns = function (prop, state, classes) {
    return [
        {
            title: "شماره اعلامیه",
            field: "ticketNumber",
            width: "110px",
            footerTemplate: "<div>جمع صفحه</div><div>جمع کل</div>",
            attributes: { class: "text-center" }
        },
        {
            title: "تاریخ معامله",
            field: "dateJalali",
            width: "150px",
            attributes: { class: "text-center" }
        },
        {
            title: "ساعت معامله",
            field: "time",
            width: "100px",
            attributes: { class: "text-center" }
        },
        {
            title: "نام مشتری",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "کد حسابداری",
            field: "detailLedgerCode",
            width: "100px",
            attributes: { class: "text-center" }
        },
        {
            title: "کد بورسی",
            field: "tseBourseCode",
            width: "160px",
            attributes: { class: "text-center" }
        },
        {
            title: "کد معاملاتی",
            field: "pamCode",
            width: "180px",
            attributes: { class: "text-center" }
        },

        {
            title: "شناسه ملی",
            field: "nationalCode",
            width: "160px",
            attributes: { class: "text-center" }
        },
        {
            title: "وضعیت معامله",
            field: "transactionStatusEnumTitle",
            width: "180px"
        },
        {
            title: "نوع معامله",
            field: "transactionTypeTitle",
            width: "150px"
        },
        {
            title: "نوع مشتری",
            field: "partyTypeTitle",
            width: "150px"
        },
        {
            title: "نوع بازار",
            field: "simpleSecurityExchangeTitle",
            width: "150px"
        },
        {
            title: "نوع زیر بازار",
            field: "productTypeTitle",
            width: "150px"
        },
        {
            title: "نام صنعت",
            field: "sectorTitle",
            width: "240px"
        },
        {
            title: "شعبه مشتری",
            field: "partyBranchTitle",
            width: "200px"
        },
        {
            title: "نماد",
            field: "symbol",
            width: "270px",
            attributes: { class: "text-center" }
        },
        {
            title: "نام سهم",
            field: "fullProductName",
            width: "270px"
        },
        {
            title: "تعداد ",
            field: "volume",
            filter: "numeric",
            format: "{0:n0}",
            width: "270px",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            '<div class="total-volume-sum"></div>'
        },
        {
            title: "قیمت",
            field: "price",
            filter: "numeric",
            attributes: { class: "text-left" },
            format: "{0:n0}",
            width: "270px",
            aggregates: ["sum"],
               footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            '<div class="total-price-sum"></div>'
         },
        {
            title: " ارزش معامله (سهام در نرخ)",
            field: "value",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            width: "162px",
            aggregates: ["sum"],
             footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            '<div class="total-value-sum"></div>'

        },
        {
            title: "کارمزد کارگزاری",
            field: "brokerFee",
            filter: "numeric",
            attributes: { class: "text-left" },
            format: "{0:n0}",
            width: "162px",
            aggregates: ["sum"],
               footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            '<div class="total-brokerFee-sum"></div>'
        },
        {
            title: "مقدار واقعی کارمزد کارگزاری",
            field: "realFee",
            filter: "numeric",
            format: "{0:n0}",
            width: "162px",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
               footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            '<div class="total-realFee-sum"></div>'
        },
        {
            title: "کارمزد سپرده گذاری",
            field: "csdFee",
            filter: "numeric",
            format: "{0:n0}",
            width: "162px",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
              footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            '<div class="total-csdFee-sum"></div>'
        },
        {
            title: "کارمزد بورس اوراق",
            field: "tseFee",
            width: "162px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
               footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            '<div class="total-tseFee-sum"></div>'
        },
        {
            title: "کارمزد حق نظارت سازمان",
            field: "seoFee",
            width:"200px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
               footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            '<div class="total-seoFee-sum"></div>'
        },
        {
            title: "کارمزد مدیریت فناوری",
            field: "tseTmcFee",
            width: "200px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
               footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            '<div class="total-tseTmcFee-sum"></div>'
        },
        {
            title: "کارمزد خدمات دسترسی",
            field: "rightToAccessFee",
            width: "162px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
              footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            '<div class="total-rightToAccessFee-sum"></div>'
        },
        {
            title: "مالیات نقل و انتقال",
            field: "tax",
            filter: "numeric",
            format: "{0:n0}",
            width: "162px",
            aggregates: ["sum"],
            attributes: { class: "text-left" },
              footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            '<div class="total-tax-sum"></div>'
        },
        {
            title: "مجموع کارمزد",
            field: "totalFee",
            width: "162px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
              footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            '<div class="total-totalFee-sum"></div>'
        },
        {
            title: "درصد تخفیف",
            field: "discountPercentage",
            width: "120px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            '<div class="total-discountPercentage-sum"></div>'
        },
        {
            title: "تخفیف",
            field: "discount",
            filter: "numeric",
            format: "{0:n0}",
            width: "162px",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            '<div class="total-discount-sum"></div>'
        },
        {
            title: "مبلغ تسویه نهایی",
            field: "netAmount",
            filter: "numeric",
            format: "{0:n0}",
            width: "162px",
            aggregates: ["sum"],
            attributes: { class: "text-left" },
            // footerTemplate: "#=kendo.toString(sum, 'n0')#",
            footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            '<div class="totla-net-amount"></div>'
        }
    ];

}


export default Columns;