import { isCheckByNumber } from "../../../../../../constants/kendoUiGrid";

const Columns = function (prop, state, classes) {
    return [
        {
            title: "کد ملی",
            field: "nationalId",
            width: "110px",
            footerTemplate: "<div>جمع صفحه</div><div>جمع کل</div>",
            attributes: { class: "text-center" }
        },
        {
            title: "عنوان مشتری",
            field: "partyFullName",
            width: "250px",
            attributes: { class: "text-center" }
        },
        {
            title: "کد بورسی",
            field: "bourseCode",
            width: "100px",
            attributes: { class: "text-center" }
        },
      
        {
            title: "از تاریخ",
            field: "validFromJalali",
            width: "100px",
            attributes: { class: "text-center" }
        },
        {
            title: "تا تاریخ",
            field: "validUntillJalali",
            width: "160px",
            attributes: { class: "text-center" }
        },
        {
            title: "تاریخ سفارش",
            field: "dateJalali",
            width: "180px",
            attributes: { class: "text-center" }
        },

        {
            title: "تاریخ انجام سفارش",
            field: "execuationDateJalali",
            width: "160px",
            attributes: { class: "text-center" }
        },
        {
            title: "مبلغ (ریال)",
            field: "amount",
            width: "180px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            '<div class="total-amount-sum"></div>'
        },
        {
            title: "تعداد",
            field: "volume",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            '<div class="total-volume-sum"></div>'
        },
        {
            title: "قیمت",
            field: "price",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            '<div class="total-price-sum"></div>'
        },
        {
            title: "مبلغ باقی مانده",
            field: "remainingAmount",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            '<div class="total-remainingAmount-sum"></div>'
        },
        {
            title: "تعداد باقی مانده",
            field: "remainingVolume",
            width: "150px",
             filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            '<div class="total-remainingVolume-sum"></div>'
        },
        {
            title: "نام صنعت",
            field: "sectorTitle",
            width: "240px"
        },
        {
            title: "وضعیت",
            field: "orderStateDescription",
            width: "200px"
        },
        {
            title: "شماره سریال",
            field: "serialNumber",
            width: "270px",
            attributes: { class: "text-center" }
        },
        {
            title: "جهت سفارش",
            field: "orderSideDescription",
            width: "270px"
        },
        {
            title: "نوع سفارش",
            field: "orderTypeDescription",
            width: "270px"
        },
        {
            title: "ISIN",
            field: "isin",
            width: "270px"
        },
        {
            title: "نام نماد",
            field: "symbol",
            width: "270px"
        },
        {
            title: "نام سهم (شرکت)",
            field: "productTitle",
            width: "270px"
        },
        {
            title: "نوع بازار",
            field: "stockExchangeTitle",
            width: "270px"
        },
        {
            title: "شعبه ثبت کننده ",
            field: "branchName",
     
            width: "270px",
         
        },
        {
            title: "ارجاع به شعبه",
            field: "assignedBranchTitle",
            width: "270px"
        },
        {
            title: "آخرین شعبه تخصیصی",
            field: "assignedBranchStation",
            width: "270px"
        },
      
    
        {
            title: "مقصد آخرین شعبه تخصیصی",
            field: "assignedBranchStation",
     
            width: "270px",
         
        },
        {
            title: "توضیحات مشتری",
            field: "senderDescription",
            width: "270px"
        },
        {
            title: "توضیحات کارگزاری",
            field: "traderDescription",
            width: "270px"
        },
        {
            title: "علت ارجاع",
            field: "orderRejectionReasonTitle",
     
            width: "270px",
         
        },
      
       
        {
            title: "نام کاربری",
            field: "createdBy",
            width: "270px"
        },
        {
            title: "عنوان کاربر",
            field: "createdByTitle",
            width: "270px"
        },
        {
            title: "زمان ثبت سفارش",
            field: "createdJalali",
     
            width: "270px",
         
        },
        {
            title: "چاپ شده؟",
            field: "isPrinted",
            width: "270px",
            template:isCheckByNumber("isPrinted")
        },
        {
            title: "امضاء شده؟",
            field: "isConfirmed",
            width: "270px",
            template:isCheckByNumber("isConfirmed")

        },
        {
            title: "درخواست انصراف",
            field: "requestCancel",
     
            width: "270px",
            template:isCheckByNumber("requestCancel")
         
        },
      
       
        {
            title: "زمان درخواست انصراف",
            field: "requestCancelationTimeJalali",
            width: "270px"
        },
        {
            title: "مبدا ثبت",
            field: "orderRegisterFromDescription",
            width: "270px"
        },
        {
            title: "تاریخ ایجاد",
            field: "createdJalali",
     
            width: "270px",
         
        },
        {
            title: "ایجاد کننده",
            field: "createdByTitle",
     
            width: "270px",
         
        },
      
       
        {
            title: "تاریخ آخرین ویرایش",
            field: "modifiedJalali",
            width: "270px"
        },
        {
            title: "آخرین ویرایشگر",
            field: "modifiedByTitle",
            width: "270px"
        },
       

      
    ];

}


export default Columns;