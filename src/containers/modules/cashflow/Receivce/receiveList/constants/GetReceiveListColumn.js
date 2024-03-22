import React from 'react';
import {CheckColumn} from 'shared/components/kendoGrid/kendoGrid';
import DeletePartyBankAccountService from "../../../../personsAndCustomers/customers/bankAccounts/services/deletePartyBankAccountService";
import Delete from 'shared/components/kendoGrid/deleteButton/deleteButtonWithoutTD';
import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';
import DeleteChequeBookServices from "../../../chequeManagement/chequeBook/services/DeleteChequeBookServices";
const Columns = function (prop, state, classes) {
    return [
        {
         selectable: true, width: "50px"
        },
        {
            title: "نام مشتری",
            field: "fromPartyFullName",
            footerTemplate: "<div style='text-align: right !important;'>جمع صفحه</div><div style='text-align: right !important;margin-top: 10px'>جمع کل</div>",
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "بانک دریافتی",
            field: "toBankDepositTitle",
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "وضعیت",
            field: "stateTitle",
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "شرح",
            field: "description",
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "شماره سند بانکی",
            field: "trakingNumber",
            width: '200px',
            attributes: { class: "text-left" }
        },
        // {
        //     title: "تلفن ضروری",
        //     field: " necessaryPhone",
        //     width: '200px',
        //     attributes: { class: "text-left" }
        // },
        {
            title: "مبلغ",
            field: "amount",
            filter: "numeric",
            format: "{0:n0}",
            width: '200px',
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate:
                "<div style='text-align: left !important;'>#=kendo.toString(sum, 'n0')#</div>" +
                "<div style='text-align: left !important;margin-top: 10px' class='total-amount-sum'></div>"
        },
        {
            title: "مبلغ درخواستی",
            field: "requestedAmount",
            // filter: "numeric",
            format: "{0:n0}",
            width: '200px',
            attributes: { class: "text-left" },
            // aggregates: ["sum"],
            // footerTemplate:
            //     "<div style='text-align: left !important;'>#=kendo.toString(sum, 'n0')#</div>" +
            //     "<div style='text-align: left !important;margin-top: 10px' class='total-requestedAmount-sum'></div>"
        },
        {
            title: "تاریخ درخواست",
            field: "requestedDateJalali",
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "تاریخ انجام",
            field: "dueDateJalali",
            width: '200px',
            attributes: { class: "text-left" }
        },

        // {
        //     title: "تلفن ضروری",
        //     field: "necessaryPhone",
        //     width: '200px',
        //     attributes: { class: "text-left" }
        // },
        {
            title: "شعبه ایجاد کننده",
            field: "branchName",
            width: '200px'
        },
        {
            title: "مبدا ثبت",
            field: "orderRegisterFromTitle",
            width: '200px'
        },
        {
            title: "کد حسابداری مشتری",
            field: "fromDetailLedgerCode",
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "شناسه ملی",
            field: "fromNationalId",
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "بازار",
            field: "mainMarketTitle",
            width: '200px'
        },
        {
            title: "تاریخ ایجاد",
            field: "createdJalali",
            width: '200px',
            attributes: { class: "text-left changeDirection" }
        },
        {
            title: "ایجاد کننده",
            field: "createdByName",
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "نوع تراکنش",
            field: "transactionTypeTitle",
            width: '200px'
        },
        {
            title: "نحوه انتقال وجه",
            field: "cashFlowCategoryTitle",
            width: '200px'
        },
        {
            title: "دلیل",
            field: "reasonTitle",
            width: '200px'
        },
        {
            title: "تاریخ آخرین ویرایش",
            field: "modifiedJalali",
            width: '200px',
            attributes: { class: "text-left changeDirection",}
        },
        {
            title: "آخرین ویرایشگر",
            field: "modifiedByName",
            attributes: { class: "text-left" }
        },
        {
            title: "عملیات",
            width: "150px",
            template:
                '<div style="text-align: center;">'
                +
                '<span class="fas fa-edit edit" style="color: rgb(33, 150, 243); cursor: pointer; font-size: 15px; margin: 5px;"></span>' +
                '<span class="fas fa-trash delete" style="color: red; cursor: pointer; font-size: 15px; margin: 5px;"></span>'
                +
                '</div>',
            // cell: (event) => {
            //
            //     return (
            //         <td>
            //             <Delete deleteService={DeleteChequeBookServices.deleteCashFlowChequeMasterByIdMethod}  info={event.dataItem} entity={event.dataItem.id}  {...prop} sateParams={{ accountNumber: event.dataItem.accountNumber, fullName: event.dataItem.fullName, }} />
            //             <Edit {...prop} sateParams={{partyId: event.dataItem.partyId, id:event.dataItem.id, fullName: event.dataItem.fullName, nationalId: event.dataItem.nationalId}}/>
            //         </td>
            //     )
            // }
        }

    ];
};


export default Columns;