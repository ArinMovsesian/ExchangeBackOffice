import React from 'react';
import {CheckColumn} from 'shared/components/kendoGrid/kendoGrid';
import {isCheck} from "constants/kendoUiGrid";
const Columns = function (prop, state, classes) {
    return [

        {
            title: "عنوان مشتری",
            field: "fullName",
            footerTemplate: 
            "<div style='text-align: right !important;'>جمع صفحه</div>" +
            "<div style='text-align: right !important;margin-top: 10px'>جمع کل</div>",
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "کد حساب",
            field: "detailLedgerCode",
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "کارمزد خرید",
            field: "buyBrokerFee",
            width: '200px',
            attributes: { class: "text-center" },
            format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: left !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: left !important;margin-top: 10px' class='total-buyBrokerFee-sum'></div>"
        },
        {
            title: "کارمزد فروش",
            field: "sellBrokerFee",
            width: '200px',
            attributes: { class: "text-left" },
            format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: left !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: left !important;margin-top: 10px' class='total-sellBrokerFee-sum'></div>"
        },
        {
            title: "مجموع کارمزد",
            field: "totalBrokerFee",
            width: '200px',
            attributes: { class: "text-left" },
            format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: left !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: left !important;margin-top: 10px' class='total-totalBrokerFee-sum'></div>"
        },
        {
            title: "تخفیف",
            field: "disCount",
            width: '200px',
            attributes: { class: "text-left" },
            format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: left !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: left !important;margin-top: 10px' class='total-disCount-sum'></div>"
        },
        {
            title: "مقدار واقعی کارمزد",
            field: "realFee",
            width: '200px',
            attributes: { class: "text-left" },
            format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: left !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: left !important;margin-top: 10px' class='total-realFee-sum'></div>"
        },
        {
            title: "مالیات",
            field: "tax",
            width: '200px',
            attributes: { class: "text-left" },
            format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: left !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: left !important;margin-top: 10px' class='total-tax-sum'></div>"
        },
        {
            title: "مبلغ خرید",
            field: "buyPrice",
            width: '200px',
            attributes: { class: "text-left" },
            format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: left !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: left !important;margin-top: 10px' class='total-buyPrice-sum'></div>"
        },
        {
            title: "مبلغ فروش",
            field: "sellPrice",
            width: '200px',
            attributes: { class: "text-left" },
            format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: left !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: left !important;margin-top: 10px' class='total-sellPrice-sum'></div>"
        },
        {
            title: "مبلغ کل",
            field: "totalPrice",
            width: '200px',
            attributes: { class: "text-left" },
            format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: left !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: left !important;margin-top: 10px' class='total-totalPrice-sum'></div>"
        },
        {
            title: "مبلغ خالص فروش",
            field: "sellNetAmount",
            width: '200px',
            attributes: { class: "text-left" }
            ,format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: left !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: left !important;margin-top: 10px' class='total-sellNetAmount-sum'></div>"
        },
        {
            title: "مبلغ خالص خرید",
            field: "buyNetAmount",
            width: '200px',
            attributes: { class: "text-left" },
            format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: left !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: left !important;margin-top: 10px' class='total-buyNetAmount-sum'></div>"
        },
        {
            title: "اعتبار",
            field: "creditAmount",
            width: '200px',
            attributes: { class: "text-left" },
            format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: left !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: left !important;margin-top: 10px' class='total-creditAmount-sum'></div>"
        },
        {
            title: "کد بورسی",
            field: "tseBourseCode",
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "کد معاملاتی",
            field: "pamTSECode",
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "کد شعبه",
            field: "branchId",
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "معرف",
            field: "representativeName",
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "شناسه ملی",
            field: "nationalId",
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "شماره تلفن",
            field: "phone",
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "شناسه پستی",
            field: "address",
            width: '200px',
            attributes: { class: "text-rgiht" }
        },
        {
            title: "شهر محل سکونت",
            field: "regionTitle",
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "کد پستی",
            field: "postalCode",
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "پست الکترونیکی",
            field: "email",
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "شماره حساب",
            field: "accountFullName",
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "نام پدر",
            field: "fatherName",
            width: '200px',
            attributes: { class: "text-rgiht" }
        },
        {
            title: "جنسیت",
            field: "genderTitle",
            width: '200px',
            attributes: { class: "text-rgiht" }
        },
        {
            title: "شماره شناسنامه",
            field: "identityCard",
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "تاریخ تولد",
            field: "birthDateJalali",
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "وضعیت تاهل",
            field: "maritalStatus",
    
            attributes: { class: "text-left" },
            show: true,
            isFixed: false,
            dynamicColumn: true,
            width: '200px',
            template:isCheck("maritalStatus")
        },
        {
            title: "بازاریاب",
            field: "marketerName",
            width: '200px',
            attributes: { class: "text-rgiht" }
        },
        {
            title: "حجم معاملات",
            field: "volumeTransaction",
            width: '200px',
            attributes: { class: "text-left" },
            format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: left !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: left !important;margin-top: 10px' class='total-volumeTransaction-sum'></div>"
        },
        {
            title: "حجم کارمزد",
            field: "volumeFee",
            width: '200px',
            attributes: { class: "text-left" },
            format: "{0:n0}",
            filter: "numeric",
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: left !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: left !important;margin-top: 10px' class='total-volumeFee-sum'></div>"
        },
        {
            title: "نوع مشتری",
            field: "partyTypeTitle",
            width: '200px',
            attributes: { class: "text-rgiht" }
        },
        // {
        //     title: "تلفن ضروری",
        //     field: " necessaryPhone",
        //     width: '200px',
        //     attributes: { class: "text-left" }
        // },
        // {
        //     title: "مبلغ",
        //     field: "amount",
        //     filter: "numeric",
        //     format: "{0:n0}",
        //     width: '200px',
        //     attributes: { class: "text-left" },
        //     aggregates: ["sum"],
        //     footerTemplate:
        //         "<div style='text-align: left !important;'>#=kendo.toString(sum, 'n0')#</div>" +
        //         "<div style='text-align: left !important;margin-top: 10px' class='total-amount-sum'></div>"
        // },
        
        // {
        //     title: "تلفن ضروری",
        //     field: "necessaryPhone",
        //     width: '200px',
        //     attributes: { class: "text-left" }
        // },
       

    ];
};


export default Columns;