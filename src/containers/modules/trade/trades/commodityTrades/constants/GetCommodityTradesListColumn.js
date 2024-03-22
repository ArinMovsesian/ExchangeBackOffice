const Columns = function (prop, state, classes) {
    return [
        {
            title: "نوع معامله",
            field: "ticketNumber",
            width: "110px",
     
            attributes: { class: "text-center" }
        },
        {
            title: "تاریخ معامله",
            field: "dateJalali",
            width: "150px",
            attributes: { class: "text-center" }
        },
      
        {
            title: "عنوان مشتری",
            field: "customerName",
            width: "270px"
        },
        {
            title: "شماره قرارداد",
            field: "contrctNumber",
            width: "270px"
        },
        {
            title: "شماره جزء قرارداد",
            field: "contractDetailNumber ",
            width: "270px"
        },
        {
            title: "کد شناسایی معامله",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "نام کالا",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "نماد کالا",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "زیرگروه کالا",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "گروه کالا",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "گروه اصلی کالا",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "تاریخ تخصیص",
            field: "allocationDate",
            width: "270px"
        },
        {
            title: "مهلت تسویه",
            field: "allocationDate",
            width: "270px"
        },
        {
            title: "تاریخ تسویه نهایی",
            field: "finalSettlmentDate",
            width: "270px"
        },
        {
            title: "نوع قراداد",
            field: "contractType ",
            width: "270px"
        },
        {
            title: "کارگزار طرف مقابل",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "مقدار",
            field: "volume",
            width: "270px"
        },
        {
            title: "قیمت",
            field: "price",
            filter: "numeric",
            attributes: { class: "text-left" },
            format: "{0:n0}",
            width: "270px",
            // aggregates: ["sum"],
            //    footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            // '<div class="total-price-sum"></div>'
         },
         {
            title: " ارزش معامله",
            field: "value",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            width: "162px",
            // aggregates: ["sum"],
            //  footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            // '<div class="total-value-sum"></div>'

        },
        
        
        {
            title: "کارمزد کارگزاری",
            field: "brokerBuyerFee",
            filter: "numeric",
            attributes: { class: "text-left" },
            format: "{0:n0}",
            width: "162px",
            // aggregates: ["sum"],
            //    footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            // '<div class="total-brokerFee-sum"></div>'
        },
        {
            title: "مقدار واقعی کارمزد کارگزاری",
            field: "realFee",
            filter: "numeric",
            format: "{0:n0}",
            width: "162px",
            attributes: { class: "text-left" },
            // aggregates: ["sum"],
            //    footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            // '<div class="total-realFee-sum"></div>'
        },
    
        {
            title: "درصد تخفیف",
            field: "discountPercentage",
            width: "120px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            // aggregates: ["sum"],
            // footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            // '<div class="total-discountPercentage-sum"></div>'
        },
        {
            title: "تخفیف",
            field: "discount",
            filter: "numeric",
            format: "{0:n0}",
            width: "162px",
            attributes: { class: "text-left" },
            // aggregates: ["sum"],
            // footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            // '<div class="total-discount-sum"></div>'
        },
        {
            title: "کارمزد شرکت بورس",
            field: "discount",
            filter: "numeric",
            format: "{0:n0}",
            width: "162px",
            attributes: { class: "text-left" },
            // aggregates: ["sum"],
            // footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            // '<div class="total-discount-sum"></div>'
        },
        {
            title: "کارمزد سازمان بورس",
            field: "discount",
            filter: "numeric",
            format: "{0:n0}",
            width: "162px",
            attributes: { class: "text-left" },
            // aggregates: ["sum"],
            // footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            // '<div class="total-discount-sum"></div>'
        },
        {
            title: "کارمزد حق درج",
            field: "insertRightFee",
            filter: "numeric",
            format: "{0:n0}",
            width: "162px",
            attributes: { class: "text-left" },
            // aggregates: ["sum"],
            // footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            // '<div class="total-discount-sum"></div>'
        },
        {
            title: "جریمه",
            field: "discount",
            filter: "numeric",
            format: "{0:n0}",
            width: "162px",
            attributes: { class: "text-left" },
            // aggregates: ["sum"],
            // footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            // '<div class="total-discount-sum"></div>'
        },
        {
            title: "تسویه شده",
            field: "discount",
            filter: "numeric",
            format: "{0:n0}",
            width: "162px",
            attributes: { class: "text-left" },
            // aggregates: ["sum"],
            // footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            // '<div class="total-discount-sum"></div>'
        },
          {
            title: "نحوه تسویه",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "تاریخ سند تسویه",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "مهلت تسویه",
            field: "settlementDate ",
            width: "270px"
        },
        {
            title: "تاریخ ابطال",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "نوع تسویه",
            field: "settlementType",
            width: "270px"
        },
        {
            title: "تولید کننده",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "محل تحویل",
            field: "deliveryPlace",
            width: "270px"
        },

        {
            title: "موسسه حمل ونقل",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "سفارش دهنده",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "مشتری طرف مقابل",
            field: "partyFullName",
            width: "270px"
        },
    
        {
            title: "کد بورسی مشتری",
            field: "detailLedgerCode",
            width: "100px",
            attributes: { class: "text-center" }
        },
        {
            title: "آدرس مشتری",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "آدرس تخلیه",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "شماره موبایل مشتری",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "شماره تلفن مشتری",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "تاریخ تحویل",
            field: "deliveryDate ",
            width: "270px"
        },
        {
            title: "تاریخ ثبت سفارش",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "شماره نامه",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "خالص",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "مالیات بر ارزش افزوده",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "شماره قبض مالیات بر ارزش افزوده",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "تاریخ فیش مالیات بر ارزش افزوده",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "مجموع کارمزد",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "شناسه ملی",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "کد عرضه کننده",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "کد اقتصادی",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "کد شناسه مشتری طرف مقابل",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "کد اقتصادی مشتری طرف مقابل",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "شناسه ملی مشتری طرف مقابل",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "آدرس مشتری طرف مقابل",
            field: "partyFullName",
            width: "270px"
        },
        {
            title: "کد بورسی مشتری طرف مقابل",
            field: "partyFullName",
            width: "270px"
        },
      
    ];

}


export default Columns;