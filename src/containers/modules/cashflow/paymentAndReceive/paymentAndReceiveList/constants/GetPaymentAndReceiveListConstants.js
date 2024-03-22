import React from 'react';
import {CheckColumn} from 'shared/components/kendoGrid/kendoGrid';
import DeletePartyBankAccountService from "../../../../personsAndCustomers/customers/bankAccounts/services/deletePartyBankAccountService";
import Delete from 'shared/components/kendoGrid/deleteButton/deleteButtonWithoutTD';
import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';
import DeleteChequeBookServices from "../../../chequeManagement/chequeBook/services/DeleteChequeBookServices";
import {isCheck} from "../../../../../../constants/kendoUiGrid";
const Columns = function (prop, state, classes) {
    return [
        {
            title: "نوع تراکنش",
            field: "transactionTypeTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            footerTemplate: "<div style='text-align: right !important;'>جمع صفحه</div><div style='text-align: right !important;margin-top: 10px'>جمع کل</div>",
        },
        {
            title: "نام مشتری",
            field: "partyFullName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
        },
        {
            title: "کد حساب تفصیل مبدا",
            field: "fromDetailLedgerCode",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "کد حساب تفصیل مقصد",
            field: "toDetailLedgerCode",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "کد حسابداری معین مبدا",
            field: "fromSubsidiaryLedgerCode",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "کد حسابداری معین مقصد",
            field: "toSubsidiaryLedgerCode",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "شناسه ملی",
            field: "nationalId",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },

        {
            title: "شعبه مشتری",
            field: "customerBranchName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },

        {
            title: "بانک پرداختی کارگزاری",
            field: "fromBankDepositTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
        },

        {
            title: "نام بانک پرداختی کارگزاری",
            field: "fromBankTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
        },

        {
            title: "شماره حساب بانک پرداختی کارگزاری",
            field: "fromAccountNumber",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "کد شعبه بانک پرداختی کارگزاری",
            field: "fromBranchCode",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "نام شعبه بانک پرداختی کارگزاری",
            field: "fromBranchName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "نام بانک دریافتی کارگزاری",
            field: "toBankDepositTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "بانک دریافتی کارگزاری",
            field: "toBankTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "شماره حساب بانک دریافتی کارگزاری",
            field: "toAccountNumber",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "شماره حساب بانکی مشتری",
            field: "toPartyAccountNumber",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "نام حساب بانکی مشتری",
            field: "toPartyBankTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "شماره شبای مشتری",
            field: "toPartyIBAN",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },




        {
            title: "شماره پیگیری",
            field: "trakingNumber",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "شماره سند حسابداری",
            field: "voucherNumber",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "شماره سند بانکی",
            field: "receiptNumber",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "وضعیت",
            field: "stateTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "نوع دریافت و پرداخت",
            field: "cashFlowTypeTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "نحوه انتقال وجه",
            field: "cashFlowCategoryTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "علت واریز وجه",
            field: "reasonTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "شرح",
            field: "description",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "شرح مشتری",
            field: "customerDescription",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "شرح کارگزاری",
            field: "brokerDescription",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },






        {
            title: "مبلغ باقیمانده سند",
            field: "remainValue",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            filter: "numeric",
            format: "{0:n0}",
            aggregates: ["sum"],
            attributes: { class: "text-left" },
            footerTemplate:
                "<div style='text-align: left !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: left !important;margin-top: 10px' class='total-requestedAmount-sum'></div>"
        },
        {
            title: "مبلغ درخواستی",
            field: "requestedAmount",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            filter: "numeric",
            format: "{0:n0}",
            aggregates: ["sum"],
            attributes: { class: "text-left" },
            footerTemplate:
                    "<div style='text-align: left !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                    "<div style='text-align: left !important;margin-top: 10px' class='total-remainValue-sum'></div>"
        },
        {
            title: "مبلغ تایید شده",
            field: "amount",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            aggregates: ["sum"],
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            footerTemplate:
                "<div style='text-align: left !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: left !important;margin-top: 10px' class='total-amount-sum'></div>"
        },







        {
            title: "تاریخ انجام",
            field: "dueDateJalali",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left changeDirection" }
        },
        {
            title: "تاریخ درخواست",
            field: "requestedDateJalali",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left changeDirection" }
        },
        {
            title: "تلفن ضروری",
            field: "necessaryPhone",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "شعبه ثبت کننده",
            field: "branchName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "مبدا ثبت",
            field: "orderRegisterFromTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "تایید کننده",
            field: "confirmerName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "تاریخ تایید",
            field: "confirmationDateJalali",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left changeDirection" }
        },
        {
            title: "تاریخ حذف",
            field: "deletionDateJalali",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left changeDirection" }
        },
        {
            title: "بازار",
            field: "mainMarketTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "دسته چک",
            field: "chequeTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "شماره سریال برگه چک",
            field: "chequeNumber",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "وضعیت برگه چک",
            field: "chequeStatusTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "پیوست",
            field: "hasAttachment",
            show: true,
            isFixed: false,
            dynamicColumn: true,
            width: '200px',
            template:isCheck("hasAttachment")
        },
        {
            title: "تاریخ ایجاد",
            field: "createdJalali",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left changeDirection" }
        },
        {
            title: "ایجاد کننده",
            field: "createdByName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "تاریخ آخرین ویرایش",
            field: "modifiedJalali",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left changeDirection" }
        },
        {
            title: "آخرین ویرایشگر",
            field: "modifiedByName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },


        // {
        //     title: "عملیات",
        //     isFixed: true,
        //     width: "150px",
        //     dynamicColumn: true,
        //     template: '<div style="text-align: center;">'
        //         +
        //         '<span class="fas fa-trash delete" style="color: red; cursor: pointer; font-size: 15px; margin: 5px"></span>'
        //         +
        //         '</div>',
            // cell: (event) => {
            //
            //     return (
            //         <td>
            //             <Delete deleteService={DeleteChequeBookServices.deleteCashFlowChequeMasterByIdMethod}  info={event.dataItem} entity={event.dataItem.id}  {...prop} sateParams={{ accountNumber: event.dataItem.accountNumber, fullName: event.dataItem.fullName, }} />
            //             <Edit {...prop} sateParams={{partyId: event.dataItem.partyId, id:event.dataItem.id, fullName: event.dataItem.fullName, nationalId: event.dataItem.nationalId}}/>
            //         </td>
            //     )
            // }
        // }

    ];
};


export default Columns;