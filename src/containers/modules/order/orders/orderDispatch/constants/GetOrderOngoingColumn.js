import { isCheckByNumber, OrderSide, isCheck } from "../../../../../../constants/kendoUiGrid";
const Columns = function (prop, state, classes) {
    return [
        {
            selectable: true, width: "50px",
  
        },
        {
            title: "جهت سفارش",
            field: "orderSideDescription",
            width: "110px",
            template: OrderSide("orderSideDescription"),
            attributes: { class: "text-center" },
        },
        {
            title: "ارجاع شده",
            field: "isForwarded",
            template: isCheck('isForwarded'),
            width: "100px",
            attributes: { class: "text-center" }
        },
        {
            title: "مبدا",
            field: "orderRegisterFromDescription",
            width: "80px",
       
        },
        {
            title: "نام کاربری",
            field: "createdBy",
            width: "110px",
            attributes: { class: "text-center" }
        },
        {
            title: "مانده",
            field: "remainT0",
            width: "160px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            template: '#if(remainT0>=0){#' +
                '<b>#= Math.abs(remainT0).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b>#}' +
                'else {#' +
                '<b class="red-color">(#= Math.abs(remainT0).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b>#}#'

        },
        {
            title: "مانده بلوکه",
            field: "blockRemain",
            width: "160px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            template: '#if(blockRemain>=0){#' +
                '<b>#= Math.abs(blockRemain).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#</b>#}' +
                'else {#' +
                '<b class="red-color">(#= Math.abs(blockRemain).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#)</b>#}#'

        },
        {
            title: "تاریخ ثبت سفارش",
            field: "createdJalali",
            width: "110px",
            attributes: { class: "text-center" }
        },
        {
            title: "زمان ثبت سفارش",
            field: "createdTimeOfDay",
            width: "110px",
            attributes: { class: "text-center" }
        },
        {
            title: "بلوکه سفارشهای باز",
            field: "remainingVolume",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],

        },

        {
            title: "نوع سفارش",
            field: "orderTypeDescription",
            width: "110px",
            attributes: { class: "text-center" }
        },
     
        {
            title: "شعبه مشتری",
            field: "partyBranchName",
            width: "100px",
            attributes: { class: "text-center" }
        },
        {
            title: "شعبه ثبت کننده",
            field: "stationTitle",
            width: "130px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-center" },
            aggregates: ["sum"],

        },
        {
            title: "عنوان مشتری",
            field: "partyFullName",
            width: "150px",
            attributes: { class: "text-center" }
        },
        {
            title: "کد بورسی",
            field: "bourseCode",
            width: "150px",
            attributes: { class: "text-center" }
        },
        {
            title: "کد ملی",
            field: "nationalId",
            width: "150px",
            attributes: { class: "text-center" }
        },
        {
            title: "نام معرف",
            field: "representativeName",
            width: "150px",
            attributes: { class: "text-center" }
        },
        {
            title: "نام بازاریاب",
            field: "marketerName",
            width: "150px",
            attributes: { class: "text-center" }
        },

        {
            title: "نماد",
            field: "symbol",
            width: "250px",
            attributes: { class: "text-center" }
        },
        {
            title: "نام شرکت",
            field: "companyTitle",
            width: "250px",
            attributes: { class: "text-center" }
        },
        {
            title: "تعداد",
            field: "volume",
            width: "150px",

            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
  
        },
        {
            title: "مبلغ (ریال)",
            field: "amount",
            width: "150px",

            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],

        },
        {
            title: "مبلغ باقی مانده",
            field: "remainingAmount",
            width: "150px",

            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
   
        },
        {
            title: "شماره سریال سفارش",
            field: "serialNumber",
            width: "180px",
            attributes: { class: "text-center" }
        },
        {
            title: "شرط قیمت",
            field: "price",
            width: "150px",

            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],

        },
    




        {
            title: "عنوان کاربر",
            field: "modifiedBy",
            width: "100px",
            attributes: { class: "text-center" }
        },

        {
            title: "آخرین شعبه تخصصی",
            field: "assignedBranchTitle",
            width: "150px",
            attributes: { class: "text-center" }
        },
        {
            title: "مقصد آخرین شعبه تخصصی",
            field: "branchStationTitle",
            width: "150px",
            attributes: { class: "text-center" }
        },
        {
            title: "تا تاریخ",
            field: "validUntilJalali",
            width: "130px",
            attributes: { class: "text-center" }
        },
        {
            title: "وضعیت سفارش",
            field: "orderStateDescription",
            width: "160px",
            attributes: { class: "text-center" }
        },
        {
            title: "درخواست انصراف",
            field: "execuationDateJalali",
            template: isCheck('requestCancel'),
            width: "150px",
            attributes: { class: "text-center" }
        },

        {
            title: "تایید شده",
            field: "volume",
            width: "150px",

            template: isCheckByNumber('isConfirmed'),


        },
        {
            title: "چاپ شده",
            field: "isPrinted",
            template: isCheck('isPrinted'),
            width: "150px",
            attributes: { class: "text-center" }
        },
        {
            title: "نوع بازار",
            field: "securityExchangeEnumTitle",
            width: "150px",
 
        },
        {
            title: "توضیحات مشتری",
            field: "senderDescription",
            width: "150px",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
    
        },
        {
            title: "توضیحات کارگزاری",
            field: "traderDescription",
            width: "240px"
        },
        {
            title: "توضیحات آخرین رخداد",
            field: "sectorTitle",
            width: "240px"
        },




    ];

}


export default Columns;