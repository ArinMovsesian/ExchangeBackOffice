import React from 'react';
import { Edit, NumericBySign } from 'shared/components/kendoGrid/kendoGrid';
import UpdateTradeNumber from '../components/updateFee/UpdateTradeNumberComponent';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';
import OperationButton from '../../../../../../shared/components/kendoGrid/operationButton/operationButton';
import AssignRightAcceptance from '../components/assignRightAcceptance/AssignRightAcceptanceComponent';

const Columns = function (prop, state, classes) {
    return [

        {
            title: "ویرایش کارمزد",
            // field: "ticketNumber",
            width: "100px",
            show: true,
            class: "text-right",

            isFixed: false,
            dynamicColumn: true,
            footerTemplate: "<div>جمع صفحه</div><div>جمع کل</div>",
            attributes: { class: "text-center" },
            template:
                '<div  class="text-center">' +
                '<div class="dropdown">' +
                '<button class="btn btn-sm btn-info btn-circle " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                '<i class="fas fa-ellipsis-h" style="font-size: 13px;"></i>' +
                '</button>' +
                '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
                '<span   class="dropdown-item updateFee" >ویرایش کارمزد</span>' +
                '<span   class="dropdown-item assignRightAcceptance" >حق تقدم استفاده نشده</span>' +

                '</div></div></div>'
        },
        {
            title: "شماره اعلامیه",
            field: "ticketNumber",
            width: "120px",
            show: true,

            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "تاریخ معامله",
            field: "dateJalali",
            show: true,
            width: "180px",
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "ساعت معامله",
            field: "time",
            show: true,
            width: "120",
            isFixed: false,

            dynamicColumn: false,


        },
        {
            title: " نام مشتری",
            field: "partyFullName",
            width: "300px",
            show: true,
            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "کد حسابداری",
            field: "detailLedgerCode",
            show: true,
            width: "132px",
            filter: "numeric",
            format: "{0:n0}",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "کد بورسی",
            field: "tseBourseCode",
            show: true,
            width: "132px",
            isFixed: false,

            dynamicColumn: false,


        },
        {
            title: "کد معاملاتی",
            field: "pamCode",
            show: true,
            width: "132px",
            isFixed: false,
            dynamicColumn: false,


        },

        {
            title: "شناسه ملی",
            field: "nationalCode",
            show: true,
            width: "132px",

            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "وضعیت معامله",
            field: "transactionStatusEnumTitle",
            show: true,
            width: "150px",

            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "نوع معامله",
            field: "transactionTypeTitle",
            width: "150px",
            show: true,
            class: "text-right",

            isFixed: false,
            dynamicColumn: false,


        },
        {
            title: "نوع مشتری",
            field: "partyTypeTitle",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
            class: "text-right",


        },
        {
            title: "نوع بازار",
            field: "simpleSecurityExchangeTitle",
            show: true,
            width: "150px",
            isFixed: false,
            class: "text-right",
            dynamicColumn: false,
        },
        {
            title: "نوع زیر بازار",
            field: "productTypeTitle",
            show: true,
            width: "150px",


            isFixed: false,
        },
        {
            title: "نام صنعت",
            field: "sectorTitle",
            show: true,
            width: "220px",

            isFixed: false,
            dynamicColumn: false,
        },

        {
            title: "شعبه معامله",
            field: "traderCodeTitle",
            show: true,
            width: "180px",
            isFixed: false,

            dynamicColumn: false,
        },
        {
            title: "شعبه مشتری",
            field: "partyBranchTitle",
            show: true,

            width: "180px",

            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "نماد",
            field: "symbol",
            show: true,
            // filter: "numeric",
            // format: "{0:n0}",
            width: "200px",

            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "نام سهم",
            field: "fullProductName",
            show: true,

            width: "280px",
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "تعداد ",
            field: "volume",
            show: true,
            filter: "numeric",
            format: "{0:n0}",
            width: "132px",
            isFixed: false,
            dynamicColumn: false,
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-volume-sum"></div>'
        },
        {
            title: "قیمت",
            field: "price",
            show: true,
            filter: "numeric",
            format: "{0:n0}",
            width: "162px",
            attributes: { class: "text-left" },

            isFixed: false,
            dynamicColumn: false,
            class: "text-left",
            aggregates: ["sum"],
            footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-price-sum"></div>'
        },
        {
            title: " ارزش معامله (سهام در نرخ)",
            field: "value",
            show: true,
            filter: "numeric",
            format: "{0:n0}",
            width: "162px",
            isFixed: false,
            attributes: { class: "text-left" },

            aggregates: ["sum"],
            footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-value-sum"></div>',
            dynamicColumn: false,
            class: "text-left"
        },
        {
            title: "کارمزد کارگزاری",
            field: "brokerFee",
            show: true,
            filter: "numeric",
            format: "{0:n0}",
            width: "162px",
            isFixed: false,
            dynamicColumn: false,
            class: "text-left",
            attributes: { class: "text-left" },

            aggregates: ["sum"],
            footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-brokerFee-sum"></div>'
        },
        {
            title: "مقدار واقعی کارمزد کارگزاری",
            field: "realFee",
            show: true,
            filter: "numeric",
            format: "{0:n0}",
            width: "162px",
            isFixed: false,
            dynamicColumn: false,

            class: "text-left",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-realFee-sum"></div>'
        },
        {
            title: "کارمزد سپرده گذاری",
            field: "csdFee",
            show: true,
            // filter: "numeric",
            // format: "{0:n0}",
            width: "162px",
            isFixed: false,
            dynamicColumn: false,
            filter: "numeric",
            format: "{0:n0}",
            class: "text-left",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-csdFee-sum"></div>'
        },
        {
            title: "کارمزد بورس اوراق",
            field: "tseFee",
            show: true,
            width: "162px",
            isFixed: false,
            dynamicColumn: false,
            filter: "numeric",
            format: "{0:n0}",
            class: "text-left",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-tseFee-sum"></div>'
        },
        {
            title: "کارمزد حق نظارت سازمان",
            field: "seoFee",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: "162px",
            class: "text-left",
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
            show: true,
            filter: "numeric",
            format: "{0:n0}",


            width: "162px",
            isFixed: false,
            dynamicColumn: false,
            class: "text-left",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-tseTmcFee-sum"></div>'
        },
        {
            title: "کارمزد خدمات دسترسی",
            field: "rightToAccessFee",
            show: true,
            filter: "numeric",
            format: "{0:n0}",
            width: "162px",
            isFixed: false,
            dynamicColumn: false,
            class: "text-left",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-rightToAccessFee-sum"></div>'
        },
        {
            title: "مالیات نقل و انتقال",
            field: "tax",
            show: true,
            filter: "numeric",

            format: "{0:n0}",
            width: "162px",
            isFixed: false,
            dynamicColumn: false,
            class: "text-left",
            aggregates: ["sum"],
            attributes: { class: "text-left" },
            footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-tax-sum"></div>'
        },
        {
            title: "مجموع کارمزد",
            field: "totalFee",
            show: true,
            filter: "numeric",
            format: "{0:n0}",
            width: "162px",
            isFixed: false,
            dynamicColumn: false,
            class: "text-left",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-totalFee-sum"></div>'
        },
        {
            title: "درصد تخفیف",
            field: "discountPercentage",
            show: true,
            filter: "numeric",
            format: "{0:n0}",
            width: "162px",
            isFixed: false,
            dynamicColumn: false,
            class: "text-left",
            aggregates: ["sum"],
            footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-discountPercentage-sum"></div>'
        },
        {
            title: "مقدار تخفیف ",
            field: "discount",
            show: true,
            filter: "numeric",
            format: "{0:n0}",
            width: "162px",
            isFixed: false,
            dynamicColumn: false,
            class: "text-left",
            aggregates: ["sum"],
            footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="total-discount-sum"></div>'
        },
        {
            title: "مبلغ تسویه نهایی ",
            field: "netAmount",
            show: true,
            filter: "numeric",
            format: "{0:n0}",
            width: "162px",
            isFixed: false,
            dynamicColumn: false,
            class: "text-left",
            aggregates: ["sum"],
            attributes: { class: "text-left" },
            // footerTemplate: "#=kendo.toString(sum, 'n0')#",
            footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
                '<div class="totla-net-amount"></div>'
        },


    ];

}


export default Columns;