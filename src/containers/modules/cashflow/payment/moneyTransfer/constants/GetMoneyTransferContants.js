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
            title: "انتقال دهنده",
            field: "transmitterFullName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            footerTemplate: "<div style='text-align: right !important;'>جمع صفحه</div><div style='text-align: right !important;margin-top: 10px'>جمع کل</div>",
            // attributes: { class: "text-center" }
        },
        {
            title: "کد حسابداری انتقال دهنده",
            field: "transmitterDetailLedgerCode",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "وضعیت",
            field: "stateTitle",
            width: '200px',
            attributes: { class: "text-center" }
        },
        {
            title: "شناسه ملی انتقال دهنده",
            field: "transmitterNationalId",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "انتقال گیرنده",
            field: "receiverFullName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "کد حسابداری انتقال گیرنده",
            field: "receiverDetailLedgerCode",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "شناسه ملی انتقال گیرنده",
            field: "receiverNationalId",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "مبلغ",
            field: "amount",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" },
            aggregates: ["sum"],
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
            title: "شرح",
            field: "description",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "شماره سند",
            field: "trakingNumber",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px',
            attributes: { class: "text-left" }
        },
        {
            title: "شعبه ایجاد کننده",
            field: "branchName",
            show: true,
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
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




        {
            title: "عملیات",
            isFixed: true,
            width: "150px",
            dynamicColumn: true,
            template: '<div style="text-align: center;">'
                +
                '<span class="fas fa-edit edit" style="color: rgb(33, 150, 243); cursor: pointer; font-size: 15px; margin: 5px"></span>' +
                '<span class="fas fa-trash delete" style="color: red; cursor: pointer; font-size: 15px; margin: 5px"></span>'
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